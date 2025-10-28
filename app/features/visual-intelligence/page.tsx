'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { 
  Image as ImageIcon,
  Sparkles,
  Camera,
  Palette,
  Zap,
  CheckCircle2,
  ArrowRight,
  Users,
  TrendingUp,
  ShoppingBag,
  Star,
  Eye
} from 'lucide-react'
import Link from 'next/link'

/**
 * Feature Detail Page: Visual Intelligence
 * Professional page về tạo hình ảnh sản phẩm theo style & persona
 * Following Tone of Voice Guidelines: Focus on customer fit, not tech
 */
export default function VisualIntelligenceFeaturePage() {
  const { t } = useLanguage()
  
  // Set page title dynamically
  if (typeof document !== 'undefined') {
    document.title = `Visual Intelligence - Dropease`
  }

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const problems = t('featureVisual.problems.list')
  const howItWorksSteps = t('featureVisual.howItWorks.steps')
  const useCases = t('featureVisual.useCases.list')
  const benefits = t('featureVisual.benefits.list')
  const imageTypes = t('featureVisual.imageTypes.list')

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  }

  return (
    <main className="min-h-screen bg-dark text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-32 md:pt-40 pb-20 text-center">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-dark-secondary opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-br from-dark-secondary to-dark-surface opacity-70" />
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        </div>

        <motion.div
          className="relative z-10 max-w-6xl mx-auto px-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
          }}
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-surface border border-white/10 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-sm text-gray-300">{t('featureVisual.hero.badge')}</span>
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            {t('featureVisual.hero.title')}{' '}
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              {t('featureVisual.hero.titleHighlight')}
            </span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-6 leading-relaxed"
          >
            {t('featureVisual.hero.subtitle')}
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl font-semibold text-violet-400 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            {t('featureVisual.hero.valueProp')}
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="group px-8 py-4 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500 font-semibold text-white hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] transition-all duration-300 hover:scale-105">
              <span className="flex items-center gap-2">
                {t('featureVisual.hero.ctaPrimary')}
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
            </button>
            <button className="group px-8 py-4 rounded-lg border border-violet-500 font-semibold text-white hover:bg-violet-500/10 transition-all duration-300">
              {t('featureVisual.hero.ctaSecondary')}
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Problems Section */}
      <section className="relative py-24 px-6 overflow-hidden bg-dark" ref={ref}>
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t('featureVisual.problems.title')}{' '}
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                {t('featureVisual.problems.titleHighlight')}
              </span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {t('featureVisual.problems.subtitle')}
            </p>
          </motion.div>

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {problems.map((problem: any, index: number) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-dark-surface p-6 rounded-xl border border-white/5 text-center hover:border-violet-500/30 transition-colors"
              >
                <div className="text-4xl mb-4">{problem.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{problem.title}</h3>
                <p className="text-gray-400">{problem.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Image Types Section */}
      <section className="relative py-24 px-6 overflow-hidden bg-dark-secondary">
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16"
          >
            <span className="inline-block text-violet-400 font-semibold mb-4 uppercase tracking-wider text-sm">
              {t('featureVisual.imageTypes.tagline')}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t('featureVisual.imageTypes.title')}
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {t('featureVisual.imageTypes.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {imageTypes.map((type: any, index: number) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                className="group bg-dark p-6 rounded-xl border border-white/5 hover:border-violet-500/30 transition-all"
              >
                <div className="text-4xl mb-4">{type.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{type.title}</h3>
                <p className="text-gray-400 mb-4">{type.description}</p>
                <div className="text-sm text-violet-400 font-semibold">
                  {t('featureVisual.imageTypes.bestFor')}: {type.bestFor}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-24 px-6 overflow-hidden bg-dark">
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t('featureVisual.howItWorks.title')}
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {t('featureVisual.howItWorks.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step: any, index: number) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                className="bg-dark-surface p-6 rounded-xl border border-white/5 flex flex-col items-center text-center hover:border-violet-500/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400 font-bold text-xl mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="relative py-24 px-6 overflow-hidden bg-dark-secondary">
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t('featureVisual.useCases.title')}{' '}
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                {t('featureVisual.useCases.titleHighlight')}
              </span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {t('featureVisual.useCases.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase: any, index: number) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                className="bg-dark p-6 rounded-xl border border-white/5 hover:border-violet-500/30 transition-colors"
              >
                <div className="text-4xl mb-4">{useCase.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{useCase.title}</h3>
                <p className="text-gray-400 mb-4">{useCase.description}</p>
                <div className="pt-4 border-t border-white/5">
                  <p className="text-sm text-violet-400 font-semibold flex items-center gap-2">
                    <TrendingUp size={16} />
                    {useCase.result}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-24 px-6 overflow-hidden bg-dark">
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t('featureVisual.benefits.title')}
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {t('featureVisual.benefits.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit: any, index: number) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                className="bg-dark-surface p-6 rounded-xl border border-white/5"
              >
                <h3 className="text-xl font-semibold mb-3 flex items-start gap-3">
                  <span className="text-2xl">{benefit.title.charAt(0)}</span>
                  <span>{benefit.title.slice(2)}</span>
                </h3>
                <p className="text-gray-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="relative py-24 px-6 overflow-hidden bg-dark-secondary">
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t('featureVisual.demo.title')}
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {t('featureVisual.demo.subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-[500px] bg-dark-surface rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-dark-secondary to-dark-surface opacity-80" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
              <Camera size={64} className="text-violet-400 mb-4" />
              <p className="text-2xl font-semibold mb-2">Visual Generation Gallery</p>
              <p className="text-gray-400 max-w-md">
                6 image styles: Studio, Lifestyle, Infographic, UGC, Close-up, GIF
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6 overflow-hidden bg-dark text-center">
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
          >
            {t('featureVisual.cta.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-400 mb-8"
          >
            {t('featureVisual.cta.subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="px-10 py-4 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500 text-white font-semibold text-lg shadow-lg hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] transition-all duration-300 hover:scale-105">
              {t('featureVisual.cta.button')}
            </button>
            <Link href="/">
              <button className="px-10 py-4 rounded-lg border border-violet-500 text-white font-semibold text-lg hover:bg-violet-500/10 transition-all duration-300">
                {t('featureVisual.cta.backHome')}
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

