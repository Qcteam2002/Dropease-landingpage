'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Brain, Wand2, Image as ImageIcon } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

/**
 * Detailed Features Section
 * Chi tiết 3 tính năng chính với hình ảnh/video minh họa
 * Layout: Text + Visual alternating
 */
const DetailedFeaturesSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { t } = useLanguage()

  const detailedFeatures = [
    {
      icon: Brain,
      title: t('detailedFeatures.feature1.title'),
      description: t('detailedFeatures.feature1.desc'),
      features: t('detailedFeatures.feature1.items') as any,
      imagePlaceholder: 'AI Segmentation Dashboard',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Wand2,
      title: t('detailedFeatures.feature2.title'),
      description: t('detailedFeatures.feature2.desc'),
      features: t('detailedFeatures.feature2.items') as any,
      imagePlaceholder: 'Content Generation Interface',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: ImageIcon,
      title: t('detailedFeatures.feature3.title'),
      description: t('detailedFeatures.feature3.desc'),
      features: t('detailedFeatures.feature3.items') as any,
      imagePlaceholder: 'AI Image Generator',
      gradient: 'from-violet-500 to-purple-500',
    },
  ]

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-dark-secondary" ref={ref}>
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-accent-cyan font-semibold mb-4 uppercase tracking-wider text-sm">
            {t('detailedFeatures.tagline')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('detailedFeatures.title')}{' '}
            <span className="bg-gradient-to-r from-accent-violet to-accent-cyan bg-clip-text text-transparent">
              {t('detailedFeatures.titleHighlight')}
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t('detailedFeatures.subtitle')}
          </p>
        </motion.div>

        {/* Features detail */}
        {detailedFeatures.map((feature, index) => {
          const Icon = feature.icon
          const isReversed = index % 2 !== 0

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 last:mb-0 ${
                isReversed ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div className={`${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.gradient} bg-opacity-10 mb-6`}>
                  <Icon size={40} className="text-accent-cyan" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="text-3xl font-bold mb-4 text-white">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* Features list */}
                <ul className="space-y-4">
                  {feature.features.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-cyan/20 flex items-center justify-center mt-1">
                        <svg
                          className="w-3.5 h-3.5 text-accent-cyan"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-300 text-base leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual/Image */}
              <div className={`${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="relative group"
                >
                  {/* Image container với placeholder */}
                  <div className="relative rounded-2xl border border-white/10 overflow-hidden bg-dark-surface shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:border-accent-cyan/30 transition-all">
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-10`} />
                    
                    {/* Placeholder content */}
                    <div className="aspect-video flex flex-col items-center justify-center p-12 relative z-10">
                      <Icon size={80} className="text-accent-cyan/30 mb-6" strokeWidth={1} />
                      <p className="text-gray-400 text-center text-lg font-medium">
                        {feature.imagePlaceholder}
                      </p>
                      <p className="text-gray-500 text-sm mt-2">
                        Preview / Demo / Video
                      </p>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/50" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                      <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                  </div>

                  {/* Glow effect */}
                  <div className={`absolute -inset-4 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity -z-10`} />
                </motion.div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

export default DetailedFeaturesSection

