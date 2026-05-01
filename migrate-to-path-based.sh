#!/bin/bash

# Migration Script for Path-Based Routing
# This script helps migrate your app to /uk/ and /ru/ URLs

set -e  # Exit on error

echo "🚀 Starting Path-Based Multi-Language Migration..."
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if [lang] directory exists
if [ ! -d "src/app/[lang]" ]; then
  echo -e "${RED}❌ Error: src/app/[lang] directory not found${NC}"
  echo "Please make sure you're in the project root directory"
  exit 1
fi

echo -e "${YELLOW}⚠️  This script will move pages to src/app/[lang]/${NC}"
echo "Make sure you have backed up your code (git commit)!"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Migration cancelled."
  exit 0
fi

echo ""
echo -e "${GREEN}✅ Step 1: Moving page directories...${NC}"

# Function to safely move directory
move_dir() {
  local src=$1
  local dest=$2

  if [ -d "$src" ] && [ ! -d "$dest" ]; then
    echo "  Moving $src → $dest"
    cp -r "$src" "$dest"
    echo -e "  ${GREEN}✓${NC} Copied"
  elif [ -d "$dest" ]; then
    echo -e "  ${YELLOW}⊘${NC} $dest already exists, skipping"
  else
    echo -e "  ${YELLOW}⊘${NC} $src not found, skipping"
  fi
}

# Move directories
move_dir "src/app/news" "src/app/[lang]/news"
move_dir "src/app/cards" "src/app/[lang]/cards"
move_dir "src/app/insurance" "src/app/[lang]/insurance"
move_dir "src/app/crypto" "src/app/[lang]/crypto"
move_dir "src/app/calc" "src/app/[lang]/calc"

# Move credits subdirectories
if [ -d "src/app/credits" ]; then
  for dir in src/app/credits/*/; do
    if [ -d "$dir" ]; then
      dirname=$(basename "$dir")
      move_dir "$dir" "src/app/[lang]/credits/$dirname"
    fi
  done
fi

echo ""
echo -e "${GREEN}✅ Step 2: Directories moved!${NC}"
echo ""
echo -e "${YELLOW}📝 Next steps (manual):${NC}"
echo ""
echo "1. Update Header component:"
echo "   cp src/components/Header.PATH_BASED.tsx src/components/Header.tsx"
echo ""
echo "2. Update each page in src/app/[lang]/ to accept 'params' prop:"
echo "   export default function Page({ params }: { params: { lang: Locale } })"
echo ""
echo "3. Update all <Link> components to include language:"
echo "   <Link href={\`/\${params.lang}/page\`}>"
echo ""
echo "4. Test with: npm run dev"
echo "   Visit: http://localhost:3000"
echo "   Should redirect to /uk or /ru"
echo ""
echo "5. After testing, delete old files:"
echo "   rm -rf src/app/page.tsx src/app/layout.tsx"
echo "   (But keep api/, robots.ts, sitemap.ts, etc.)"
echo ""
echo -e "${GREEN}✅ Migration script complete!${NC}"
echo ""
echo "📖 Read PATH_BASED_MIGRATION_GUIDE.md for detailed instructions"
