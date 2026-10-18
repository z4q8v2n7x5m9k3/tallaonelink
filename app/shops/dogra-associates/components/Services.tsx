'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const reasons = [
  { title: 'BIS Hallmarked', description: 'Certified 22K and 18K gold.', image: '/talla/kriyon/fine-076.webp' },
  { title: 'Natural Diamonds', description: 'Certified stones, chosen with care.', image: '/talla/kriyon/fine-081.webp' },
  { title: 'Four Showrooms', description: 'Across Jammu and Udhampur.', image: '/talla/kriyon/fine-092.webp' },
  { title: 'Since 1986', description: 'Jewellery made for generations.', image: '/talla/kriyon/fine-110.webp' },
]

export default function Services() {
  return (
    <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.3 }} className="mx-auto w-full max-w-md py-6">
      <div className="mb-5">
        <div className="section-title-accent talla-title-accent mb-2">
          <h2 className="[font-family:var(--font-manrope)] text-2xl font-bold tracking-tight text-white sm:text-3xl">Why Talla Jewellers?</h2>
        </div>
        <p className="[font-family:var(--font-manrope)] text-sm font-medium text-slate-300/90 sm:text-base">Purity, craftsmanship and trust since 1986.</p>
      </div>
      <div className="grid gap-3">
        {reasons.map(({ title, description, image }, index) => (
          <motion.article key={title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05, duration: 0.28 }} className="relative min-h-[96px] overflow-hidden rounded-[22px] border border-[#DDB66A]/28 bg-[#FFF9F5] shadow-[0_10px_24px_rgba(0,0,0,.16)]">
            <div className="pointer-events-none absolute inset-y-0 right-0 w-[64%] overflow-hidden">
              <Image src={image} alt="" fill sizes="260px" className="object-cover object-center opacity-80" aria-hidden />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,#FFF9F5_0%,rgba(255,249,245,.92)_22%,rgba(255,249,245,.44)_58%,rgba(255,249,245,.08)_100%)]" />
            </div>
            <span className="absolute right-4 top-3 [font-family:var(--font-manrope)] text-[10px] font-bold tracking-[.18em] text-[#9A6B24]">0{index + 1}</span>
            <div className="relative z-10 flex min-h-[96px] items-center gap-3 p-3.5">
              <span className="relative h-[62px] w-[62px] shrink-0 overflow-hidden rounded-[18px] border border-[#DDB66A]/30 bg-white shadow-[0_7px_16px_rgba(97,1,56,.10)]">
                <Image src={image} alt="" fill sizes="62px" className="object-cover" />
              </span>
              <div className="min-w-0 max-w-[70%]">
                <h3 className="[font-family:var(--font-manrope)] text-[16px] font-bold leading-tight text-[#1D1717]">{title}</h3>
                <p className="mt-1.5 [font-family:var(--font-manrope)] text-[12px] font-semibold leading-[1.45] text-slate-600">{description}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  )
}
