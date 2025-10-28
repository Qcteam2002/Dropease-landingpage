# 🚀 Dropease - AI Product Intelligence cho Shopify

Landing page chuyên nghiệp cho **Dropease** - Nền tảng AI giúp bạn hiểu khách hàng và tự động tạo nội dung, hình ảnh sản phẩm phù hợp với họ.

## 🎯 Về Dropease

**"Từ Insight đến Tác động — Cấu hình một lần, Tối ưu mọi nơi."**

Dropease là nền tảng AI Product Intelligence cho Shopify, giúp:
- 🧠 **Phân tích khách hàng tự động** - AI khám phá 3 personas lý tưởng cho mỗi sản phẩm
- ✍️ **Tạo nội dung thông minh** - Tiêu đề, mô tả tối ưu theo từng phân khúc
- 🎨 **Tạo hình ảnh AI** - Studio, lifestyle, infographic chuyên nghiệp
- 🔄 **Đồng bộ Shopify** - Đẩy toàn bộ nội dung lên store chỉ với 1 click

## ✨ Tính năng

- 🎨 **Thiết kế hiện đại**: Dark theme với gradient Violet (#8B5CF6) và Cyan (#00FFFF)
- 🎭 **Animation mượt mà**: Framer Motion với scroll reveal effects
- 📱 **Responsive hoàn hảo**: Tối ưu cho mọi thiết bị
- ⚡ **Performance cao**: Next.js 14 với App Router
- 🎯 **SEO tối ưu**: Metadata đầy đủ
- 🔧 **TailwindCSS**: Styling nhanh và hiệu quả

## 🏗️ Cấu trúc dự án

```
Dropease-LandingPage/
├── app/
│   ├── globals.css          # Global styles với Dropease theme
│   ├── layout.tsx           # Root layout với metadata
│   └── page.tsx             # Trang chủ - tích hợp tất cả sections
├── components/
│   ├── Navbar.tsx           # Navigation với Dropease.ai branding
│   ├── HeroSection.tsx      # Hero với tagline chính
│   ├── AIInsightFlow.tsx    # Product → AI → Persona → Content flow
│   ├── FeaturesSection.tsx  # 6 tính năng chính của Dropease
│   ├── PersonaDemoSection.tsx  # Demo 3 customer personas
│   ├── HowItWorksSection.tsx   # 4 bước workflow Shopify
│   ├── TestimonialsSection.tsx # Đánh giá từ Shopify merchants
│   ├── PricingSection.tsx   # Pricing tiers (Free, Pro, Enterprise)
│   ├── CTASection.tsx       # Final call to action
│   └── Footer.tsx           # Footer với links
├── tailwind.config.js       # Cấu hình Dropease colors
├── next.config.js           # Cấu hình Next.js
└── package.json             # Dependencies
```

## 🚀 Bắt đầu

### Yêu cầu

- Node.js 18.x trở lên
- npm, yarn, hoặc pnpm

### Cài đặt

```bash
# Di chuyển vào thư mục dự án
cd Dropease-LandingPage

# Cài đặt dependencies
npm install
# hoặc
yarn install
```

### Development

```bash
# Chạy development server
npm run dev

# Mở http://localhost:3000
```

### Build Production

```bash
# Build cho production
npm run build
npm run start
```

## 🎨 Design System

### Màu sắc Dropease

- **Primary Violet**: `#8B5CF6`
- **Accent Cyan**: `#00FFFF`
- **Dark Primary**: `#0D0D0F`
- **Dark Secondary**: `#111113`
- **Dark Surface**: `#1C1C1F`
- **Text Primary**: `#EAEAEA`
- **Text Secondary**: `#A1A1A1`

### Typography

- **Font**: Inter (Google Fonts)
- **Heading**: Bold, 4xl - 7xl
- **Body**: Regular, lg - xl
- **Small**: sm - base

### Animations

- **Fade In**: 0.6s ease-in-out
- **Fade Up**: 0.6s ease-out
- **Hover Scale**: 1.03 - 1.05
- **Pulse Glow**: 2s infinite

## 📦 Dependencies chính

- **Next.js**: ^14.2.0 - React framework
- **React**: ^18.2.0 - UI library
- **Framer Motion**: ^11.0.0 - Animation library
- **TailwindCSS**: ^3.4.1 - Utility-first CSS
- **Lucide React**: ^0.344.0 - Icon library
- **TypeScript**: ^5.3.0 - Type safety

## 🎯 Sections

1. **Hero Section**: "Từ Insight đến Tác động — Cấu hình một lần, Tối ưu mọi nơi"
2. **AI Insight Flow**: Product Data → AI Segmentation → Persona → Optimized Content
3. **Features Section**: 6 tính năng vượt trội (AI Segmentation, Persona Optimization, AI Visuals, etc.)
4. **Persona Demo**: 3 customer personas mẫu (Festival Enthusiast, Urban Minimalist, Luxury Gifter)
5. **How It Works**: 4 bước workflow (Connect → Discover → Generate → Push)
6. **Testimonials**: Đánh giá từ Shopify merchants
7. **Pricing**: 3 tiers (Free, Pro $49/mo, Enterprise Custom)
8. **Final CTA**: "Sẵn sàng biến đổi cửa hàng Shopify của bạn?"
9. **Footer**: Links và copyright

## 🛠️ Customization

### Thay đổi màu sắc

Chỉnh sửa trong `tailwind.config.js`:

```js
colors: {
  primary: {
    DEFAULT: '#8B5CF6', // Violet
  },
  accent: {
    cyan: '#00FFFF',
    violet: '#8B5CF6',
  },
}
```

### Thay đổi nội dung

Mỗi component có data riêng, dễ dàng customize:

```tsx
// Ví dụ: PersonaDemoSection.tsx
const personas = [
  {
    title: 'The Festival & Travel Enthusiast',
    painPoint: '...',
    tones: ['Vibrant', 'Adventurous'],
  },
]
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Scripts

```bash
npm run dev      # Development server
npm run build    # Build production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🎬 Workflow

**Dropease Workflow:**

1. **Connect Shopify** - Kết nối cửa hàng trong 30 giây
2. **Discover Buyers** - AI phân tích và tìm 3 personas
3. **Generate Content** - Tạo nội dung + hình ảnh tự động
4. **Push to Shopify** - Đẩy lên store bằng 1 click

## 📝 License

MIT License - tự do sử dụng cho dự án cá nhân và thương mại.

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Vui lòng tạo issue hoặc pull request.

## 📧 Liên hệ

- Website: https://dropease.ai
- Email: contact@dropease.ai

---

Made with ❤️ for Shopify merchants | Powered by Next.js & Framer Motion
# Dropease-landingpage
