#!/bin/bash

# FinRadar Deployment Script for EC2
# This script automates the deployment process

set -e  # Exit on error

echo "🚀 Starting FinRadar deployment..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}Please run as root or with sudo${NC}"
    exit 1
fi

# Variables
APP_DIR="/var/www/finradar"
APP_NAME="finradar"

echo -e "${YELLOW}1. Stopping application...${NC}"
pm2 stop $APP_NAME || true

echo -e "${YELLOW}2. Pulling latest changes...${NC}"
cd $APP_DIR
git pull origin main

echo -e "${YELLOW}3. Installing dependencies...${NC}"
npm install --production

echo -e "${YELLOW}4. Building application...${NC}"
npm run build

echo -e "${YELLOW}5. Starting application with PM2...${NC}"
pm2 restart $APP_NAME || pm2 start ecosystem.config.js

echo -e "${YELLOW}6. Saving PM2 configuration...${NC}"
pm2 save

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo -e "${GREEN}Application is running on port 3000${NC}"

echo -e "\n${YELLOW}Useful commands:${NC}"
echo "  - View logs: pm2 logs $APP_NAME"
echo "  - Monitor: pm2 monit"
echo "  - Status: pm2 status"
echo "  - Restart: pm2 restart $APP_NAME"
