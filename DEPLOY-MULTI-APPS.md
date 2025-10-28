# 🚀 Deploy Dropease Landing Page (Multi-Apps Server)

**Domain:** dropease.tech  
**Scenario:** Server đã có apps khác đang chạy

---

## ⚠️ QUAN TRỌNG: Tránh Conflict

### 1. **Check Port đang dùng**

```bash
# Kiểm tra port 3000 có bị chiếm chưa
sudo lsof -i :3000

# Nếu port 3000 bị chiếm, đổi sang port khác (ví dụ: 3001, 3002...)
```

### 2. **Check PM2 apps hiện tại**

```bash
pm2 list
# Xem danh sách apps đang chạy, tránh trùng tên
```

### 3. **Check Nginx configs**

```bash
ls -la /etc/nginx/sites-enabled/
# Xem các site đang active
```

---

## 📋 SETUP STEP-BY-STEP

### **BƯỚC 1: Chọn Port cho Dropease**

Vì server có app khác, cần chọn port riêng. Ví dụ: **port 3001**

```bash
# Check port nào đang free
sudo netstat -tuln | grep LISTEN
# hoặc
sudo lsof -i -P -n | grep LISTEN
```

Giả sử chọn **port 3001** (không bị conflict)

---

### **BƯỚC 2: Upload Code**

**Trên máy local:**

```bash
cd ~/Documents/Dropease-LandingPage

# Build
npm run build

# Upload (thay username và server-ip)
rsync -avz --exclude 'node_modules' --exclude '.git' --exclude '.next/cache' \
  . username@your-server-ip:/var/www/dropease-landing/
```

---

### **BƯỚC 3: Setup trên Server**

**SSH vào server:**

```bash
ssh username@your-server-ip
cd /var/www/dropease-landing

# Install dependencies
npm install

# Build production
npm run build
```

---

### **BƯỚC 4: Config PM2 với Port riêng**

**Tạo/Edit file `ecosystem.config.js`:**

```bash
nano ecosystem.config.js
```

**Paste config này (chú ý PORT=3001):**

```javascript
module.exports = {
  apps: [{
    name: 'dropease-landing',  // Tên unique, không trùng app khác
    script: 'npm',
    args: 'start',
    cwd: '/var/www/dropease-landing',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3001  // ← PORT RIÊNG cho Dropease
    },
    error_file: '/var/www/dropease-landing/logs/error.log',
    out_file: '/var/www/dropease-landing/logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
  }]
}
```

**Tạo thư mục logs:**

```bash
mkdir -p logs
```

**Start app với PM2:**

```bash
# Start với ecosystem config
pm2 start ecosystem.config.js

# Save PM2 process list
pm2 save

# Check
pm2 list
pm2 logs dropease-landing
```

**Test app đang chạy:**

```bash
# Kiểm tra port 3001
curl http://localhost:3001
```

---

### **BƯỚC 5: Config Nginx (Không ảnh hưởng apps khác)**

**Tạo config riêng cho Dropease:**

```bash
sudo nano /etc/nginx/sites-available/dropease.tech
```

**Paste config này:**

```nginx
# Dropease Landing Page - dropease.tech
server {
    listen 80;
    server_name dropease.tech www.dropease.tech;

    # Logs riêng cho domain này
    access_log /var/log/nginx/dropease-access.log;
    error_log /var/log/nginx/dropease-error.log;

    location / {
        proxy_pass http://localhost:3001;  # ← PORT 3001
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Next.js static files
    location /_next/static {
        proxy_pass http://localhost:3001;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Public files
    location /static {
        proxy_pass http://localhost:3001;
        add_header Cache-Control "public, max-age=86400";
    }

    # Gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
}
```

**Enable site:**

```bash
# Link config
sudo ln -s /etc/nginx/sites-available/dropease.tech /etc/nginx/sites-enabled/

# Test Nginx config (QUAN TRỌNG - check không lỗi)
sudo nginx -t

# Nếu OK, reload Nginx (không restart để không ảnh hưởng apps khác)
sudo nginx -s reload

# hoặc
sudo systemctl reload nginx
```

---

### **BƯỚC 6: Point Domain dropease.tech**

**Vào Domain Registrar, thêm DNS records:**

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

**Test DNS:**

```bash
# Check DNS đã resolve chưa
nslookup dropease.tech
dig dropease.tech

# Test HTTP
curl http://dropease.tech
```

