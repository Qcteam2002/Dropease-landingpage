# ⚡ Quick Start - Deploy trong 10 phút

## ✅ Checklist trước khi deploy:
- [ ] Ubuntu server đã setup
- [ ] Domain đã trỏ về server IP
- [ ] SSH access vào server

---

## 🚀 DEPLOY NHANH (3 Bước)

### **1️⃣ Setup Server (Chạy 1 lần đầu)**

SSH vào server và chạy lệnh này:

```bash
# Update & Install dependencies
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs nginx
sudo npm install -g pm2

# Tạo thư mục app
sudo mkdir -p /var/www/dropease-landing
sudo chown -R $USER:$USER /var/www/dropease-landing
```

---

### **2️⃣ Upload Code**

**Trên máy local:**

```bash
cd /Users/vophuong/Documents/Dropease-LandingPage

# Build production
npm run build

# Upload (thay your-username và your-server-ip)
rsync -avz --exclude 'node_modules' --exclude '.git' . username@server-ip:/var/www/dropease-landing/
```

---

### **3️⃣ Start App & Config Nginx**

**SSH vào server:**

```bash
cd /var/www/dropease-landing

# Install & build
npm install
npm run build

# Start với PM2
pm2 start npm --name "dropease-landing" -- start
pm2 save
pm2 startup
```

**Config Nginx:**

```bash
# Tạo config (thay your-domain.com)
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
    }
}
```

**Enable & restart:**
```bash
sudo ln -s /etc/nginx/sites-available/dropease /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

### **🔒 Bonus: Setup SSL (HTTPS)**

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Tạo SSL (tự động)
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

---

## ✅ XONG! Truy cập domain của bạn

```
https://your-domain.com
```

---

## 🔄 UPDATE APP (Lần sau)

**Option 1: Manual**
```bash
ssh username@server-ip
cd /var/www/dropease-landing
git pull  # hoặc rsync code mới
npm install
npm run build
pm2 restart dropease-landing
```

**Option 2: Auto Deploy Script**

Chỉnh file `deploy.sh`:
```bash
# Line 13-15: Thay thông tin server
SERVER_USER="your-username"
SERVER_IP="your-server-ip"
```

Sau đó chạy:
```bash
./deploy.sh
```

---

## 🐛 Troubleshooting

**App không chạy:**
```bash
pm2 logs dropease-landing
pm2 restart dropease-landing
```

**Nginx error:**
```bash
sudo nginx -t
sudo systemctl status nginx
```

**Check logs:**
```bash
pm2 logs
sudo tail -f /var/log/nginx/error.log
```

---

## 📞 Need Help?

Đọc hướng dẫn chi tiết: `DEPLOYMENT.md`

