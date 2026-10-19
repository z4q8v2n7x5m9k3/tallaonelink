'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import NextLink from 'next/link'
import NextImage from 'next/image'
import { ArrowRight, Sparkles } from 'lucide-react'

// Fresh official Talla Jewellers fine jewellery and heirloom pieces
const galleryImages = [
  '/talla/kriyon/fine-076.webp',
  '/talla/kriyon/fine-081.webp',
  '/talla/kriyon/fine-110.webp',
  '/talla/kriyon/fine-104.webp',
]

const previewAvatars = [
  '/talla/kriyon/fine-076.webp',
  '/talla/kriyon/fine-081.webp',
]

const visibleImages = galleryImages.slice(0, 4)
const Image = NextImage as any
const Link = NextLink as any

export default function Gallery() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      visibleImages.forEach((src) => {
        const img = document.createElement('img')
        img.src = src
      })
    }
  }, [])

  return (
    <section id="gallery" className="mx-auto w-full max-w-md pb-6 pt-8 [font-family:var(--font-manrope)]">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="mb-5"
      >
        <div className="section-title-accent talla-title-accent mb-2">
          <h2 className="[font-family:var(--font-manrope)] text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Explore Our Gallery
          </h2>
        </div>
        <p className="text-sm font-normal tracking-tight text-slate-300/85">
          Heirloom Polki • Certified Solitaires • Regal Bridal Sets
        </p>
      </motion.div>

      {/* 4 image grid — luxury rounded geometry with subtle gold borders */}
      <div className="grid grid-cols-2 gap-3.5">
        {visibleImages.map((imageSrc, index) => (
          <motion.div
            key={`gallery-${index}-${imageSrc}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ delay: index * 0.06, duration: 0.3 }}
            className="group relative aspect-square overflow-hidden rounded-[24px] border border-[#DDB66A]/30 bg-[#1D141A] shadow-[0_16px_34px_rgba(0,0,0,.35)]"
          >
            <Image
              src={imageSrc}
              alt={`Talla Fine Jewellery ${index + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              sizes="(max-width: 448px) 50vw, 224px"
            />
            <div className="absolute inset-[1px] z-[1] rounded-[23px] border border-white/10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
          </motion.div>
        ))}
      </div>

      {/* View Gallery button — refined luxury burgundy & gold */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.3 }}
        className="mt-5"
      >
        <Link
          href="https://tallajewellers.com/gallery/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex min-h-[54px] w-full items-center justify-center gap-3 rounded-2xl border border-[#DDB66A]/60 bg-gradient-to-r from-[#610138] via-[#780646] to-[#51012E] px-4 [font-family:var(--font-manrope)] text-base font-bold tracking-tight text-white shadow-[0_12px_26px_rgba(97,1,56,.32),inset_0_1px_0_rgba(255,255,255,0.22)] transition-all active:scale-[0.98] hover:brightness-105"
        >
          {/* Changed 2 images with luxury circular styling */}
          <span className="flex -space-x-2" aria-hidden>
            {previewAvatars.map((image) => (
              <span
                key={image}
                className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-white shadow-[0_4px_10px_rgba(0,0,0,0.3)] ring-1 ring-[#DDB66A]/80 transition-transform group-hover:scale-105"
              >
                <Image src={image} alt="" fill sizes="32px" className="object-cover" />
              </span>
            ))}
          </span>
          <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">Explore Our Gallery</span>
          <ArrowRight className="h-4 w-4 text-[#EACD8C] transition-transform group-hover:translate-x-0.5" />
        </Link>
      </motion.div>
    </section>
  )
}
