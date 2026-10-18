'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

export default function LoadingScreen() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] },
      }}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden px-6"
      style={{
        backgroundColor: '#000000',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: '100dvh',
        width: '100vw',
      }}
      role="status"
      aria-label="Loading Talla Jewellers"
    >
      {/* Subtle ambient champagne warmth behind the emblem */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 48%, rgba(230, 203, 144, 0.05) 0%, rgba(230, 203, 144, 0.015) 35%, rgba(0, 0, 0, 0) 70%)',
        }}
        aria-hidden
      />

      {/* Main Centered Logo Animation Container */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {/* Emblem Container (Pattern + Central T) */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-56 md:h-56 mb-5 flex items-center justify-center">
          {/* Stage 1: Brand Pattern - Expands and vanishes on exit as requested */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              scale: shouldReduceMotion ? 1 : 2.8,
              rotate: shouldReduceMotion ? 0 : 25,
              opacity: 0,
              transition: {
                duration: 0.65,
                ease: [0.25, 1, 0.5, 1],
              },
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Image
              src="/talla/loading/talla-pattern-gold.png"
              alt="Talla Brand Pattern"
              width={224}
              height={224}
              className="w-full h-full object-contain select-none drop-shadow-[0_4px_24px_rgba(230,203,144,0.12)]"
              priority
            />
          </motion.div>

          {/* Stage 2: Central T (Fades out quickly on exit) */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 0.85,
              transition: { duration: 0.22, ease: 'easeOut' },
            }}
            transition={{
              delay: 0.65,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Image
              src="/talla/loading/talla-t-gold.png"
              alt="Talla Emblem T"
              width={224}
              height={224}
              className="w-full h-full object-contain select-none drop-shadow-[0_2px_16px_rgba(230,203,144,0.18)]"
              priority
            />
          </motion.div>
        </div>

        {/* Stage 3: Brand Name "TALLA JEWELLERS" (Fades out quickly on exit) */}
        <motion.div
          className="w-52 sm:w-60 md:w-68"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: 8,
            transition: { duration: 0.22, ease: 'easeOut' },
          }}
          transition={{
            delay: 1.35,
            duration: 0.68,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Image
            src="/talla/loading/talla-name-gold.png"
            alt="TALLA JEWELLERS"
            width={272}
            height={90}
            className="w-full h-auto object-contain select-none drop-shadow-[0_2px_12px_rgba(230,203,144,0.14)]"
            priority
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
