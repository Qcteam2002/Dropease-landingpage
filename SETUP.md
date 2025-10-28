# 🚀 Hướng dẫn Setup Dropease Landing Page

## Bước 1: Cài đặt Dependencies

```bash
cd /Users/vophuong/Documents/Dropease-LandingPage
npm install
```

Hoặc nếu bạn dùng yarn:

```bash
yarn install
```

## Bước 2: Chạy Development Server

```bash
npm run dev
```

Mở trình duyệt và truy cập: **http://localhost:3000**

## Bước 3: Khám phá Landing Page

Landing page bao gồm các sections sau:

### 1. **Hero Section**
- Tagline: "Từ Insight đến Tác động — Cấu hình một lần, Tối ưu mọi nơi"
- 2 CTA buttons: "Dùng thử miễn phí 14 ngày" và "Xem cách hoạt động"
- Dashboard preview placeholder

### 2. **AI Insight Flow**
- Hiển thị quy trình: Product Data → AI Segmentation → Persona → Optimized Content
- Animation flow với arrows và pulse effects

### 3. **Features Section**
6 tính năng chính:
- AI Segmentation Insight
- Persona-based Optimization
- AI Visual Generation
- Unified Config System
- Real-time Shopify Sync
- Scalable AI Workflow

### 4. **Persona Demo Section**
3 customer personas mẫu:
- The Festival & Travel Enthusiast
- The Urban Minimalist
- The Luxury Gifter

### 5. **How It Works**
4 bước workflow:
1. Kết nối Shopify
2. Khám phá Khách hàng
3. Tạo Nội dung & Hình ảnh
4. Đẩy lên Cửa hàng

### 6. **Testimonials**
- 6 đánh giá từ Shopify merchants
- Stats bar: 10,000+ products, 80% time saved, 15% conversion increase

### 7. **Pricing**
3 tiers:
- **Free**: $0/tháng (10 sản phẩm)
- **Pro**: $49/tháng (500 sản phẩm) - Popular
- **Enterprise**: Custom (Unlimited)

### 8. **Final CTA**
- Headline: "Sẵn sàng biến đổi cửa hàng Shopify của bạn?"
- Primary CTA với pulse glow animation

## Bước 4: Customization

### Thay đổi màu sắc

Edit `tailwind.config.js`:

```js
colors: {
  primary: {
    DEFAULT: '#8B5CF6', // Thay màu Violet này
  },
  accent: {
    cyan: '#00FFFF',    // Thay màu Cyan này
    violet: '#8B5CF6',
  },
}
```

### Thay đổi nội dung

Mỗi component có data riêng:

**Ví dụ 1: Personas**
```tsx
// components/PersonaDemoSection.tsx
const personas = [
  {
    title: 'Tên persona của bạn',
    painPoint: 'Pain point của họ',
    tones: ['Tone 1', 'Tone 2'],
  },
]
```

**Ví dụ 2: Features**
```tsx
// components/FeaturesSection.tsx
const features = [
  {
    icon: YourIcon,
    title: 'Tên tính năng',
    description: 'Mô tả tính năng',
  },
]
```

**Ví dụ 3: Pricing**
```tsx
// components/PricingSection.tsx
const pricingTiers = [
  {
    name: 'Plan Name',
    price: '$49',
    features: ['Feature 1', 'Feature 2'],
  },
]
```

### Thay đổi logo và branding

**Navbar logo:**
```tsx
// components/Navbar.tsx
<span className="text-2xl font-bold text-white">YourBrand</span>
<span className="text-2xl font-bold text-accent-cyan">.</span>
```

## Bước 5: Build Production

```bash
# Build
npm run build

# Preview production build locally
npm run start
```

## Bước 6: Deploy

### Deploy lên Vercel (Recommended)

1. Push code lên GitHub
2. Import repository vào Vercel
3. Vercel tự động detect Next.js và deploy

### Deploy lên Netlify

1. Build project: `npm run build`
2. Upload folder `.next` lên Netlify
3. Configure build settings

## 🎨 Design Tokens

### Colors
```css
--primary-violet: #8B5CF6
--accent-cyan: #00FFFF
--dark-primary: #0D0D0F
--dark-secondary: #111113
--dark-surface: #1C1C1F
--text-primary: #EAEAEA
--text-secondary: #A1A1A1
```

### Spacing
```css
--spacing-xs: 0.5rem   /* 8px */
--spacing-sm: 1rem     /* 16px */
--spacing-md: 1.5rem   /* 24px */
--spacing-lg: 2rem     /* 32px */
--spacing-xl: 3rem     /* 48px */
```

### Border Radius
```css
--radius-sm: 8px
--radius-md: 12px
--radius-lg: 16px
--radius-xl: 24px
```

## 📦 Thêm Icons mới

Project sử dụng **Lucide React**. Để thêm icon:

```tsx
import { YourIcon } from 'lucide-react'

<YourIcon size={24} className="text-accent-cyan" />
```

Xem tất cả icons tại: https://lucide.dev/icons/

## 🔧 Troubleshooting

### Lỗi: Module not found

```bash
rm -rf node_modules
npm install
```

### Lỗi: Port 3000 đang được sử dụng

```bash
npm run dev -- -p 3001
```

### Lỗi: TypeScript

```bash
npm run build
# Fix các lỗi TypeScript hiển thị
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

---

Chúc bạn thành công với Dropease Landing Page! 🚀

