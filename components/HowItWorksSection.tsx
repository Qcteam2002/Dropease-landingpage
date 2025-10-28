'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

/**
 * How It Works Section
 * 4 bước: Connect Shopify → Discover Buyers → Generate Content → Push to Shopify
 */
const HowItWorksSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { t } = useLanguage()

  const steps = [
    {
      number: '01',
      title: t('howItWorks.steps.0.title'),
      description: t('howItWorks.steps.0.desc'),
    },
    {
      number: '02',
      title: t('howItWorks.steps.1.title'),
      description: t('howItWorks.steps.1.desc'),
    },
    {
      number: '03',
      title: t('howItWorks.steps.2.title'),
      description: t('howItWorks.steps.2.desc'),
    },
    {
      number: '04',
      title: t('howItWorks.steps.3.title'),
      description: t('howItWorks.steps.3.desc'),
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
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-accent-cyan font-semibold mb-4 uppercase tracking-wider text-sm">
            {t('howItWorks.tagline')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('howItWorks.title')}{' '}
            <span className="bg-gradient-to-r from-accent-violet to-accent-cyan bg-clip-text text-transparent">
              {t('howItWorks.titleHighlight')}
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t('howItWorks.subtitle')}
          </p>
        </motion.div>

        {/* Steps grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              <div className="relative h-full p-8 rounded-2xl bg-dark-secondary border border-accent-violet/20 hover:border-accent-violet/50 transition-all duration-300 text-center">
                {/* Step number */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-violet/10 border border-accent-violet/30 mb-6 group-hover:bg-accent-violet/20 group-hover:border-accent-violet/50 transition-all">
                  <span className="text-2xl font-bold text-accent-violet">
                    {step.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-4 text-white">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed">
                  {step.description}
                </p>

                {/* Decorative glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-violet/5 to-accent-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              </div>

              {/* Connector arrow (không hiển thị cho step cuối) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <motion.div
                    animate={{
                      x: [0, 5, 0],
                      opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="text-accent-violet text-2xl"
                  >
                    →
                  </motion.div>
                </div>
              )}
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
          <p className="text-gray-400">
            {t('howItWorks.footer')}{' '}
            <span className="text-accent-cyan font-semibold">{t('howItWorks.footerHighlight')}</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorksSection

