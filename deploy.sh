#!/bin/bash

# 🚀 Dropease Landing Page - Auto Deploy Script
# Usage: ./deploy.sh

set -e

echo "🚀 Starting deployment..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
SERVER_USER="your-username"
SERVER_IP="your-server-ip"
SERVER_PATH="/var/www/dropease-landing"
APP_NAME="dropease-landing"

echo "${YELLOW}📦 Building Next.js app...${NC}"
npm run build

echo "${YELLOW}📤 Uploading code to server...${NC}"
rsync -avz --delete \
  --exclude 'node_modules' \
  --exclude '.git' \
  --exclude '.next/cache' \
  --exclude 'logs' \
  . ${SERVER_USER}@${SERVER_IP}:${SERVER_PATH}/

echo "${YELLOW}🔧 Installing dependencies on server...${NC}"
ssh ${SERVER_USER}@${SERVER_IP} << 'ENDSSH'
cd /var/www/dropease-landing
npm install --production
npm run build
ENDSSH

echo "${YELLOW}🔄 Restarting PM2 app...${NC}"
ssh ${SERVER_USER}@${SERVER_IP} "pm2 restart ${APP_NAME}"

echo "${GREEN}✅ Deployment completed successfully!${NC}"
echo "${GREEN}🌐 Check your site at: https://your-domain.com${NC}"

