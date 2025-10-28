'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Quote, Star } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

/**
 * Testimonials Section - Đánh giá từ Shopify merchants
 */
const TestimonialsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { t } = useLanguage()

  const testimonials = t('testimonials.list')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
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
            {t('testimonials.tagline')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('testimonials.title')}{' '}
            <span className="bg-gradient-to-r from-accent-violet to-accent-cyan bg-clip-text text-transparent">
              {t('testimonials.titleHighlight')}
            </span>
          </h2>
        </motion.div>

        {/* Testimonials grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial: any, index: number) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative"
            >
              <div className="relative h-full p-8 rounded-2xl bg-dark-surface border-l-4 border-accent-cyan hover:border-accent-violet transition-all duration-300 overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br from-accent-violet to-accent-cyan" />

                <div className="relative z-10">
                  {/* Quote icon */}
                  <div className="mb-4 text-accent-violet opacity-30">
                    <Quote size={32} fill="currentColor" />
                  </div>

                  {/* Quote text */}
                  <p className="text-gray-300 leading-relaxed mb-6">
                    "{testimonial.quote}"
                  </p>

                  {/* Author info */}
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-violet to-accent-cyan p-[2px]">
                      <div className="w-full h-full rounded-full bg-dark-surface flex items-center justify-center overflow-hidden">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Name and role */}
                    <div>
                      <p className="font-semibold text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 p-8 rounded-2xl bg-dark-surface border border-white/5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-accent-violet to-accent-cyan bg-clip-text text-transparent mb-2">
                10,000+
              </div>
              <p className="text-gray-400">{t('testimonials.stats.products')}</p>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-accent-violet to-accent-cyan bg-clip-text text-transparent mb-2">
                80%
              </div>
              <p className="text-gray-400">{t('testimonials.stats.timeSaved')}</p>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-accent-violet to-accent-cyan bg-clip-text text-transparent mb-2">
                15%
              </div>
              <p className="text-gray-400">{t('testimonials.stats.conversion')}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsSection
