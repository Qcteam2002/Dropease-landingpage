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
  const [mounted, setMounted] = useState(false)

  // Load language from localStorage - only on client
  useEffect(() => {
    setMounted(true)
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

  // Prevent hydration mismatch by waiting for client-side mount
  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ language: 'vi', setLanguage: handleSetLanguage, t }}>
        {children}
      </LanguageContext.Provider>
    )
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
      home: 'Trang chủ',
      features: 'Tính năng',
      howItWorks: 'Cách hoạt động',
      pricing: 'Bảng giá',
      testimonials: 'Đánh giá',
      getStarted: 'Bắt đầu miễn phí',
    },
    hero: {
      badge: 'Dành cho người bán Shopify bận rộn',
      title: 'Hiểu rõ khách hàng của bạn,',
      titleHighlight: 'và bán hàng thông minh hơn.',
      subtitle:
        'Dropease giúp bạn biết chính xác ai sẽ mua, họ cần gì, và biến những hiểu biết đó thành nội dung & hình ảnh khiến sản phẩm thu hút và thương hiệu của bạn nổi bật — chỉ trong vài giây.',
      ctaPrimary: 'Tham gia trải nghiệm sớm',
      ctaSecondary: 'Xem demo thực tế',
    },
    aiFlow: {
      tagline: 'Mọi điều bắt đầu từ',
      title: 'hiểu rõ khách hàng của bạn',
      steps: {
        productData: {
          title: 'Sản phẩm của bạn',
          desc: 'Lấy dữ liệu trực tiếp từ cửa hàng Shopify',
        },
        aiSegmentation: {
          title: 'Khám phá người mua',
          desc: 'Nhận diện nhóm khách hàng tiềm năng nhất cho sản phẩm',
        },
        persona: {
          title: 'Chân dung khách hàng',
          desc: '3 nhóm khách hàng thật sự có khả năng mua cao',
        },
        optimizedContent: {
          title: 'Nội dung sẵn sàng sử dụng',
          desc: 'Tự động tạo mô tả & hình ảnh phù hợp cho từng nhóm khách hàng',
        },
      },
    },    
    features: {
      tagline: 'Giải pháp toàn diện',
      title: 'Mọi thứ bạn cần để',
      titleHighlight: 'hiểu khách hàng và bán hàng hiệu quả hơn',
      titleSuffix: '',
      subtitle:
        'Từ việc khám phá khách hàng đến tạo nội dung và hình ảnh chuyên nghiệp — tất cả tự động, nhanh chóng và nhất quán',
      list: {
        segmentation: {
          title: 'Khám phá Insight Khách hàng',
          desc: 'Biết rõ 3 nhóm khách hàng tiềm năng nhất cho mỗi sản phẩm — kèm pain point, động lực mua hàng và cách giao tiếp phù hợp.',
        },
        optimization: {
          title: 'Tạo nội dung thông minh',
          desc: 'Tự động viết tiêu đề và mô tả hấp dẫn, chuẩn SEO — phù hợp với từng nhóm khách hàng, đồng thời được cấu trúc để AI và công cụ tìm kiếm hiểu rõ sản phẩm của bạn hơn.',
        },        
        visuals: {
          title: 'Tạo hình ảnh chuyên nghiệp',
          desc: 'Tạo ảnh studio, lifestyle hoặc infographic đẹp mắt, đồng nhất với phong cách thương hiệu của bạn — chỉ trong vài giây.',
        },
        config: {
          title: 'Giữ giọng thương hiệu nhất quán',
          desc: 'Mọi sản phẩm trong cửa hàng đều nói cùng một “ngôn ngữ thương hiệu” — định nghĩa một lần, áp dụng mọi nơi.',
        },
        sync: {
          title: 'AI Visibility Boost',
          desc: 'Giúp sản phẩm của bạn được AI hiểu và hiển thị khi người dùng hỏi ChatGPT, Perplexity hoặc Claude. Đây là SEO mới cho thời đại tìm kiếm bằng AI.',
        },
        scalable: {
          title: 'Tối ưu hàng loạt sản phẩm',
          desc: 'Tiết kiệm hàng giờ làm việc — tối ưu hàng trăm sản phẩm cùng lúc và mở rộng catalog nhanh chóng.',
        },
      },
    },    
    detailedFeatures: {
      tagline: 'Hiểu rõ hơn. Bán tốt hơn.',
      title: 'Giải pháp toàn diện từ',
      titleHighlight: 'hiểu khách hàng đến tăng doanh thu',
      subtitle:
        'Dropease giúp bạn hiểu rõ ai là người mua, họ quan tâm điều gì — và tự động tạo nội dung cùng hình ảnh khiến sản phẩm trở nên đáng mua hơn.',
      feature1: {
        title: 'Khám phá Insight Khách hàng',
        desc: 'Không cần đoán mò nữa. Dropease cho bạn thấy 3 nhóm khách hàng có khả năng mua cao nhất — với vấn đề, động lực và cách giao tiếp phù hợp với từng nhóm.',
        items: [
          'Hiểu rõ nhu cầu và mong muốn của người mua',
          'Biết họ là ai, quan tâm điều gì và vì sao họ mua',
          'Nhận gợi ý tone và kênh truyền thông hiệu quả nhất',
        ],
      },
      feature2: {
        title: 'Tạo nội dung thông minh',
        desc: 'Tạo tiêu đề và mô tả hấp dẫn, chuẩn SEO — được cá nhân hóa cho từng nhóm khách hàng và được cấu trúc để cả người đọc và AI đều hiểu rõ giá trị sản phẩm.',
        items: [
          'Tiêu đề thu hút, thân thiện với tìm kiếm',
          'Mô tả rõ ràng, thuyết phục và dễ đọc',
          'Nội dung nói đúng ngôn ngữ và lợi ích khách hàng',
        ],
      },
      feature3: {
        title: 'Tạo hình ảnh chuyên nghiệp',
        desc: 'Tạo ảnh sản phẩm đẹp mắt, đúng phong cách thương hiệu — chỉ trong vài giây. Không cần designer hay chụp ảnh tốn kém.',
        items: [
          'Ảnh studio chất lượng cao, nền sạch và sắc nét',
          'Ảnh lifestyle phù hợp với ngữ cảnh sử dụng thật',
          'Infographic giúp khách hàng hiểu lợi ích sản phẩm nhanh hơn',
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
      title: 'Bốn bước để',
      titleHighlight: 'xuất hiện trên AI Search',
      subtitle: 'Từ sản phẩm thô đến nội dung AI-ready — giúp bạn hiện diện khi khách hàng hỏi AI',
      steps: [
        {
          title: 'Kết nối Store',
          desc: 'Kết nối Shopify trong 30 giây. Import sản phẩm tự động.',
        },
        {
          title: 'Khám phá Khách hàng',
          desc: 'AI phân tích để tìm ra 3 nhóm người có khả năng mua cao nhất.',
        },
        {
          title: 'Tạo AI-Ready Content',
          desc: 'Tạo nội dung cấu trúc, tối ưu cho cả Google SEO lẫn AI Search (ChatGPT, Claude...).',
        },
        {
          title: 'Optimize & Deploy',
          desc: 'Sản phẩm của bạn trở thành AI-readable. Sẵn sàng xuất hiện trong câu trả lời của AI.',
        },
      ],
      footer: 'Toàn bộ quy trình từ kết nối đến AI-ready chỉ mất',
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
    featureAudience: {
      hero: {
        badge: 'Tính năng #1',
        title: 'Biết chính xác',
        titleHighlight: 'ai sẽ mua sản phẩm của bạn',
        subtitle: 'Khám phá 3 nhóm khách hàng tiềm năng nhất — với pain points, động lực mua hàng và cách giao tiếp phù hợp.',
        valueProp: 'Biến dữ liệu sản phẩm thành hiểu biết sâu sắc về khách hàng',
        ctaPrimary: 'Bắt đầu miễn phí',
        ctaSecondary: 'Xem cách hoạt động',
      },
      problems: {
        title: 'Bạn đang gặp',
        titleHighlight: 'những vấn đề này?',
        subtitle: 'Hầu hết chủ shop Shopify không thực sự biết khách hàng của họ là ai',
        list: [
          {
            icon: '😕',
            title: 'Không biết khách hàng thực sự là ai',
            description: 'Chỉ đăng sản phẩm mà không hiểu ai sẽ mua, tại sao họ mua, và cách nói chuyện với họ như thế nào.',
          },
          {
            icon: '📝',
            title: 'Nội dung chung chung, không hấp dẫn',
            description: 'Copy-paste mô tả từ supplier. Không tối ưu SEO, không nói đúng ngôn ngữ khách hàng.',
          },
          {
            icon: '🎯',
            title: 'Quảng cáo tốn tiền nhưng không hiệu quả',
            description: 'Target sai đối tượng vì không có insight khách hàng. Lãng phí ngân sách Facebook Ads.',
          },
          {
            icon: '⏱️',
            title: 'Mất quá nhiều thời gian để nghiên cứu',
            description: 'Phải tự đoán, survey hoặc test A/B nhiều lần. Tốn thời gian và công sức mà không chắc chắn.',
          },
        ],
      },
      solution: {
        title: 'Dropease giúp bạn',
        titleHighlight: 'hiểu rõ khách hàng trong vài giây',
        subtitle: 'Tự động phân tích sản phẩm để tìm ra 3 nhóm người có khả năng mua cao nhất — hoàn chỉnh với profile, pain points và tone giao tiếp',
        badge: 'Tự động & Thông minh',
      },
      howItWorks: {
        title: 'Cách thức hoạt động',
        subtitle: 'Chỉ 4 bước đơn giản',
        steps: [
          {
            title: 'Nhập thông tin sản phẩm',
            description: 'Kết nối Shopify hoặc nhập thông tin sản phẩm thủ công (tên, mô tả, giá, category).',
          },
          {
            title: 'Tự động phân tích & tìm insight',
            description: 'Hệ thống phân tích đặc điểm sản phẩm, giá cả, use case để xác định nhóm khách hàng tiềm năng.',
          },
          {
            title: 'Nhận 3 Customer Profiles hoàn chỉnh',
            description: 'Dropease đưa ra 3 nhóm khách hàng lý tưởng với: Tên persona, Pain points, Động lực mua, Tone giao tiếp phù hợp.',
          },
          {
            title: 'Áp dụng vào marketing ngay',
            description: 'Chọn persona phù hợp nhất. Dùng insight để tạo nội dung, chạy quảng cáo và xây chiến lược bán hàng hiệu quả.',
          },
        ],
      },
      useCases: {
        title: 'Ai đang dùng',
        titleHighlight: 'tính năng này?',
        subtitle: 'Real examples từ các Shopify sellers',
        list: [
          {
            icon: '🎒',
            title: 'Dropshipper',
            description: 'Upload 100 sản phẩm/tuần. Cần biết nhanh ai sẽ mua để viết mô tả phù hợp.',
            result: 'Tiết kiệm 80% thời gian nghiên cứu',
          },
          {
            icon: '👗',
            title: 'Fashion Store Owner',
            description: 'Bán quần áo nhưng không biết target Gen Z hay millennials. Cần insight để chọn tone.',
            result: 'Tăng 25% engagement trên mô tả sản phẩm',
          },
          {
            icon: '🎁',
            title: 'Gift Shop Manager',
            description: 'Sản phẩm có thể bán cho nhiều đối tượng khác nhau (tự mua, tặng quà). Cần phân tách rõ.',
            result: 'Tạo được 3 campaigns riêng, conversion tăng 40%',
          },
          {
            icon: '💼',
            title: 'E-commerce Marketer',
            description: 'Quản lý 500 sản phẩm, cần insight nhanh để tối ưu listing và chạy ads.',
            result: 'Scale được 3x campaigns với cùng team size',
          },
          {
            icon: '🏢',
            title: 'Agency',
            description: 'Quản lý nhiều clients, cần tool tìm insight nhanh cho từng brand.',
            result: 'Deliver insights cho clients trong 5 phút thay vì 2 ngày',
          },
          {
            icon: '🖼️',
            title: 'Print-on-Demand Seller',
            description: 'Design nhiều mẫu, cần biết mẫu nào fit với nhóm nào để optimize marketing.',
            result: 'Chỉ focus vào top 3 personas, ROI quảng cáo tăng 3x',
          },
        ],
      },
      benefits: {
        title: 'Lợi ích khi dùng Audience Insight Discovery',
        subtitle: 'Những gì bạn sẽ có được',
        list: [
          {
            title: '⚡ Nhanh chóng & tự động',
            description: 'Hệ thống phân tích và đưa ra insight trong vài giây. Không cần nghiên cứu thủ công hàng giờ.',
          },
          {
            title: '🎯 Chính xác & data-driven',
            description: 'Insight dựa trên phân tích thông minh, không phải đoán mò hay cảm tính.',
          },
          {
            title: '💰 Tiết kiệm chi phí marketing',
            description: 'Target đúng đối tượng từ đầu. Không lãng phí ngân sách quảng cáo vào sai người.',
          },
          {
            title: '📈 Tăng conversion rate',
            description: 'Nội dung nói đúng ngôn ngữ khách hàng → Tỷ lệ chuyển đổi cao hơn.',
          },
          {
            title: '🔄 Dễ dàng scale',
            description: 'Áp dụng cho hàng trăm sản phẩm cùng lúc. Không cần phân tích từng sản phẩm một.',
          },
          {
            title: '🧠 Hiểu khách hàng sâu sắc hơn',
            description: 'Không chỉ demographics, mà cả pain points, motivations và tone preferences.',
          },
        ],
      },
      demo: {
        title: 'Xem Audience Insight Discovery trong thực tế',
        subtitle: 'Demo dashboard và customer profiles',
      },
      cta: {
        title: 'Sẵn sàng hiểu rõ khách hàng của bạn?',
        subtitle: 'Bắt đầu miễn phí 14 ngày. Không cần thẻ tín dụng.',
        button: 'Dùng thử miễn phí',
        backHome: 'Quay lại trang chủ',
      },
    },
    featureContent: {
      hero: {
        badge: 'Tính năng #2',
        title: 'Nội dung nói đúng',
        titleHighlight: 'ngôn ngữ khách hàng',
        subtitle: 'Viết feature họ quan tâm, giải quyết đúng pain points của họ. Mỗi nhóm khách hàng có nhu cầu khác nhau — nội dung phải khác nhau.',
        valueProp: 'Tăng khả năng kết nối với khách hàng thật, không chỉ tối ưu máy tìm kiếm',
        ctaPrimary: 'Bắt đầu miễn phí',
        ctaSecondary: 'Xem demo',
      },
      problems: {
        title: 'Bạn đang gặp',
        titleHighlight: 'những vấn đề này?',
        subtitle: 'Nội dung chung chung không resonate với bất kỳ ai',
        list: [
          {
            icon: '🗣️',
            title: 'Viết feature không ai quan tâm',
            description: 'List specs kỹ thuật ("chất liệu cotton 100%") mà không nói benefit. Gen Z quan tâm style, millennials quan tâm quality — nhưng content của bạn nói chung chung.',
          },
          {
            icon: '💔',
            title: 'Không chạm đến pain points thật',
            description: 'Mẹ bỉm sữa mua balo vì "đựng đồ con tiện", không phải "thiết kế hiện đại". Nhưng mô tả của bạn chỉ nói về design, không nói use case thực tế.',
          },
          {
            icon: '🎭',
            title: 'Tone không đúng với audience',
            description: 'Bán cho Gen Z nhưng viết tone formal như báo chí. Hoặc target doanh nhân nhưng dùng từ ngữ teen. Sai tone = mất kết nối.',
          },
          {
            icon: '📋',
            title: 'Copy-paste từ supplier',
            description: 'Mô tả generic từ Aliexpress/CJDropshipping. Không nói đúng ngôn ngữ thị trường Việt. Trùng với 1000 shop khác.',
          },
        ],
      },
      solution: {
        title: 'Dropease giúp bạn',
        titleHighlight: 'viết nội dung cho từng nhóm khách hàng cụ thể',
        subtitle: 'Highlight đúng features họ quan tâm. Giải quyết đúng pain points của họ. Dùng đúng tone họ resonate. Tất cả tự động dựa trên persona bạn chọn.',
        badge: 'Cá nhân hóa & Hiệu quả',
      },
      howItWorks: {
        title: 'Cách thức hoạt động',
        subtitle: 'Chỉ 4 bước đơn giản',
        steps: [
          {
            title: 'Chọn persona target',
            description: 'Chọn 1 trong 3 nhóm khách hàng đã được phân tích (từ Audience Insight Discovery).',
          },
          {
            title: 'Hệ thống tạo nội dung',
            description: 'Tự động tạo tiêu đề SEO-friendly, mô tả có cấu trúc, bullet points và product benefits phù hợp với persona.',
          },
          {
            title: 'Preview & chỉnh sửa',
            description: 'Xem trước nội dung, điều chỉnh tone hoặc keywords nếu cần. Hoặc để mặc định nếu đã ưng ý.',
          },
          {
            title: 'Áp dụng cho nhiều sản phẩm',
            description: 'Apply cho hàng trăm sản phẩm cùng lúc. Scale nhanh toàn bộ catalog của bạn.',
          },
        ],
      },
      useCases: {
        title: 'Ai đang dùng',
        titleHighlight: 'tính năng này?',
        subtitle: 'Real stories từ Shopify sellers',
        list: [
          {
            icon: '📦',
            title: 'Dropshipper (100+ products/tuần)',
            description: 'Upload hàng trăm sản phẩm từ Aliexpress/CJDropshipping. Cần content unique, SEO nhanh.',
            result: 'Tiết kiệm 90% thời gian viết mô tả',
          },
          {
            icon: '👔',
            title: 'Fashion Store Owner',
            description: 'Có 500 sản phẩm quần áo. Muốn mô tả hấp dẫn cho từng phân khúc (Gen Z, Millennials, Luxury).',
            result: 'Tăng 35% click-through rate trên product pages',
          },
          {
            icon: '🏠',
            title: 'Home Decor Seller',
            description: 'Sản phẩm nội thất cần mô tả chi tiết về chất liệu, kích thước, use case. Tốn nhiều thời gian.',
            result: 'Từ 60 phút/sản phẩm → 2 phút/sản phẩm',
          },
          {
            icon: '⌚',
            title: 'Watch & Accessories Shop',
            description: 'Cần highlight tính năng kỹ thuật nhưng vẫn viết dễ hiểu. Khó balance giữa specs và storytelling.',
            result: 'Conversion rate tăng 28%',
          },
          {
            icon: '💄',
            title: 'Beauty & Cosmetics Brand',
            description: 'Sản phẩm làm đẹp cần tone friendly, ingredients list, benefits rõ ràng. Content phải chuẩn.',
            result: 'Average order value tăng 22%',
          },
          {
            icon: '🎮',
            title: 'Gaming & Tech Store',
            description: 'Sản phẩm tech cần balance giữa specs và user benefits. Target audience là gamers trẻ.',
            result: 'Engagement tăng 40%, return rate giảm 15%',
          },
        ],
      },
      benefits: {
        title: 'Lợi ích khi dùng Smart Content Creation',
        subtitle: 'Những gì bạn sẽ có được',
        list: [
          {
            title: '🎯 Nội dung nói đúng ngôn ngữ khách hàng',
            description: 'Gen Z thích "trendy, aesthetic". Millennials thích "quality, value". Mỗi persona có tone và từ ngữ riêng — content tự động điều chỉnh.',
          },
          {
            title: '💡 Highlight features họ quan tâm',
            description: 'Người tặng quà quan tâm "packaging đẹp", dùng cá nhân thích "practical". Content tự động chọn đúng features để nhấn mạnh.',
          },
          {
            title: '🗣️ Giải quyết đúng pain points',
            description: 'Mẹ bỉm: "Dễ lau, chịu nước". Dân văn phòng: "Nhẹ, đựng laptop". Professional: "Thanh lịch, bền". Mỗi persona có pain point riêng.',
          },
          {
            title: '⚡ Siêu nhanh - 5 giây là xong',
            description: 'Tạo title + description + benefits trong 5 giây. Không cần mất 30-60 phút suy nghĩ "viết sao cho hay".',
          },
          {
            title: '📈 Tăng conversion vì content có liên quan',
            description: 'Khách thấy content "nói đúng về mình" → Trust tăng → Click "Mua ngay". Conversion có thể tăng 25-40%.',
          },
          {
            title: '🚀 Scale nhanh với nhiều personas',
            description: 'Cùng 1 sản phẩm, tạo 3 versions cho 3 personas khác nhau. Test xem version nào convert tốt nhất.',
          },
        ],
      },
      demo: {
        title: 'Xem Smart Content Creation trong thực tế',
        subtitle: 'Demo giao diện tạo nội dung & preview kết quả',
      },
      cta: {
        title: 'Sẵn sàng tạo nội dung chuyên nghiệp?',
        subtitle: 'Bắt đầu miễn phí 14 ngày. Không cần thẻ tín dụng.',
        button: 'Dùng thử miễn phí',
        backHome: 'Quay lại trang chủ',
      },
    },
    featureVisual: {
      hero: {
        badge: 'Tính năng #3',
        title: 'Hình ảnh nói đúng',
        titleHighlight: 'style khách hàng',
        subtitle: 'Gen Z thích ảnh trendy lifestyle. Doanh nhân thích studio professional. Mỗi nhóm khách hàng có visual style riêng — hình ảnh phải match.',
        valueProp: 'Tạo nhiều styles khác nhau, cho nhiều personas khác nhau',
        ctaPrimary: 'Bắt đầu miễn phí',
        ctaSecondary: 'Xem gallery',
      },
      problems: {
        title: 'Bạn đang gặp',
        titleHighlight: 'những vấn đề này?',
        subtitle: 'Hình ảnh sản phẩm không đủ hấp dẫn và không phù hợp với khách hàng',
        list: [
          {
            icon: '📸',
            title: 'Ảnh supplier xấu và lỗi thời',
            description: 'Ảnh từ Aliexpress: background lộn xộn, lighting tệ, quality thấp. Gen Z scroll qua trong 0.5 giây vì ảnh "nhìn rẻ tiền".',
          },
          {
            icon: '🎨',
            title: 'Không có style nhất quán',
            description: 'Mỗi sản phẩm một kiểu ảnh khác nhau. Không có visual identity. Shop trông unprofessional và thiếu brand.',
          },
          {
            icon: '💰',
            title: 'Thuê photographer quá đắt',
            description: 'Chụp ảnh professional: $50-200/sản phẩm. Với 100 sản phẩm = $5000-20000. Quá đắt cho small business.',
          },
          {
            icon: '🎭',
            title: 'Style không match với audience',
            description: 'Target Gen Z nhưng ảnh formal như catalog. Hoặc target professionals nhưng ảnh quá casual. Sai style = mất trust.',
          },
        ],
      },
      imageTypes: {
        tagline: '6 Styles cho mọi nhu cầu',
        title: 'Tạo đúng style họ thích xem',
        subtitle: 'Mỗi persona có visual preference khác nhau. Tạo nhiều versions để test xem style nào convert tốt nhất',
        bestFor: 'Tốt cho',
        list: [
          {
            icon: '🎬',
            title: 'Studio Shot',
            description: 'Background trắng clean, lighting professional, focus vào product. Kiểu ảnh classic, luôn work.',
            bestFor: 'E-commerce listings, catalog, professional',
          },
          {
            icon: '🌅',
            title: 'Lifestyle Shot',
            description: 'Sản phẩm trong context sử dụng thật. Outdoor, indoor, with people. Tạo emotional connection.',
            bestFor: 'Instagram, Gen Z, millennials, storytelling',
          },
          {
            icon: '📊',
            title: 'Infographic',
            description: 'Highlight features, specs, dimensions với visual aids. Dễ hiểu specs phức tạp.',
            bestFor: 'Tech products, furniture, complex items',
          },
          {
            icon: '🎥',
            title: 'UGC Style',
            description: 'Trông như do người thật chụp (iPhone style). Authentic, relatable, not too polished.',
            bestFor: 'Social proof, TikTok, young audience',
          },
          {
            icon: '🔍',
            title: 'Close-up Shot',
            description: 'Zoom vào details: chất liệu, texture, craftsmanship. Show quality.',
            bestFor: 'Luxury items, quality-focused customers',
          },
          {
            icon: '✨',
            title: 'GIF/Animated',
            description: '360° view, motion graphics, animation. Catch attention trong feed.',
            bestFor: 'Social media, product demos, engagement',
          },
        ],
      },
      howItWorks: {
        title: 'Cách thức hoạt động',
        subtitle: 'Chỉ 4 bước đơn giản',
        steps: [
          {
            title: 'Upload ảnh gốc',
            description: 'Ảnh supplier hiện tại (dù có xấu). Hoặc ảnh tự chụp bằng điện thoại.',
          },
          {
            title: 'Chọn style & persona',
            description: 'Chọn image style (Studio, Lifestyle, UGC...) và persona target. System sẽ generate phù hợp.',
          },
          {
            title: 'Tạo nhiều versions',
            description: 'Tạo 3-6 versions khác nhau: Studio cho listing, Lifestyle cho Instagram, UGC cho TikTok.',
          },
          {
            title: 'Test & scale',
            description: 'Upload lên store, test xem style nào convert tốt. Apply style đó cho toàn bộ catalog.',
          },
        ],
      },
      useCases: {
        title: 'Ai đang dùng',
        titleHighlight: 'tính năng này?',
        subtitle: 'Real examples từ Shopify sellers',
        list: [
          {
            icon: '👗',
            title: 'Fashion Brand (Target Gen Z)',
            description: 'Ảnh supplier formal quá. Cần ảnh lifestyle trendy để post Instagram. Tạo UGC style + Lifestyle shots.',
            result: 'Instagram engagement tăng 65%',
          },
          {
            icon: '🏠',
            title: 'Home Decor Store',
            description: 'Có 200 sản phẩm nội thất với ảnh catalog nhàm chán. Cần lifestyle shots show sản phẩm trong phòng thật.',
            result: 'Time on page tăng 45%, conversion +30%',
          },
          {
            icon: '⌚',
            title: 'Watch & Accessories',
            description: 'Target cả Gen Z (casual) và professionals (elegant). Cần 2 sets ảnh với vibe khác nhau.',
            result: 'AOV tăng 35% nhờ phân chia audience rõ',
          },
          {
            icon: '💄',
            title: 'Beauty Brand',
            description: 'Sản phẩm skincare cần ảnh clean + infographic show ingredients. Và lifestyle shots cho social.',
            result: 'Return rate giảm 20% (khách hiểu rõ product)',
          },
          {
            icon: '🎮',
            title: 'Gaming Gear Shop',
            description: 'Ảnh supplier không cool. Target gamers trẻ cần ảnh có vibe gaming: RGB, dark background, dynamic.',
            result: 'CTR tăng 50%, brand recall tăng 40%',
          },
          {
            icon: '🎁',
            title: 'Gift & Lifestyle Store',
            description: 'Bán cho 3 personas: Self-buyers, gift givers, corporate. Mỗi persona cần visual khác nhau.',
            result: 'Tạo 3 sets ảnh, mỗi set convert 25-40%',
          },
        ],
      },
      benefits: {
        title: 'Lợi ích khi dùng Visual Intelligence',
        subtitle: 'Những gì bạn sẽ có được',
        list: [
          {
            title: '🎨 Visual match với từng persona',
            description: 'Gen Z: Trendy lifestyle. Millennials: Clean minimalist. Professionals: Elegant studio. Mỗi nhóm thấy ảnh "fit" với taste của họ.',
          },
          {
            title: '📸 Nhiều styles, test dễ dàng',
            description: 'Tạo 6 versions cùng lúc (Studio, Lifestyle, UGC, Infographic, Close-up, GIF). Upload lên store, xem style nào convert tốt.',
          },
          {
            title: '💰 Không cần photographer',
            description: 'Tiết kiệm $50-200/sản phẩm ($5000-20000 cho 100 sản phẩm). Ảnh quality như professional shoot.',
          },
          {
            title: '⚡ Nhanh gấp 100 lần',
            description: 'Photoshoot thật: 1-2 tuần. Dropease: 30 giây/sản phẩm. Với 100 sản phẩm: từ 2 tuần → 50 phút.',
          },
          {
            title: '🎭 Brand consistency',
            description: 'Tất cả ảnh cùng style, cùng vibe. Shop trông professional và cohesive. Build trust.',
          },
          {
            title: '📈 Tăng conversion vì visual đúng',
            description: 'Khách thấy ảnh "speaks their language" → Dừng scroll → Click xem → Mua. Visual phù hợp có thể tăng conversion 30-50%.',
          },
        ],
      },
      demo: {
        title: 'Xem Visual Intelligence trong thực tế',
        subtitle: 'Gallery: 6 image styles được tạo từ cùng 1 ảnh gốc',
      },
      cta: {
        title: 'Sẵn sàng tạo hình ảnh chuyên nghiệp?',
        subtitle: 'Bắt đầu miễn phí 14 ngày. Không cần thẻ tín dụng.',
        button: 'Dùng thử miễn phí',
        backHome: 'Quay lại trang chủ',
      },
    },
    featureAIVisibility: {
      hero: {
        badge: 'Tính năng #4',
        title: 'Xuất hiện khi',
        titleHighlight: 'họ hỏi AI',
        subtitle: 'Gen Z không Google nữa — họ hỏi ChatGPT, Perplexity, Claude. Khi họ hỏi "best minimalist watch under $200?" — sản phẩm của bạn có thể nằm trong câu trả lời.',
        valueProp: 'SEO mới cho kỷ nguyên AI Search',
        ctaPrimary: 'Bắt đầu miễn phí',
        ctaSecondary: 'Xem cách hoạt động',
      },
      problems: {
        title: 'Thế giới đang',
        titleHighlight: 'thay đổi',
        subtitle: 'Cách người ta tìm kiếm sản phẩm đang thay đổi hoàn toàn',
        list: [
          {
            icon: '🔍',
            title: 'SEO truyền thống đang chết dần',
            description: '70% Gen Z & Millennials hỏi AI (ChatGPT, Perplexity) thay vì Google. Nếu sản phẩm không "AI-readable" = invisible cho thế hệ mới.',
          },
          {
            icon: '🤖',
            title: 'AI không hiểu sản phẩm của bạn',
            description: 'Mô tả từ supplier: "High quality product, best price". AI không hiểu "high quality" là gì. Không có context, không xuất hiện trong answers.',
          },
          {
            icon: '📊',
            title: 'Bỏ lỡ traffic từ AI Search',
            description: 'Mỗi ngày có hàng triệu queries trên ChatGPT/Perplexity. Nếu không tối ưu cho AI = mất hàng nghìn potential customers.',
          },
          {
            icon: '⏰',
            title: 'Competitors đã bắt đầu',
            description: 'Các brand lớn đang invest vào AI Search optimization. Bạn chậm 1 năm = mất competitive advantage mãi mãi.',
          },
        ],
      },
      solution: {
        title: 'Dropease giúp sản phẩm',
        titleHighlight: 'sẵn sàng cho AI Search',
        subtitle: 'Tự động tối ưu nội dung để AI engines (ChatGPT, Perplexity, Claude...) hiểu được sản phẩm của bạn — và recommend cho users khi họ hỏi.',
        badge: 'Future-Ready',
      },
      howItWorks: {
        title: 'Cách thức hoạt động',
        subtitle: 'Chỉ 4 bước đơn giản',
        steps: [
          {
            title: 'Semantic structuring',
            description: 'Hệ thống phân tích sản phẩm và chuyển sang dạng semantic data — dạng mà AI models hiểu được (entity, context, intent).',
          },
          {
            title: 'AI-readable metadata',
            description: 'Tự động thêm descriptors: "Best for minimalist fashion", "Perfect for travel", "Luxury aesthetic under $200" — AI dễ match với queries.',
          },
          {
            title: 'Intent mapping',
            description: 'Map nội dung với các search intents phổ biến: "best under $X", "top rated", "eco-friendly" — tăng khả năng xuất hiện.',
          },
          {
            title: 'Deploy & track',
            description: 'Đồng bộ metadata lên store. Theo dõi "AI Visibility Score" — mức độ sẵn sàng cho AI Search Engines.',
          },
        ],
      },
      useCases: {
        title: 'Ai đang dùng',
        titleHighlight: 'tính năng này?',
        subtitle: 'Early adopters đang thắng',
        list: [
          {
            icon: '⌚',
            title: 'Watch Brand (Minimalist)',
            description: 'Query: "best minimalist watch under $200". Sản phẩm của họ xuất hiện trong ChatGPT answer vì metadata có "minimalist aesthetic, affordable luxury".',
            result: 'Traffic từ AI Search tăng 40% trong 3 tháng',
          },
          {
            icon: '🎒',
            title: 'Travel Gear Store',
            description: 'Query: "best travel backpack for digital nomads". Được mention trong Perplexity answer nhờ "travel-optimized, tech-friendly, lightweight" tags.',
            result: 'Conversion từ AI referrals cao hơn 2x Google',
          },
          {
            icon: '🌿',
            title: 'Eco-Friendly Products',
            description: 'Query: "sustainable home products". Xuất hiện trong Claude recommendations vì semantic tags về "eco", "sustainable", "zero-waste".',
            result: 'Brand awareness tăng 3x nhờ AI mentions',
          },
          {
            icon: '🎁',
            title: 'Gift & Lifestyle',
            description: 'Query: "unique gift for creative people". Metadata có "creative professionals, artistic, thoughtful gifts" → Được AI recommend.',
            result: 'AOV từ AI Search cao hơn 35% vs organic',
          },
          {
            icon: '👔',
            title: 'Men\'s Fashion',
            description: 'Query: "business casual for remote work". Semantic optimization giúp sản phẩm match với "work-from-home professional style".',
            result: 'New customer acquisition cost giảm 50%',
          },
          {
            icon: '💄',
            title: 'Beauty & Wellness',
            description: 'Query: "natural skincare for sensitive skin". AI-readable tags về ingredients, skin types giúp được recommend chính xác.',
            result: 'Return rate giảm 25% (right fit customers)',
          },
        ],
      },
      benefits: {
        title: 'Lợi ích khi dùng AI Visibility Boost',
        subtitle: 'Những gì bạn sẽ có được',
        list: [
          {
            title: '🤖 Xuất hiện trong AI answers',
            description: 'Khi users hỏi ChatGPT/Perplexity/Claude về sản phẩm tương tự, sản phẩm của bạn có thể nằm trong recommendations. New traffic source.',
          },
          {
            title: '🚀 Beyond Google SEO',
            description: 'Không cần từ khóa truyền thống. Nội dung được tối ưu cho AI language patterns — future-proof khi AI Search phổ biến.',
          },
          {
            title: '📈 Chất lượng traffic tốt hơn',
            description: 'AI recommend dựa trên semantic match → Khách đến từ AI Search có intent rõ ràng hơn → Conversion rate cao hơn 2-3x.',
          },
          {
            title: '⚡ Tự động hoàn toàn',
            description: 'Không cần học semantic SEO hay structured data. Dropease tự động optimize mỗi khi tạo content. Set & forget.',
          },
          {
            title: '🎯 Competitive advantage',
            description: '95% stores chưa optimize cho AI Search. Bạn làm bây giờ = lead thị trường 1-2 năm trước khi nó mainstream.',
          },
          {
            title: '📊 Track được performance',
            description: 'AI Visibility Score dashboard: Xem mức độ "AI-ready" của từng sản phẩm. Biết sản phẩm nào cần improve.',
          },
        ],
      },
      demo: {
        title: 'Xem AI Visibility Boost trong thực tế',
        subtitle: 'Dashboard tracking: AI readiness score, semantic optimization, visibility metrics',
      },
      cta: {
        title: 'Sẵn sàng cho kỷ nguyên AI Search?',
        subtitle: 'Bắt đầu miễn phí 14 ngày. Không cần thẻ tín dụng.',
        button: 'Dùng thử miễn phí',
        backHome: 'Quay lại trang chủ',
      },
    },
  },

  en: {
    nav: {
      home: 'Home',
      features: 'Features',
      howItWorks: 'How It Works',
      pricing: 'Pricing',
      testimonials: 'Testimonials',
      getStarted: 'Get Started Free',
    },
    hero: {
      badge: 'Built for busy Shopify sellers',
      title: 'Understand your customers,',
      titleHighlight: 'and sell smarter.',
      subtitle:
        'Dropease helps you know exactly who will buy, what they care about, and turns that understanding into product content and visuals that attract buyers and build a professional brand — all in seconds.',
      ctaPrimary: 'Join early access',
      ctaSecondary: 'Watch live demo',
    },
    aiFlow: {
      tagline: 'It all starts with',
      title: 'understanding your customers',
      steps: {
        productData: {
          title: 'Your Products',
          desc: 'Pulls data directly from your Shopify store',
        },
        aiSegmentation: {
          title: 'Discover Buyers',
          desc: 'Identifies the customer groups most likely to buy',
        },
        persona: {
          title: 'Customer Profiles',
          desc: '3 real buyer segments with clear motivations',
        },
        optimizedContent: {
          title: 'Ready-to-Use Content',
          desc: 'Generates tailored product content and visuals for each audience',
        },
      },
    },    
    features: {
      tagline: 'All-in-one solution',
      title: 'Everything you need to',
      titleHighlight: 'understand your customers and sell smarter',
      titleSuffix: '',
      subtitle:
        'From discovering your buyers to creating professional content and visuals — all fast, automated, and brand-consistent',
      list: {
        segmentation: {
          title: 'Customer Insight Discovery',
          desc: 'Identify the top 3 real buyer groups for each product — complete with their pain points, motivations, and communication style.',
        },
        optimization: {
          title: 'Smart Content Creation',
          desc: 'Automatically generates engaging, SEO-friendly titles and descriptions — personalized for each buyer group and structured so AI and search engines can better understand your products.',
        },        
        visuals: {
          title: 'Professional Visual Creation',
          desc: 'Generate studio, lifestyle, and infographic images that fit your brand style — all within seconds.',
        },
        config: {
          title: 'Consistent Brand Voice',
          desc: 'Every product in your store speaks the same language — define once, apply everywhere.',
        },
        sync: {
          title: 'AI Visibility Boost',
          desc: 'Make your products AI-readable so they can appear when shoppers ask ChatGPT, Perplexity, or Claude. The new SEO for the AI Search era.',
        },
        scalable: {
          title: 'Bulk Product Optimization',
          desc: 'Save hours of manual work — optimize hundreds of products at once and scale your catalog effortlessly.',
        },
      },
    },    
    detailedFeatures: {
      tagline: 'Understand better. Sell better.',
      title: 'The complete path from',
      titleHighlight: 'understanding to conversion',
      subtitle:
        'Dropease helps you know exactly who buys, what they care about, and automatically turns that insight into content and visuals that sell.',
      feature1: {
        title: 'Customer Insight Discovery',
        desc: 'No more guessing. Dropease reveals your top 3 real buyer groups — with their pain points, motivations, and the way they want to be spoken to.',
        items: [
          'Understand what customers want and struggle with',
          'See who they are, what they care about, and why they buy',
          'Get tone and channel suggestions that truly resonate',
        ],
      },
      feature2: {
        title: 'Smart Content Creation',
        desc: 'Generate SEO-friendly titles and persuasive descriptions — personalized for each customer group and structured for both humans and AI to understand your product value.',
        items: [
          'Eye-catching titles optimized for search',
          'Clear, structured, and convincing descriptions',
          'Content that speaks customer language and drives trust',
        ],
      },
      feature3: {
        title: 'Professional Visual Creation',
        desc: 'Create beautiful, brand-consistent product images in seconds — no designer or photoshoot needed.',
        items: [
          'Studio-quality photos with clean backgrounds',
          'Lifestyle visuals that fit real-life contexts',
          'Infographics that quickly show key product benefits',
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
      titleHighlight: 'appear in AI Search',
      subtitle: 'From raw products to AI-ready content — get discovered when customers ask AI',
      steps: [
        {
          title: 'Connect Store',
          desc: 'Link your Shopify in 30 seconds. Auto-import products.',
        },
        {
          title: 'Discover Buyers',
          desc: 'AI finds the top 3 customer groups most likely to purchase.',
        },
        {
          title: 'Create AI-Ready Content',
          desc: 'Generate structured content optimized for both Google SEO and AI Search (ChatGPT, Claude...).',
        },
        {
          title: 'Optimize & Deploy',
          desc: 'Your products become AI-readable. Ready to appear in AI-generated answers.',
        },
      ],
      footer: 'The entire process from connection to AI-ready takes',
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
    featureAudience: {
      hero: {
        badge: 'Feature #1',
        title: 'Know exactly',
        titleHighlight: 'who will buy your products',
        subtitle: 'Uncover your top 3 customer profiles for each product — with their pain points, motivations, and tone preferences.',
        valueProp: 'Turn product data into deep audience understanding',
        ctaPrimary: 'Start Free Trial',
        ctaSecondary: 'See How It Works',
      },
      problems: {
        title: 'Are you facing',
        titleHighlight: 'these challenges?',
        subtitle: 'Most Shopify store owners don\'t really know who their customers are',
        list: [
          {
            icon: '😕',
            title: 'Don\'t know who customers really are',
            description: 'Just listing products without understanding who will buy, why they buy, and how to speak to them.',
          },
          {
            icon: '📝',
            title: 'Generic, unengaging content',
            description: 'Copy-pasting descriptions from suppliers. Not SEO-optimized, not speaking customer language.',
          },
          {
            icon: '🎯',
            title: 'Ads cost money but don\'t work',
            description: 'Targeting wrong audience due to lack of customer insights. Wasting Facebook Ads budget.',
          },
          {
            icon: '⏱️',
            title: 'Too much time researching',
            description: 'Have to guess, survey, or A/B test multiple times. Time-consuming with uncertain results.',
          },
        ],
      },
      solution: {
        title: 'Dropease helps you',
        titleHighlight: 'understand customers in seconds',
        subtitle: 'Automatically analyzes products to find the top 3 buyer groups — complete with profiles, pain points, and communication style',
        badge: 'Automatic & Smart',
      },
      howItWorks: {
        title: 'How it works',
        subtitle: 'Just 4 simple steps',
        steps: [
          {
            title: 'Input product information',
            description: 'Connect Shopify or manually enter product details (name, description, price, category).',
          },
          {
            title: 'Automatic analysis & insights',
            description: 'System analyzes product features, pricing, use cases to identify potential customer groups.',
          },
          {
            title: 'Receive 3 complete Customer Profiles',
            description: 'Dropease provides 3 ideal customer groups with: Persona name, Pain points, Motivations, Appropriate tone.',
          },
          {
            title: 'Apply to marketing immediately',
            description: 'Select the most suitable persona. Use insights to create content, run ads, and build effective sales strategies.',
          },
        ],
      },
      useCases: {
        title: 'Who is using',
        titleHighlight: 'this feature?',
        subtitle: 'Real examples from Shopify sellers',
        list: [
          {
            icon: '🎒',
            title: 'Dropshipper',
            description: 'Upload 100 products/week. Need to quickly know who will buy to write suitable descriptions.',
            result: 'Save 80% research time',
          },
          {
            icon: '👗',
            title: 'Fashion Store Owner',
            description: 'Selling clothes but unsure whether to target Gen Z or millennials. Need insights to choose tone.',
            result: '25% increase in product description engagement',
          },
          {
            icon: '🎁',
            title: 'Gift Shop Manager',
            description: 'Products can be sold to many different audiences (self-purchase, gifts). Need clear segmentation.',
            result: 'Created 3 separate campaigns, 40% conversion increase',
          },
          {
            icon: '💼',
            title: 'E-commerce Marketer',
            description: 'Managing 500 products, need quick insights to optimize listings and run ads.',
            result: 'Scaled 3x campaigns with same team size',
          },
          {
            icon: '🏢',
            title: 'Agency',
            description: 'Managing multiple clients, need tool to quickly find insights for each brand.',
            result: 'Deliver insights to clients in 5 minutes instead of 2 days',
          },
          {
            icon: '🖼️',
            title: 'Print-on-Demand Seller',
            description: 'Design many patterns, need to know which fits which group to optimize marketing.',
            result: 'Only focus on top 3 personas, ad ROI increased 3x',
          },
        ],
      },
      benefits: {
        title: 'Benefits of using Audience Insight Discovery',
        subtitle: 'What you will get',
        list: [
          {
            title: '⚡ Fast & automatic',
            description: 'System analyzes and provides insights in seconds. No need for hours of manual research.',
          },
          {
            title: '🎯 Accurate & data-driven',
            description: 'Insights based on intelligent analysis, not guesswork or intuition.',
          },
          {
            title: '💰 Save marketing costs',
            description: 'Target the right audience from the start. Don\'t waste advertising budget on wrong people.',
          },
          {
            title: '📈 Increase conversion rate',
            description: 'Content speaks customer language → Higher conversion rate.',
          },
          {
            title: '🔄 Easy to scale',
            description: 'Apply to hundreds of products at once. No need to analyze each product individually.',
          },
          {
            title: '🧠 Deeper customer understanding',
            description: 'Not just demographics, but also pain points, motivations, and tone preferences.',
          },
        ],
      },
      demo: {
        title: 'See Audience Insight Discovery in action',
        subtitle: 'Demo dashboard and customer profiles',
      },
      cta: {
        title: 'Ready to understand your customers?',
        subtitle: 'Start free 14-day trial. No credit card required.',
        button: 'Start Free Trial',
        backHome: 'Back to Home',
      },
    },
    featureContent: {
      hero: {
        badge: 'Feature #2',
        title: 'Content that speaks',
        titleHighlight: 'customer language',
        subtitle: 'Highlight features they care about. Address their real pain points. Each customer group has different needs — content must be different.',
        valueProp: 'Increase connection with real customers, not just optimize for search engines',
        ctaPrimary: 'Start Free Trial',
        ctaSecondary: 'See Demo',
      },
      problems: {
        title: 'Are you facing',
        titleHighlight: 'these challenges?',
        subtitle: 'Generic content doesn\'t resonate with anyone',
        list: [
          {
            icon: '🗣️',
            title: 'Writing features nobody cares about',
            description: 'List technical specs ("100% cotton material") without benefits. Gen Z cares about style, millennials care about quality — but your content is generic.',
          },
          {
            icon: '💔',
            title: 'Not addressing real pain points',
            description: 'Busy moms buy backpacks for "easy to organize kids stuff", not "modern design". But your description only talks about design, not real use cases.',
          },
          {
            icon: '🎭',
            title: 'Wrong tone for audience',
            description: 'Selling to Gen Z but writing formal tone like newspaper. Or targeting businesspeople but using teen slang. Wrong tone = lost connection.',
          },
          {
            icon: '📋',
            title: 'Copy-paste from suppliers',
            description: 'Generic descriptions from Aliexpress/CJDropshipping. Doesn\'t speak local market language. Same as 1000 other stores.',
          },
        ],
      },
      solution: {
        title: 'Dropease helps you',
        titleHighlight: 'write content for each specific customer group',
        subtitle: 'Highlight features they care about. Solve their real pain points. Use tone they resonate with. All automatic based on persona you select.',
        badge: 'Personalized & Effective',
      },
      howItWorks: {
        title: 'How it works',
        subtitle: 'Just 4 simple steps',
        steps: [
          {
            title: 'Select target persona',
            description: 'Choose 1 of 3 customer groups analyzed (from Audience Insight Discovery).',
          },
          {
            title: 'System creates content',
            description: 'Automatically generate SEO-friendly titles, structured descriptions, bullet points, and product benefits tailored to persona.',
          },
          {
            title: 'Preview & edit',
            description: 'Review content, adjust tone or keywords if needed. Or keep as-is if satisfied.',
          },
          {
            title: 'Apply to multiple products',
            description: 'Apply to hundreds of products at once. Scale your entire catalog quickly.',
          },
        ],
      },
      useCases: {
        title: 'Who is using',
        titleHighlight: 'this feature?',
        subtitle: 'Real stories from Shopify sellers',
        list: [
          {
            icon: '📦',
            title: 'Dropshipper (100+ products/week)',
            description: 'Upload hundreds of products from Aliexpress/CJDropshipping. Need unique, SEO content fast.',
            result: 'Save 90% time writing descriptions',
          },
          {
            icon: '👔',
            title: 'Fashion Store Owner',
            description: 'Has 500 clothing products. Want compelling descriptions for each segment (Gen Z, Millennials, Luxury).',
            result: 'Increase 35% click-through rate on product pages',
          },
          {
            icon: '🏠',
            title: 'Home Decor Seller',
            description: 'Furniture products need detailed descriptions of materials, dimensions, use cases. Very time-consuming.',
            result: 'From 60 min/product → 2 min/product',
          },
          {
            icon: '⌚',
            title: 'Watch & Accessories Shop',
            description: 'Need to highlight technical features while keeping it easy to understand. Hard to balance specs and storytelling.',
            result: 'Conversion rate increased 28%',
          },
          {
            icon: '💄',
            title: 'Beauty & Cosmetics Brand',
            description: 'Beauty products need friendly tone, ingredients list, clear benefits. Content must be accurate.',
            result: 'Average order value increased 22%',
          },
          {
            icon: '🎮',
            title: 'Gaming & Tech Store',
            description: 'Tech products need to balance specs and user benefits. Target audience is young gamers.',
            result: 'Engagement increased 40%, return rate decreased 15%',
          },
        ],
      },
      benefits: {
        title: 'Benefits of using Smart Content Creation',
        subtitle: 'What you will get',
        list: [
          {
            title: '🎯 Content speaks customer language',
            description: 'Gen Z likes "trendy, aesthetic". Millennials like "quality, value". Each persona has their own tone and words — content auto-adjusts.',
          },
          {
            title: '💡 Highlight features they care about',
            description: 'Gift buyers care about "beautiful packaging", personal users like "practical". Content automatically selects right features to emphasize.',
          },
          {
            title: '🗣️ Address real pain points',
            description: 'Busy moms: "Easy to clean, waterproof". Office workers: "Lightweight, laptop fits". Professionals: "Elegant, durable". Each persona has different pain points.',
          },
          {
            title: '⚡ Super fast - 5 seconds done',
            description: 'Create title + description + benefits in 5 seconds. No need to spend 30-60 min thinking "how to write well".',
          },
          {
            title: '📈 Increase conversion with relevant content',
            description: 'Customers see content "speaking about them" → Trust increases → Click "Buy now". Conversion can increase 25-40%.',
          },
          {
            title: '🚀 Scale fast with multiple personas',
            description: 'Same product, create 3 versions for 3 different personas. Test which version converts best.',
          },
        ],
      },
      demo: {
        title: 'See Smart Content Creation in action',
        subtitle: 'Demo interface for content generation & result preview',
      },
      cta: {
        title: 'Ready to create professional content?',
        subtitle: 'Start free 14-day trial. No credit card required.',
        button: 'Start Free Trial',
        backHome: 'Back to Home',
      },
    },
    featureVisual: {
      hero: {
        badge: 'Feature #3',
        title: 'Visuals that match',
        titleHighlight: 'customer style',
        subtitle: 'Gen Z likes trendy lifestyle shots. Businesspeople like professional studio. Each customer group has their visual style — images must match.',
        valueProp: 'Create multiple styles for multiple personas',
        ctaPrimary: 'Start Free Trial',
        ctaSecondary: 'See Gallery',
      },
      problems: {
        title: 'Are you facing',
        titleHighlight: 'these challenges?',
        subtitle: 'Product images aren\'t attractive enough and don\'t fit your customers',
        list: [
          {
            icon: '📸',
            title: 'Ugly supplier photos',
            description: 'Photos from Aliexpress: messy background, bad lighting, low quality. Gen Z scrolls past in 0.5 seconds because images "look cheap".',
          },
          {
            icon: '🎨',
            title: 'No consistent style',
            description: 'Each product has different photo style. No visual identity. Store looks unprofessional and lacks brand.',
          },
          {
            icon: '💰',
            title: 'Photographers too expensive',
            description: 'Professional photoshoot: $50-200/product. With 100 products = $5000-20000. Too expensive for small business.',
          },
          {
            icon: '🎭',
            title: 'Style doesn\'t match audience',
            description: 'Targeting Gen Z but photos formal like catalog. Or targeting professionals but photos too casual. Wrong style = lost trust.',
          },
        ],
      },
      imageTypes: {
        tagline: '6 Styles for every need',
        title: 'Create the style they like to see',
        subtitle: 'Each persona has different visual preferences. Create multiple versions to test which style converts best',
        bestFor: 'Best for',
        list: [
          {
            icon: '🎬',
            title: 'Studio Shot',
            description: 'Clean white background, professional lighting, product focus. Classic style that always works.',
            bestFor: 'E-commerce listings, catalog, professional',
          },
          {
            icon: '🌅',
            title: 'Lifestyle Shot',
            description: 'Product in real usage context. Outdoor, indoor, with people. Creates emotional connection.',
            bestFor: 'Instagram, Gen Z, millennials, storytelling',
          },
          {
            icon: '📊',
            title: 'Infographic',
            description: 'Highlight features, specs, dimensions with visual aids. Easy to understand complex specs.',
            bestFor: 'Tech products, furniture, complex items',
          },
          {
            icon: '🎥',
            title: 'UGC Style',
            description: 'Looks like real people took it (iPhone style). Authentic, relatable, not too polished.',
            bestFor: 'Social proof, TikTok, young audience',
          },
          {
            icon: '🔍',
            title: 'Close-up Shot',
            description: 'Zoom into details: material, texture, craftsmanship. Show quality.',
            bestFor: 'Luxury items, quality-focused customers',
          },
          {
            icon: '✨',
            title: 'GIF/Animated',
            description: '360° view, motion graphics, animation. Catch attention in feed.',
            bestFor: 'Social media, product demos, engagement',
          },
        ],
      },
      howItWorks: {
        title: 'How it works',
        subtitle: 'Just 4 simple steps',
        steps: [
          {
            title: 'Upload original photo',
            description: 'Current supplier photo (even if ugly). Or self-taken phone photo.',
          },
          {
            title: 'Choose style & persona',
            description: 'Select image style (Studio, Lifestyle, UGC...) and target persona. System generates accordingly.',
          },
          {
            title: 'Create multiple versions',
            description: 'Generate 3-6 different versions: Studio for listing, Lifestyle for Instagram, UGC for TikTok.',
          },
          {
            title: 'Test & scale',
            description: 'Upload to store, test which style converts best. Apply that style to entire catalog.',
          },
        ],
      },
      useCases: {
        title: 'Who is using',
        titleHighlight: 'this feature?',
        subtitle: 'Real examples from Shopify sellers',
        list: [
          {
            icon: '👗',
            title: 'Fashion Brand (Target Gen Z)',
            description: 'Supplier photos too formal. Need trendy lifestyle shots for Instagram. Created UGC style + Lifestyle shots.',
            result: 'Instagram engagement increased 65%',
          },
          {
            icon: '🏠',
            title: 'Home Decor Store',
            description: '200 furniture products with boring catalog photos. Need lifestyle shots showing products in real rooms.',
            result: 'Time on page +45%, conversion +30%',
          },
          {
            icon: '⌚',
            title: 'Watch & Accessories',
            description: 'Target both Gen Z (casual) and professionals (elegant). Need 2 sets of photos with different vibes.',
            result: 'AOV +35% thanks to clear audience segmentation',
          },
          {
            icon: '💄',
            title: 'Beauty Brand',
            description: 'Skincare products need clean photos + infographic showing ingredients. And lifestyle shots for social.',
            result: 'Return rate -20% (customers understand product)',
          },
          {
            icon: '🎮',
            title: 'Gaming Gear Shop',
            description: 'Supplier photos not cool. Target young gamers need gaming vibe photos: RGB, dark background, dynamic.',
            result: 'CTR +50%, brand recall +40%',
          },
          {
            icon: '🎁',
            title: 'Gift & Lifestyle Store',
            description: 'Selling to 3 personas: Self-buyers, gift givers, corporate. Each persona needs different visual.',
            result: 'Created 3 photo sets, each converts 25-40%',
          },
        ],
      },
      benefits: {
        title: 'Benefits of using Visual Intelligence',
        subtitle: 'What you will get',
        list: [
          {
            title: '🎨 Visuals match each persona',
            description: 'Gen Z: Trendy lifestyle. Millennials: Clean minimalist. Professionals: Elegant studio. Each group sees photos that "fit" their taste.',
          },
          {
            title: '📸 Multiple styles, easy testing',
            description: 'Create 6 versions at once (Studio, Lifestyle, UGC, Infographic, Close-up, GIF). Upload to store, see which style converts best.',
          },
          {
            title: '💰 No photographer needed',
            description: 'Save $50-200/product ($5000-20000 for 100 products). Photo quality like professional shoot.',
          },
          {
            title: '⚡ 100x faster',
            description: 'Real photoshoot: 1-2 weeks. Dropease: 30 seconds/product. For 100 products: from 2 weeks → 50 minutes.',
          },
          {
            title: '🎭 Brand consistency',
            description: 'All photos same style, same vibe. Store looks professional and cohesive. Build trust.',
          },
          {
            title: '📈 Increase conversion with right visuals',
            description: 'Customers see photos "speaking their language" → Stop scrolling → Click to view → Buy. Right visuals can increase conversion 30-50%.',
          },
        ],
      },
      demo: {
        title: 'See Visual Intelligence in action',
        subtitle: 'Gallery: 6 image styles generated from same original photo',
      },
      cta: {
        title: 'Ready to create professional images?',
        subtitle: 'Start free 14-day trial. No credit card required.',
        button: 'Start Free Trial',
        backHome: 'Back to Home',
      },
    },
    featureAIVisibility: {
      hero: {
        badge: 'Feature #4',
        title: 'Appear when',
        titleHighlight: 'they ask AI',
        subtitle: 'Gen Z doesn\'t Google anymore — they ask ChatGPT, Perplexity, Claude. When they ask "best minimalist watch under $200?" — your products can be in the answer.',
        valueProp: 'New SEO for the AI Search era',
        ctaPrimary: 'Start Free Trial',
        ctaSecondary: 'See how it works',
      },
      problems: {
        title: 'The world is',
        titleHighlight: 'changing',
        subtitle: 'How people discover products is completely transforming',
        list: [
          {
            icon: '🔍',
            title: 'Traditional SEO is dying',
            description: '70% of Gen Z & Millennials ask AI (ChatGPT, Perplexity) instead of Google. If products aren\'t "AI-readable" = invisible to new generation.',
          },
          {
            icon: '🤖',
            title: 'AI doesn\'t understand your products',
            description: 'Supplier descriptions: "High quality product, best price". AI doesn\'t understand what "high quality" means. No context, no appearance in answers.',
          },
          {
            icon: '📊',
            title: 'Missing traffic from AI Search',
            description: 'Millions of daily queries on ChatGPT/Perplexity. Not optimized for AI = losing thousands of potential customers.',
          },
          {
            icon: '⏰',
            title: 'Competitors already started',
            description: 'Big brands are investing in AI Search optimization. You wait 1 year = lose competitive advantage forever.',
          },
        ],
      },
      solution: {
        title: 'Dropease makes products',
        titleHighlight: 'ready for AI Search',
        subtitle: 'Automatically optimize content so AI engines (ChatGPT, Perplexity, Claude...) understand your products — and recommend them when users ask.',
        badge: 'Future-Ready',
      },
      howItWorks: {
        title: 'How it works',
        subtitle: 'Just 4 simple steps',
        steps: [
          {
            title: 'Semantic structuring',
            description: 'System analyzes products and converts to semantic data — format that AI models understand (entity, context, intent).',
          },
          {
            title: 'AI-readable metadata',
            description: 'Automatically adds descriptors: "Best for minimalist fashion", "Perfect for travel", "Luxury aesthetic under $200" — AI easily matches with queries.',
          },
          {
            title: 'Intent mapping',
            description: 'Maps content with common search intents: "best under $X", "top rated", "eco-friendly" — increases appearance probability.',
          },
          {
            title: 'Deploy & track',
            description: 'Syncs metadata to store. Track "AI Visibility Score" — readiness level for AI Search Engines.',
          },
        ],
      },
      useCases: {
        title: 'Who is using',
        titleHighlight: 'this feature?',
        subtitle: 'Early adopters are winning',
        list: [
          {
            icon: '⌚',
            title: 'Watch Brand (Minimalist)',
            description: 'Query: "best minimalist watch under $200". Their products appear in ChatGPT answer because metadata has "minimalist aesthetic, affordable luxury".',
            result: 'Traffic from AI Search +40% in 3 months',
          },
          {
            icon: '🎒',
            title: 'Travel Gear Store',
            description: 'Query: "best travel backpack for digital nomads". Mentioned in Perplexity answer thanks to "travel-optimized, tech-friendly, lightweight" tags.',
            result: 'Conversion from AI referrals 2x higher than Google',
          },
          {
            icon: '🌿',
            title: 'Eco-Friendly Products',
            description: 'Query: "sustainable home products". Appears in Claude recommendations due to semantic tags about "eco", "sustainable", "zero-waste".',
            result: 'Brand awareness +3x from AI mentions',
          },
          {
            icon: '🎁',
            title: 'Gift & Lifestyle',
            description: 'Query: "unique gift for creative people". Metadata has "creative professionals, artistic, thoughtful gifts" → AI recommends.',
            result: 'AOV from AI Search +35% vs organic',
          },
          {
            icon: '👔',
            title: 'Men\'s Fashion',
            description: 'Query: "business casual for remote work". Semantic optimization helps products match "work-from-home professional style".',
            result: 'Customer acquisition cost -50%',
          },
          {
            icon: '💄',
            title: 'Beauty & Wellness',
            description: 'Query: "natural skincare for sensitive skin". AI-readable tags about ingredients, skin types help accurate recommendations.',
            result: 'Return rate -25% (right fit customers)',
          },
        ],
      },
      benefits: {
        title: 'Benefits of using AI Visibility Boost',
        subtitle: 'What you will get',
        list: [
          {
            title: '🤖 Appear in AI answers',
            description: 'When users ask ChatGPT/Perplexity/Claude about similar products, yours can be in recommendations. New traffic source.',
          },
          {
            title: '🚀 Beyond Google SEO',
            description: 'No need for traditional keywords. Content optimized for AI language patterns — future-proof as AI Search becomes mainstream.',
          },
          {
            title: '📈 Better traffic quality',
            description: 'AI recommends based on semantic match → Customers from AI Search have clearer intent → Conversion rate 2-3x higher.',
          },
          {
            title: '⚡ Fully automatic',
            description: 'No need to learn semantic SEO or structured data. Dropease auto-optimizes every time you create content. Set & forget.',
          },
          {
            title: '🎯 Competitive advantage',
            description: '95% of stores haven\'t optimized for AI Search. You do it now = lead market 1-2 years before it goes mainstream.',
          },
          {
            title: '📊 Track performance',
            description: 'AI Visibility Score dashboard: See "AI-readiness" level of each product. Know which products need improvement.',
          },
        ],
      },
      demo: {
        title: 'See AI Visibility Boost in action',
        subtitle: 'Dashboard tracking: AI readiness score, semantic optimization, visibility metrics',
      },
      cta: {
        title: 'Ready for the AI Search era?',
        subtitle: 'Start free 14-day trial. No credit card required.',
        button: 'Start Free Trial',
        backHome: 'Back to Home',
      },
    },
  },
}

