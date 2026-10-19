'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      const collection = document.getElementById('services')
      const passedCollection = collection
        ? collection.getBoundingClientRect().bottom < window.innerHeight * 0.45
        : window.scrollY > 900
      setIsVisible(passedCollection)
    }

    toggleVisibility()
    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.86 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 330, damping: 25 }}
          className="fixed bottom-5 right-4 z-50"
        >
          <button
            type="button"
            onClick={scrollToTop}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#DDB66A]/55 bg-[#610138] p-0 text-[#F4D58B] shadow-[0_10px_24px_rgba(39,2,22,.28)] backdrop-blur-md transition active:scale-90"
            aria-label="Back to top"
          >
            <ArrowUp className="h-[18px] w-[18px]" strokeWidth={1.8} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

