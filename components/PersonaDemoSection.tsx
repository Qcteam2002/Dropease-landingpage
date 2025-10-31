'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

/**
 * Persona Demo Section
 * Hiển thị 3 customer personas mẫu: Festival Enthusiast, Urban Minimalist, Luxury Gifter
 */
const PersonaDemoSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { t } = useLanguage()

  const personas = t('personas.list')

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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-dark-secondary" ref={ref}>
      {/* Decorative gradients */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent-violet/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-accent-cyan font-semibold mb-4 uppercase tracking-wider text-sm">
            {t('personas.tagline')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('personas.title')}{' '}
            <span className="bg-gradient-to-r from-accent-violet to-accent-cyan bg-clip-text text-transparent">
              {t('personas.titleHighlight')}
            </span>
            {t('personas.titleSuffix') && ' ' + t('personas.titleSuffix')}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t('personas.subtitle')}
          </p>
        </motion.div>

        {/* Persona cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {personas.map((persona: any, index: number) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.03, y: -8 }}
              className="group relative"
            >
              <div className="relative h-full p-8 rounded-2xl bg-dark-surface border border-white/10 hover:border-accent-violet/50 transition-all duration-300 overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br ${persona.gradient}`} />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Title with gradient */}
                  <h3 className="text-xl font-bold mb-6 text-gray-100">
                    {persona.title}
                  </h3>

                  {/* Pain Point */}
                  <div className="mb-6">
                    <p className="text-sm font-medium text-gray-400 mb-2">
                      Pain Point:
                    </p>
                    <p className="text-base text-gray-300 italic leading-relaxed">
                      "{persona.painPoint}"
                    </p>
                  </div>

                  {/* Tone tags */}
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-gray-400 font-medium">Tone:</span>
                    {persona.tones.map((tone: any, toneIndex: number) => (
                      <span
                        key={toneIndex}
                        className="px-3 py-1 rounded-md bg-accent-violet/20 text-accent-violet text-sm font-medium"
                      >
                        {tone}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Decorative corner gradient */}
                <div className={`absolute -bottom-12 -right-12 w-32 h-32 bg-gradient-to-br ${persona.gradient} rounded-full opacity-10 group-hover:opacity-20 transition-opacity blur-2xl`} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-4">
            {t('personas.footer')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default PersonaDemoSection