---

### **BƯỚC 7: Setup SSL cho dropease.tech**

```bash
# Install Certbot (nếu chưa có)
sudo apt install certbot python3-certbot-nginx -y

# Tạo SSL cho domain mới (không ảnh hưởng SSL của domains khác)
sudo certbot --nginx -d dropease.tech -d www.dropease.tech

# Test renewal
sudo certbot renew --dry-run
```

**Certbot sẽ:**
- Tự động update `/etc/nginx/sites-available/dropease.tech`
- Thêm SSL config
- Tạo redirect HTTP → HTTPS
- **KHÔNG ảnh hưởng** các domains/apps khác

---

## ✅ VERIFY DEPLOYMENT

```bash
# 1. Check PM2
pm2 list
pm2 logs dropease-landing

# 2. Check Nginx
sudo nginx -t
sudo systemctl status nginx

# 3. Check port
sudo lsof -i :3001

# 4. Check domain
curl https://dropease.tech

# 5. Check apps khác vẫn hoạt động
pm2 list
curl http://localhost:PORT_CUA_APP_KHAC
```

---

## 🔄 UPDATE APP (Không ảnh hưởng apps khác)

```bash
ssh username@server-ip

cd /var/www/dropease-landing

# Pull/upload code mới
# ... (git pull hoặc rsync)

# Install & build
npm install
npm run build

# Restart CHỈ app Dropease
pm2 restart dropease-landing

# Check logs
pm2 logs dropease-landing --lines 50
```

---

## 📊 MONITORING MULTI-APPS

```bash
# Xem tất cả apps
pm2 list

# Monitor resources
pm2 monit

# Logs từng app
pm2 logs dropease-landing
pm2 logs app-khac

# Server resources
htop
free -m
df -h
```

---

## 🐛 TROUBLESHOOTING

### **1. Port conflict:**

```bash
# Tìm process chiếm port 3001
sudo lsof -i :3001
sudo kill -9 PID

# Hoặc đổi PORT trong ecosystem.config.js
```

### **2. Nginx error (không ảnh hưởng apps khác):**

```bash
# Test config
sudo nginx -t

# Check logs của domain mới
sudo tail -f /var/log/nginx/dropease-error.log

# Nếu lỗi, disable site
sudo rm /etc/nginx/sites-enabled/dropease.tech
sudo nginx -s reload
```

### **3. PM2 app không start:**

```bash
pm2 logs dropease-landing
pm2 restart dropease-landing
pm2 delete dropease-landing
pm2 start ecosystem.config.js
```

### **4. Domain không load được:**

```bash
# Check DNS
nslookup dropease.tech

# Check Nginx listening
sudo netstat -tuln | grep :80
sudo netstat -tuln | grep :443

# Check PM2
pm2 list
curl http://localhost:3001
```

---

## 🔒 SECURITY CHECKLIST

```bash
# Firewall (nếu chưa có)
sudo ufw status
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable

# Check open ports
sudo netstat -tuln | grep LISTEN

# Fail2ban (optional)
sudo apt install fail2ban -y
```

---

## 📝 SUMMARY

| Item | Value |
|------|-------|
| **Domain** | dropease.tech |
| **Port** | 3001 (hoặc port free khác) |
| **PM2 App Name** | dropease-landing |
| **Nginx Config** | `/etc/nginx/sites-available/dropease.tech` |
| **App Path** | `/var/www/dropease-landing` |
| **Logs** | `pm2 logs dropease-landing` |

---

## 🎯 ADVANTAGES (Multi-Apps Setup)

✅ **Port riêng** → Không conflict  
✅ **Nginx config riêng** → Không ảnh hưởng apps khác  
✅ **PM2 app name unique** → Quản lý dễ dàng  
✅ **SSL riêng** → Mỗi domain có SSL riêng  
✅ **Logs riêng** → Debug dễ hơn  

---

## 📞 Quick Commands Reference

```bash
# Start app
pm2 start ecosystem.config.js

# Check status
pm2 list
pm2 logs dropease-landing

# Restart app
pm2 restart dropease-landing

# Stop app
pm2 stop dropease-landing

# Check Nginx
sudo nginx -t
sudo systemctl status nginx

# Reload Nginx (không downtime)
sudo nginx -s reload

# Test domain
curl https://dropease.tech
```

