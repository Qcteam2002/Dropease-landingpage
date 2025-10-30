# Google Analytics Setup Guide

## 🎯 Tổng quan
Landing page đã được tích hợp Google Analytics 4 (GA4) để tracking toàn bộ user interactions và page views.

## 📊 Events được tracking

### 1. Page Views
- Tự động track khi user navigate giữa các trang
- Track cả desktop và mobile

### 2. Navigation Events
- **nav_link**: Click vào navigation menu (desktop)
- **nav_link_mobile**: Click vào navigation menu (mobile)
- **language_switch**: Chuyển đổi ngôn ngữ (vi/en)

### 3. CTA Events
- **cta_click**: Click vào các CTA buttons
  - `main_cta`: CTA chính ở cuối trang
  - `pricing_free`: CTA Free plan
  - `pricing_pro`: CTA Pro plan
  - `pricing_enterprise`: CTA Enterprise plan

### 4. Feature Events
- **feature_card**: Click vào feature cards
- **feature_view**: View feature detail pages
- **compare_plans**: Click "Compare Plans" link

### 5. Form Events
- **form_submit**: Submit forms (nếu có)

## 🚀 Setup Instructions

### Bước 1: Tạo Google Analytics 4 Property
1. Truy cập [Google Analytics](https://analytics.google.com/)
2. Tạo property mới cho `dropease.tech`
3. Chọn "Web" platform
4. Copy Measurement ID (format: G-XXXXXXXXXX)

### Bước 2: Cấu hình Environment Variables
Tạo file `.env.local` trong root directory:

```bash
# Google Analytics Configuration
NEXT_PUBLIC_GA_ID=G-YOUR_MEASUREMENT_ID_HERE
```

**Ví dụ:**
```bash
NEXT_PUBLIC_GA_ID=G-ABC123DEF4
```

### Bước 3: Deploy với GA
1. Build và deploy app với environment variable
2. GA sẽ tự động bắt đầu tracking

### Bước 4: Verify Tracking
1. Mở website trên browser
2. Mở Developer Tools > Network tab
3. Tìm requests đến `google-analytics.com` hoặc `googletagmanager.com`
4. Hoặc dùng [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna) extension

## 📈 Custom Events trong GA4

### Event Structure
```javascript
{
  event_name: 'cta_click',
  event_category: 'conversion',
  event_label: 'Get Started - main_cta',
  value: 1
}
```

### Event Categories
- **engagement**: User interactions (clicks, scrolls, navigation)
- **conversion**: CTA clicks, form submissions
- **feature**: Feature-related actions

## 🔧 Customization

### Thêm Event Tracking mới
```javascript
import { useAnalytics } from '@/hooks/useAnalytics'

const { trackEvent, trackClick } = useAnalytics()

// Custom event
trackEvent('custom_action', 'custom_category', 'custom_label', 1)

// Click tracking
trackClick('button_name', 'section_name')
```

### Track Scroll Events
```javascript
const { trackScroll } = useAnalytics()

// Track scroll percentage
trackScroll('hero_section', 50) // 50% scrolled
```

## 📊 GA4 Reports

### Real-time Reports
- **Events**: Xem events real-time
- **Pages and screens**: Xem page views real-time

### Standard Reports
- **Engagement > Events**: Tất cả custom events
- **Engagement > Pages and screens**: Page views
- **Acquisition > Traffic acquisition**: Traffic sources

### Custom Reports
Tạo custom reports để analyze:
- CTA conversion rates
- Feature engagement
- Language preferences
- User journey flow

## 🎯 Key Metrics để theo dõi

1. **Page Views**: Tổng số page views
2. **CTA Conversion**: Tỷ lệ click CTA buttons
3. **Feature Engagement**: Feature nào được click nhiều nhất
4. **Language Usage**: Tỷ lệ sử dụng tiếng Việt vs English
5. **User Journey**: Flow từ homepage đến conversion

## 🚨 Troubleshooting

### GA không tracking
1. Kiểm tra `NEXT_PUBLIC_GA_ID` trong `.env.local`
2. Kiểm tra console errors
3. Verify GA4 property setup

### Events không hiển thị
1. Có thể mất 24-48h để events hiển thị trong GA4
2. Dùng Real-time reports để test ngay
3. Kiểm tra event names và parameters

### Development vs Production
- GA chỉ hoạt động khi `NEXT_PUBLIC_GA_ID` được set
- Development: Có thể dùng test GA property
- Production: Dùng chính thức GA property

## 📝 Notes

- GA4 có thể mất vài phút để bắt đầu tracking
- Real-time data có thể delay 1-2 phút
- Historical data cần 24-48h để process
- Test tracking trước khi deploy production
