# 📄 Hướng Dẫn File llms.txt cho Dropease

## 🎯 Mục đích

File `llms.txt` giúp các mô hình AI (ChatGPT, Google Gemini, Claude, v.v.) hiểu và sử dụng thông tin từ website Dropease một cách chính xác và hiệu quả hơn.

## 📍 Vị trí File

```
/Users/vophuong/Documents/Dropease-LandingPage/
└── public/
    ├── llms.txt      ✅ File song ngữ (Việt + Anh)
    ├── llms-vi.txt   ✅ Version tiếng Việt
    ├── llms-en.txt   ✅ Version tiếng Anh
    ├── robots.txt    ✅ Chỉ dẫn cho crawlers
    └── sitemap.xml   ✅ SEO sitemap
```

## 🌐 URL Truy Cập

Sau khi deploy, các file có thể truy cập tại:

### Production:
- **Bilingual (Song ngữ):** https://dropease.tech/llms.txt
- **Vietnamese only:** https://dropease.tech/llms-vi.txt
- **English only:** https://dropease.tech/llms-en.txt

### Development:
- **Bilingual:** http://localhost:3000/llms.txt
- **Vietnamese:** http://localhost:3000/llms-vi.txt
- **English:** http://localhost:3000/llms-en.txt

## ✅ Cách Kiểm Tra

### 1. Kiểm tra Local (Development)

```bash
# Chạy development server
npm run dev

# Mở browser và truy cập:
# http://localhost:3000/llms.txt
```

### 2. Kiểm tra Production

```bash
# Sau khi deploy, kiểm tra bằng curl:
curl https://dropease.tech/llms.txt

# Hoặc mở trực tiếp trong browser:
# https://dropease.tech/llms.txt
```

### 3. Kiểm tra robots.txt

```bash
# Kiểm tra robots.txt có chỉ đến llms.txt không:
curl https://dropease.tech/robots.txt

# Nên thấy dòng:
# AI-crawlers: /llms.txt
# LLMs-txt: https://dropease.tech/llms.txt
```

## 📋 Nội Dung File llms.txt

File bao gồm các phần chính:

### 1. **Header - Giới thiệu tổng quan**
- Tên sản phẩm: Dropease
- Tagline: "Từ Insight đến Tác động — Cấu hình một lần, Tối ưu mọi nơi"
- Mô tả ngắn gọn về giá trị cốt lõi

### 2. **Thông tin liên hệ**
- Website: https://dropease.tech
- Email: contact@dropease.ai

### 3. **Sản phẩm & Tính năng**
- Audience Insight Discovery
- Smart Content Generation
- Visual Intelligence
- AI Visibility Optimization
- One-Click Shopify Sync
- Brand Consistency at Scale

### 4. **Cách hoạt động**
4 bước đơn giản: Connect → Discover → Generate → Push

### 5. **Customer Personas**
3 nhóm khách hàng mẫu với pain points và buying motivation

### 6. **Pricing**
Free, Pro ($49/mo), Enterprise (Custom)

### 7. **Pain Points & Solutions**
5 vấn đề chính mà Dropease giải quyết

### 8. **Use Cases**
Chủ cửa hàng nhỏ, Marketer, Dropshipper/Agency

### 9. **Testimonials**
Đánh giá từ người dùng thực tế

### 10. **Liên kết quan trọng**
Tất cả các URL chính của website

## 🎨 Định Dạng

File sử dụng **Markdown** format vì:
- ✅ AI models dễ đọc và hiểu
- ✅ Có cấu trúc rõ ràng (headers, lists, links)
- ✅ Dễ dàng cập nhật và maintain
- ✅ Human-readable (con người cũng đọc được)

## 🔄 Cách Cập Nhật

### Khi nào cần cập nhật?

1. **Thêm tính năng mới** → Cập nhật section "Sản phẩm & Tính năng chính"
2. **Thay đổi pricing** → Cập nhật section "Giá cả (Pricing)"
3. **Thêm testimonials mới** → Cập nhật section "Testimonials"
4. **Thay đổi URL** → Cập nhật tất cả links liên quan
5. **Cập nhật số liệu** → Thay đổi section "Thống kê quan trọng"

