'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Menu, X, Globe } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAnalytics } from '@/hooks/useAnalytics'
import Link from 'next/link'

/**
 * Navbar - Dropease.ai branding with language switcher
 */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showLangMenu, setShowLangMenu] = useState(false)
  const { scrollY } = useScroll()
  const { language, setLanguage, t } = useLanguage()
  const { trackClick, trackLanguageSwitch } = useAnalytics()
  
  const navbarBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(13, 13, 15, 0)', 'rgba(13, 13, 15, 0.8)']
  )

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.features'), href: '/#features' },
    { label: t('nav.howItWorks'), href: '/#how-it-works' },
    { label: t('nav.pricing'), href: '/#pricing' },
    { label: t('nav.testimonials'), href: '/#testimonials' },
  ]

  const languages = [
    { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
  ]

  return (
    <motion.nav
      style={{ backgroundColor: navbarBg }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-xl shadow-lg border-b border-white/5' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <motion.div
              className="flex items-center gap-1 group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-2xl font-bold text-white">Dropease</span>
              <span className="text-2xl font-bold text-accent-cyan">.</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                onClick={() => trackClick('nav_link', link.label)}
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Language Switcher & CTA */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Switcher */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/20 hover:bg-white/5 transition-colors"
              >
                <Globe size={18} className="text-gray-300" />
                <span className="text-sm text-gray-300">
                  {language === 'vi' ? '🇻🇳' : '🇺🇸'}
                </span>
              </motion.button>

              {/* Language dropdown */}
              {showLangMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full right-0 mt-2 w-48 bg-dark-surface border border-white/10 rounded-lg shadow-xl overflow-hidden z-50"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as 'vi' | 'en')
                        setShowLangMenu(false)
                        trackLanguageSwitch(lang.code)
                      }}
                      className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-white/5 transition-colors ${
                        language === lang.code ? 'bg-accent-violet/10 text-accent-cyan' : 'text-gray-300'
                      }`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className="text-sm font-medium">{lang.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(139, 92, 246, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-accent-violet to-accent-cyan text-white font-semibold shadow-lg"
            >
              {t('nav.getStarted')}
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pt-4 border-t border-white/5"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    trackClick('nav_link_mobile', link.label)
                  }}
                  className="text-gray-300 hover:text-white transition-colors duration-200 font-medium py-2"
                >
                  {link.label}
                </a>
              ))}
              
              {/* Language selector mobile */}
              <div className="mt-4 pt-4 border-t border-white/5">
                <p className="text-xs text-gray-500 mb-2">Language / Ngôn ngữ</p>
                <div className="flex gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as 'vi' | 'en')
                        setIsMobileMenuOpen(false)
                        trackLanguageSwitch(lang.code)
                      }}
                      className={`flex-1 px-3 py-2 rounded-lg border transition-colors ${
                        language === lang.code
                          ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan'
                          : 'border-white/10 text-gray-400'
                      }`}
                    >
                      <span className="block text-lg mb-1">{lang.flag}</span>
                      <span className="text-xs">{lang.code.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button className="mt-4 px-6 py-2.5 rounded-lg bg-gradient-to-r from-accent-violet to-accent-cyan text-white font-semibold shadow-lg text-center">
                {t('nav.getStarted')}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navbar
