# 🧪 Test Google Analytics Tracking

## ✅ GA4 đã được cấu hình
- **Measurement ID**: `G-Y1DDWQWY4F`
- **Environment**: `NEXT_PUBLIC_GA_ID=G-Y1DDWQWY4F`

## 🚀 Cách test tracking

### 1. Tạo file `.env.local`
Tạo file `.env.local` trong root directory:
```bash
NEXT_PUBLIC_GA_ID=G-Y1DDWQWY4F
```

### 2. Start development server
```bash
npm run dev
```

### 3. Mở website
- Truy cập: http://localhost:3000
- Mở Developer Tools (F12)

### 4. Test các events

#### ✅ Page View (Tự động)
- Load trang → GA sẽ track page view
- Check Network tab → tìm requests đến `google-analytics.com`

#### ✅ Navigation Clicks
- Click vào menu: "Features", "Pricing", "How It Works"
- Check Console → không có lỗi

#### ✅ Language Switch
- Click language switcher (🇻🇳/🇺🇸)
- Switch giữa Vietnamese và English

#### ✅ CTA Clicks
- Scroll xuống cuối trang
- Click button "Sẵn sàng biến đổi cửa hàng Shopify của bạn?"
- Click các pricing buttons: "Bắt đầu miễn phí", "Dùng thử Pro"

#### ✅ Feature Cards
- Click vào các feature cards có "Learn more"
- Sẽ redirect đến feature detail pages

### 5. Verify trong GA4

#### Real-time Reports
1. Vào [Google Analytics](https://analytics.google.com/)
2. Chọn property `dropease.tech`
3. Vào **Real-time** > **Overview**
4. Thực hiện actions trên website
5. Xem events xuất hiện real-time

#### Events Debug
1. Vào **Real-time** > **Events**
2. Xem các events:
   - `page_view`
   - `click` (navigation, CTA, features)
   - `language_switch`

### 6. Test với GA Debugger Extension

#### Cài đặt Extension
1. Cài [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)
2. Enable extension
3. Reload trang

#### Xem Debug Info
1. Mở Console (F12)
2. Tìm messages bắt đầu với `GA_DEBUG:`
3. Xem events được gửi đến GA

### 7. Expected Events

| Event Name | Trigger | Expected Count |
|------------|---------|----------------|
| `page_view` | Load trang | 1+ |
| `click` | Click nav/CTA/features | 5+ |
| `language_switch` | Switch ngôn ngữ | 2+ |
| `cta_click` | Click CTA buttons | 3+ |
| `feature_card` | Click feature cards | 2+ |

## 🔍 Troubleshooting

### GA không tracking
1. ✅ Kiểm tra `.env.local` có đúng `NEXT_PUBLIC_GA_ID=G-Y1DDWQWY4F`
2. ✅ Restart dev server sau khi thêm env
3. ✅ Check Console có lỗi không

### Events không hiển thị
1. ✅ Real-time data có thể delay 1-2 phút
2. ✅ Historical data cần 24-48h
3. ✅ Dùng GA Debugger để verify

### Console Errors
1. ✅ Check `window.gtag` có tồn tại không
2. ✅ Check network requests đến `googletagmanager.com`

## 📊 Next Steps

### Sau khi test thành công:
1. **Deploy lên server** với environment variable
2. **Monitor real-time** trong GA4
3. **Tạo custom reports** cho business metrics
4. **Set up goals** cho conversion tracking

### Production Deployment:
```bash
# Trên server
export NEXT_PUBLIC_GA_ID=G-Y1DDWQWY4F
npm run build
pm2 start ecosystem.config.js
```

---
**🎯 Mục tiêu**: Verify tất cả events được track chính xác trước khi deploy production!
