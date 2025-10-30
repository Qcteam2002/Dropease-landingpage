# 🚀 Google Analytics Quick Setup

## ✅ Đã hoàn thành
- ✅ Tích hợp GA4 tracking vào toàn bộ landing page
- ✅ Track page views tự động
- ✅ Track navigation clicks
- ✅ Track CTA button clicks
- ✅ Track feature card clicks
- ✅ Track language switches
- ✅ Build thành công

## 🎯 Cần làm để bắt đầu tracking

### 1. Tạo Google Analytics 4 Property
1. Vào [Google Analytics](https://analytics.google.com/)
2. Tạo property mới cho `dropease.tech`
3. Copy Measurement ID (G-XXXXXXXXXX)

### 2. Cấu hình Environment Variable
Tạo file `.env.local`:
```bash
NEXT_PUBLIC_GA_ID=G-YOUR_MEASUREMENT_ID_HERE
```

### 3. Deploy
```bash
npm run build
# Deploy lên server với environment variable
```

## 📊 Events được tracking

| Event | Mô tả | Location |
|-------|-------|----------|
| `page_view` | Tự động khi load trang | Tất cả pages |
| `nav_link` | Click navigation menu | Navbar |
| `language_switch` | Chuyển ngôn ngữ | Navbar |
| `cta_click` | Click CTA buttons | CTA, Pricing |
| `feature_card` | Click feature cards | Features section |
| `feature_view` | View feature pages | Feature pages |
| `compare_plans` | Click compare plans | Pricing section |

## 🔍 Test Tracking
1. Mở website
2. F12 > Network tab
3. Tìm requests đến `google-analytics.com`
4. Hoặc dùng [GA Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)

## 📈 Xem Reports
- **Real-time**: [analytics.google.com](https://analytics.google.com/) > Real-time
- **Events**: Engagement > Events
- **Pages**: Engagement > Pages and screens

---
**Lưu ý**: GA4 cần 24-48h để hiển thị historical data, nhưng real-time data có ngay!
