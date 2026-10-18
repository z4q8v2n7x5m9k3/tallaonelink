'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import NextLink from 'next/link'
import NextImage from 'next/image'
import { useRouter } from 'next/navigation'
import { setReturnSection } from '../../../lib/homeNavigation'

// Gallery images from public/talla folder
const galleryImages = [
  '/talla/kriyon/fine-103.webp',
  '/talla/kriyon/fine-104.webp',
  '/talla/kriyon/fine-110.webp',
  '/talla/kriyon/fine-115.webp',
]

const visibleImages = galleryImages.slice(0, 4)
const Image = NextImage as any
const Link = NextLink as any

export default function Gallery() {
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      visibleImages.forEach((src) => {
        const img = document.createElement('img')
        img.src = src
      })
    }
  }, [])

  const handleImageClick = () => {
    setReturnSection('gallery')
    router.push('/gallery')
  }

  return (
    <section id="gallery" className="mx-auto w-full max-w-md pb-6 pt-8 [font-family:var(--font-manrope)]">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="mb-6"
      >
        <div className="section-title-accent talla-title-accent mb-2">
          <h2 className="[font-family:var(--font-manrope)] text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Bridal Gallery
          </h2>
        </div>
        <p className="whitespace-nowrap [font-family:var(--font-manrope)] text-sm font-normal tracking-tight text-slate-300/90 sm:text-base">Bridal • couture • heirloom moments.</p>
      </motion.div>

      {/* 4 image grid — Mango "Gallery" geometry, big rounded corners + premium shadow */}
      <div className="grid grid-cols-2 gap-3.5">
        {visibleImages.map((imageSrc, index) => (
          <motion.div
            key={`gallery-${index}-${imageSrc}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ delay: index * 0.06, duration: 0.3 }}
            className="group relative aspect-square cursor-pointer overflow-hidden rounded-[24px] border border-white/10 shadow-[0_18px_36px_rgba(0,0,0,.24)]"
            onClick={handleImageClick}
          >
            <Image
              src={imageSrc}
              alt={`Gallery image ${index + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 448px) 50vw, 224px"
            />
            <div className="absolute inset-[1px] z-[1] rounded-[23px] border border-white/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
          </motion.div>
        ))}
      </div>

      {/* View Gallery button — Mango pill geometry, blue brand */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.3 }}
        className="mt-5"
      >
        <Link
          href="/gallery"
          onClick={() => setReturnSection('gallery')}
          className="flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-2xl border border-[#DDB66A]/45 bg-[#610138] px-4 [font-family:var(--font-manrope)] text-base font-bold tracking-tight text-white shadow-[0_12px_24px_rgba(97,1,56,.22)] transition active:scale-[0.98]"
        >
          <span className="flex -space-x-2" aria-hidden>{visibleImages.slice(0, 2).map((image) => <span key={image} className="relative h-7 w-7 overflow-hidden rounded-full border-2 border-[#242424]"><Image src={image} alt="" fill sizes="28px" className="object-cover" /></span>)}</span>
          View Gallery
        </Link>
      </motion.div>
    </section>
  )
}
