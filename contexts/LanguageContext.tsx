'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'vi' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => any
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('vi')

  // Load language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'vi' || savedLanguage === 'en')) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language to localStorage
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  // Translation helper function
  const t = (key: string): any => {
    const keys = key.split('.')
    let value: any = translations[language]
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return key // Return key if translation not found
      }
    }
    
    // Return value as-is (can be string, array, or object)
    return value !== undefined ? value : key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

// Translations
const translations = {
  vi: {
    nav: {
      features: 'Tính năng',
      howItWorks: 'Cách hoạt động',
      pricing: 'Bảng giá',
      testimonials: 'Đánh giá',
      getStarted: 'Bắt đầu miễn phí',
    },
    hero: {
      badge: 'AI Product Intelligence cho Shopify',
      title: 'Từ Insight đến Tác động —',
      titleHighlight: 'Định nghĩa một lần, Tối ưu mọi nơi.',
      subtitle: 'Hiểu rõ khách hàng của bạn. Tạo nội dung & hình ảnh phù hợp. Giữ thương hiệu nhất quán — tất cả trong vài giây. Dành cho người bán Shopify bận rộn muốn cửa hàng trông chuyên nghiệp.',
      ctaPrimary: 'Dùng thử miễn phí 14 ngày',
      ctaSecondary: 'Xem cách hoạt động',
    },
    aiFlow: {
      tagline: 'Tất cả bắt đầu từ',
      title: 'hiểu rõ khách hàng của bạn',
      steps: {
        productData: {
          title: 'Sản phẩm của bạn',
          desc: 'Thông tin từ cửa hàng Shopify',
        },
        aiSegmentation: {
          title: 'Audience Discovery',
          desc: 'Khám phá khách hàng lý tưởng',
        },
        persona: {
          title: 'Customer Profiles',
          desc: '3 nhóm khách hàng tiềm năng',
        },
        optimizedContent: {
          title: 'Ready-to-Use Content',
          desc: 'Nội dung & hình ảnh phù hợp',
        },
      },
    },
    features: {
      tagline: 'Giải pháp toàn diện',
      title: 'Mọi thứ bạn cần để',
      titleHighlight: 'hiểu khách hàng & bán hàng hiệu quả',
      titleSuffix: '',
      subtitle: 'Từ việc khám phá khách hàng đến tạo nội dung chuyên nghiệp — tất cả tự động và nhất quán',
      list: {
        segmentation: {
          title: 'Audience Insight Discovery',
          desc: 'Khám phá 3 nhóm khách hàng lý tưởng cho mỗi sản phẩm — với pain points, động lực mua hàng và tone phù hợp.',
        },
        optimization: {
          title: 'Smart Content Creation',
          desc: 'Tạo tiêu đề & mô tả hấp dẫn, SEO-friendly — tự động điều chỉnh theo từng nhóm khách hàng.',
        },
        visuals: {
          title: 'Visual Intelligence',
          desc: 'Tạo hình ảnh studio, lifestyle và infographic chuyên nghiệp — phù hợp với tone và persona đã chọn.',
        },
        config: {
          title: 'Unified Product Intelligence',
          desc: 'Mỗi sản phẩm giữ cùng giọng thương hiệu — định nghĩa một lần, áp dụng mọi nơi.',
        },
        sync: {
          title: '1-Click Shopify Sync',
          desc: 'Đẩy toàn bộ nội dung & hình ảnh lên cửa hàng chỉ bằng một cú nhấp chuột. Không cần copy-paste.',
        },
        scalable: {
          title: 'Bulk Optimization',
          desc: 'Tối ưu hàng trăm sản phẩm cùng lúc. Tiết kiệm thời gian, scale nhanh catalog của bạn.',
        },
      },
    },
    detailedFeatures: {
      tagline: 'Hiểu rõ hơn. Bán tốt hơn.',
      title: 'Giải pháp toàn diện từ',
      titleHighlight: 'insight đến hành động',
      subtitle: 'Dropease giúp bạn biết chính xác khách hàng là ai, và tự động tạo nội dung & hình ảnh để thu hút họ',
      feature1: {
        title: 'Audience Insight Discovery',
        desc: 'Ngừng đoán mò. Biết chính xác 3 nhóm khách hàng lý tưởng cho mỗi sản phẩm — với pain points, động lực mua hàng và tone giao tiếp phù hợp.',
        items: [
          'Hiểu rõ vấn đề và mong muốn của khách hàng',
          'Biết họ là ai, làm gì, quan tâm điều gì',
          'Nhận gợi ý tone & channel phù hợp nhất',
        ],
      },
      feature2: {
        title: 'Smart Content Creation',
        desc: 'Tạo tiêu đề & mô tả hấp dẫn, tối ưu SEO — tự động điều chỉnh theo từng nhóm khách hàng. Không cần viết tay, không copy-paste từ supplier.',
        items: [
          'Tiêu đề bắt mắt, tối ưu từ khóa SEO',
          'Mô tả có cấu trúc rõ ràng, thuyết phục',
          'Product benefits nói đúng ngôn ngữ khách hàng',
        ],
      },
      feature3: {
        title: 'Visual Intelligence',
        desc: 'Hình ảnh chuyên nghiệp, đồng nhất với tone thương hiệu. Không cần thuê designer hay chỉnh ảnh thủ công — AI tạo studio, lifestyle và infographic trong vài giây.',
        items: [
          'Ảnh studio với background chuyên nghiệp',
          'Ảnh lifestyle phù hợp với ngữ cảnh sử dụng',
          'Infographic minh họa tính năng sản phẩm',
        ],
      },
    },
    personas: {
      tagline: 'Ví dụ thực tế',
      title: 'Biết chính xác',
      titleHighlight: 'ai sẽ mua sản phẩm',
      titleSuffix: 'của bạn',
      subtitle: 'Với sản phẩm "Balo du lịch đa năng", đây là 3 nhóm người có khả năng mua cao nhất — mỗi người cần một cách tiếp cận khác nhau',
      footer: 'Dropease tự động tìm ra đúng nhóm khách hàng cho từng sản phẩm — bạn chỉ cần chọn và tạo nội dung',
      list: [
        {
          title: 'Người đam mê Lễ hội & Du lịch',
          painPoint:
            'Cần một chiếc balo bền, nhẹ, đủ chỗ chứa đồ cho chuyến đi cuối tuần nhưng vẫn phải trông thật phong cách.',
          tones: ['Sôi động', 'Phiêu lưu'],
          gradient: 'from-pink-500 to-rose-500',
        },
        {
          title: 'Người theo chủ nghĩa tối giản thành thị',
          painPoint:
            'Ghét sự cồng kềnh. Muốn một chiếc balo gọn gàng, chống nước để đựng laptop và đồ dùng hàng ngày khi di chuyển trong thành phố.',
          tones: ['Tinh tế', 'Hiệu quả'],
          gradient: 'from-blue-500 to-cyan-500',
        },
        {
          title: 'Người tặng quà cao cấp',
          painPoint:
            'Tìm kiếm một món quà cao cấp, thiết thực và có thương hiệu cho đối tác. Chất liệu và thiết kế là ưu tiên hàng đầu.',
          tones: ['Thanh lịch', 'Độc quyền'],
          gradient: 'from-violet-500 to-purple-500',
        },
      ],
    },
    howItWorks: {
      tagline: 'Quy trình 4 bước',
      title: 'Bốn bước đến',
      titleHighlight: 'product listings hoàn hảo',
      subtitle: 'Biến dữ liệu sản phẩm thô thành nội dung bán hàng hiệu quả chỉ với vài cú nhấp chuột',
      steps: [
        {
          title: 'Kết nối Shopify',
          desc: 'Kết nối cửa hàng của bạn trong 30 giây để đồng bộ toàn bộ sản phẩm một cách an toàn.',
        },
        {
          title: 'Khám phá Khách hàng',
          desc: 'AI tự động phân tích và đề xuất 3 phân khúc khách hàng lý tưởng cho mỗi sản phẩm.',
        },
        {
          title: 'Tạo Nội dung & Hình ảnh',
          desc: 'Chọn một persona, AI sẽ tự động tạo tiêu đề, mô tả và hình ảnh phù hợp trong vài giây.',
        },
        {
          title: 'Đẩy lên Cửa hàng',
          desc: 'Xem trước và đẩy toàn bộ nội dung đã tối ưu lên Shopify chỉ bằng một cú nhấp chuột.',
        },
      ],
      footer: 'Toàn bộ quy trình từ kết nối đến triển khai chỉ mất',
      footerHighlight: 'dưới 5 phút',
    },
    testimonials: {
      tagline: 'Khách hàng nói gì',
      title: 'Được tin dùng bởi',
      titleHighlight: 'các thương hiệu Shopify',
      stats: {
        products: 'Sản phẩm đã tối ưu',
        timeSaved: 'Tiết kiệm thời gian',
        conversion: 'Tăng conversion rate',
      },
      list: [
        {
          name: 'Anna S.',
          role: 'Người sáng lập, UrbanStyle Co.',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna',
          quote:
            'Dropease đã giúp tôi tiết kiệm 80% thời gian viết mô tả sản phẩm. Chất lượng thật tuyệt vời.',
          rating: 5,
        },
        {
          name: 'Samantha Lee',
          role: 'Trưởng phòng Marketing, GadgetFlow',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Samantha',
          quote:
            'Giống như có một chiến lược gia marketing cho từng sản phẩm. Dropease hiểu khách hàng của tôi còn rõ hơn cả tôi.',
          rating: 5,
        },
        {
          name: 'Ben Carter',
          role: 'Chủ sở hữu, HomeGoods Emporium',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ben',
          quote:
            'Hình ảnh sản phẩm của tôi chưa bao giờ trông chuyên nghiệp và nhất quán đến thế. Trình tạo hình ảnh AI là một yếu tố thay đổi cuộc chơi.',
          rating: 5,
        },
      ],
    },
    pricing: {
      title: 'Chọn gói',
      titleHighlight: 'phù hợp với bạn',
      subtitle: 'Bắt đầu miễn phí. Nâng cấp hoặc hạ cấp bất cứ lúc nào. Không cần thẻ tín dụng.',
      popular: 'Phổ biến nhất',
      plans: {
        free: {
          name: 'Free',
          desc: 'Cho cá nhân bắt đầu',
          cta: 'Bắt đầu miễn phí',
        },
        pro: {
          name: 'Pro',
          desc: 'Cho doanh nghiệp đang phát triển',
          cta: 'Bắt đầu dùng thử',
        },
        enterprise: {
          name: 'Enterprise',
          price: 'Custom',
          desc: 'Cho hoạt động quy mô lớn',
          cta: 'Liên hệ Sales',
        },
      },
      footer: 'Tất cả gói đều bao gồm 14 ngày dùng thử miễn phí',
      compareLink: 'So sánh chi tiết các gói →',
    },
    cta: {
      title: 'Sẵn sàng biến đổi',
      titleHighlight: 'cửa hàng Shopify',
      titleSuffix: 'của bạn?',
      button: 'Bắt đầu miễn phí ngay',
      features: [
        'Không cần thẻ tín dụng',
        '14 ngày dùng thử',
        'Hủy bất cứ lúc nào',
      ],
    },
    footer: {
      links: [
        { label: 'Chính sách bảo mật', href: '#' },
        { label: 'Điều khoản dịch vụ', href: '#' },
        { label: 'Liên hệ hỗ trợ', href: '#' },
      ],
      copyright: 'Dropease. Tất cả quyền được bảo lưu.',
    },
  },
  en: {
    nav: {
      features: 'Features',
      howItWorks: 'How It Works',
      pricing: 'Pricing',
      testimonials: 'Testimonials',
      getStarted: 'Get Started Free',
    },
    hero: {
      badge: 'AI Product Intelligence for Shopify',
      title: 'From Insight to Impact —',
      titleHighlight: 'Define once, optimize everywhere.',
      subtitle: 'Understand your customers. Create tailored content & visuals. Keep your brand consistent — all in seconds. Built for busy Shopify sellers who want to look professional.',
      ctaPrimary: 'Start 14-day free trial',
      ctaSecondary: 'See how it works',
    },
    aiFlow: {
      tagline: 'It all starts with',
      title: 'understanding your customers',
      steps: {
        productData: {
          title: 'Your Products',
          desc: 'Data from your Shopify store',
        },
        aiSegmentation: {
          title: 'Audience Discovery',
          desc: 'Find ideal customer groups',
        },
        persona: {
          title: 'Customer Profiles',
          desc: 'Top 3 customer segments',
        },
        optimizedContent: {
          title: 'Ready-to-Use Content',
          desc: 'Tailored content & visuals',
        },
      },
    },
    features: {
      tagline: 'Complete Solution',
      title: 'Everything you need to',
      titleHighlight: 'understand customers & sell better',
      titleSuffix: '',
      subtitle: 'From customer discovery to professional content creation — all automated and consistent',
      list: {
        segmentation: {
          title: 'Audience Insight Discovery',
          desc: 'Uncover your top 3 ideal customer profiles for each product — complete with their pain points, motivations, and tone preferences.',
        },
        optimization: {
          title: 'Smart Content Creation',
          desc: 'Generate compelling, SEO-optimized titles & descriptions — automatically tailored to each customer group.',
        },
        visuals: {
          title: 'Visual Intelligence',
          desc: 'Create professional studio, lifestyle, and infographic images — aligned with your chosen tone and persona.',
        },
        config: {
          title: 'Unified Product Intelligence',
          desc: 'Every product speaks the same brand voice — define once, apply everywhere.',
        },
        sync: {
          title: '1-Click Shopify Sync',
          desc: 'Push all content & images to your store with one click. No copy-pasting needed.',
        },
        scalable: {
          title: 'Bulk Optimization',
          desc: 'Optimize hundreds of products at once. Save time and scale your catalog fast.',
        },
      },
    },
    detailedFeatures: {
      tagline: 'Understand Better. Sell Better.',
      title: 'Complete solution from',
      titleHighlight: 'insight to action',
      subtitle: 'Dropease helps you know exactly who your customers are, and automatically creates content & visuals to attract them',
      feature1: {
        title: 'Audience Insight Discovery',
        desc: "Stop guessing. Know exactly who your top 3 ideal customer groups are for each product — with their pain points, motivations, and preferred communication style.",
        items: [
          'Understand customer problems and desires',
          'Know who they are, what they do, what they care about',
          'Get tone & channel recommendations',
        ],
      },
      feature2: {
        title: 'Smart Content Creation',
        desc: 'Generate compelling, SEO-optimized titles & descriptions — automatically tailored to each customer group. No manual writing, no copy-pasting from suppliers.',
        items: [
          'Eye-catching titles with SEO keywords',
          'Clear, structured, persuasive descriptions',
          'Product benefits that speak customer language',
        ],
      },
      feature3: {
        title: 'Visual Intelligence',
        desc: 'Professional images aligned with your brand tone. No need to hire designers or edit manually — AI creates studio, lifestyle, and infographic images in seconds.',
        items: [
          'Studio photos with professional backgrounds',
          'Lifestyle images matching use contexts',
          'Infographics illustrating product features',
        ],
      },
    },
    personas: {
      tagline: 'Real Example',
      title: 'Know exactly',
      titleHighlight: 'who will buy',
      titleSuffix: 'your products',
      subtitle: 'For a "Multi-purpose Travel Backpack", here are the top 3 buyer groups most likely to purchase — each needs a different approach',
      footer: 'Dropease automatically finds the right customer groups for each product — you just choose and create content',
      list: [
        {
          title: 'The Festival & Travel Enthusiast',
          painPoint:
            'Needs a durable, lightweight backpack with enough space for weekend trips while still looking stylish.',
          tones: ['Vibrant', 'Adventurous'],
          gradient: 'from-pink-500 to-rose-500',
        },
        {
          title: 'The Urban Minimalist',
          painPoint:
            'Hates bulky items. Wants a sleek, water-resistant backpack for laptop and daily essentials while commuting.',
          tones: ['Sleek', 'Efficient'],
          gradient: 'from-blue-500 to-cyan-500',
        },
        {
          title: 'The Luxury Gifter',
          painPoint:
            'Looking for a premium, practical, and branded gift for business partners. Material and design are top priorities.',
          tones: ['Elegant', 'Exclusive'],
          gradient: 'from-violet-500 to-purple-500',
        },
      ],
    },
    howItWorks: {
      tagline: '4-step process',
      title: 'Four steps to',
      titleHighlight: 'perfect product listings',
      subtitle: 'Turn raw product data into effective sales content with just a few clicks',
      steps: [
        {
          title: 'Connect Shopify',
          desc: 'Link your store in 30 seconds to securely sync all your products.',
        },
        {
          title: 'Discover Buyers',
          desc: 'AI automatically analyzes and suggests 3 ideal customer personas for each product.',
        },
        {
          title: 'Generate Content & Images',
          desc: 'Select a persona, and AI will automatically create titles, descriptions, and matching images in seconds.',
        },
        {
          title: 'Push to Store',
          desc: 'Preview and push all optimized content to Shopify with just one click.',
        },
      ],
      footer: 'The entire process from connection to deployment takes',
      footerHighlight: 'under 5 minutes',
    },
    testimonials: {
      tagline: 'What customers say',
      title: 'Trusted by',
      titleHighlight: 'Shopify brands',
      stats: {
        products: 'Products optimized',
        timeSaved: 'Time saved',
        conversion: 'Conversion increase',
      },
      list: [
        {
          name: 'Anna S.',
          role: 'Founder, UrbanStyle Co.',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna',
          quote:
            'Dropease saved me 80% of the time I used to spend on writing product descriptions. The quality is amazing.',
          rating: 5,
        },
        {
          name: 'Samantha Lee',
          role: 'Marketing Head, GadgetFlow',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Samantha',
          quote:
            "It's like having a marketing strategist for every single product. Dropease knows my customers better than I do.",
          rating: 5,
        },
        {
          name: 'Ben Carter',
          role: 'Owner, HomeGoods Emporium',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ben',
          quote:
            'My product visuals have never looked this professional and consistent. The AI image generator is a game-changer.',
          rating: 5,
        },
      ],
    },
    pricing: {
      title: 'Choose the',
      titleHighlight: 'plan that fits you',
      subtitle: 'Start free. Upgrade or downgrade anytime. No credit card required.',
      popular: 'Most popular',
      plans: {
        free: {
          name: 'Free',
          desc: 'For individuals starting out',
          cta: 'Get Started',
        },
        pro: {
          name: 'Pro',
          desc: 'For growing businesses',
          cta: 'Start Free Trial',
        },
        enterprise: {
          name: 'Enterprise',
          price: 'Custom',
          desc: 'For large-scale operations',
          cta: 'Contact Sales',
        },
      },
      footer: 'All plans include a 14-day free trial',
      compareLink: 'Compare plan details →',
    },
    cta: {
      title: 'Ready to transform your',
      titleHighlight: 'Shopify store',
      titleSuffix: '?',
      button: 'Try Dropease for Free',
      features: [
        'No credit card required',
        '14-day free trial',
        'Cancel anytime',
      ],
    },
    footer: {
      links: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Contact Support', href: '#' },
      ],
      copyright: 'Dropease. All rights reserved.',
    },
  },
}

