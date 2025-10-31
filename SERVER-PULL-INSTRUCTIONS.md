# 🚀 Hướng dẫn Pull Code về Server

## ✅ Code đã được push lên GitHub
- **Repository**: `https://github.com/Qcteam2002/Dropease-landingpage.git`
- **Commit**: `1b56205` - "Add Google Analytics tracking and fix feature pages"
- **Branch**: `main`

## 🔧 Commands để chạy trên server

### SSH vào server
```bash
ssh root@103.116.8.64
```

### Pull code mới
```bash
cd /var/www/dropease-landing
git pull origin main
```

### Install dependencies
```bash
npm install
```

### Set environment variables
```bash
echo 'NEXT_PUBLIC_GA_ID=G-Y1DDWQWY4F' > .env.local
echo 'NODE_ENV=production' >> .env.local
echo 'PORT=3002' >> .env.local
```

### Build production
```bash
npm run build
```

### Restart PM2
```bash
pm2 restart dropease-landing
```

### Check status
```bash
pm2 status
pm2 logs dropease-landing
```

## 🎯 One-liner command (copy paste)

```bash
ssh root@103.116.8.64 "cd /var/www/dropease-landing && git pull origin main && npm install && echo 'NEXT_PUBLIC_GA_ID=G-Y1DDWQWY4F' > .env.local && echo 'NODE_ENV=production' >> .env.local && echo 'PORT=3002' >> .env.local && npm run build && pm2 restart dropease-landing && pm2 status"
```

## 📊 Sau khi pull xong

1. **Test website**: https://dropease.tech
2. **Test feature pages**:
   - https://dropease.tech/features/audience-insight
   - https://dropease.tech/features/smart-content
   - https://dropease.tech/features/visual-intelligence
   - https://dropease.tech/features/ai-visibility

3. **Test GA tracking**:
   - Mở Developer Tools > Network tab
   - Tìm requests đến `google-analytics.com`
   - Check GA4 Real-time reports

## 🔍 Troubleshooting

### Nếu vẫn lỗi 500:
```bash
# Check PM2 logs
pm2 logs dropease-landing

# Check if all files exist
ls -la contexts/
ls -la hooks/
ls -la lib/

# Rebuild from scratch
rm -rf .next node_modules
npm install
npm run build
pm2 restart dropease-landing
```

### Nếu GA không tracking:
```bash
# Check environment variables
cat .env.local

# Check if GA script is loaded
curl -s https://dropease.tech | grep -i "google\|gtag"
```

---
**🎉 Sau khi pull xong, website sẽ có GA tracking và feature pages sẽ hoạt động bình thường!**
