# 📚 Hướng dẫn Deploy - Dropease Landing Page

**Domain:** dropease.tech  
**Server:** Ubuntu (có nhiều apps khác đang chạy)  
**Port:** 3001 (riêng cho Dropease, không conflict)

---

## 📁 Files Hướng Dẫn

| File | Mô tả | Dùng khi nào |
|------|-------|--------------|
| **`CHECKLIST-dropease.tech.md`** | ✅ Checklist từng bước | **BẮT ĐẦU TỪ ĐÂY** - Follow từng bước |
| **`DEPLOY-MULTI-APPS.md`** | 📖 Hướng dẫn chi tiết đầy đủ | Đọc để hiểu rõ từng bước |
| **`QUICK-DEPLOY-dropease.tech.sh`** | 🚀 Script deploy tự động | Dùng sau lần đầu, khi cần update code |
| **`nginx.conf`** | ⚙️ Nginx config template | Copy vào server |
| **`ecosystem.config.js`** | ⚙️ PM2 config | Đã có sẵn trong project |

---

## 🎯 Quick Start (Lần đầu deploy)

### 1️⃣ Follow Checklist
```bash
# Mở file này và làm từng bước
cat CHECKLIST-dropease.tech.md
```

### 2️⃣ Hoặc xem video hướng dẫn bên dưới

---

## ⚡ HƯỚNG DẪN NHANH (30 phút)

### **Bước 1: Check Server (5 phút)**

SSH vào server:
```bash
ssh your-username@your-server-ip
```

Check port free:
```bash
sudo lsof -i :3001
# Nếu FREE → OK, dùng 3001
# Nếu BUSY → Đổi port trong ecosystem.config.js
```

---

### **Bước 2: Upload Code (2 phút)**

Trên máy local:
```bash
cd ~/Documents/Dropease-LandingPage
npm run build

# Upload (thay username và server-ip)
rsync -avz --exclude 'node_modules' --exclude '.git' \
  . username@server-ip:/var/www/dropease-landing/
```

---

### **Bước 3: Setup trên Server (5 phút)**

```bash
ssh username@server-ip
cd /var/www/dropease-landing

npm install
npm run build
mkdir -p logs

# Start PM2
pm2 start ecosystem.config.js
pm2 save
```

Test:
```bash
curl http://localhost:3001
```

---

### **Bước 4: Config Nginx (5 phút)**

Copy config:
```bash
# Upload từ local
scp nginx.conf username@server-ip:/tmp/

# Trên server
sudo cp /tmp/nginx.conf /etc/nginx/sites-available/dropease.tech
sudo ln -s /etc/nginx/sites-available/dropease.tech /etc/nginx/sites-enabled/
sudo nginx -t
sudo nginx -s reload
```

---

### **Bước 5: Point Domain (5 phút)**

Vào Domain Registrar, thêm DNS:
```
A Record: @ → YOUR_SERVER_IP
A Record: www → YOUR_SERVER_IP
```

Chờ 5-30 phút, test:
```bash
nslookup dropease.tech
curl http://dropease.tech
```

---

### **Bước 6: Setup SSL (2 phút)**

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d dropease.tech -d www.dropease.tech
```

---

### ✅ DONE! Truy cập:
```
https://dropease.tech
```

---

## 🔄 Update App (Lần sau)

### Option 1: Dùng Script Tự Động

**Chỉnh `QUICK-DEPLOY-dropease.tech.sh`:**
```bash
# Line 12-15
SERVER_USER="your-username"
SERVER_IP="your-server-ip"
```

**Chạy:**
```bash
./QUICK-DEPLOY-dropease.tech.sh
```

---

### Option 2: Manual

```bash
# Local
npm run build
rsync -avz --exclude 'node_modules' . user@server:/var/www/dropease-landing/

# Server
ssh user@server
cd /var/www/dropease-landing
npm install
npm run build
pm2 restart dropease-landing
```

---

## 🔧 Configuration Files

### **ecosystem.config.js** (PM2)
- **Port:** 3001 (đổi nếu conflict)
- **App Name:** dropease-landing
- **Logs:** `./logs/error.log`, `./logs/out.log`

### **nginx.conf** (Nginx)
- **Server Name:** dropease.tech, www.dropease.tech
- **Proxy:** localhost:3001
- **Logs:** `/var/log/nginx/dropease-*.log`

---

## 📊 Monitoring

```bash
# PM2
pm2 list
pm2 logs dropease-landing
pm2 monit

# Nginx
sudo systemctl status nginx
sudo tail -f /var/log/nginx/dropease-error.log

# Server
htop
df -h
free -m
```

---

## 🐛 Troubleshooting

| Problem | Command | Fix |
|---------|---------|-----|
| Port conflict | `sudo lsof -i :3001` | Đổi port trong `ecosystem.config.js` |
| PM2 not running | `pm2 logs dropease-landing` | Check logs → restart |
| Nginx error | `sudo nginx -t` | Fix syntax → reload |
| Domain not working | `nslookup dropease.tech` | Check DNS → wait |
| SSL error | `sudo certbot certificates` | Re-run certbot |

**Check apps khác:**
```bash
pm2 list  # Tất cả apps phải running
```

---

## 🔒 Security Checklist

```bash
# Firewall
sudo ufw status
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH

# Check open ports
sudo netstat -tuln | grep LISTEN

# SSL auto-renewal
sudo certbot renew --dry-run
```

---

## 📞 Need Help?

1. **Checklist:** `CHECKLIST-dropease.tech.md`
2. **Chi tiết:** `DEPLOY-MULTI-APPS.md`
3. **Config files:** `nginx.conf`, `ecosystem.config.js`

---

## ✅ Advantages (Multi-Apps Setup)

✅ **Port riêng (3001)** → Không conflict với apps khác  
✅ **Nginx config riêng** → Không ảnh hưởng configs khác  
✅ **PM2 app name unique** → Quản lý độc lập  
✅ **SSL riêng** → Mỗi domain có certificate riêng  
✅ **Logs riêng** → Debug dễ dàng  
✅ **Update độc lập** → Restart không ảnh hưởng apps khác

---

## 📝 Summary

```
Domain:     dropease.tech
Port:       3001
PM2:        dropease-landing
Path:       /var/www/dropease-landing
Nginx:      /etc/nginx/sites-available/dropease.tech
Logs:       pm2 logs dropease-landing
SSL:        Auto (Certbot)
```

**Status:**
```bash
pm2 list | grep dropease-landing
curl https://dropease.tech
```

---

## 🎉 Success Checklist

- [ ] Server setup done
- [ ] Code uploaded
- [ ] PM2 running
- [ ] Nginx configured
- [ ] DNS pointed
- [ ] SSL enabled
- [ ] Site accessible: https://dropease.tech
- [ ] Apps khác vẫn running
- [ ] No conflicts

---

**Deploy thành công? 🎊**

Test ngay:
```
https://dropease.tech
```

