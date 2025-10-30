#!/bin/bash

# 🚀 Deploy Dropease Landing Page với Google Analytics
# Server: 103.116.8.64
# Domain: dropease.tech
# GA ID: G-Y1DDWQWY4F

echo "🚀 Starting deployment to production server..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Server details
SERVER="root@103.116.8.64"
APP_DIR="/var/www/dropease-landing"
PORT="3002"

echo -e "${YELLOW}📦 Step 1: Building production version...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed!${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Build successful!${NC}"

echo -e "${YELLOW}📤 Step 2: Uploading files to server...${NC}"
rsync -avz --progress \
    --exclude 'node_modules' \
    --exclude '.next' \
    --exclude '.git' \
    --exclude '.env.local' \
    --exclude 'logs' \
    ./ $SERVER:$APP_DIR/

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Upload failed!${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Upload successful!${NC}"

echo -e "${YELLOW}🔧 Step 3: Setting up server environment...${NC}"
ssh $SERVER << EOF
cd $APP_DIR

# Install dependencies
echo "Installing dependencies..."
npm install --production

# Create logs directory
mkdir -p logs

# Set environment variables
echo "NEXT_PUBLIC_GA_ID=G-Y1DDWQWY4F" > .env.local
echo "NODE_ENV=production" >> .env.local
echo "PORT=$PORT" >> .env.local

# Build on server
echo "Building on server..."
npm run build

echo "✅ Server setup complete!"
EOF

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Server setup failed!${NC}"
    exit 1
fi

echo -e "${YELLOW}🔄 Step 4: Restarting PM2...${NC}"
ssh $SERVER << EOF
cd $APP_DIR

# Stop existing app
pm2 stop dropease-landing 2>/dev/null || true
pm2 delete dropease-landing 2>/dev/null || true

# Start with new config
pm2 start ecosystem.config.js

# Save PM2 config
pm2 save

echo "✅ PM2 restarted!"
EOF

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ PM2 restart failed!${NC}"
    exit 1
fi

echo -e "${YELLOW}🌐 Step 5: Updating Nginx config...${NC}"
ssh $SERVER << EOF
# Update Nginx config for port $PORT
cat > /etc/nginx/sites-available/dropease.tech << 'NGINX'
server {
    listen 80;
    server_name dropease.tech www.dropease.tech;

    location / {
        proxy_pass http://localhost:$PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
NGINX

# Test Nginx config
nginx -t

if [ \$? -eq 0 ]; then
    # Reload Nginx
    systemctl reload nginx
    echo "✅ Nginx updated and reloaded!"
else
    echo "❌ Nginx config error!"
    exit 1
fi
EOF

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Nginx update failed!${NC}"
    exit 1
fi

echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo ""
echo -e "${YELLOW}📊 Next steps:${NC}"
echo "1. Point DNS A record to: 103.116.8.64"
echo "2. Test website: http://dropease.tech"
echo "3. Check GA tracking: https://analytics.google.com/"
echo "4. Monitor PM2: ssh $SERVER 'pm2 status'"
echo ""
echo -e "${GREEN}🚀 Your Dropease landing page is now live with GA tracking!${NC}"
