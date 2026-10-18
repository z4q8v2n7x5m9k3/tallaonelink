'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Clock, Clock3, ChevronRight, X, Store, Hand, Award, Calendar, FileText, ArrowLeft, Share2 } from 'lucide-react'
import { shopConfig, ContactPerson } from '../config'
import ActionsRow, { ActionsRowRef } from './ActionsRow'
import Card3D, { Face } from '../../../components/Card3D'
import PaymentFace from './PaymentFace'
import AppointmentFace from './AppointmentFace'
import { useLanguage } from '../../../contexts/LanguageContext'
import { playClickSound } from '../../../lib/playClickSound'

export default function Hero() {
  const { t } = useLanguage()
  const [currentFace, setCurrentFace] = useState<Face>('front')
  const [isFlipping, setIsFlipping] = useState(false)
  const [openStatus, setOpenStatus] = useState<{ isOpen: boolean; openTimeLabel: string; closeTimeLabel: string }>({
    isOpen: true,
    openTimeLabel: '10:30 AM',
    closeTimeLabel: '7:00 PM',
  })
  /** Flip duration in ms – set per transition so 180°/360°/540° all feel same speed */
  const [flipDurationMs, setFlipDurationMs] = useState(650)
  const actionsRowRef = useRef<ActionsRowRef>(null)
  const heroSectionRef = useRef<HTMLElement>(null)

  const headerImages = [
    '/talla/talla-couture-05.png',
    '/talla/talla-cinema-wide-poster.jpg',
    '/talla/talla-film-wide-poster.jpg',
  ]
  const [headerImageIndex, setHeaderImageIndex] = useState(0)
  const [hoursPopoverOpen, setHoursPopoverOpen] = useState(false)
  const [hoursPortalMounted, setHoursPortalMounted] = useState(false)

  useEffect(() => setHoursPortalMounted(true), [])
  useEffect(() => {
    if (!hoursPopoverOpen) return
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setHoursPopoverOpen(false) }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [hoursPopoverOpen])

  // 180° = 0.65s, 360° = 1.3s, 540° = 2s (same angular speed)
  const DURATION_180_MS = 650
  const DURATION_360_MS = 1300
  const DURATION_540_MS = 2000
  const doctorCredentials = ['Gold', 'Diamonds', 'Polki', 'Silver']
  const doctorExpertise = ['100% BIS Hallmarked', 'Natural Diamonds', 'Bridal Jewellery', 'ZAVI Silver', 'Solitaires', 'Heritage Polki']

  const dayAbbrToIndex: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  }

  const computeOpenStatus = useCallback(() => {
    const hours = shopConfig?.contact?.storeHours || ''
    const normalized = hours
      .replace(/[–—]/g, '-')
      .replace(/\s+/g, ' ')
      .trim()

    // Example: "Mon-Sat 10:30 AM - 7:00 PM"
    const re = /(Sun|Mon|Tue|Wed|Thu|Fri|Sat)(?:\s*-\s*(Sun|Mon|Tue|Wed|Thu|Fri|Sat))?\s+(\d{1,2}:\d{2}\s*[AP]M)\s*-\s*(\d{1,2}:\d{2}\s*[AP]M)/i
    const match = normalized.match(re)
    if (!match) {
      return {
        isOpen: true,
        openTimeLabel: '10:30 AM',
        closeTimeLabel: '8:00 PM',
      }
    }

    const startDayStr = (match[1] || '').slice(0, 3)
    const endDayStr = (match[2] || startDayStr).slice(0, 3)
    const openTimeStr = match[3]
    const closeTimeStr = match[4]

    const startDay = dayAbbrToIndex[startDayStr]
    const endDay = dayAbbrToIndex[endDayStr]
    if (startDay === undefined || endDay === undefined) {
      return {
        isOpen: true,
        openTimeLabel: openTimeStr?.trim() || '10:30 AM',
        closeTimeLabel: closeTimeStr?.trim() || '8:00 PM',
      }
    }

    const parseTimeMinutes = (timeStr: string) => {
      const m = timeStr.match(/(\d{1,2}):(\d{2})\s*([AP]M)/i)
      if (!m) return 0
      let hh = Number(m[1])
      const mm = Number(m[2])
      const ap = m[3].toUpperCase()
      if (ap === 'PM' && hh < 12) hh += 12
      if (ap === 'AM' && hh === 12) hh = 0
      return hh * 60 + mm
    }

    const openMinutes = parseTimeMinutes(openTimeStr)
    const closeMinutes = parseTimeMinutes(closeTimeStr)
    const now = new Date()
    const nowDay = now.getDay()
    const nowMinutes = now.getHours() * 60 + now.getMinutes()

    // Inclusive day range (supports wrap-around like Fri-Mon)
    const daysInRange: number[] = []
    let i = startDay
    while (true) {
      daysInRange.push(i)
      if (i === endDay) break
      i = (i + 1) % 7
    }
    const dayOk = daysInRange.includes(nowDay)
    if (!dayOk) {
      return {
        isOpen: false,
        openTimeLabel: openTimeStr.trim(),
        closeTimeLabel: closeTimeStr.trim(),
      }
    }

    if (openMinutes <= closeMinutes) {
      const isOpen = nowMinutes >= openMinutes && nowMinutes < closeMinutes
      return {
        isOpen,
        openTimeLabel: openTimeStr.trim(),
        closeTimeLabel: closeTimeStr.trim(),
      }
    }
    // If close time is past midnight (rare for your current hours), handle wrap.
    const isOpen = nowMinutes >= openMinutes || nowMinutes < closeMinutes
    return {
      isOpen,
      openTimeLabel: openTimeStr.trim(),
      closeTimeLabel: closeTimeStr.trim(),
    }
  }, [])

  const getKeywordBadgeIcon = (badge: string) => {
    const b = badge.toLowerCase()
    if (b.includes('1960') || b.includes('1986') || b.includes('legacy')) return Award
    if (b.includes('hallmark') || b.includes('bis')) return Award
    if (b.includes('showroom')) return Store
    return Award
  }

  useEffect(() => {
    setOpenStatus(computeOpenStatus())
    const id = window.setInterval(() => {
      setOpenStatus(computeOpenStatus())
    }, 60 * 1000)
    return () => window.clearInterval(id)
  }, [computeOpenStatus])

  // Header image carousel: cycle through 3 images very smoothly (matches Mango)
  useEffect(() => {
    const interval = setInterval(() => {
      setHeaderImageIndex((i) => (i + 1) % headerImages.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [headerImages.length])

  const handleFlip = (e?: React.MouseEvent, forceFlip = false) => {
    if (isFlipping) return
    if (!forceFlip && e && (e.target as HTMLElement).closest('button, a, [role="button"]')) {
      return
    }
    setFlipDurationMs(DURATION_180_MS)
    heroSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setIsFlipping(true)
    if (currentFace === 'front') {
      setCurrentFace('info')
    } else if (currentFace === 'info') {
      setCurrentFace('front')
    } else {
      setCurrentFace('info')
    }
    setTimeout(() => setIsFlipping(false), DURATION_180_MS)
  }

  const handleOpenPayments = useCallback(() => {
    heroSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setFlipDurationMs(DURATION_180_MS)
    setIsFlipping(true)
    setCurrentFace('payment')
    setTimeout(() => setIsFlipping(false), DURATION_180_MS)
  }, [])

  const handleBackFromPayment = () => {
    if (isFlipping) return
    heroSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setFlipDurationMs(DURATION_180_MS)
    setIsFlipping(true)
    setCurrentFace('front')
    setTimeout(() => setIsFlipping(false), DURATION_180_MS)
  }

  const handleOpenAppointment = useCallback(() => {
    // One clean flip (180° feel) instead of long 540° spin.
    setFlipDurationMs(DURATION_180_MS)
    setIsFlipping(true)
    setCurrentFace('appointment')
    setTimeout(() => setIsFlipping(false), DURATION_180_MS)
  }, [])

  const handleBackFromAppointment = () => {
    if (isFlipping) return
    setFlipDurationMs(DURATION_180_MS)
    setIsFlipping(true)
    setCurrentFace('front')
    setTimeout(() => setIsFlipping(false), DURATION_180_MS)
  }

  const handleOpenDoctorProfile = useCallback(() => {
    setFlipDurationMs(DURATION_180_MS)
    setIsFlipping(true)
    setCurrentFace('doctor')
    setTimeout(() => setIsFlipping(false), DURATION_180_MS)
  }, [])

  const handleBackFromDoctorProfile = () => {
    if (isFlipping) return
    setFlipDurationMs(DURATION_180_MS)
    setIsFlipping(true)
    setCurrentFace('front')
    setTimeout(() => setIsFlipping(false), DURATION_180_MS)
  }

  // Open payment face when returning from menu page (Proceed to Payment)
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem('openPayment')) {
      sessionStorage.removeItem('openPayment')
      const t = setTimeout(handleOpenPayments, 150)
      return () => clearTimeout(t)
    }
  }, [handleOpenPayments])

  // Open appointment face when coming from services page (Book Appointment)
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem('openAppointment') === 'true') {
      sessionStorage.removeItem('openAppointment')
      if (window.history.replaceState) {
        window.history.replaceState(null, '', window.location.pathname + (window.location.hash || ''))
      }
      const t = setTimeout(handleOpenAppointment, 200)
      return () => clearTimeout(t)
    }
  }, [handleOpenAppointment])

  // Flip card to back (Business Snapshot) when coming from "Flip Card" button
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem('openFlip') === 'true') {
      sessionStorage.removeItem('openFlip')
      const t = setTimeout(() => {
        setFlipDurationMs(650)
        setIsFlipping(true)
        setCurrentFace('info')
        setTimeout(() => setIsFlipping(false), 650)
      }, 450)
      return () => clearTimeout(t)
    }
  }, [])

  // If user navigates back from services/tools, force the main card front face.
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      if (sessionStorage.getItem('forceHeroFront') === 'true') {
        sessionStorage.removeItem('forceHeroFront')
        setCurrentFace('front')
      }
    } catch {
      // Ignore storage issues.
    }
  }, [])

  return (
    <motion.section
      ref={heroSectionRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full max-w-md mx-auto pt-4 pb-6 min-w-0"
      style={{ width: '100%', maxWidth: 'min(100%, 28rem)' }}
    >
      <Card3D
        currentFace={currentFace}
        isFlipping={isFlipping}
        transitionDuration={flipDurationMs / 1000}
        faceFront={
          <div 
          className="rounded-[24px] relative cursor-pointer overflow-hidden"
          style={{
              background:
                'linear-gradient(180deg, #FFFDF8 0%, #FFFFFF 54%, #F8F0DD 100%)',
            border: '1px solid rgba(184, 135, 44, 0.32)',
            boxShadow:
              '0 26px 60px rgba(0, 0, 0, 0.28), 0 10px 26px rgba(15, 23, 42, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.96)',
            minHeight: '660px',
            boxSizing: 'border-box',
          }}
            onClick={(e) => {
              const target = e.target as HTMLElement
              const isButton = target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button, a')
              const isInActionsRow = target.closest('[data-actions-row]')
              const isInSocialIcons = target.closest('[data-social-icons]')
              const isSVG = target.tagName === 'svg' || target.closest('svg')
              const isInSVG = isSVG && target.closest('[data-social-icons]')
              if (!isButton && !isInActionsRow && !isInSocialIcons && !isInSVG) {
                handleFlip(e)
              }
            }}
          >
            {/* Top edge shine – soft white fade above header (Mango polish) */}
            <div
              className="absolute inset-x-0 top-0 h-24 rounded-t-[24px] pointer-events-none z-0 opacity-70"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 100%)',
              }}
            />

            {/* Subtle Talla Golden Brand Emblem Watermark in card background */}
            <div
              className="absolute right-[-24px] bottom-[110px] w-72 h-72 pointer-events-none opacity-[0.07] z-0 select-none"
              style={{
                backgroundImage: 'url(/talla/talla-emblem.png)',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
              aria-hidden
            />

            {/* Tap to flip – corner hint (front face only) */}
            {currentFace === 'front' && (
              <motion.button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  playClickSound()
                  handleFlip(e, true)
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-4 right-4 z-10 text-xs font-semibold px-3 py-2 rounded-full shadow-lg cursor-pointer transition-all flex items-center gap-1.5 touch-manipulation"
                style={{
                  WebkitTapHighlightColor: 'transparent',
                  color: '#0f172a',
                  background: 'rgba(255,255,255,0.95)',
                  border: '1px solid rgba(147, 197, 253, 0.7)',
                  boxShadow: '0 8px 18px rgba(7, 59, 115, 0.18), 0 2px 6px rgba(15, 23, 42, 0.08)',
                }}
                aria-label={t('tapToFlip')}
              >
                <Hand className="w-3.5 h-3.5" style={{ color: '#1e40af' }} />
                <span style={{ fontSize: '12px' }}>{t('tapToFlip')}</span>
              </motion.button>
            )}

            {/* Header – 3 images, smooth crossfade (Mango pattern) */}
            <div className="relative h-44 bg-slate-900 overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={headerImageIndex}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                >
                  <Image
                    src={headerImages[headerImageIndex]}
                    alt={`${shopConfig.name} Jewellery`}
                    fill
                    className="object-cover object-center"
                    priority={headerImageIndex === 0}
                    sizes="(max-width: 448px) 100vw, 448px"
                    unoptimized
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
            </div>

            {/* Social Media Icons - At header border line (same line as logo, right side) */}
            <motion.div 
              data-social-icons
              className="absolute right-4 z-20 flex items-center gap-2.5 social-icons-top"
              style={{ top: '9.625rem' }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ 
                opacity: 1, 
                y: 0,
              }}
              transition={{ duration: 0.4, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
              }}
              onMouseDown={(e) => {
                e.stopPropagation()
                e.preventDefault()
              }}
              onTouchStart={(e) => {
                e.stopPropagation()
                e.preventDefault()
              }}
            >
              <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }} onClick={(e) => { e.stopPropagation(); e.preventDefault(); playClickSound(); window.open(shopConfig.social.instagram, '_blank', 'noopener,noreferrer') }} className="grid h-11 w-11 place-items-center overflow-hidden rounded-full border-2 border-white/95 bg-white shadow-[0_10px_24px_rgba(0,0,0,.18),inset_0_1px_0_rgba(255,255,255,.9)] ring-1 ring-[#DDB66A]/40 transition-transform active:scale-95" aria-label="Open Instagram"><Image src="/instagram-official.png" alt="Instagram" width={29} height={29} className="h-[27px] w-[27px] object-contain" /></motion.button>
              <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }} onClick={async (e) => { e.stopPropagation(); e.preventDefault(); playClickSound(); if (navigator.share) await navigator.share({ title: shopConfig.name, text: shopConfig.tagline, url: window.location.href }); else await navigator.clipboard?.writeText(window.location.href) }} className="grid h-11 w-11 place-items-center rounded-full border-2 border-white/95 bg-white text-[#610138] shadow-[0_10px_24px_rgba(0,0,0,.18),inset_0_1px_0_rgba(255,255,255,.9)] ring-1 ring-[#DDB66A]/50 transition-transform active:scale-95" aria-label="Share Talla Jewellers"><Share2 className="h-[19px] w-[19px]" strokeWidth={2.4} /></motion.button>
              {/* WhatsApp - Opens Selector in Card */}
              <motion.button
                data-whatsapp-button
                aria-label="Open WhatsApp"
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  // Trigger WhatsApp selector in ActionsRow
                  actionsRowRef.current?.openWhatsAppSelector()
                }}
                onMouseDown={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                }}
                onTouchStart={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                className="h-11 w-11 p-0 rounded-full flex items-center justify-center overflow-hidden transition-all cursor-pointer bg-white touch-manipulation border-2 border-white/95 shadow-[0_10px_24px_rgba(37,211,102,0.28),inset_0_1px_0_rgba(255,255,255,.9)] ring-1 ring-[#25D366]/60 active:scale-95"
              >
                <svg viewBox="0 0 24 24" className="w-[23px] h-[23px]" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </motion.button>
            </motion.div>

            {/* Content – soft top-to-white gradient (matches Mango premium feel) */}
            <div
              className="relative px-4 sm:px-5 pb-6 pt-3 max-w-full"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.98) 36%, rgba(247,255,253,0.98) 100%)',
              }}
            >
              {/* Soft white halo behind brand info (Mango blur lift) */}
              <div className="absolute inset-x-6 top-2 h-10 rounded-full bg-white/70 blur-2xl pointer-events-none" />
              <div
                className="pointer-events-none absolute -right-14 -top-5 h-44 w-44 opacity-[0.075] select-none"
                style={{
                  backgroundImage: 'url(/talla/talla-emblem.png)',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'contain',
                }}
                aria-hidden
              />

              {/* Logo Circle – subtle infinite float with enlarged premium frame */}
              <motion.div
                className="absolute -top-16 left-5"
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  y: [0, -4, 0],
                }}
                transition={{
                  scale: { duration: 0.4, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] },
                  opacity: { duration: 0.4, delay: 0.1 },
                  y: { duration: 5, repeat: Infinity, ease: 'easeInOut', repeatType: 'reverse' },
                }}
              >
                <div
                  className="h-28 w-28 rounded-full flex items-center justify-center overflow-hidden bg-[#610138]"
                  style={{
                    border: '2.5px solid rgba(255, 255, 255, 0.95)',
                    boxShadow:
                      '0 16px 34px rgba(97, 1, 56, 0.30), 0 5px 14px rgba(15, 23, 42, 0.12), inset 0 1px 0 rgba(255,255,255,0.4)',
                  }}
                >
                  <Image
                    src={shopConfig.assets.logo}
                    alt={`${shopConfig.name} logo`}
                    width={140}
                    height={140}
                    className="h-full w-full scale-[1.72] object-cover rounded-full"
                  />
                </div>
              </motion.div>

              {/* Brand info - clean, bold, high-contrast typography matching Burger Bazaar */}
              <motion.div 
                className="pt-11 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <h1 className="mb-1 text-2xl sm:text-[26px] font-black leading-tight tracking-tight text-[#151515]">
                  {shopConfig.name}
                </h1>
                <p className="font-bold text-[14px] sm:text-[15px] mb-2 text-[#610138] tracking-tight">
                  {shopConfig.tagline}
                </p>
                {'serviceTagline' in shopConfig && (shopConfig as { serviceTagline?: string }).serviceTagline && (
                  <p className="text-[12.5px] font-semibold leading-snug mb-3.5 text-[#64748b]">
                    {(shopConfig as { serviceTagline: string }).serviceTagline}
                  </p>
                )}
                {'keywordBadges' in shopConfig && Array.isArray(shopConfig.keywordBadges) && (
                  <div className="flex flex-col gap-2 mb-4 w-full">
                    {/* Business highlights with extra breathing room */}
                    <div className="flex flex-nowrap items-center gap-2 w-full overflow-hidden">
                      {shopConfig.keywordBadges.map((badge: string) => {
                        const Icon = getKeywordBadgeIcon(badge)
                        return (
                          <span
                            key={badge}
                            className="inline-flex h-7 items-center gap-1.5 rounded-full border px-2.5 text-[10px] font-bold"
                            style={{
                              background: '#FFF6DF',
                              borderColor: '#DDB66A',
                              color: '#610138',
                            }}
                          >
                            {badge.toLowerCase().includes('bis') || badge.toLowerCase().includes('hallmark') ? (
                              <Image src="/talla/bis-hallmark-color.png" alt="BIS Hallmark" width={20} height={14} className="h-3.5 w-5 flex-shrink-0 object-contain" />
                            ) : (
                              <Icon className="h-3 w-3 flex-shrink-0 text-[#A87319]" strokeWidth={2.2} />
                            )}
                            <span className="leading-none">{badge}</span>
                          </span>
                        )
                      })}
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Actions */}
              <motion.div
                data-actions-row
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
              >
                <ActionsRow 
                  ref={actionsRowRef}
                  onOpenPayments={handleOpenPayments}
                  onOpenAppointment={handleOpenAppointment}
                  onOpenDoctorProfile={handleOpenDoctorProfile}
                />
              </motion.div>

            </div>
          </div>
        }
        faceInfo={
          <div
            className="backdrop-blur-md rounded-[24px] shadow-2xl border-2 cursor-pointer relative h-full overflow-hidden flex flex-col"
            style={{
              minHeight: 'min(580px, 85dvh)',
              boxSizing: 'border-box',
              background: 'linear-gradient(145deg,#170611 0%,#3D0B27 48%,#610138 100%)',
              borderColor: 'rgba(229,214,155,.42)',
              boxShadow: '0 18px 40px rgba(0,0,0,.28), 0 0 0 1px rgba(229,214,155,.12)',
            }}
            onClick={(e) => {
              if ((e.target as HTMLElement).closest('button, a, [role="button"]')) return
              handleFlip(e, true)
            }}
          >
            {/* Tap to Return – same as Mango, bluish accent */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={currentFace === 'info' ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => { e.stopPropagation(); handleFlip(e, true); }}
              className="absolute top-4 right-4 z-10 text-xs text-white font-semibold bg-white/20 hover:bg-white/30 px-3 py-2 rounded-xl backdrop-blur-md shadow-lg cursor-pointer transition-all flex items-center gap-1.5 touch-manipulation"
              style={{ WebkitTapHighlightColor: 'transparent' }}
              aria-label={t('tapToReturn')}
            >
              <Hand className="w-3.5 h-3.5 text-white" />
              <span style={{ fontSize: '12px' }}>{t('tapToReturn')}</span>
            </motion.button>

            {/* Animated background pattern – like Mango */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.08) 0%, transparent 50%)',
              }}
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Content – white text, glass blocks like Mango */}
            <div
              className="relative flex-1 flex flex-col items-center justify-center min-h-0 text-white overflow-hidden overflow-x-hidden"
              style={{
                paddingLeft: 'max(1rem, env(safe-area-inset-left) + 4px)',
                paddingRight: 'max(1rem, env(safe-area-inset-right) + 4px)',
                // Use clamped padding + vertical centering to avoid "empty space" feel
                // while keeping room for the top-right "Tap to Return" control.
                paddingTop: 'clamp(2.6rem, 5.5vh, 4rem)',
                paddingBottom: 'max(1rem, env(safe-area-inset-bottom) + 0.75rem)',
              }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={currentFace === 'info' ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
                className="w-full flex flex-col items-center max-w-[calc(100%-0.25rem)] flex-shrink-0 gap-0"
              >
                <h2 className="text-xl sm:text-2xl font-black mb-4 pt-1 pb-1 tracking-wide text-white text-center w-full [text-shadow:0_1px_3px_rgba(0,0,0,0.25)]">
                  Business Snapshot
                </h2>

                {/* Block 1: Location – Mango-style light block + dark blue icon pill */}
                <div
                  className="flex items-start gap-3 w-full mb-3 rounded-[22px] p-3.5 sm:p-4 border shadow-[0_10px_24px_rgba(0,0,0,0.16)]"
                  style={{
                    background: 'linear-gradient(135deg,rgba(255,253,248,.99),rgba(248,237,214,.97))',
                    borderColor: 'rgba(221,182,106,.68)',
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_8px_18px_rgba(30,64,175,0.28)]"
                    style={{ background: 'linear-gradient(135deg,#610138,#8A1455)', border: '1px solid rgba(221,182,106,.72)' }}
                  >
                    <MapPin className="w-5 h-5" style={{ color: '#DBEAFE' }} />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <p className="text-sm font-black leading-snug text-[#3B0A26]">Five Signature Showrooms</p>
                    <p className="text-[11px] font-medium leading-relaxed text-slate-700">Gandhi Nagar • City Chowk • Channi Himmat • Katra • Udhampur</p>
                  </div>
                </div>

                {/* Block 2: Services – same treatment */}
                <div
                  className="flex items-start gap-3 w-full mb-3 rounded-[22px] p-3.5 sm:p-4 border shadow-[0_10px_24px_rgba(0,0,0,0.16)]"
                  style={{
                    background: 'linear-gradient(135deg,rgba(255,253,248,.99),rgba(248,237,214,.97))',
                    borderColor: 'rgba(221,182,106,.68)',
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_8px_18px_rgba(30,64,175,0.28)]"
                    style={{ background: 'linear-gradient(135deg,#610138,#8A1455)', border: '1px solid rgba(221,182,106,.72)' }}
                  >
                    <Store className="w-5 h-5" style={{ color: '#DBEAFE' }} />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <p className="text-sm font-black leading-snug text-[#3B0A26]">Fine Jewellery &amp; Bridal</p>
                    <p className="text-[11px] font-medium leading-relaxed text-slate-700">Bridal • Gold • Natural Diamonds • Polki • ZAVI Silver</p>
                  </div>
                </div>



                {/* Google Map – matches block treatment */}
                <div
                  className="w-full h-28 sm:h-32 rounded-[22px] overflow-hidden mb-4 pointer-events-none flex-shrink-0 border shadow-[0_10px_24px_rgba(0,0,0,0.16)]"
                  style={{
                    background: 'rgba(255,255,255,0.94)',
                    borderColor: 'rgba(10, 102, 178, 0.35)',
                  }}
                >
                  <iframe
                    src={`https://www.google.com/maps?q=${encodeURIComponent(shopConfig.contact.mapQuery)}&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0, pointerEvents: 'none' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                {/* Open in Maps – same style as Mango (white pill on gradient) */}
                <div className="w-full flex flex-col items-center mt-2 pt-2" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
                  <motion.a
                    href={shopConfig.google?.isDemo ? '#demo-location' : `https://www.google.com/maps?q=${encodeURIComponent(shopConfig.contact.mapQuery)}`}
                    target={shopConfig.google?.isDemo ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center gap-2 bg-white/25 hover:bg-white/35 active:bg-white/40 text-white font-semibold px-6 py-3.5 rounded-full border border-white/30 backdrop-blur-sm touch-manipulation pointer-events-auto shadow-[0_10px_25px_rgba(0,0,0,0.3)] min-h-[48px] min-w-[180px]"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleFlip(e, true)
                      setTimeout(() => {
                        if (shopConfig.google?.isDemo) {
                          window.alert('Demo Version — location directions are not connected.')
                          return
                        }
                        window.open(`https://www.google.com/maps?q=${encodeURIComponent(shopConfig.contact.mapQuery)}`, '_blank', 'noopener,noreferrer')
                      }, 700)
                    }}
                    style={{ fontSize: 'clamp(13px, 3.5vw, 15px)', WebkitTapHighlightColor: 'transparent' }}
                  >
                    <MapPin className="w-5 h-5 flex-shrink-0 text-white" />
                    {shopConfig.google?.isDemo ? 'Demo Version' : 'Get Directions'}
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        }
        facePayment={
          <PaymentFace
            upiId={shopConfig.payment.upiId}
            upiId2={'upiId2' in shopConfig.payment ? shopConfig.payment.upiId2 : undefined}
            upiName={shopConfig.payment.upiName}
            upiQrImageUrl={shopConfig.payment.upiQrImageUrl}
            scannerImage={shopConfig.payment.scannerImage}
            bank={shopConfig.payment.bank}
            onBack={handleBackFromPayment}
          />
        }
        faceAppointment={
          <AppointmentFace onBack={handleBackFromAppointment} />
        }
        faceDoctor={
          <div
            className="rounded-[24px] shadow-2xl border cursor-default relative h-full overflow-hidden flex flex-col text-slate-900 bg-white"
            style={{
              minHeight: 'min(580px, 85dvh)',
              boxSizing: 'border-box',
              backgroundImage: 'radial-gradient(circle at 100% 0%, #FFFDF8 0%, transparent 40%), radial-gradient(circle at 0% 100%, #FCF7ED 0%, transparent 40%)',
              borderColor: 'rgba(221, 182, 106, 0.35)',
              boxShadow: '0 26px 60px rgba(0, 0, 0, 0.08), 0 10px 26px rgba(15, 23, 42, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.96)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[220px] shrink-0 overflow-hidden rounded-t-[24px]">
              <Image
                src="/talla/ruby-couture-editorial.jpg"
                alt="Talla Jewellers"
                fill
                sizes="(max-width: 480px) 100vw, 420px"
                className="object-cover"
                style={{ objectPosition: 'center 20%' }}
                unoptimized
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/80 to-transparent" />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  playClickSound()
                  handleBackFromDoctorProfile()
                }}
                onTouchEnd={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  playClickSound()
                  handleBackFromDoctorProfile()
                }}
                className="absolute left-4 top-4 z-30 flex h-10 items-center justify-center gap-1.5 rounded-full bg-white/95 px-4 text-sm font-black text-[#610138] shadow-[0_10px_24px_rgba(97,1,56,0.16)] ring-1 ring-[#DDB66A]/40 backdrop-blur-md transition-transform active:scale-95 touch-manipulation"
                style={{ WebkitTapHighlightColor: 'transparent' }}
                aria-label="Back to card"
              >
                <ArrowLeft className="h-4 w-4 pointer-events-none" />
                Back
              </button>
            </div>

            <div className="relative z-10 flex flex-1 flex-col justify-between px-5 pb-6 pt-1">
              <div className="flex flex-col gap-2 -mt-10">
                <div className="text-center shrink-0 relative z-10 mb-1">
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#610138] mb-0.5">
                    Jeweller Profile
                  </p>
                  <h2 className="text-[1.6rem] font-black leading-tight tracking-tight text-slate-900">
                    Talla Jewellers
                  </h2>
                  <p className="mt-0.5 text-[13px] font-bold leading-snug text-slate-500">
                    Fine Gold, Diamonds & Royal Polki
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 justify-center shrink-0">
                  {doctorCredentials.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#DDB66A]/30 bg-[#FCF7ED] px-3 py-1.5 text-[11px] font-bold tracking-wide text-[#610138] shadow-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="shrink-0 rounded-[18px] border border-slate-100 bg-white p-3.5 shadow-[0_4px_16px_rgba(0,0,0,0.03)] text-center">
                  <p className="text-[13px] font-bold leading-5 text-slate-800">
                    Heirloom Luxury • Since 1960
                  </p>
                  <p className="mt-1.5 text-[12px] font-medium leading-5 text-slate-500">
                    Jammu & Kashmir’s most cherished destination for hallmarked bridal jewellery and certified solitaires.
                  </p>
                </div>

                <div className="shrink-0 grid grid-cols-2 gap-2">
                  {doctorExpertise.map((item) => (
                    <span
                      key={item}
                      className="rounded-2xl border border-[#DDB66A]/20 bg-[#FFFDF8] px-2.5 py-2.5 text-center text-[11.5px] font-bold text-[#610138] shadow-sm flex items-center justify-center"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="shrink-0 grid grid-cols-2 gap-2">
                  <div className="rounded-[16px] border border-slate-100 bg-white px-2 py-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.02)] text-center flex flex-col justify-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#610138]">Founding</p>
                    <p className="mt-1 text-[11px] font-bold leading-snug text-slate-800">Since 1960</p>
                  </div>
                  <div className="rounded-[16px] border border-slate-100 bg-white px-2 py-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.02)] text-center flex flex-col justify-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#610138]">Purity</p>
                    <p className="mt-1 text-[11px] font-bold leading-snug text-slate-800">100% BIS Hallmarked</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 mb-2 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    playClickSound()
                    handleBackFromDoctorProfile()
                    handleOpenAppointment()
                  }}
                  className="flex shrink-0 h-[52px] w-full items-center justify-center gap-2 rounded-[16px] text-[15px] font-black text-white shadow-[0_12px_24px_rgba(97,1,56,0.25)] transition-transform active:scale-[0.98] cursor-pointer touch-manipulation"
                  style={{ background: 'linear-gradient(135deg, #610138 0%, #370820 100%)' }}
                >
                  <Calendar className="h-4 w-4 text-[#DDB66A]" />
                  Book Jewellery Consultation
                </button>
              </div>
            </div>
          </div>
        }
      />

    </motion.section>
  )
}
