# EC2 Deployment Guide

Complete guide for deploying FinRadar to AWS EC2 with PM2.

## 📋 Prerequisites

- AWS Account
- EC2 instance (Ubuntu 20.04 or 22.04 recommended)
- Domain name (optional, for SSL)
- SSH access to EC2 instance

## 🖥️ EC2 Instance Setup

### 1. Launch EC2 Instance

Recommended specifications:
- **Instance Type**: t2.micro (free tier) or t3.small
- **AMI**: Ubuntu Server 22.04 LTS
- **Storage**: 20GB SSD
- **Security Group**: Allow ports 22 (SSH), 80 (HTTP), 443 (HTTPS)

### 2. Connect to Instance

```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

### 3. Update System

```bash
sudo apt update && sudo apt upgrade -y
```

## 📦 Install Required Software

### Install Node.js 18+

```bash
# Download and run NodeSource setup script
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# Install Node.js
sudo apt install -y nodejs

# Verify installation
node --version
npm --version
```

### Install PM2

```bash
# Install PM2 globally
sudo npm install -g pm2

# Verify installation
pm2 --version
```

### Install Git

```bash
sudo apt install -y git
```

### Install Nginx (Optional but Recommended)

```bash
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

## 🚀 Deploy Application

### 1. Clone Repository

```bash
# Create application directory
sudo mkdir -p /var/www
cd /var/www

# Clone your repository
sudo git clone <your-repo-url> finradar
cd finradar

# Set proper permissions
sudo chown -R $USER:$USER /var/www/finradar
```

### 2. Configure Environment

```bash
# Copy environment template
cp .env.example .env

# Edit environment variables
nano .env
```

Add your API keys:
```env
FMP_API_KEY=your_financial_modeling_prep_api_key
NEWSAPI_KEY=your_newsapi_key_optional
```

### 3. Install Dependencies and Build

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Create logs directory
mkdir -p logs
```

### 4. Start with PM2

```bash
# Start application
pm2 start ecosystem.config.js

# Check status
pm2 status

# View logs
pm2 logs finradar
```

### 5. Configure PM2 Startup

```bash
# Generate startup script
pm2 startup systemd

# Follow the command output (it will give you a command to run)
# Example: sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u ubuntu --hp /home/ubuntu

# Save PM2 process list
pm2 save
```

## 🌐 Configure Nginx Reverse Proxy

### 1. Create Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/finradar
```

Copy the configuration from `nginx.conf` file in the project root.

### 2. Enable Site

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/finradar /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

## 🔒 Setup SSL with Let's Encrypt

### 1. Install Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 2. Obtain SSL Certificate

```bash
# Replace with your domain
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Follow the prompts
# Choose option 2 to redirect HTTP to HTTPS
```

### 3. Test Auto-Renewal

```bash
sudo certbot renew --dry-run
```

## 🔧 Configuration Files

### ecosystem.config.js

PM2 configuration is already set up in the project:

```javascript
module.exports = {
  apps: [{
    name: 'finradar',
    script: 'node_modules/next/dist/bin/next',
    args: 'start -p 3000',
    instances: 'max',
    exec_mode: 'cluster',
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

## 🔄 Update Deployment

### Manual Update

```bash
cd /var/www/finradar

# Pull latest changes
git pull origin main

# Install new dependencies
npm install

# Rebuild
npm run build

# Restart PM2
pm2 restart finradar
```

### Automated Update Script

Use the provided `deploy.sh`:

```bash
# Make script executable
chmod +x deploy.sh

# Run deployment
sudo ./deploy.sh
```

## 🔍 Monitoring and Maintenance

### PM2 Commands

```bash
# View status
pm2 status

# View logs
pm2 logs finradar
pm2 logs finradar --lines 100

# Monitor resources
pm2 monit

# Restart application
pm2 restart finradar

# Stop application
pm2 stop finradar

# Delete from PM2
pm2 delete finradar
```

### System Monitoring

```bash
# Check disk space
df -h

# Check memory usage
free -h

# Check CPU usage
htop  # or top

# Check Nginx status
sudo systemctl status nginx

# Check Nginx logs
sudo tail -f /var/log/nginx/finradar-access.log
sudo tail -f /var/log/nginx/finradar-error.log
```

## 🔒 Security Best Practices

### 1. Configure Firewall (UFW)

```bash
# Enable UFW
sudo ufw enable

# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Check status
sudo ufw status
```

### 2. Secure SSH

```bash
# Edit SSH config
sudo nano /etc/ssh/sshd_config

# Disable root login
PermitRootLogin no

# Disable password authentication (use SSH keys only)
PasswordAuthentication no

# Restart SSH
sudo systemctl restart sshd
```

### 3. Keep System Updated

```bash
# Setup automatic security updates
sudo apt install unattended-upgrades
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

### 4. Backup Strategy

```bash
# Backup .env file
sudo cp .env .env.backup

# Backup PM2 configuration
pm2 save

# Consider setting up automated backups of:
# - Application code
# - Environment variables
# - Nginx configuration
# - SSL certificates
```

## 🐛 Troubleshooting

### Application Not Starting

```bash
# Check PM2 logs
pm2 logs finradar --lines 50

# Check if port 3000 is available
sudo lsof -i :3000

# Restart application
pm2 restart finradar
```

### Nginx Errors

```bash
# Test Nginx configuration
sudo nginx -t

# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Restart Nginx
sudo systemctl restart nginx
```

### Out of Memory

```bash
# Check memory usage
free -h
pm2 monit

# Adjust PM2 instances in ecosystem.config.js
# Change instances from 'max' to specific number (e.g., 1 or 2)
```

### SSL Certificate Issues

```bash
# Renew certificate manually
sudo certbot renew

# Check certificate status
sudo certbot certificates
```

## 📊 Performance Optimization

### 1. Enable Caching in Nginx

Already configured in `nginx.conf`:
- Static assets cached for 1 year
- Images cached for 1 day

### 2. PM2 Clustering

Configured to use all CPU cores by default (`instances: 'max'`).

For smaller instances, reduce to 1-2 instances:
```javascript
instances: 2,  // Instead of 'max'
```

### 3. Monitor Performance

```bash
# PM2 monitoring
pm2 monit

# Install PM2 web dashboard (optional)
pm2 install pm2-server-monit
```

## 🎯 Next Steps

1. ✅ Set up monitoring (PM2 Plus, CloudWatch, etc.)
2. ✅ Configure automated backups
3. ✅ Set up CI/CD pipeline (GitHub Actions, etc.)
4. ✅ Add custom domain
5. ✅ Configure CDN (CloudFront, etc.)
6. ✅ Set up database (if needed)

## 📞 Support

For deployment issues:
- Check logs: `pm2 logs finradar`
- Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
- Review AWS security groups
- Verify DNS settings (if using custom domain)

---

**Deployment completed successfully!** 🎉

Your application should now be running at:
- HTTP: http://your-domain.com (or http://your-ec2-ip)
- HTTPS: https://your-domain.com (after SSL setup)
