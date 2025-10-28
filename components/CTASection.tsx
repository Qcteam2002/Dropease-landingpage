'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

/**
 * Final CTA Section - Dropease
 */
const CTASection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { t } = useLanguage()

  return (
    <section className="relative py-32 px-6 overflow-hidden" ref={ref}>
      {/* Background gradient radial */}
      <div className="absolute inset-0 bg-dark" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(139,92,246,0.2)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Headline */}
          <h2 className="text-4xl md:text-6xl font-bold mb-12 leading-tight">
            {t('cta.title')}{' '}
            <span className="bg-gradient-to-r from-accent-violet to-accent-cyan bg-clip-text text-transparent">
              {t('cta.titleHighlight')}
            </span>
            {t('cta.titleSuffix')}
          </h2>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-8 py-4 rounded-lg bg-gradient-to-r from-accent-violet to-accent-cyan font-semibold text-white overflow-hidden"
          >
            {/* Animated glow effect */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 bg-gradient-to-r from-accent-violet to-accent-cyan blur-xl"
            />
            
            <span className="relative">{t('cta.button')}</span>
          </motion.button>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500 mt-12">
            {(t('cta.features') as any).map((feature: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                {index > 0 && <div className="w-px h-4 bg-white/10 mr-8" />}
                <svg
                  className="w-5 h-5 text-accent-cyan"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTASection
