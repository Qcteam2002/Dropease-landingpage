# ✅ Checklist Deploy dropease.tech (Server có nhiều apps)

Domain: **dropease.tech**  
Port: **3001** (hoặc port free khác)

---

## 🔍 BƯỚC 1: KIỂM TRA SERVER (5 phút)

### SSH vào server:
```bash
ssh your-username@your-server-ip
```

### ✅ Check 1: Port nào đang free?
```bash
# Xem tất cả ports đang dùng
sudo netstat -tuln | grep LISTEN

# hoặc
sudo lsof -i -P -n | grep LISTEN

# Check port 3001 cụ thể
sudo lsof -i :3001
```

**Nếu port 3001 FREE → OK, dùng 3001**  
**Nếu port 3001 BỊ CHIẾM → Chọn port khác (3002, 3003...) và update trong `ecosystem.config.js`**

---

### ✅ Check 2: PM2 apps hiện tại
```bash
pm2 list
```

**Ghi nhớ:** Tên apps đang chạy để tránh trùng tên

---

### ✅ Check 3: Nginx sites hiện tại
```bash
ls -la /etc/nginx/sites-enabled/
```

**OK nếu:** Không có file `dropease.tech` hoặc `dropease`

---

## 📤 BƯỚC 2: UPLOAD CODE (2 phút)

### Trên máy local:

```bash
cd ~/Documents/Dropease-LandingPage

# Build
npm run build

# Upload (THAY your-username và your-server-ip)
rsync -avz --exclude 'node_modules' --exclude '.git' --exclude '.next/cache' \
  . your-username@your-server-ip:/var/www/dropease-landing/
```

---

## ⚙️ BƯỚC 3: SETUP APP TRÊN SERVER (5 phút)

### SSH vào server:

```bash
ssh your-username@your-server-ip
cd /var/www/dropease-landing

# Install dependencies
npm install

# Build
npm run build

# Tạo thư mục logs
mkdir -p logs
```

---

## 🚀 BƯỚC 4: START APP VỚI PM2 (2 phút)

```bash
cd /var/www/dropease-landing

# Start với ecosystem config
pm2 start ecosystem.config.js

# Save PM2 list
pm2 save

# Check
pm2 list
pm2 logs dropease-landing
```

### ✅ Test app đang chạy:
```bash
curl http://localhost:3001
```

**Phải thấy HTML của Next.js app**

---

## 🌐 BƯỚC 5: CONFIG NGINX (5 phút)

### Copy nginx config lên server:

**Option A: Copy file có sẵn**
```bash
# Trên máy local
scp nginx.conf your-username@your-server-ip:/tmp/

# Trên server
sudo cp /tmp/nginx.conf /etc/nginx/sites-available/dropease.tech
```

**Option B: Tạo thủ công**
```bash
sudo nano /etc/nginx/sites-available/dropease.tech
```

Paste content từ file `nginx.conf` (đã có sẵn trong project)

---

### Enable site:
```bash
# Link
sudo ln -s /etc/nginx/sites-available/dropease.tech /etc/nginx/sites-enabled/

# Test config (QUAN TRỌNG!)
sudo nginx -t
```

**Phải thấy:** `syntax is okay` và `test is successful`

---

### Reload Nginx (KHÔNG restart để giữ apps khác):
```bash
sudo nginx -s reload
```

---

## 🔗 BƯỚC 6: POINT DOMAIN (5 phút)

### Vào Domain Registrar (GoDaddy, Namecheap, etc.)

**Thêm 2 DNS Records:**

```
Record 1:
Type: A
Name: @
Value: YOUR_SERVER_IP
TTL: 3600

Record 2:
Type: A
Name: www
Value: YOUR_SERVER_IP
TTL: 3600
```

---

### ✅ Test DNS (chờ 5-30 phút):
```bash
# Check DNS đã resolve
nslookup dropease.tech

# hoặc
dig dropease.tech
```

---

### ✅ Test HTTP:
```bash
curl http://dropease.tech
```

