'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAnalytics } from '@/hooks/useAnalytics'

/**
 * Pricing Section - Bảng giá Dropease
 * Plans: Free, Pro ($49/mo), Enterprise (Custom)
 */
const PricingSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { t, language } = useLanguage()
  const { trackCTAClick, trackClick } = useAnalytics()

  const pricingTiers = [
    {
      name: t('pricing.plans.free.name'),
      price: '$0',
      period: language === 'vi' ? '/tháng' : '/mo',
      description: t('pricing.plans.free.desc'),
      features: [
        '10 sản phẩm',
        'AI Segmentation cơ bản',
        '20 lần tạo nội dung AI',
        '10 lần tạo hình ảnh AI',
      ],
      cta: t('pricing.plans.free.cta'),
      popular: false,
    },
    {
      name: t('pricing.plans.pro.name'),
      price: '$49',
      period: language === 'vi' ? '/tháng' : '/mo',
      description: t('pricing.plans.pro.desc'),
      features: [
        '500 sản phẩm',
        'AI Segmentation nâng cao',
        'Unlimited tạo nội dung',
        '200 lần tạo hình ảnh AI',
        'Tối ưu hàng loạt',
        'Priority support 24/7',
      ],
      cta: t('pricing.plans.pro.cta'),
      popular: true,
    },
    {
      name: t('pricing.plans.enterprise.name'),
      price: t('pricing.plans.enterprise.price'),
      period: '',
      description: t('pricing.plans.enterprise.desc'),
      features: [
        'Unlimited sản phẩm',
        'Custom AI models',
        'Unlimited AI generations',
        'Dedicated support',
        'API access',
        'SLA 99.99%',
      ],
      cta: t('pricing.plans.enterprise.cta'),
      popular: false,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className="relative py-24 px-6 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-dark" />
      
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-violet/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('pricing.title')}{' '}
            <span className="bg-gradient-to-r from-accent-violet to-accent-cyan bg-clip-text text-transparent">
              {t('pricing.titleHighlight')}
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t('pricing.subtitle')}
          </p>
        </motion.div>

        {/* Pricing cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: tier.popular ? 1.02 : 1.03, y: -8 }}
              className={`relative ${tier.popular ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              {/* Popular badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-accent-violet to-accent-cyan text-white text-sm font-semibold shadow-lg">
                    {t('pricing.popular')}
                  </div>
                </div>
              )}

              {/* Card */}
              <div
                className={`relative h-full p-8 rounded-2xl border transition-all duration-300 overflow-hidden ${
                  tier.popular
                    ? 'bg-dark-surface border-accent-violet/50 shadow-[0_0_60px_rgba(139,92,246,0.3)]'
                    : 'bg-dark-surface border-white/5 hover:border-white/20'
                }`}
              >
                {/* Gradient overlay for popular plan */}
                {tier.popular && (
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-violet/10 to-accent-cyan/10" />
                )}

                <div className="relative z-10">
                  {/* Plan name */}
                  <h3 className={`text-2xl font-bold mb-2 ${tier.popular ? 'text-accent-cyan' : 'text-white'}`}>
                    {tier.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-6">
                    {tier.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-bold text-white">
                        {tier.price}
                      </span>
                      {tier.period && (
                        <span className="text-gray-400">{tier.period}</span>
                      )}
                    </div>
                  </div>

                  {/* CTA button */}
                  <button
                    onClick={() => trackCTAClick(tier.cta, `pricing_${tier.name.toLowerCase()}`)}
                    className={`w-full py-3.5 rounded-lg font-semibold transition-all duration-300 mb-8 ${
                      tier.popular
                        ? 'bg-gradient-to-r from-accent-violet to-accent-cyan text-white hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:scale-105'
                        : 'bg-dark border border-accent-cyan text-accent-cyan hover:bg-accent-cyan/10'
                    }`}
                  >
                    {tier.cta}
                  </button>

                  {/* Features list */}
                  <ul className="space-y-4">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-accent-cyan/20">
                          <Check size={14} strokeWidth={3} className="text-accent-cyan" />
                        </div>
                        <span className="text-gray-300 text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-2">
            {t('pricing.footer')}
          </p>
          <button 
            onClick={() => trackClick('compare_plans', 'pricing_section')}
            className="text-accent-cyan hover:text-accent-violet transition-colors font-semibold"
          >
            {t('pricing.compareLink')}
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default PricingSection