### Cách cập nhật:

```bash
# 1. Mở file
code /Users/vophuong/Documents/Dropease-LandingPage/public/llms.txt

# 2. Chỉnh sửa nội dung (giữ nguyên format Markdown)

# 3. Save file

# 4. Commit changes (optional)
git add public/llms.txt
git commit -m "Update llms.txt content"

# 5. Deploy
npm run build
# hoặc
./deploy.sh
```

## 🚀 Lợi Ích

### 1. **Tăng AI Visibility**
- Sản phẩm được AI "hiểu" rõ hơn
- Tăng cơ hội được AI đề xuất cho người dùng

### 2. **Kiểm soát Thông điệp**
- Bạn quyết định AI học thông tin gì
- Đảm bảo thông tin chính xác

### 3. **Tối ưu cho GEO (Generative Engine Optimization)**
- Tối ưu cho công cụ tìm kiếm thế hệ mới
- Nội dung xuất hiện trong AI responses

### 4. **Tăng độ tin cậy**
- AI trích dẫn nguồn từ llms.txt
- Thông tin có cấu trúc, chuyên nghiệp

## 📊 Tracking & Analytics

### Cách theo dõi hiệu quả:

1. **Google Analytics**
   - Track pageviews của `/llms.txt`
   - Xem traffic từ AI crawlers

2. **Server Logs**
   - Monitor access logs cho `/llms.txt`
   - Identify AI user agents (GPTBot, Claude-Web, Google-Extended)

3. **Search Console**
   - Theo dõi indexing status
   - Xem crawl stats

## 🔐 Bảo mật

File `llms.txt` là **PUBLIC** và **nên để public** vì:
- Mục đích là cho AI crawlers đọc
- Không chứa thông tin nhạy cảm
- Chỉ chứa thông tin marketing công khai

**❌ KHÔNG đặt trong llms.txt:**
- API keys
- Database credentials
- Private business data
- Thông tin khách hàng cá nhân

## 📚 Tài Liệu Tham Khảo

- **llms.txt Spec:** https://llmstxt.org/
- **AI Visibility Guide:** Xem `FEATURE-AI-VISIBILITY.md`
- **Content Guidelines:** Xem `CONTENT-QUICK-REF.md`
- **Tone of Voice:** Xem `TONE-VOICE-GUIDE.md`

## 🛠️ Troubleshooting

### Vấn đề: File không truy cập được

**Giải pháp:**
1. Kiểm tra file có trong `public/` folder không
2. Chạy `npm run build` và restart server
3. Clear browser cache và thử lại

### Vấn đề: AI không hiểu nội dung

**Giải pháp:**
1. Đảm bảo format Markdown đúng
2. Sử dụng ngôn ngữ rõ ràng, không mơ hồ
3. Thêm nhiều context và examples
4. Cập nhật section "Liên kết quan trọng"

### Vấn đề: Nội dung bị lỗi thời

**Giải pháp:**
1. Set reminder cập nhật hàng tháng
2. Sync với content trên website
3. Update "Last Updated" date

## ✨ Best Practices

1. **Giữ nội dung ngắn gọn** - AI models có giới hạn context
2. **Sử dụng bullet points** - Dễ đọc và parse
3. **Thêm URLs đầy đủ** - Giúp AI reference chính xác
4. **Update thường xuyên** - Đảm bảo thông tin mới nhất
5. **Test với AI models** - Hỏi ChatGPT về Dropease để kiểm tra
6. **Giữ format nhất quán** - Dễ maintain và update
7. **Thêm metadata** - Version, Last Updated, Language Support

## 📞 Support

Nếu có câu hỏi hoặc cần hỗ trợ:
- Email: contact@dropease.ai
- Documentation: Xem các file `*.md` trong project

---

**Created:** October 2025  
**Last Updated:** October 2025  
**Version:** 1.0

