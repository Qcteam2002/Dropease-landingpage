'use client'

import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import AIInsightFlow from '@/components/AIInsightFlow'
import FeaturesSection from '@/components/FeaturesSection'
import DetailedFeaturesSection from '@/components/DetailedFeaturesSection'
import PersonaDemoSection from '@/components/PersonaDemoSection'
import HowItWorksSection from '@/components/HowItWorksSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import PricingSection from '@/components/PricingSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

/**
 * Home Page - Dropease AI Product Intelligence Landing Page
 * Sections: Hero → AI Flow → Features → Detailed Features → Personas → How It Works → Testimonials → Pricing → CTA → Footer
 */
export default function HomePage() {
  return (
    <main className="min-h-screen bg-dark text-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section id="hero">
        <HeroSection />
      </section>

      {/* AI Insight Flow */}
      <section id="ai-insight">
        <AIInsightFlow />
      </section>

      {/* Features Section */}
      <section id="features">
        <FeaturesSection />
      </section>

      {/* Detailed Features Section */}
      <section id="detailed-features">
        <DetailedFeaturesSection />
      </section>

      {/* Persona Demo Section */}
      <section id="personas">
        <PersonaDemoSection />
      </section>

      {/* How It Works Section */}
      <section id="how-it-works">
        <HowItWorksSection />
      </section>

      {/* Testimonials Section */}
      <section id="testimonials">
        <TestimonialsSection />
      </section>

      {/* Pricing Section */}
      <section id="pricing">
        <PricingSection />
      </section>

      {/* CTA Section */}
      <section id="cta">
        <CTASection />
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
