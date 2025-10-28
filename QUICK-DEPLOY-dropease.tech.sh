#!/bin/bash

# 🚀 Quick Deploy Script for dropease.tech (Multi-Apps Server)
# Usage: ./QUICK-DEPLOY-dropease.tech.sh

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ===== CONFIGURATION - THAY ĐỔI CHỖ NÀY =====
SERVER_USER="your-username"          # Thay bằng username SSH
SERVER_IP="your-server-ip"           # Thay bằng IP server
SERVER_PATH="/var/www/dropease-landing"
APP_NAME="dropease-landing"
APP_PORT="3001"                      # Port riêng cho Dropease, đổi nếu bị conflict
DOMAIN="dropease.tech"
# ===========================================

echo "${BLUE}🚀 Deploying Dropease Landing Page to ${DOMAIN}...${NC}"
echo ""

# Check if SSH config exists
echo "${YELLOW}📡 Checking server connection...${NC}"
if ! ssh -o ConnectTimeout=5 ${SERVER_USER}@${SERVER_IP} exit 2>/dev/null; then
    echo "${RED}❌ Cannot connect to server. Check SERVER_USER and SERVER_IP in script.${NC}"
    exit 1
fi
echo "${GREEN}✅ Server connected${NC}"
echo ""

# Build locally
echo "${YELLOW}📦 Building Next.js app locally...${NC}"
npm run build
echo "${GREEN}✅ Build completed${NC}"
echo ""

# Upload code
echo "${YELLOW}📤 Uploading code to server...${NC}"
rsync -avz --delete \
  --exclude 'node_modules' \
  --exclude '.git' \
  --exclude '.next/cache' \
  --exclude 'logs' \
  --exclude '*.log' \
  . ${SERVER_USER}@${SERVER_IP}:${SERVER_PATH}/

echo "${GREEN}✅ Code uploaded${NC}"
echo ""

# Install & Build on server
echo "${YELLOW}🔧 Installing dependencies on server...${NC}"
ssh ${SERVER_USER}@${SERVER_IP} << ENDSSH
set -e
cd ${SERVER_PATH}

# Check if port is in use
if lsof -Pi :${APP_PORT} -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "${YELLOW}⚠️  Port ${APP_PORT} is in use. Make sure it's the correct app or change APP_PORT in script.${NC}"
fi

# Install dependencies
npm install --production

# Build
npm run build

# Check if PM2 app exists
if pm2 describe ${APP_NAME} > /dev/null 2>&1; then
    echo "${YELLOW}🔄 Restarting existing PM2 app...${NC}"
    pm2 restart ${APP_NAME}
else
    echo "${YELLOW}🆕 Starting new PM2 app...${NC}"
    pm2 start ecosystem.config.js
    pm2 save
fi

echo "${GREEN}✅ PM2 app running${NC}"
ENDSSH

echo ""
echo "${GREEN}✅ Deployment completed successfully!${NC}"
echo ""
echo "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo "${BLUE}📊 DEPLOYMENT SUMMARY${NC}"
echo "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo "🌐 Domain:       ${DOMAIN}"
echo "📍 Server:       ${SERVER_IP}"
echo "🔌 Port:         ${APP_PORT}"
echo "📁 Path:         ${SERVER_PATH}"
echo "🏷️  PM2 Name:     ${APP_NAME}"
echo ""
echo "${YELLOW}📝 Next Steps:${NC}"
echo "1. Check PM2 status: ${BLUE}ssh ${SERVER_USER}@${SERVER_IP} 'pm2 list'${NC}"
echo "2. View logs: ${BLUE}ssh ${SERVER_USER}@${SERVER_IP} 'pm2 logs ${APP_NAME}'${NC}"
echo "3. Test locally: ${BLUE}ssh ${SERVER_USER}@${SERVER_IP} 'curl http://localhost:${APP_PORT}'${NC}"
echo "4. Check site: ${BLUE}https://${DOMAIN}${NC}"
echo ""

# Ask if user wants to check status
read -p "Do you want to check PM2 status now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    ssh ${SERVER_USER}@${SERVER_IP} "pm2 list && pm2 logs ${APP_NAME} --lines 20"
fi

echo ""
echo "${GREEN}✨ Done!${NC}"

