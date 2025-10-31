# ✅ Checklist Deploy llms.txt cho Dropease

## 📦 Files Đã Tạo

- ✅ `public/llms.txt` - File chính cho AI models
- ✅ `public/robots.txt` - Chỉ dẫn cho crawlers (bao gồm AI-crawlers)
- ✅ `public/sitemap.xml` - Sitemap cho SEO
- ✅ `LLMS-TXT-GUIDE.md` - Hướng dẫn chi tiết
- ✅ `LLMS-TXT-CHECKLIST.md` - Checklist này

## 🔍 Kiểm Tra Local (Development)

### Bước 1: Build và chạy local
```bash
cd /Users/vophuong/Documents/Dropease-LandingPage

# Cài đặt dependencies (nếu cần)
npm install

# Chạy development server
npm run dev
```

### Bước 2: Test các URLs

Mở browser và kiểm tra các URLs sau:

- [ ] http://localhost:3000/llms.txt
- [ ] http://localhost:3000/robots.txt
- [ ] http://localhost:3000/sitemap.xml

### Bước 3: Verify nội dung

**llms.txt nên hiển thị:**
- Header: "# Dropease - AI Product Intelligence for Shopify"
- Tagline: "Từ Insight đến Tác động — Cấu hình một lần, Tối ưu mọi nơi"
- Tất cả sections: Giới thiệu, Tính năng, Pricing, v.v.

**robots.txt nên có:**
```
AI-crawlers: /llms.txt
LLMs-txt: https://dropease.tech/llms.txt
```

## 🚀 Deploy lên Production

### Option 1: Sử dụng script có sẵn

```bash
# Sử dụng script deploy hiện tại
./deploy.sh

# Hoặc sử dụng script GA
./DEPLOY-WITH-GA.sh
```

### Option 2: Manual build và deploy

```bash
# Build production
npm run build

# Test production build locally
npm run start

# Deploy lên server
# (Tùy theo cấu hình server của bạn)
```

### Option 3: Deploy với PM2

```bash
# Build
npm run build

# Deploy với PM2
pm2 restart ecosystem.config.js
```

## ✅ Verify Production

### Test URLs Production

Sau khi deploy, kiểm tra:

- [ ] https://dropease.tech/llms.txt
- [ ] https://dropease.tech/robots.txt
- [ ] https://dropease.tech/sitemap.xml

### Test bằng curl

```bash
# Test llms.txt
curl https://dropease.tech/llms.txt

# Test robots.txt
curl https://dropease.tech/robots.txt

# Test sitemap.xml
curl https://dropease.tech/sitemap.xml
```

### Test bằng Browser

1. Mở https://dropease.tech/llms.txt
2. Kiểm tra content hiển thị đúng
3. Verify không có lỗi 404 hoặc 500

## 🤖 Test với AI Models

### Test với ChatGPT

1. Mở ChatGPT
2. Hỏi: "What is Dropease? Check their llms.txt file at dropease.tech"
3. Xem AI có trích dẫn thông tin từ llms.txt không

### Test với Google Gemini

1. Mở Google Gemini
2. Hỏi tương tự
3. Verify kết quả

### Test với Claude

1. Mở Claude
2. Hỏi về Dropease
3. Kiểm tra phản hồi

## 📊 Monitor & Analytics

### Google Search Console

1. Đăng nhập Google Search Console
2. Submit sitemap: https://dropease.tech/sitemap.xml
3. Monitor indexing status

### Google Analytics

1. Kiểm tra traffic tới `/llms.txt`
2. Xem user agents (identify AI crawlers)
3. Track pageviews

### Server Logs

```bash
# Monitor access logs
tail -f /var/log/nginx/access.log | grep llms.txt

# Hoặc với Apache
tail -f /var/log/apache2/access.log | grep llms.txt
```

## 🔄 Cập Nhật Định Kỳ

### Hàng tháng:
- [ ] Review và update thống kê trong llms.txt
- [ ] Thêm testimonials mới (nếu có)
- [ ] Update "Last Updated" date

### Khi có thay đổi lớn:
- [ ] Cập nhật tính năng mới
- [ ] Thay đổi pricing
- [ ] Update URLs nếu có thay đổi
- [ ] Thêm use cases mới

### Sau mỗi release:
- [ ] Sync nội dung với website chính
- [ ] Update version number
- [ ] Test lại tất cả URLs

## 🛠️ Troubleshooting

### Lỗi: 404 Not Found

**Nguyên nhân:**
- File không có trong thư mục `public/`
- Build chưa hoàn tất
- Server chưa restart

**Giải pháp:**
```bash
# Verify file tồn tại
ls -la public/llms.txt

# Rebuild
npm run build

# Restart server
pm2 restart ecosystem.config.js
```

### Lỗi: Nội dung không cập nhật

**Nguyên nhân:**
- Browser cache
- CDN cache (nếu có)
- Server cache

**Giải pháp:**
```bash
# Clear browser cache: Ctrl/Cmd + Shift + R

# Clear CDN cache (Cloudflare example)
# Vào Cloudflare Dashboard > Caching > Purge Cache

# Verify bằng curl với no-cache
curl -H "Cache-Control: no-cache" https://dropease.tech/llms.txt
```

### Lỗi: AI không đọc được

**Nguyên nhân:**
- Format không đúng
- Nội dung quá dài
- Missing metadata

**Giải pháp:**
1. Kiểm tra Markdown syntax
2. Validate với Markdown linter
3. Giảm độ dài nếu cần
4. Thêm clear structure

## 📝 Next Steps

### Immediate (Ngay sau deploy):
1. [ ] Test tất cả URLs production
2. [ ] Verify trong Google Search Console
3. [ ] Submit sitemap
4. [ ] Test với 1-2 AI models

### Short-term (1-2 tuần):
1. [ ] Monitor analytics
2. [ ] Track AI crawler visits
3. [ ] Collect feedback
4. [ ] Update nội dung nếu cần

### Long-term (Hàng tháng):
1. [ ] Review performance metrics
2. [ ] Update testimonials
3. [ ] Add new use cases
4. [ ] Optimize content dựa trên feedback

## 📞 Support

Nếu gặp vấn đề:
1. Xem file `LLMS-TXT-GUIDE.md` để biết chi tiết
2. Kiểm tra logs: `tail -f logs/error.log`
3. Email: contact@dropease.ai

## 🎉 Success Criteria

File llms.txt thành công khi:

- ✅ Accessible tại https://dropease.tech/llms.txt
- ✅ robots.txt chỉ đúng tới llms.txt
- ✅ AI models có thể đọc và hiểu nội dung
- ✅ Content được update định kỳ
- ✅ Analytics tracking hoạt động
- ✅ No 404/500 errors

---

**Created:** October 30, 2025  
**Version:** 1.0  
**Status:** Ready for Production ✅

