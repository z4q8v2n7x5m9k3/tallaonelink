'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface ReasonItem {
  title: string
  description: string
  bgImage: string
  iconImage: string
  isBisLogo?: boolean
}

const reasons: ReasonItem[] = [
  {
    title: '100% BIS Hallmarked',
    description: 'Certified 22KT & 18KT gold purity guarantee.',
    bgImage: '/talla/kriyon/fine-085.webp',
    iconImage: '/talla/bis-hallmark-color.png',
    isBisLogo: true,
  },
  {
    title: 'Natural Diamonds',
    description: 'IGI & SGL certified natural solitaire diamonds.',
    bgImage: '/talla/kriyon/fine-092.webp',
    iconImage: '/talla/kriyon/fine-081.webp',
  },
  {
    title: 'Four Showrooms',
    description: 'Gandhi Nagar, Lakhdata Bazar, Janipur & Udhampur.',
    bgImage: '/talla/showrooms/showroom-hero-hd.png',
    iconImage: '/talla/showrooms/showroom-hero-hd.png',
  },
  {
    title: 'Since 1960',
    description: 'Over six decades of royal trust and heirloom crafting.',
    bgImage: '/talla/kriyon/fine-110.webp',
    iconImage: '/talla/kriyon/fine-076.webp',
  },
]

export default function Services() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.3 }}
      className="mx-auto w-full max-w-md py-8 [font-family:var(--font-poppins)]"
    >
      <div className="mb-6">
        <div className="section-title-accent talla-title-accent mb-2">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Why Talla Jewellers?
          </h2>
        </div>
        <p className="text-sm font-medium text-slate-300/90 sm:text-base">
          Purity, craftsmanship and trust since 1960.
        </p>
      </div>

      <div className="grid gap-3.5">
        {reasons.map((reason, index) => (
          <motion.article
            key={reason.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.28 }}
            className="group relative min-h-[92px] overflow-hidden rounded-[22px] border border-[#DDB66A]/48 bg-[#FFF9F5] shadow-[0_10px_24px_rgba(0,0,0,.16)]"
          >
            <span className="pointer-events-none absolute inset-[3px] z-20 rounded-[18px] border border-[#A9772A]/14" />
            {/* Background Image Layer */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-[64%] overflow-hidden">
              <Image
                src={reason.bgImage}
                alt=""
                fill
                sizes="260px"
                className="object-cover object-center opacity-80"
                aria-hidden
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,#FFF9F5_0%,rgba(255,249,245,.92)_22%,rgba(255,249,245,.44)_58%,rgba(255,249,245,.08)_100%)]" />
            </div>

            {/* Index Number */}
            <span className="absolute right-4 top-3 text-[10px] font-bold tracking-[.18em] text-[#9A6B24]">
              0{index + 1}
            </span>

            {/* Content & Icon Box */}
            <div className="relative z-10 flex min-h-[92px] items-center gap-3 p-3.5">
              <span className="relative flex h-[54px] w-[54px] shrink-0 items-center justify-center overflow-hidden rounded-[16px] border border-[#DDB66A]/40 bg-white p-1 shadow-[0_7px_16px_rgba(97,1,56,.10)]">
                {reason.isBisLogo ? (
                  <Image
                    src={reason.iconImage}
                    alt="BIS Hallmark"
                    width={46}
                    height={32}
                    className="h-8 w-11 object-contain"
                  />
                ) : (
                  <Image
                    src={reason.iconImage}
                    alt={reason.title}
                    fill
                    sizes="54px"
                    className="object-cover"
                  />
                )}
              </span>

              <div className="min-w-0 max-w-[70%]">
                <h3 className="text-[15px] font-bold leading-tight text-[#1D1717]">
                  {reason.title}
                </h3>
                <p className="mt-1 text-[11px] font-semibold leading-[1.4] text-slate-600">
                  {reason.description}
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  )
}
