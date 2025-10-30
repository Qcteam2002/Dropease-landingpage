'use client'

import { useCallback } from 'react'
import { event, pageview } from '@/lib/gtag'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export const useAnalytics = () => {
  const pathname = usePathname()

  // Track page views
  useEffect(() => {
    pageview(pathname)
  }, [pathname])

  // Track custom events
  const trackEvent = useCallback(
    (action: string, category: string, label?: string, value?: number) => {
      event({ action, category, label, value })
    },
    []
  )

  // Predefined event tracking functions
  const trackClick = useCallback(
    (element: string, location?: string) => {
      trackEvent('click', 'engagement', `${element}${location ? ` - ${location}` : ''}`)
    },
    [trackEvent]
  )

  const trackScroll = useCallback(
    (section: string, percentage: number) => {
      trackEvent('scroll', 'engagement', section, percentage)
    },
    [trackEvent]
  )

  const trackFormSubmit = useCallback(
    (formName: string, success: boolean = true) => {
      trackEvent('form_submit', 'conversion', formName, success ? 1 : 0)
    },
    [trackEvent]
  )

  const trackCTAClick = useCallback(
    (ctaText: string, location: string) => {
      trackEvent('cta_click', 'conversion', `${ctaText} - ${location}`)
    },
    [trackEvent]
  )

  const trackFeatureView = useCallback(
    (featureName: string) => {
      trackEvent('feature_view', 'engagement', featureName)
    },
    [trackEvent]
  )

  const trackLanguageSwitch = useCallback(
    (language: string) => {
      trackEvent('language_switch', 'engagement', language)
    },
    [trackEvent]
  )

  return {
    trackEvent,
    trackClick,
    trackScroll,
    trackFormSubmit,
    trackCTAClick,
    trackFeatureView,
    trackLanguageSwitch,
  }
}
