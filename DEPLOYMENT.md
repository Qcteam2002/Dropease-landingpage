# 🚀 Hướng dẫn Deploy Dropease Landing Page lên Ubuntu Server

## 📋 Yêu cầu
- Ubuntu Server (18.04+)
- Domain đã trỏ về IP server
- SSH access vào server
- Node.js 18+ trên server

---

## 1️⃣ CHUẨN BỊ CODE

### Trên máy local:

```bash
# Build Next.js production
npm run build

# Test production build local (optional)
npm start
```

---

## 2️⃣ SETUP UBUNTU SERVER

### SSH vào server:
```bash
ssh root@your-server-ip
# hoặc
ssh username@your-server-ip
```

### Cài đặt Node.js 18+:
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify
node -v
npm -v
```

### Cài đặt PM2 (Process Manager):
```bash
sudo npm install -g pm2
```

### Cài đặt Nginx:
```bash
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

---

## 3️⃣ UPLOAD CODE LÊN SERVER

### Option A: Sử dụng Git (Khuyến nghị)

**Trên server:**
```bash
# Tạo thư mục cho app
cd /var/www
sudo mkdir dropease-landing
sudo chown -R $USER:$USER dropease-landing
cd dropease-landing

# Clone code từ Git (nếu có repo)
git clone https://github.com/your-repo/dropease-landing.git .
```

**Nếu chưa có Git repo, push code lên GitHub/GitLab trước:**
```bash
# Trên máy local
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/dropease-landing.git
git push -u origin main
```

### Option B: Sử dụng SCP/SFTP

**Trên máy local:**
```bash
# Nén project (bỏ node_modules)
cd /Users/vophuong/Documents/Dropease-LandingPage
tar --exclude='node_modules' --exclude='.next' -czf dropease.tar.gz .

# Upload lên server
scp dropease.tar.gz username@your-server-ip:/var/www/

# SSH vào server và giải nén
ssh username@your-server-ip
cd /var/www
sudo mkdir dropease-landing
sudo chown -R $USER:$USER dropease-landing
tar -xzf dropease.tar.gz -C dropease-landing/
cd dropease-landing
```

---

## 4️⃣ CÀI ĐẶT DEPENDENCIES & BUILD

**Trên server:**
```bash
cd /var/www/dropease-landing

# Install dependencies
npm install

# Build Next.js
npm run build

# Test app
npm start
# Truy cập http://server-ip:3000 để test
# Ctrl+C để stop
```

---

## 5️⃣ SETUP PM2 (Chạy app tự động)

```bash
cd /var/www/dropease-landing

# Start app với PM2
pm2 start npm --name "dropease-landing" -- start

# Hoặc dùng ecosystem file (khuyến nghị):
```

**Tạo file `ecosystem.config.js`:**
```javascript
module.exports = {
  apps: [{
    name: 'dropease-landing',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/dropease-landing',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
```

**Start với ecosystem:**
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

**Useful PM2 commands:**
```bash
pm2 list                  # Xem danh sách apps
pm2 logs dropease-landing # Xem logs
pm2 restart dropease-landing
pm2 stop dropease-landing
pm2 delete dropease-landing
```

---

## 6️⃣ CONFIGURE NGINX (Reverse Proxy)

### Tạo Nginx config:
```bash
sudo nano /etc/nginx/sites-available/dropease
```

**Paste config này:**
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Next.js static files
    location /_next/static {
        proxy_cache STATIC;
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_vary on;
}
```

### Enable site:
```bash
# Link config
sudo ln -s /etc/nginx/sites-available/dropease /etc/nginx/sites-enabled/

# Test config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

---

## 7️⃣ SETUP SSL (HTTPS) với Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Tạo SSL certificate (tự động config Nginx)
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

**Certbot sẽ tự động:**
- Tạo SSL certificate
- Update Nginx config để redirect HTTP → HTTPS
- Setup auto-renewal

---

## 8️⃣ POINT DOMAIN TO SERVER

### Trên Domain Registrar (GoDaddy, Namecheap, etc.):

**Thêm DNS Records:**
```
Type: A
Name: @
Value: YOUR_SERVER_IP
TTL: 3600

Type: A
Name: www
Value: YOUR_SERVER_IP
TTL: 3600
```

**Chờ DNS propagation (5-30 phút)**

---

## ✅ KIỂM TRA

```bash
# 1. Check PM2
pm2 status

# 2. Check Nginx
sudo systemctl status nginx

# 3. Check logs
pm2 logs dropease-landing

# 4. Test domain
curl https://your-domain.com
```

---

## 🔄 UPDATE APP (Khi có code mới)

```bash
# SSH vào server
ssh username@server-ip

# Pull code mới (nếu dùng Git)
cd /var/www/dropease-landing
git pull

# Install dependencies mới (nếu có)
npm install

# Build lại
npm run build

# Restart PM2
pm2 restart dropease-landing

# Clear Nginx cache (nếu có)
sudo systemctl reload nginx
```

---

## 🐛 TROUBLESHOOTING

### App không chạy:
```bash
pm2 logs dropease-landing
pm2 restart dropease-landing
```

### Nginx error:
```bash
sudo nginx -t
sudo tail -f /var/log/nginx/error.log
```

### Port 3000 bị chiếm:
```bash
sudo lsof -i :3000
sudo kill -9 PID
```

### SSL không hoạt động:
```bash
sudo certbot certificates
sudo certbot renew --force-renewal
```

---

## 📊 MONITORING

```bash
# Server resources
htop
df -h
free -m

# PM2 monitoring
pm2 monit

# Nginx logs
sudo tail -f /var/log/nginx/access.log
```

---

## 🔒 SECURITY (Khuyến nghị)

```bash
# Setup firewall
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable

# Disable root login
sudo nano /etc/ssh/sshd_config
# Set: PermitRootLogin no
sudo systemctl restart sshd
```

---

## 📞 Support

Nếu gặp lỗi, check:
1. PM2 logs: `pm2 logs dropease-landing`
2. Nginx logs: `/var/log/nginx/error.log`
3. System logs: `journalctl -xe`

