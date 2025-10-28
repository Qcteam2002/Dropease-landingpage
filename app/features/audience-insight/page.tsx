'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { 
  BrainCircuit, 
  Users, 
  Target, 
  TrendingUp, 
  MessageSquare,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  Search,
  BarChart3,
  Zap
} from 'lucide-react'
import Link from 'next/link'

/**
 * Feature Detail Page: Audience Insight Discovery
 * Professional page với use cases, benefits, và visuals
 */
export default function AudienceInsightFeaturePage() {
  const { t } = useLanguage()
  
  // Set page title dynamically
  if (typeof document !== 'undefined') {
    document.title = `Audience Insight Discovery - Dropease`
  }

  return (
    <main className="min-h-screen bg-dark text-white">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Problem Section */}
      <ProblemSection />
      
      {/* Solution Section */}
      <SolutionSection />
      
      {/* How It Works */}
      <HowItWorksSection />
      
      {/* Use Cases */}
      <UseCasesSection />
      
      {/* Benefits */}
      <BenefitsSection />
      
      {/* Visual Demo */}
      <VisualDemoSection />
      
      {/* CTA Section */}
      <CTASection />
      
      <Footer />
    </main>
  )
}

// Hero Section
const HeroSection = () => {
  const { t } = useLanguage()
  
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-32 pb-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-secondary to-dark" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-violet/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-violet to-accent-cyan mb-6"
          >
            <BrainCircuit size={40} className="text-white" />
          </motion.div>

          {/* Badge */}
          <span className="inline-block px-4 py-2 rounded-full bg-accent-violet/20 text-accent-cyan text-sm font-semibold mb-6">
            {t('featureAudience.hero.badge')}
          </span>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {t('featureAudience.hero.title')}{' '}
            <span className="bg-gradient-to-r from-accent-violet to-accent-cyan bg-clip-text text-transparent">
              {t('featureAudience.hero.titleHighlight')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            {t('featureAudience.hero.subtitle')}
          </p>

          {/* Value Prop */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-dark-surface border border-accent-cyan/20 mb-12">
            <Zap size={24} className="text-accent-cyan" />
            <span className="text-lg font-medium">{t('featureAudience.hero.valueProp')}</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#pricing">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-accent-violet to-accent-cyan font-semibold text-white hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] transition-all duration-300"
              >
                {t('featureAudience.hero.ctaPrimary')}
              </motion.button>
            </Link>
            
            <Link href="/#how-it-works">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-lg border border-accent-violet font-semibold text-white hover:bg-accent-violet/10 transition-all duration-300"
              >
                {t('featureAudience.hero.ctaSecondary')}
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Problem Section
const ProblemSection = () => {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const problems = t('featureAudience.problems.list') as any[]

  return (
    <section ref={ref} className="py-20 px-6 bg-dark-secondary">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('featureAudience.problems.title')}{' '}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              {t('featureAudience.problems.titleHighlight')}
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('featureAudience.problems.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {problems.map((problem: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-dark border border-red-500/20 hover:border-red-500/40 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <span className="text-2xl">{problem.icon}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{problem.title}</h3>
                  <p className="text-gray-400">{problem.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Solution Section
const SolutionSection = () => {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-20 px-6 bg-dark">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('featureAudience.solution.title')}{' '}
            <span className="bg-gradient-to-r from-accent-violet to-accent-cyan bg-clip-text text-transparent">
              {t('featureAudience.solution.titleHighlight')}
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('featureAudience.solution.subtitle')}
          </p>
        </motion.div>

        {/* Solution Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Mockup placeholder */}
          <div className="relative bg-dark-surface border border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden">
            {/* Browser-like window header */}
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
              <span className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="w-3 h-3 bg-yellow-500 rounded-full" />
              <span className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="ml-4 text-sm text-gray-500">Dropease AI Analysis</span>
            </div>

            {/* Placeholder content */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-accent-violet/20 flex items-center justify-center">
                  <Search size={32} className="text-accent-violet" />
                </div>
                <div className="flex-1">
                  <div className="h-3 bg-gray-700 rounded w-3/4 mb-2" />
                  <div className="h-2 bg-gray-800 rounded w-1/2" />
                </div>
              </div>

              {/* 3 Persona Cards */}
              <div className="grid md:grid-cols-3 gap-4 mt-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-6 rounded-xl bg-gradient-to-br from-accent-violet/10 to-accent-cyan/10 border border-accent-cyan/20">
                    <div className="w-12 h-12 rounded-full bg-accent-cyan/20 mb-4" />
                    <div className="h-3 bg-gray-700 rounded w-full mb-2" />
                    <div className="h-2 bg-gray-800 rounded w-3/4 mb-3" />
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-800 rounded w-full" />
                      <div className="h-2 bg-gray-800 rounded w-5/6" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent-violet/5 to-accent-cyan/5 pointer-events-none" />
          </div>

          {/* Floating elements */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -top-4 -right-4 px-4 py-2 rounded-lg bg-accent-cyan/20 border border-accent-cyan text-sm font-semibold"
          >
            ✨ {t('featureAudience.solution.badge')}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// How It Works Section
const HowItWorksSection = () => {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const steps = t('featureAudience.howItWorks.steps') as any[]

  return (
    <section ref={ref} className="py-20 px-6 bg-dark-secondary">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('featureAudience.howItWorks.title')}
          </h2>
          <p className="text-xl text-gray-400">
            {t('featureAudience.howItWorks.subtitle')}
          </p>
        </motion.div>

        <div className="space-y-8">
          {steps.map((step: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="flex items-start gap-6 p-6 rounded-2xl bg-dark border border-white/10 hover:border-accent-cyan/40 transition-all"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-accent-violet to-accent-cyan flex items-center justify-center font-bold text-xl">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400 text-lg">{step.description}</p>
              </div>
              <div className="flex-shrink-0 hidden md:block">
                <CheckCircle2 size={32} className="text-accent-cyan" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Use Cases Section
const UseCasesSection = () => {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const useCases = t('featureAudience.useCases.list') as any[]

  return (
    <section ref={ref} className="py-20 px-6 bg-dark">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('featureAudience.useCases.title')}{' '}
            <span className="bg-gradient-to-r from-accent-violet to-accent-cyan bg-clip-text text-transparent">
              {t('featureAudience.useCases.titleHighlight')}
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            {t('featureAudience.useCases.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-dark-surface border border-white/10 hover:border-accent-cyan/40 transition-all group"
            >
              <div className="text-4xl mb-4">{useCase.icon}</div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-accent-cyan transition-colors">
                {useCase.title}
              </h3>
              <p className="text-gray-400 mb-4">{useCase.description}</p>
              <div className="text-sm text-accent-cyan font-semibold">
                → {useCase.result}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Benefits Section
const BenefitsSection = () => {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const benefits = t('featureAudience.benefits.list') as any[]

  return (
    <section ref={ref} className="py-20 px-6 bg-dark-secondary">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('featureAudience.benefits.title')}
          </h2>
          <p className="text-xl text-gray-400">
            {t('featureAudience.benefits.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((benefit: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-accent-violet/10 to-accent-cyan/10 border border-accent-cyan/20 hover:border-accent-cyan/40 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle2 size={24} className="text-accent-cyan" />
                <h3 className="text-xl font-bold">{benefit.title}</h3>
              </div>
              <p className="text-gray-400">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Visual Demo Section
const VisualDemoSection = () => {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-20 px-6 bg-dark">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            {t('featureAudience.demo.title')}
          </h2>
          <p className="text-xl text-gray-400">
            {t('featureAudience.demo.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl overflow-hidden"
        >
          {/* Demo mockup placeholder */}
          <img
            src="https://placehold.co/1200x600/1C1C1F/8B5CF6?text=Audience+Insight+Dashboard+Demo"
            alt="Audience Insight Dashboard Demo"
            className="w-full h-auto rounded-2xl border border-white/10"
          />
          
          {/* Play button overlay (optional) */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
            <button className="w-20 h-20 rounded-full bg-accent-cyan flex items-center justify-center hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// CTA Section
const CTASection = () => {
  const { t } = useLanguage()

  return (
    <section className="py-32 px-6 bg-dark-secondary">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('featureAudience.cta.title')}
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            {t('featureAudience.cta.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#pricing">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-accent-violet to-accent-cyan font-semibold text-white hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] transition-all duration-300 flex items-center gap-2"
              >
                {t('featureAudience.cta.button')}
                <ArrowRight size={20} />
              </motion.button>
            </Link>
            
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 rounded-lg border border-white/20 font-semibold text-white hover:bg-white/5 transition-all"
              >
                {t('featureAudience.cta.backHome')}
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

