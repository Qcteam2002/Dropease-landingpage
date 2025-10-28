'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Database, BrainCircuit, Users, Wand2 } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

/**
 * AI Insight Flow Section
 * Hiển thị quy trình: Product Data → AI Segmentation → Persona → Optimized Content
 */
const AIInsightFlow = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { t } = useLanguage()

  const flowSteps = [
    {
      icon: Database,
      title: t('aiFlow.steps.productData.title'),
      description: t('aiFlow.steps.productData.desc'),
    },
    {
      icon: BrainCircuit,
      title: t('aiFlow.steps.aiSegmentation.title'),
      description: t('aiFlow.steps.aiSegmentation.desc'),
    },
    {
      icon: Users,
      title: t('aiFlow.steps.persona.title'),
      description: t('aiFlow.steps.persona.desc'),
    },
    {
      icon: Wand2,
      title: t('aiFlow.steps.optimizedContent.title'),
      description: t('aiFlow.steps.optimizedContent.desc'),
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('aiFlow.tagline')}{' '}
            <span className="bg-gradient-to-r from-accent-violet to-accent-cyan bg-clip-text text-transparent">
              {t('aiFlow.title')}
            </span>
          </h2>
        </motion.div>

        {/* Flow diagram */}
        <div className="relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4"
          >
            {flowSteps.map((step, index) => {
              const Icon = step.icon
              
              return (
                <div key={index} className="flex items-center gap-4">
                  {/* Flow item */}
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="relative"
                  >
                    <div className="flex flex-col items-center text-center w-48">
                      {/* Icon container */}
                      <div className="relative group">
                        <div className="w-20 h-20 rounded-full bg-dark-surface border border-accent-violet/30 flex items-center justify-center text-accent-cyan transition-all duration-300 group-hover:border-accent-cyan group-hover:shadow-[0_0_30px_rgba(0,255,255,0.4)]">
                          <Icon size={32} strokeWidth={1.5} />
                        </div>
                        
                        {/* Pulse effect */}
                        <div className="absolute inset-0 w-20 h-20 rounded-full bg-accent-cyan/20 animate-ping opacity-0 group-hover:opacity-75" />
                      </div>

                      {/* Title */}
                      <h4 className="text-lg font-semibold text-white mt-4 mb-2">
                        {step.title}
                      </h4>

                      {/* Description */}
                      <p className="text-sm text-gray-400">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>

                  {/* Connector arrow (không hiển thị cho item cuối) */}
                  {index < flowSteps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
                      className="hidden md:block"
                    >
                      <div className="relative">
                        {/* Animated arrow */}
                        <motion.div
                          animate={{
                            x: [0, 10, 0],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                          className="text-accent-violet text-3xl font-bold"
                        >
                          →
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )
            })}
          </motion.div>

          {/* Connecting line background (desktop only) */}
          <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-accent-violet/30 to-transparent -z-10" />
        </div>
      </div>
    </section>
  )
}

export default AIInsightFlow

