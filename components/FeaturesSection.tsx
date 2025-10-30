'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { PieChart, UserCheck, Image, Settings2, RefreshCw, TrendingUp, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAnalytics } from '@/hooks/useAnalytics'
import Link from 'next/link'

/**
 * Features Section - Tính năng của Dropease
 * AI Segmentation, Persona Optimization, AI Visuals, Unified Config, Shopify Sync, Scalable Workflow
 */
const FeaturesSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { t } = useLanguage()
  const { trackClick, trackFeatureView } = useAnalytics()

  const features = [
    {
      icon: PieChart,
      title: t('features.list.segmentation.title'),
      description: t('features.list.segmentation.desc'),
      gradient: 'from-purple-500 to-pink-500',
      link: '/features/audience-insight', // Link to detail page
    },
    {
      icon: UserCheck,
      title: t('features.list.optimization.title'),
      description: t('features.list.optimization.desc'),
      gradient: 'from-blue-500 to-cyan-500',
      link: '/features/smart-content', // Link to detail page
    },
    {
      icon: Image,
      title: t('features.list.visuals.title'),
      description: t('features.list.visuals.desc'),
      gradient: 'from-violet-500 to-purple-500',
      link: '/features/visual-intelligence', // Link to detail page
    },
    {
      icon: Settings2,
      title: t('features.list.config.title'),
      description: t('features.list.config.desc'),
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      icon: RefreshCw,
      title: t('features.list.sync.title'),
      description: t('features.list.sync.desc'),
      gradient: 'from-orange-500 to-red-500',
      link: '/features/ai-visibility', // Link to detail page
    },
    {
      icon: TrendingUp,
      title: t('features.list.scalable.title'),
      description: t('features.list.scalable.desc'),
      gradient: 'from-cyan-500 to-blue-500',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
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

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-accent-cyan font-semibold mb-4 uppercase tracking-wider text-sm">
            {t('features.tagline')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('features.title')}{' '}
            <span className="bg-gradient-to-r from-accent-violet to-accent-cyan bg-clip-text text-transparent">
              {t('features.titleHighlight')}
            </span>
            {' '}{t('features.titleSuffix')}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            const CardContent = (
              <>
                {/* Animated border gradient */}
                <div className="absolute -inset-[1px] bg-gradient-to-r from-accent-violet via-accent-cyan to-accent-violet rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm animate-[spin_4s_linear_infinite]" />
                
                {/* Card container */}
                <div className="relative h-full p-8 rounded-2xl bg-dark-surface border border-white/5 transition-all duration-300 overflow-hidden">
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br from-accent-violet to-accent-cyan" />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon with gradient */}
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} bg-opacity-10 mb-6`}>
                      <Icon size={32} className="text-accent-cyan" strokeWidth={1.5} />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold mb-3 text-white flex items-center justify-between">
                      <span>{feature.title}</span>
                      {(feature as any).link && (
                        <ArrowRight size={20} className="text-accent-cyan group-hover:translate-x-1 transition-transform" />
                      )}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    {(feature as any).link && (
                      <div className="mt-4 text-sm text-accent-cyan font-semibold group-hover:underline">
                        Learn more →
                      </div>
                    )}
                  </div>
                </div>
              </>
            )
            
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group relative"
              >
                {(feature as any).link ? (
                  <Link 
                    href={(feature as any).link} 
                    className="block"
                    onClick={() => {
                      trackClick('feature_card', feature.title)
                      trackFeatureView(feature.title)
                    }}
                  >
                    {CardContent}
                  </Link>
                ) : (
                  CardContent
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturesSection
