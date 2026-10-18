'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ChevronLeft, ChevronRight, X, Image as ImageIcon, Video, Sparkles, Play } from 'lucide-react'
import { prepareReturnToHeroCard } from '../lib/homeNavigation'

// Authentic official Talla Jewellers gallery images
const galleryImages = [
  { src: '/talla/talla-couture-01.png', title: 'Imperial Bridal Polki Necklace', category: 'Bridal Couture' },
  { src: '/talla/talla-couture-04.png', title: 'Royal Heritage Polki Choker', category: 'Heritage Polki' },
  { src: '/talla/talla-couture-02.png', title: 'Emerald & Diamond Bridal Symphony', category: 'Bridal Couture' },
  { src: '/talla/talla-couture-03.png', title: 'Heirloom Kundan & Uncut Diamond Set', category: 'Kundan Polki' },
  { src: '/talla/talla-couture-05.png', title: 'Certified Solitaire Diamond Set', category: 'Diamonds' },
  { src: '/talla/talla-couture-06.png', title: 'Handcrafted Bridal Hathphool & Rings', category: 'Bridal Accessories' },
  { src: '/talla/talla-couture-07.png', title: 'Traditional Gold & Gemstone Choker', category: 'Temple Gold' },
  { src: '/talla/talla-detail-01.png', title: 'Fine Diamond Macro Craftsmanship', category: 'Craftsmanship' },
  { src: '/talla/collection-edit/fine-polki.png', title: 'Heritage Jadau Bridal Polki', category: 'Heritage Polki' },
  { src: '/talla/collection-edit/temple-jewellery.png', title: 'South Indian Antique Temple Gold', category: 'Temple Gold' },
  { src: '/talla/collection-edit/daily-wear-fine.png', title: 'Contemporary Diamond Daily Wear', category: 'Daily Diamonds' },
  { src: '/talla/collection-edit/ruby-daily-wear.png', title: 'Ruby & Rose Gold Symphony', category: 'Fine Gems' },
]

const galleryVideos = [
  {
    title: 'The Imperial Bridal Campaign 2026',
    subtitle: 'Official Bridal Jewellery Showcase',
    thumbnail: '/talla/talla-cinema-wide-poster.jpg',
    duration: '0:45',
  },
  {
    title: 'Heirloom Craftsmanship & Heritage',
    subtitle: 'Behind the Scenes — Talla Jewellers',
    thumbnail: '/talla/talla-film-wide-poster.jpg',
    duration: '0:30',
  },
  {
    title: 'Diamond Polki & Royal Bridal Edits',
    subtitle: 'Showroom Spotlight & Customer Favorites',
    thumbnail: '/talla/talla-reel-poster.jpg',
    duration: '0:50',
  },
]

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [imageLoading, setImageLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      galleryImages.slice(0, 6).forEach((item) => {
        const img = document.createElement('img')
        img.src = item.src
        img.loading = 'eager'
      })
    }
  }, [])

  useEffect(() => {
    if (lightboxOpen && typeof window !== 'undefined') {
      setImageLoading(true)
      const preloadIndexes = [
        photoIndex === 0 ? galleryImages.length - 1 : photoIndex - 1,
        photoIndex,
        photoIndex === galleryImages.length - 1 ? 0 : photoIndex + 1,
      ]
      preloadIndexes.forEach((idx) => {
        const img = document.createElement('img')
        img.src = galleryImages[idx].src
        img.onload = () => {
          if (idx === photoIndex) {
            setImageLoading(false)
          }
        }
      })
    }
  }, [lightboxOpen, photoIndex])

  const openLightbox = (index: number) => {
    setPhotoIndex(index)
    setLightboxOpen(true)
    setImageLoading(true)
  }

  const goPrev = () => {
    setImageLoading(true)
    setPhotoIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
  }

  const goNext = () => {
    setImageLoading(true)
    setPhotoIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <>
      <main
        className="min-h-screen pb-16 [font-family:var(--font-manrope)]"
        style={{
          background: 'linear-gradient(180deg, #181116 0%, #120C10 50%, #0D080B 100%)',
          color: '#FAF7F2',
        }}
      >
        {/* Sticky Header with Burgundy & Gold luxury look */}
        <div className="sticky top-0 z-30 border-b border-[#DDB66A]/30 bg-[#1A1118]/90 backdrop-blur-md">
          <div className="max-w-md mx-auto px-3 py-3 sm:py-3.5 flex items-center justify-between">
            <Link
              href="/"
              className="p-2.5 rounded-xl border border-[#DDB66A]/40 bg-white/5 text-[#EACD8C] hover:bg-white/10 transition-colors"
              onClick={() => prepareReturnToHeroCard()}
              aria-label="Back to home"
            >
              <ArrowLeft className="w-5 h-5 text-[#EACD8C]" />
            </Link>
            <div className="text-center">
              <span className="block text-[9px] font-semibold uppercase tracking-[0.22em] text-[#EACD8C]">
                Talla Jewellers
              </span>
              <h1 className="text-lg font-bold text-white tracking-tight">Couture Gallery</h1>
            </div>
            <div className="w-10" />
          </div>
        </div>

        <div className="max-w-md mx-auto px-3 pt-4 sm:pt-5">
          {/* Photos / Videos Tabs */}
          <div className="flex gap-2.5 mb-5 p-1 rounded-2xl border border-[#DDB66A]/30 bg-[#241520]/80 backdrop-blur-md">
            <button
              onClick={() => setActiveTab('photos')}
              className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === 'photos'
                  ? 'bg-gradient-to-r from-[#610138] to-[#80074C] text-white shadow-[0_6px_16px_rgba(97,1,56,0.4)] border border-[#DDB66A]/50'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-[#EACD8C]" />
              Photos ({galleryImages.length})
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === 'videos'
                  ? 'bg-gradient-to-r from-[#610138] to-[#80074C] text-white shadow-[0_6px_16px_rgba(97,1,56,0.4)] border border-[#DDB66A]/50'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Video className="w-4 h-4 text-[#EACD8C]" />
              Campaign Films ({galleryVideos.length})
            </button>
          </div>

          {/* Photos Tab */}
          {activeTab === 'photos' && (
            <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
              {galleryImages.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  className="group relative aspect-square overflow-hidden rounded-[22px] border border-[#DDB66A]/30 bg-[#22141E] shadow-[0_12px_28px_rgba(0,0,0,0.35)] cursor-pointer active:scale-[0.98] transition-all"
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    sizes="(max-width: 640px) 50vw, 224px"
                    priority={index < 4}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute inset-[1px] rounded-[21px] border border-white/10 pointer-events-none" />
                  <div className="absolute bottom-2.5 inset-x-3 text-left">
                    <span className="block text-[8px] font-bold uppercase tracking-[0.15em] text-[#EACD8C]">
                      {item.category}
                    </span>
                    <strong className="block truncate text-[11px] font-bold text-white">
                      {item.title}
                    </strong>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Videos Tab */}
          {activeTab === 'videos' && (
            <div className="space-y-4">
              {galleryVideos.map((video, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.06 }}
                  className="group relative overflow-hidden rounded-[24px] border border-[#DDB66A]/35 bg-[#22141E] shadow-[0_14px_30px_rgba(0,0,0,0.4)]"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="448px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="grid h-14 w-14 place-items-center rounded-full border-2 border-white/90 bg-[#610138]/85 text-white shadow-[0_8px_20px_rgba(0,0,0,0.5)] backdrop-blur-sm group-hover:scale-110 transition-transform">
                        <Play className="h-6 w-6 ml-0.5 fill-white text-white" />
                      </div>
                    </div>
                    <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
                      {video.duration}
                    </span>
                  </div>
                  <div className="p-3.5">
                    <h3 className="text-sm font-bold text-white">{video.title}</h3>
                    <p className="mt-0.5 text-[11px] text-[#EACD8C]">{video.subtitle}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Lightbox for Fullscreen Image Viewing */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              aria-label="Close"
              className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md border border-white/20"
            >
              <X className="w-5 h-5 text-white" strokeWidth={2.4} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              aria-label="Previous"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md border border-white/20"
            >
              <ChevronLeft className="w-6 h-6" strokeWidth={2.4} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              aria-label="Next"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md border border-white/20"
            >
              <ChevronRight className="w-6 h-6" strokeWidth={2.4} />
            </button>

            <motion.div
              key={photoIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-lg max-h-[85vh] w-full text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-[#DDB66A]/40 shadow-2xl bg-[#110B0F]">
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 border-3 border-[#DDB66A]/30 border-t-[#DDB66A] rounded-full animate-spin" />
                  </div>
                )}
                <Image
                  src={galleryImages[photoIndex].src}
                  alt={galleryImages[photoIndex].title}
                  fill
                  className={`object-contain transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                  sizes="100vw"
                />
              </div>
              <div className="mt-3">
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#EACD8C]">
                  {galleryImages[photoIndex].category}
                </span>
                <h2 className="mt-0.5 text-base font-bold text-white">
                  {galleryImages[photoIndex].title}
                </h2>
                <span className="mt-1 inline-block text-[11px] text-white/60">
                  {photoIndex + 1} of {galleryImages.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