**Phải thấy HTML của Next.js app**

---

## 🔒 BƯỚC 7: SETUP SSL (2 phút)

```bash
# Install Certbot (nếu chưa có)
sudo apt install certbot python3-certbot-nginx -y

# Tạo SSL cho dropease.tech (KHÔNG ảnh hưởng domains khác)
sudo certbot --nginx -d dropease.tech -d www.dropease.tech
```

**Certbot sẽ:**
- ✅ Tạo SSL certificate
- ✅ Update Nginx config tự động
- ✅ Setup redirect HTTP → HTTPS
- ✅ Setup auto-renewal

---

## ✅ BƯỚC 8: VERIFY (2 phút)

### 1. Check PM2:
```bash
pm2 list
pm2 logs dropease-landing --lines 50
```

### 2. Check Nginx:
```bash
sudo nginx -t
sudo systemctl status nginx
```

### 3. Check app đang chạy:
```bash
curl http://localhost:3001
```

### 4. Check HTTPS:
```bash
curl https://dropease.tech
```

### 5. Check browser:
```
https://dropease.tech
```

### 6. Check apps khác vẫn OK:
```bash
pm2 list
# Tất cả apps khác phải vẫn running
```

---

## 🎉 HOÀN TẤT!

Nếu tất cả OK:
- ✅ dropease.tech đã live
- ✅ HTTPS đã hoạt động
- ✅ Apps khác không bị ảnh hưởng
- ✅ PM2 tự động restart nếu crash

---

## 📊 USEFUL COMMANDS

```bash
# Check PM2
pm2 list
pm2 logs dropease-landing
pm2 restart dropease-landing

# Check Nginx
sudo nginx -t
sudo systemctl status nginx
sudo tail -f /var/log/nginx/dropease-error.log

# Check port
sudo lsof -i :3001

# Check domain
curl https://dropease.tech

# Monitor resources
pm2 monit
htop
```

---

## 🔄 UPDATE APP (Lần sau)

**Option 1: Dùng script tự động**

Chỉnh `QUICK-DEPLOY-dropease.tech.sh` (dòng 12-15):
```bash
SERVER_USER="your-username"
SERVER_IP="your-server-ip"
```

Chạy:
```bash
./QUICK-DEPLOY-dropease.tech.sh
```

**Option 2: Manual**
```bash
# Trên local: build & upload
npm run build
rsync -avz --exclude 'node_modules' . username@server:/var/www/dropease-landing/

# Trên server: install & restart
ssh username@server
cd /var/www/dropease-landing
npm install
npm run build
pm2 restart dropease-landing
```

---

## 🐛 TROUBLESHOOTING

| Vấn đề | Solution |
|--------|----------|
| Port 3001 bị chiếm | `sudo lsof -i :3001` → Đổi port trong `ecosystem.config.js` |
| PM2 không start | `pm2 logs dropease-landing` → Check lỗi |
| Nginx test failed | `sudo nginx -t` → Fix syntax error |
| Domain không load | Check DNS: `nslookup dropease.tech` |
| SSL không work | `sudo certbot certificates` → Re-run certbot |
| Apps khác bị lỗi | `pm2 list` → Restart app bị lỗi |

---

## 📞 SUPPORT FILES

- **Hướng dẫn đầy đủ:** `DEPLOY-MULTI-APPS.md`
- **Quick deploy script:** `QUICK-DEPLOY-dropease.tech.sh`
- **Nginx config:** `nginx.conf`
- **PM2 config:** `ecosystem.config.js`

---

## ✨ SUMMARY

| Item | Value |
|------|-------|
| **Domain** | dropease.tech |
| **Port** | 3001 |
| **PM2 Name** | dropease-landing |
| **Path** | /var/www/dropease-landing |
| **Nginx Config** | /etc/nginx/sites-available/dropease.tech |
| **Logs** | `pm2 logs dropease-landing` |

**Apps khác:** Không bị ảnh hưởng (port riêng, config riêng, logs riêng)

