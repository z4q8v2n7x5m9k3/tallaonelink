'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
// Shop-specific components
import Hero from './shops/dogra-associates/components/Hero'
import About from './shops/dogra-associates/components/About'
import MenuPreview from './shops/dogra-associates/components/MenuPreview'
import Services from './shops/dogra-associates/components/Services'
import ContactCard from './shops/dogra-associates/components/ContactCard'
// Shop-specific components (Gallery and Reviews)
import Gallery from './shops/dogra-associates/components/Gallery'
import GoogleReviews from './shops/dogra-associates/components/GoogleReviews'
import InstagramCTA from './shops/dogra-associates/components/InstagramCTA'
// Shared components
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import LoadingScreen from './components/LoadingScreen'
import {
  consumeReturnSection,
  consumeSkipLoad,
  type HomeReturnSection,
} from './lib/homeNavigation'

export default function Home() {
  const [showLoading, setShowLoading] = useState(true)
  const [restoreSection, setRestoreSection] = useState<HomeReturnSection | null>(
    null
  )

  useEffect(() => {
    if (typeof window === 'undefined') return

    const section = consumeReturnSection()
    const skipLoad = consumeSkipLoad() || section !== null

    if (section) setRestoreSection(section)

    if (skipLoad) {
      setShowLoading(false)
      return
    }

    const timer = setTimeout(() => setShowLoading(false), 2400)
    const fallbackTimer = setTimeout(() => setShowLoading(false), 2800)
    return () => {
      clearTimeout(timer)
      clearTimeout(fallbackTimer)
    }
  }, [])

  useEffect(() => {
    if (showLoading) return
    if (typeof window === 'undefined') return

    if (restoreSection) {
      const id = restoreSection
      const t = window.setTimeout(() => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'auto', block: 'start' })
        }
        setRestoreSection(null)
      }, 50)
      return () => window.clearTimeout(t)
    }

    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname)
    }
  }, [showLoading, restoreSection])

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>
      {!showLoading && (
        <main 
          className="talla-main min-h-screen relative z-10 overflow-x-hidden pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))]"
          style={{
            background: '#111011',
          }}
        >
          <div className="relative z-10">
            <Hero />
            <About />
            <div
              className="lower-dark talla-unified -mx-4 mt-0 px-4 pt-6 pb-[max(2rem,env(safe-area-inset-bottom))]"
              style={{
                background: '#111011',
              }}
            >
              <MenuPreview />
              <Services />
              <Gallery />
              <GoogleReviews />
              <InstagramCTA />
              <ContactCard />
              <div className="mt-8">
                <Footer />
              </div>
            </div>
          </div>
          <BackToTop />
        </main>
      )}
    </>
  )
}
