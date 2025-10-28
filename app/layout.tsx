import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'

export const metadata: Metadata = {
  title: 'Dropease - AI Product Intelligence cho Shopify',
  description: 'Nền tảng AI giúp bạn hiểu khách hàng và tự động tạo nội dung, hình ảnh sản phẩm phù hợp. Cấu hình một lần, tối ưu mọi nơi.',
  keywords: 'dropease, shopify, AI, product intelligence, content generation, customer segmentation',
  authors: [{ name: 'Dropease Team' }],
  openGraph: {
    title: 'Dropease - AI Product Intelligence cho Shopify',
    description: 'Từ insight đến tác động. Cấu hình một lần, tối ưu mọi nơi.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}

