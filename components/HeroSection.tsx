'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import EarlyAccessForm from './EarlyAccessForm'

/**
 * Hero Section - Dropease AI Product Intelligence
 * Tagline: "Từ Insight đến Tác động — Cấu hình một lần, Tối ưu mọi nơi"
 */
const HeroSection = () => {
  const { t } = useLanguage()
  const [showEarlyAccessForm, setShowEarlyAccessForm] = useState(false)
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 md:pt-40">
      {/* Background gradient radial */}
      <div className="absolute inset-0 bg-dark" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(139,92,246,0.15)_0%,transparent_70%)]" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-surface border border-white/10 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
          <span className="text-sm text-gray-300">{t('hero.badge')}</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          {t('hero.title')}{' '}
          <br />
          <span className="bg-gradient-to-r from-accent-violet to-accent-cyan bg-clip-text text-transparent">
            {t('hero.titleHighlight')}
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          {/* Primary CTA - Early Access */}
          <button 
            onClick={() => setShowEarlyAccessForm(true)}
            className="group px-8 py-4 rounded-lg bg-gradient-to-r from-accent-violet to-accent-cyan font-semibold text-white hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] transition-all duration-300 hover:scale-105"
          >
            <span className="flex items-center gap-2">
              {t('nav.getStarted')}
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </span>
          </button>

          {/* Secondary CTA - Learn More */}
          <a 
            href="#features"
            className="group px-8 py-4 rounded-lg border border-accent-violet font-semibold text-white hover:bg-accent-violet/10 transition-all duration-300"
          >
            {t('hero.ctaSecondary')}
          </a>
        </motion.div>

        {/* Hero Image/Dashboard Preview */}
        <motion.div
          variants={itemVariants}
          className="relative mx-auto max-w-4xl"
        >
          <div className="relative rounded-2xl border border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            {/* Placeholder cho dashboard image */}
            <div className="aspect-video bg-gradient-to-br from-dark-surface to-dark-secondary flex items-center justify-center">
              <div className="text-center p-8">
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-dark border border-accent-violet/30 mb-4">
                  <div className="w-3 h-3 rounded-full bg-accent-cyan animate-pulse" />
                  <span className="text-sm text-gray-300">Dashboard Preview</span>
                </div>
                <p className="text-gray-500 text-sm">
                  Giao diện Dropease Dashboard
                </p>
              </div>
            </div>
          </div>
          
          {/* Glow effect dưới image */}
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-4/5 h-32 bg-accent-violet/40 blur-[100px] -z-10" />
        </motion.div>
      </motion.div>

      {/* Early Access Form Modal */}
      <AnimatePresence>
        {showEarlyAccessForm && (
          <EarlyAccessForm onClose={() => setShowEarlyAccessForm(false)} />
        )}
      </AnimatePresence>
    </section>
  )
}

export default HeroSection
