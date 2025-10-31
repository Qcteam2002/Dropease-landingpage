'use client'

import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle, Loader2, X } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAnalytics } from '@/hooks/useAnalytics'

/**
 * Early Access Form Component
 * Collects user information for early access registration
 * Tracks submissions with Google Analytics
 */

interface EarlyAccessFormProps {
  onClose?: () => void
  inline?: boolean // If true, display as inline form, else as modal
}

const EarlyAccessForm = ({ onClose, inline = false }: EarlyAccessFormProps) => {
  const { t } = useLanguage()
  const { trackEvent } = useAnalytics()

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    role: '',
    shopifyStore: '',
    referralSource: '',
    otherSource: '',
    optIn: true, // Default to checked
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }))
    
    // Clear error when user starts typing
    setSubmitError('')
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    // Track form submission start
    trackEvent({
      action: 'early_access_form_submit_start',
      category: 'engagement',
      label: formData.role || 'unknown',
    })

    try {
      const response = await fetch('/api/early-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          language: navigator.language,
        }),
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      const result = await response.json()

      // Track successful submission
      trackEvent({
        action: 'early_access_form_submit_success',
        category: 'conversion',
        label: formData.referralSource || 'unknown',
        value: 1,
      })

      setSubmitSuccess(true)
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          email: '',
          name: '',
          role: '',
          shopifyStore: '',
          referralSource: '',
          otherSource: '',
          optIn: true,
        })
        if (onClose) {
          setTimeout(() => onClose(), 1000)
        }
      }, 3000)

    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitError(t('earlyAccess.errorMessage'))
      
      // Track failed submission
      trackEvent({
        action: 'early_access_form_submit_error',
        category: 'error',
        label: error instanceof Error ? error.message : 'unknown_error',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Inline Form (no modal)
  if (inline) {
    return (
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off" noValidate>
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              {t('earlyAccess.emailLabel')} <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              autoComplete="off"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-dark-surface border border-white/10 text-white placeholder-gray-500 focus:border-accent-violet focus:outline-none focus:ring-2 focus:ring-accent-violet/50 transition-all"
              placeholder={t('earlyAccess.emailPlaceholder')}
            />
          </div>

          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              {t('earlyAccess.nameLabel')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              autoComplete="off"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-dark-surface border border-white/10 text-white placeholder-gray-500 focus:border-accent-violet focus:outline-none focus:ring-2 focus:ring-accent-violet/50 transition-all"
              placeholder={t('earlyAccess.namePlaceholder')}
            />
          </div>

          {/* Role Field */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">
              {t('earlyAccess.roleLabel')} <span className="text-red-500">*</span>
            </label>
            <select
              id="role"
              name="role"
              required
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-dark-surface border border-white/10 text-white focus:border-accent-violet focus:outline-none focus:ring-2 focus:ring-accent-violet/50 transition-all"
            >
              <option value="">{t('earlyAccess.rolePlaceholder')}</option>
              <option value="store-owner">{t('earlyAccess.roleOptions.storeOwner')}</option>
              <option value="marketer">{t('earlyAccess.roleOptions.marketer')}</option>
              <option value="dropshipper">{t('earlyAccess.roleOptions.dropshipper')}</option>
              <option value="agency">{t('earlyAccess.roleOptions.agency')}</option>
              <option value="other">{t('earlyAccess.roleOptions.other')}</option>
            </select>
          </div>

          {/* Shopify Store (Optional) */}
          <div>
            <label htmlFor="shopifyStore" className="block text-sm font-medium text-gray-300 mb-2">
              {t('earlyAccess.shopifyStoreLabel')}
            </label>
            <input
              type="url"
              id="shopifyStore"
              name="shopifyStore"
              autoComplete="off"
              value={formData.shopifyStore}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-dark-surface border border-white/10 text-white placeholder-gray-500 focus:border-accent-violet focus:outline-none focus:ring-2 focus:ring-accent-violet/50 transition-all"
              placeholder={t('earlyAccess.shopifyStorePlaceholder')}
            />
          </div>

          {/* Referral Source */}
          <div>
            <label htmlFor="referralSource" className="block text-sm font-medium text-gray-300 mb-2">
              {t('earlyAccess.referralLabel')} <span className="text-red-500">*</span>
            </label>
            <select
              id="referralSource"
              name="referralSource"
              required
              value={formData.referralSource}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-dark-surface border border-white/10 text-white focus:border-accent-violet focus:outline-none focus:ring-2 focus:ring-accent-violet/50 transition-all"
            >
              <option value="">{t('earlyAccess.referralPlaceholder')}</option>
              <option value="google">{t('earlyAccess.referralOptions.google')}</option>
              <option value="ai-search">{t('earlyAccess.referralOptions.aiSearch')}</option>
              <option value="facebook">{t('earlyAccess.referralOptions.facebook')}</option>
              <option value="linkedin">{t('earlyAccess.referralOptions.linkedin')}</option>
              <option value="youtube">{t('earlyAccess.referralOptions.youtube')}</option>
              <option value="friend">{t('earlyAccess.referralOptions.friend')}</option>
              <option value="blog">{t('earlyAccess.referralOptions.blog')}</option>
              <option value="shopify-app-store">{t('earlyAccess.referralOptions.shopifyAppStore')}</option>
              <option value="other">{t('earlyAccess.referralOptions.other')}</option>
            </select>
          </div>

          {/* Other Source (Show if "other" selected) */}
          {formData.referralSource === 'other' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <label htmlFor="otherSource" className="block text-sm font-medium text-gray-300 mb-2">
                {t('earlyAccess.otherSourceLabel')}
              </label>
              <input
                type="text"
                id="otherSource"
                name="otherSource"
                autoComplete="off"
                value={formData.otherSource}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-dark-surface border border-white/10 text-white placeholder-gray-500 focus:border-accent-violet focus:outline-none focus:ring-2 focus:ring-accent-violet/50 transition-all"
                placeholder={t('earlyAccess.otherSourcePlaceholder')}
              />
            </motion.div>
          )}

          {/* Opt-in Checkbox */}
          <div className="flex items-start gap-3 pt-2">
            <input
              type="checkbox"
              id="optIn"
              name="optIn"
              checked={formData.optIn}
              onChange={handleInputChange}
              className="mt-1 w-4 h-4 rounded border-white/20 bg-dark-surface text-accent-violet focus:ring-accent-violet focus:ring-2"
            />
            <label htmlFor="optIn" className="text-sm text-gray-300 cursor-pointer select-none">
              {t('earlyAccess.optInLabel')}
            </label>
          </div>

          {/* Error Message */}
          {submitError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
            >
              {submitError}
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting || submitSuccess}
            whileHover={!isSubmitting && !submitSuccess ? { scale: 1.02 } : {}}
            whileTap={!isSubmitting && !submitSuccess ? { scale: 0.98 } : {}}
            className="w-full px-8 py-4 rounded-lg bg-gradient-to-r from-accent-violet to-accent-cyan font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] transition-all duration-300 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {t('earlyAccess.submitting')}
              </>
            ) : submitSuccess ? (
              <>
                <CheckCircle className="w-5 h-5" />
                {t('earlyAccess.submitSuccess')}
              </>
            ) : (
              <>
                {t('earlyAccess.submitButton')}
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>

          {/* Success Message */}
          <AnimatePresence>
            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm text-center"
              >
                {t('earlyAccess.successMessage')}
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    )
  }

  // Modal Form
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-dark-secondary rounded-2xl border border-white/10 p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        )}

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">
            {t('earlyAccess.modalTitle')}{' '}
            <span className="bg-gradient-to-r from-accent-violet to-accent-cyan bg-clip-text text-transparent">
              {t('earlyAccess.modalTitleHighlight')}
            </span>
          </h2>
          <p className="text-gray-400">
            {t('earlyAccess.modalSubtitle')}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off" noValidate>
          {/* Email Field */}
          <div>
            <label htmlFor="modal-email" className="block text-sm font-medium text-gray-300 mb-2">
              {t('earlyAccess.emailLabel')} <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="modal-email"
              name="email"
              required
              autoComplete="off"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-dark-surface border border-white/10 text-white placeholder-gray-500 focus:border-accent-violet focus:outline-none focus:ring-2 focus:ring-accent-violet/50 transition-all"
              placeholder={t('earlyAccess.emailPlaceholder')}
            />
          </div>

          {/* Name Field */}
          <div>
            <label htmlFor="modal-name" className="block text-sm font-medium text-gray-300 mb-2">
              {t('earlyAccess.nameLabel')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="modal-name"
              name="name"
              required
              autoComplete="off"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-dark-surface border border-white/10 text-white placeholder-gray-500 focus:border-accent-violet focus:outline-none focus:ring-2 focus:ring-accent-violet/50 transition-all"
              placeholder={t('earlyAccess.namePlaceholder')}
            />
          </div>

          {/* Role Field */}
          <div>
            <label htmlFor="modal-role" className="block text-sm font-medium text-gray-300 mb-2">
              {t('earlyAccess.roleLabel')} <span className="text-red-500">*</span>
            </label>
            <select
              id="modal-role"
              name="role"
              required
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-dark-surface border border-white/10 text-white focus:border-accent-violet focus:outline-none focus:ring-2 focus:ring-accent-violet/50 transition-all"
            >
              <option value="">{t('earlyAccess.rolePlaceholder')}</option>
              <option value="store-owner">{t('earlyAccess.roleOptions.storeOwner')}</option>
              <option value="marketer">{t('earlyAccess.roleOptions.marketer')}</option>
              <option value="dropshipper">{t('earlyAccess.roleOptions.dropshipper')}</option>
              <option value="agency">{t('earlyAccess.roleOptions.agency')}</option>
              <option value="other">{t('earlyAccess.roleOptions.other')}</option>
            </select>
          </div>

          {/* Shopify Store (Optional) */}
          <div>
            <label htmlFor="modal-shopifyStore" className="block text-sm font-medium text-gray-300 mb-2">
              {t('earlyAccess.shopifyStoreLabel')}
            </label>
            <input
              type="url"
              id="modal-shopifyStore"
              name="shopifyStore"
              autoComplete="off"
              value={formData.shopifyStore}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-dark-surface border border-white/10 text-white placeholder-gray-500 focus:border-accent-violet focus:outline-none focus:ring-2 focus:ring-accent-violet/50 transition-all"
              placeholder={t('earlyAccess.shopifyStorePlaceholder')}
            />
          </div>

          {/* Referral Source */}
          <div>
            <label htmlFor="modal-referralSource" className="block text-sm font-medium text-gray-300 mb-2">
              {t('earlyAccess.referralLabel')} <span className="text-red-500">*</span>
            </label>
            <select
              id="modal-referralSource"
              name="referralSource"
              required
              value={formData.referralSource}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-dark-surface border border-white/10 text-white focus:border-accent-violet focus:outline-none focus:ring-2 focus:ring-accent-violet/50 transition-all"
            >
              <option value="">{t('earlyAccess.referralPlaceholder')}</option>
              <option value="google">{t('earlyAccess.referralOptions.google')}</option>
              <option value="ai-search">{t('earlyAccess.referralOptions.aiSearch')}</option>
              <option value="facebook">{t('earlyAccess.referralOptions.facebook')}</option>
              <option value="linkedin">{t('earlyAccess.referralOptions.linkedin')}</option>
              <option value="youtube">{t('earlyAccess.referralOptions.youtube')}</option>
              <option value="friend">{t('earlyAccess.referralOptions.friend')}</option>
              <option value="blog">{t('earlyAccess.referralOptions.blog')}</option>
              <option value="shopify-app-store">{t('earlyAccess.referralOptions.shopifyAppStore')}</option>
              <option value="other">{t('earlyAccess.referralOptions.other')}</option>
            </select>
          </div>

          {/* Other Source (Show if "other" selected) */}
          {formData.referralSource === 'other' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <label htmlFor="modal-otherSource" className="block text-sm font-medium text-gray-300 mb-2">
                {t('earlyAccess.otherSourceLabel')}
              </label>
              <input
                type="text"
                id="modal-otherSource"
                name="otherSource"
                autoComplete="off"
                value={formData.otherSource}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-dark-surface border border-white/10 text-white placeholder-gray-500 focus:border-accent-violet focus:outline-none focus:ring-2 focus:ring-accent-violet/50 transition-all"
                placeholder={t('earlyAccess.otherSourcePlaceholder')}
              />
            </motion.div>
          )}

          {/* Opt-in Checkbox */}
          <div className="flex items-start gap-3 pt-2">
            <input
              type="checkbox"
              id="modal-optIn"
              name="optIn"
              checked={formData.optIn}
              onChange={handleInputChange}
              className="mt-1 w-4 h-4 rounded border-white/20 bg-dark-surface text-accent-violet focus:ring-accent-violet focus:ring-2"
            />
            <label htmlFor="modal-optIn" className="text-sm text-gray-300 cursor-pointer select-none">
              {t('earlyAccess.optInLabel')}
            </label>
          </div>

          {/* Error Message */}
          {submitError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
            >
              {submitError}
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting || submitSuccess}
            whileHover={!isSubmitting && !submitSuccess ? { scale: 1.02 } : {}}
            whileTap={!isSubmitting && !submitSuccess ? { scale: 0.98 } : {}}
            className="w-full px-8 py-4 rounded-lg bg-gradient-to-r from-accent-violet to-accent-cyan font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] transition-all duration-300 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {t('earlyAccess.submitting')}
              </>
            ) : submitSuccess ? (
              <>
                <CheckCircle className="w-5 h-5" />
                {t('earlyAccess.submitSuccess')}
              </>
            ) : (
              <>
                {t('earlyAccess.submitButton')}
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>

          {/* Success Message */}
          <AnimatePresence>
            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm text-center"
              >
                {t('earlyAccess.successMessage')}
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.div>
    </div>
  )
}

export default EarlyAccessForm
