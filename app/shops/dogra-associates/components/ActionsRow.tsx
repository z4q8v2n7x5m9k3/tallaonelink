'use client'

import { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShoppingBag,
  Calendar,
  MapPin,
  Gem,
  Sparkles,
  Star,
  RefreshCw,
  Landmark,
  Coins,
  Phone,
  X,
  ShieldCheck,
  ChevronRight,
  Clock,
  User,
  CheckCircle2,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { shopConfig, ContactPerson } from '../config'
import { getTelLink, getWhatsAppLink } from '../../../lib/phone'
import { playClickSound } from '../../../lib/playClickSound'
import { useLanguage } from '../../../contexts/LanguageContext'
import { prepareReturnToHeroCard } from '../../../lib/homeNavigation'
import GoogleGIcon from '../../../components/GoogleGIcon'

interface ActionsRowProps {
  onOpenPayments?: () => void
  onOpenAppointment?: () => void
  onOpenDoctorProfile?: () => void
}

export interface ActionsRowRef {
  openWhatsAppSelector: () => void
}

const CONSULTATION_PURPOSES = [
  'Bridal Jewellery Consultation',
  'Gold & Diamond Shopping',
  'Custom Jewellery Enquiry',
  'Gold Exchange Consultation',
]

const TIME_SLOTS = [
  '11:00 AM',
  '1:00 PM',
  '3:00 PM',
  '5:00 PM',
  '6:30 PM',
]

const SHOWROOM_PREVIEW_IMAGES = [
  '/talla/showrooms/gandhi-nagar.jpg',
  '/talla/showrooms/lakhdata-bazar.jpg',
  '/talla/showrooms/udhampur.jpg',
]

const ActionsRow = forwardRef<ActionsRowRef, ActionsRowProps>(({ onOpenPayments, onOpenAppointment, onOpenDoctorProfile }, ref) => {
  const { t } = useLanguage()
  const [callSelectorOpen, setCallSelectorOpen] = useState(false)
  const [whatsappSelectorOpen, setWhatsappSelectorOpen] = useState(false)
  const [showroomsModalOpen, setShowroomsModalOpen] = useState(false)
  const [goldExchangeOpen, setGoldExchangeOpen] = useState(false)
  const [storyOpen, setStoryOpen] = useState(false)
  const [consultationModalOpen, setConsultationModalOpen] = useState(false)
  const [showroomPreviewIndex, setShowroomPreviewIndex] = useState(0)

  // Consultation Form state
  const [custName, setCustName] = useState('')
  const [custPhone, setCustPhone] = useState('')
  const [selectedPurpose, setSelectedPurpose] = useState(CONSULTATION_PURPOSES[0])
  const [selectedBranch, setSelectedBranch] = useState(shopConfig.branches[0]?.name || 'Talla Jewellers — Gandhi Nagar')
  const [preferredDate, setPreferredDate] = useState(() => {
    const d = new Date()
    return d.toISOString().split('T')[0]
  })
  const [preferredTime, setPreferredTime] = useState(TIME_SLOTS[0])

  const callSelectorRef = useRef<HTMLDivElement>(null)
  const whatsappSelectorRef = useRef<HTMLDivElement>(null)

  // Expose WhatsApp selector toggle to parent via ref
  useImperativeHandle(ref, () => ({
    openWhatsAppSelector: () => {
      setWhatsappSelectorOpen(true)
      setCallSelectorOpen(false)
    },
  }))

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (callSelectorOpen || whatsappSelectorOpen) {
        const target = e.target as HTMLElement
        if (
          !target.closest('.popup-selector') &&
          !target.closest('[data-call-button]') &&
          !target.closest('[data-whatsapp-button]')
        ) {
          setCallSelectorOpen(false)
          setWhatsappSelectorOpen(false)
        }
      }
    }

    if (callSelectorOpen || whatsappSelectorOpen || showroomsModalOpen || goldExchangeOpen || storyOpen || consultationModalOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [callSelectorOpen, whatsappSelectorOpen, showroomsModalOpen, goldExchangeOpen, storyOpen, consultationModalOpen])

  useEffect(() => {
    const timer = window.setInterval(() => setShowroomPreviewIndex((value) => (value + 1) % SHOWROOM_PREVIEW_IMAGES.length), 4200)
    return () => window.clearInterval(timer)
  }, [])

  const handleCall = (person: ContactPerson) => {
    playClickSound()
    const telLink = getTelLink(person.phoneE164)
    window.location.href = telLink
    setCallSelectorOpen(false)
  }

  const handleWhatsApp = (person: ContactPerson) => {
    playClickSound()
    const message = shopConfig.whatsapp?.defaultMessage || 'Hi Talla Jewellers, I would like to inquire about a jewellery consultation.'
    const whatsappLink = getWhatsAppLink(person.whatsappE164, message)
    window.open(whatsappLink, '_blank')
    setWhatsappSelectorOpen(false)
  }

  const handleDirections = () => {
    playClickSound()
    window.location.href = '/nearest-branch'
  }

  const handleReview = () => {
    playClickSound()
    prepareReturnToHeroCard()
  }

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    playClickSound()
    const msg = `Hi Talla Jewellers,

I would like to book a Private Jewellery Consultation.

• Purpose: ${selectedPurpose}
• Showroom: ${selectedBranch}
• Preferred Date: ${preferredDate}
• Preferred Time: ${preferredTime}
• Name: ${custName.trim() || 'Valued Customer'}
• Phone: ${custPhone.trim() || 'Provided on WhatsApp'}

Please confirm availability.`

    const defaultPhone = shopConfig.contact.clientPhoneE164 || '919000000000'
    window.open(`https://wa.me/${defaultPhone}?text=${encodeURIComponent(msg)}`, '_blank')
    setConsultationModalOpen(false)
  }

  return (
    <>
      <div className="flex w-full min-w-0 max-w-full flex-col gap-3" onClick={(e) => e.stopPropagation()}>
        {/* Row 1: Shop Online | Book a Visit */}
        <div className="order-1 grid w-full min-w-0 grid-cols-2 gap-2">
          {/* Shop Online */}
          <button
            type="button"
            title="Shop Online at Talla Jewellers"
            onClick={(e) => {
              playClickSound()
              e.stopPropagation()
              window.open('https://tallajewellers.com/shop/', '_blank', 'noopener,noreferrer')
            }}
            className="relative flex h-11 min-w-0 items-center justify-center gap-2 overflow-hidden rounded-full border border-[#DDB66A]/50 text-white transition active:scale-[0.97] touch-manipulation group cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #610138 0%, #7D064B 60%, #4D012B 100%)',
              boxShadow: '0 8px 18px rgba(97,1,56,0.32)',
            }}
          >
            <span className="pointer-events-none absolute right-0 top-0 h-full w-[46%] overflow-hidden">
              <Image src="/talla/ruby-couture-editorial.jpg" alt="" fill unoptimized className="object-cover opacity-65 transition-transform duration-500 group-hover:scale-110" sizes="120px" />
              <span className="absolute inset-0 bg-[linear-gradient(90deg,#610138_0%,rgba(97,1,56,0.14)_100%)]" />
            </span>
            <ShoppingBag className="relative z-10 h-4 w-4 shrink-0 text-[#F7D58C]" />
            <span className="relative z-10 truncate text-sm font-extrabold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
              Shop Online
            </span>
          </button>

          {/* Book a Visit */}
          <button
            type="button"
            title="Book a showroom visit"
            onClick={(e) => {
              playClickSound()
              e.stopPropagation()
              setConsultationModalOpen(true)
            }}
            className="relative flex h-11 min-w-0 items-center justify-center gap-2 overflow-hidden rounded-full border border-[#DDB66A]/50 text-white transition active:scale-[0.97] touch-manipulation group cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #610138 0%, #7D064B 60%, #4D012B 100%)',
              boxShadow: '0 8px 18px rgba(97,1,56,0.32)',
            }}
          >
            <span className="pointer-events-none absolute right-0 top-0 h-full w-[46%] overflow-hidden">
              <Image src="/talla/talla-couture-03.png" alt="" fill unoptimized className="object-cover opacity-65 transition-transform duration-500 group-hover:scale-110" sizes="120px" />
              <span className="absolute inset-0 bg-[linear-gradient(90deg,#610138_0%,rgba(97,1,56,0.14)_100%)]" />
            </span>
            <Calendar className="relative z-10 h-4 w-4 shrink-0 text-[#F7D58C]" />
            <span className="relative z-10 truncate text-sm font-extrabold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
              Book a Visit
            </span>
          </button>
        </div>

        {/* Row 2: Featured full-width showroom button */}
        <button
          type="button"
          onClick={handleDirections}
          title="Explore our showrooms across J&K"
          className="order-2 relative block min-h-[78px] w-full overflow-hidden rounded-[22px] p-[2px] transition-transform active:scale-[0.985] text-left cursor-pointer"
          style={{
            background: 'linear-gradient(105deg, #FFF8FB 0%, #610138 34%, #DDB66A 52%, #370820 76%, #FFF8FB 100%)',
            backgroundSize: '230% 100%',
            boxShadow: '0 11px 26px rgba(97,1,56,0.28)',
          }}
        >
          <motion.span className="pointer-events-none absolute inset-0 rounded-[22px]" style={{ backgroundImage: 'linear-gradient(105deg,#FFF8FB 0%,#610138 34%,#DDB66A 52%,#370820 76%,#FFF8FB 100%)', backgroundSize: '230% 100%' }} animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }} transition={{ duration: 5.5, ease: 'linear', repeat: Infinity }} aria-hidden />
          <span className="relative flex min-h-[74px] items-center overflow-hidden rounded-[20px] bg-[#3E102B] px-3.5 py-2">
            <AnimatePresence initial={false} mode="sync">
              <motion.span key={SHOWROOM_PREVIEW_IMAGES[showroomPreviewIndex % 2]} className="absolute inset-0" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.05 }} aria-hidden>
                <Image src={SHOWROOM_PREVIEW_IMAGES[showroomPreviewIndex % 2]} alt="" fill unoptimized className="object-cover object-center" sizes="(max-width: 640px) 100vw, 448px" />
              </motion.span>
            </AnimatePresence>
            <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(42,7,27,.96)_0%,rgba(97,1,56,.84)_55%,rgba(97,1,56,.35)_100%)]" aria-hidden />
            <span className="relative z-10 h-11 w-11 shrink-0 overflow-hidden rounded-[15px] border-2 border-white/95 shadow-[0_7px_18px_rgba(0,0,0,0.30)] ring-1 ring-[#DDB66A]/50">
              <Image src="/talla/showrooms/gandhi-nagar.jpg" alt="Talla Jewellers showroom" fill unoptimized className="object-cover" sizes="48px" />
            </span>
            <span className="relative z-10 ml-3 min-w-0 flex-1 text-left">
              <strong className="block truncate text-[15px] font-black text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.45)]">Explore All Showrooms</strong>
              <span className="mt-0.5 block truncate text-[11px] font-semibold text-[#F3D890]">Find Nearest Showroom</span>
            </span>
            {/* Exactly 2 preview images per user instruction */}
            <span className="relative z-10 ml-2 flex shrink-0 -space-x-2" aria-hidden>
              {SHOWROOM_PREVIEW_IMAGES.slice(0, 2).map((src, index) => (
                <span key={src} className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white/95 shadow-[0_6px_16px_rgba(0,0,0,0.32)] ring-1 ring-[#DDB66A]/60">
                  <Image src={src} alt="" fill unoptimized className="object-cover" sizes="40px" />
                </span>
              ))}
            </span>
          </span>
        </button>

        {/* Row 4: Explore All Collections | New Arrivals */}
        <div className="order-4 grid grid-cols-2 gap-2 w-full min-w-0">
          <Link
            href="https://tallajewellers.com/shop/"
            target="_blank"
            rel="noopener noreferrer"
            title="Explore all jewellery collections"
            onClick={(e) => {
              e.stopPropagation()
              prepareReturnToHeroCard()
            }}
            className="relative flex h-11 min-w-0 items-center justify-center gap-1.5 overflow-hidden rounded-2xl border border-[#DDB66A]/60 bg-white px-2 transition active:scale-[0.97] group"
            style={{ boxShadow: '0 7px 18px rgba(97,1,56,0.12)' }}
          >
            <span className="pointer-events-none absolute right-0 top-0 h-full w-[46%] overflow-hidden"><Image src="/talla/talla-couture-01.png" alt="" fill unoptimized className="object-cover opacity-50 transition-transform duration-500 group-hover:scale-110" sizes="110px" /><span className="absolute inset-0 bg-[linear-gradient(90deg,#FFFFFF_0%,rgba(255,255,255,0.20)_100%)]" /></span>
            <span className="relative z-10 truncate text-[12.5px] font-black text-[#610138]">Explore All Collections</span>
          </Link>

          <Link
            href="/new-arrivals"
            onClick={(e) => {
              e.stopPropagation()
              prepareReturnToHeroCard()
            }}
            className="relative flex h-11 min-w-0 items-center justify-center gap-2 overflow-hidden rounded-2xl border border-[#DDB66A]/60 bg-white transition active:scale-[0.97] group"
            style={{ boxShadow: '0 7px 18px rgba(97,1,56,0.12)' }}
          >
            <span className="pointer-events-none absolute right-0 top-0 h-full w-[48%] overflow-hidden"><Image src="/talla/talla-couture-05.png" alt="" fill unoptimized className="object-cover object-[52%_28%] opacity-65 transition-transform duration-500 group-hover:scale-110" sizes="110px" /><span className="absolute inset-0 bg-[linear-gradient(90deg,#FFFFFF_0%,rgba(255,255,255,0.12)_100%)]" /></span>
            <span className="relative z-10 truncate text-sm font-black text-[#610138]">New Arrivals</span>
          </Link>
        </div>

        {/* Row 4: Instagram | WhatsApp (Exact Poshak-E-Noor design) */}
        <div className="order-5 grid grid-cols-2 gap-2 w-full min-w-0">
          <a
            data-instagram-button
            href={shopConfig.social.instagram}
            target="_blank"
            rel="noreferrer"
            title="Follow Talla Jewellers on Instagram"
            className="relative flex h-11 min-w-0 items-center justify-center gap-2 overflow-hidden rounded-2xl border border-[#F1D7E3] transition active:scale-[0.97]"
            style={{ background: 'linear-gradient(115deg,#FFFFFF 0%,#FFF9FC 58%,#FCEBF4 100%)', boxShadow: '0 8px 18px rgba(225,48,108,0.14), 0 4px 9px rgba(98,40,215,0.07), inset 0 1px 0 rgba(255,255,255,0.95)' }}
          >
            <span className="pointer-events-none absolute -right-5 -top-6 h-16 w-20 rounded-full bg-[#E1306C]/15 blur-xl" />
            <Image src="/instagram-official.png" alt="Instagram" width={22} height={22} className="relative z-10 h-[21px] w-[21px] shrink-0 object-contain" />
            <span className="relative z-10 inline-block bg-[linear-gradient(90deg,#F58529_0%,#DD2A7B_48%,#8134AF_100%)] bg-clip-text text-sm font-extrabold text-transparent truncate">Instagram</span>
          </a>

          <button
            type="button"
            data-whatsapp-button
            title="Chat with Talla Jewellers on WhatsApp"
            onClick={() => {
              playClickSound()
              setWhatsappSelectorOpen(true)
              setCallSelectorOpen(false)
            }}
            className="relative flex h-11 min-w-0 items-center justify-center gap-2 overflow-hidden rounded-2xl border border-[#79CE9B] text-[#116638] transition active:scale-[0.97] cursor-pointer"
            style={{ background: 'linear-gradient(115deg,#FFFFFF 0%,#F4FFF8 52%,#DDF5E6 100%)', boxShadow: '0 8px 18px rgba(18,122,67,0.15), inset 0 1px 0 rgba(255,255,255,0.98)' }}
          >
            <span className="pointer-events-none absolute -right-5 -top-6 h-16 w-20 rounded-full bg-[#25D366]/12 blur-xl" />
            <svg viewBox="0 0 24 24" className="relative z-10 h-[21px] w-[21px] shrink-0" fill="#25D366" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="relative z-10 truncate text-sm font-extrabold text-[#176C40]">WhatsApp</span>
          </button>
        </div>

        {/* Row 5: Reviews | Gold Exchange (Embedded Image & Brand Color) */}
        <div className="order-6 grid grid-cols-2 gap-2 w-full min-w-0">
          <Link
            href="/reviews"
            onClick={(e) => {
              e.stopPropagation()
              handleReview()
            }}
            className="relative flex h-11 min-w-0 items-center justify-center gap-2 overflow-hidden rounded-2xl border border-white/80 transition active:scale-[0.97]"
            style={{ background: 'linear-gradient(112deg,#AECBFA 0%,#C6DAFC 22%,#F6AEA6 43%,#FDE293 68%,#A8DAB5 100%)', boxShadow: '0 8px 18px rgba(66,133,244,0.20), 0 4px 10px rgba(234,67,53,0.14), inset 0 1px 0 rgba(255,255,255,0.72)', transform: 'translateY(-1px)' }}
          >
            <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.42),transparent_47%),linear-gradient(180deg,rgba(255,255,255,0.20),transparent_52%)]" />
            <span className="pointer-events-none absolute inset-0 flex items-center justify-around px-2 opacity-[0.28]">
              {[1, 2, 3, 4, 5].map((star) => <Star key={star} className="h-6 w-6 shrink-0 fill-[#FBBC05] text-[#F4A900]" strokeWidth={1.5} />)}
            </span>
            <GoogleGIcon className="relative z-10 h-[18px] w-[18px] shrink-0" />
            <span className="relative z-10 truncate text-sm font-bold text-[#151515]">Reviews</span>
          </Link>

          <button
            type="button"
            title="Explore 100% Value Gold Exchange Policy"
            onClick={(e) => {
              e.stopPropagation()
              playClickSound()
              setGoldExchangeOpen(true)
            }}
            className="relative flex h-11 min-w-0 items-center justify-center gap-2 overflow-hidden rounded-2xl border border-[#DDB66A] transition active:scale-[0.97] group cursor-pointer"
            style={{ background: 'linear-gradient(115deg,#FFFDF7 0%,#FFF5D7 50%,#EED49B 100%)', boxShadow: '0 9px 20px rgba(167,116,26,0.20), inset 0 1px 0 rgba(255,255,255,.9)' }}
          >
            <span className="pointer-events-none absolute -right-2 -top-5 h-16 w-16 rounded-full border border-[#B4832E]/15 bg-[#DDB66A]/20" />
            <span className="pointer-events-none absolute right-7 -bottom-7 h-14 w-14 rounded-full border border-[#B4832E]/20" />
            <Coins className="relative z-10 h-[19px] w-[19px] shrink-0 text-[#916515]" strokeWidth={2.25} />
            <span className="relative z-10 truncate text-sm font-extrabold text-[#610138]">Gold Exchange</span>
          </button>
        </div>

        {/* Row 3: Our Website | ZAVI Silver */}
        <div className="order-3 grid grid-cols-2 gap-2 w-full min-w-0">
          <a
            href="https://tallajewellers.com"
            target="_blank"
            rel="noreferrer"
            onClick={(e) => {
              e.stopPropagation()
              playClickSound()
            }}
            title="Visit the Talla Jewellers website"
            className="relative flex h-11 min-w-0 items-center justify-center gap-2 overflow-hidden rounded-2xl border border-[#DDB66A]/50 text-white transition active:scale-[0.97]"
            style={{ background: 'linear-gradient(135deg, #610138 0%, #7D064B 60%, #4D012B 100%)', boxShadow: '0 8px 18px rgba(97,1,56,0.30)' }}
          >
            <span className="pointer-events-none absolute -right-4 -top-7 h-20 w-20 opacity-20" style={{ backgroundImage: 'url(/talla/talla-emblem.png)', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'contain' }} />
            <Image src="/talla/talla-monogram.png" alt="" width={40} height={40} className="relative z-10 h-10 w-10 shrink-0 object-contain" />
            <span className="relative z-10 truncate text-sm font-extrabold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">Website</span>
          </a>

          <Link
            href="https://tallajewellers.com/collections/zavi-silver-range/"
            target="_blank"
            rel="noopener noreferrer"
            title="Explore ZAVI Silver"
            onClick={(e) => {
              e.stopPropagation()
              playClickSound()
              prepareReturnToHeroCard()
            }}
            className="relative flex h-11 min-w-0 items-center justify-center gap-2 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white text-[#27272A] shadow-[0_7px_16px_rgba(52,52,56,0.13),inset_0_1px_0_rgba(255,255,255,.95)] transition active:scale-[0.97] group"
          >
            <Image src="/talla/zavi-jewellery.png" alt="" fill unoptimized className="object-cover object-[82%_center] opacity-72 transition-transform duration-500 group-hover:scale-105" sizes="180px" />
            <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#FFFFFF_0%,rgba(255,255,255,.97)_39%,rgba(247,248,250,.80)_58%,rgba(255,255,255,.18)_100%)]" />
            <span className="pointer-events-none absolute left-2 top-1/2 h-9 w-16 -translate-y-1/2 rounded-full bg-white/95 blur-md" />
            <Image src="/talla/zavi-logo.png" alt="ZAVI" width={30} height={30} className="relative z-10 h-[30px] w-[30px] shrink-0 object-contain drop-shadow-[0_1px_1px_rgba(255,255,255,.75)]" style={{ filter: 'brightness(0.24) contrast(1.35)' }} />
            <span className="relative z-10 truncate text-sm font-extrabold text-[#27272A]">ZAVI Silver</span>
          </Link>
        </div>

        {/* 1. Book Jewellery Consultation Modal */}
        <AnimatePresence>
          {consultationModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
              onClick={() => setConsultationModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.94, y: 16 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.94, y: 16 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-[#DDB66A]/45 bg-gradient-to-b from-white via-[#FFFDF9] to-[#FAF6EE] p-5 text-[#2F101F] shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
              >
                <div className="flex items-center justify-between border-b border-[#DDB66A]/25 pb-3.5">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-[#5F0D3C] to-[#3B0724] text-[#F3D890] shadow-sm">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-[#1F0715] [font-family:var(--font-manrope)]">Book a Visit</h3>
                      <p className="text-[11px] font-semibold text-[#8B7580]">Private bridal, diamond & heritage curation</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setConsultationModalOpen(false)}
                    className="grid h-8 w-8 place-items-center rounded-full bg-[#5F0D3C]/10 text-[#5F0D3C] hover:bg-[#5F0D3C]/20 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <form onSubmit={handleConsultationSubmit} className="mt-3.5 space-y-3 max-h-[72vh] overflow-y-auto pr-1">
                  {/* Purpose of visit */}
                  <div>
                    <label className="block text-xs font-bold text-[#1F0715] mb-1.5 [font-family:var(--font-manrope)]">
                      Purpose of visit
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {CONSULTATION_PURPOSES.map((purpose) => {
                        const isSel = selectedPurpose === purpose
                        return (
                          <button
                            type="button"
                            key={purpose}
                            onClick={() => setSelectedPurpose(purpose)}
                            className={`p-2.5 rounded-xl text-left text-[11px] font-bold transition-all border ${
                              isSel
                                ? 'bg-[#5F0D3C] border-[#DDB66A] text-white shadow-sm'
                                : 'bg-white border-[#DDB66A]/30 text-[#4A323D] hover:bg-[#FAF5EC]'
                            }`}
                          >
                            {purpose}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Select Showroom */}
                  <div>
                    <label className="block text-xs font-bold text-[#1F0715] mb-1 [font-family:var(--font-manrope)]">
                      Select showroom
                    </label>
                    <select
                      value={selectedBranch}
                      onChange={(e) => setSelectedBranch(e.target.value)}
                      className="w-full rounded-xl border border-[#DDB66A]/40 bg-white px-3 py-2.5 text-xs font-semibold text-[#2F101F] shadow-sm focus:border-[#5F0D3C] focus:outline-none"
                    >
                      {shopConfig.branches.map((b) => (
                        <option key={b.name} value={b.name} className="text-[#2F101F]">
                          {b.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-[#1F0715] mb-1 [font-family:var(--font-manrope)]">
                        Preferred date
                      </label>
                      <input
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full rounded-xl border border-[#DDB66A]/40 bg-white px-3 py-2 text-xs font-semibold text-[#2F101F] shadow-sm focus:border-[#5F0D3C] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1F0715] mb-1 [font-family:var(--font-manrope)]">
                        Preferred time
                      </label>
                      <select
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full rounded-xl border border-[#DDB66A]/40 bg-white px-3 py-2 text-xs font-semibold text-[#2F101F] shadow-sm focus:border-[#5F0D3C] focus:outline-none"
                      >
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot} className="text-[#2F101F]">
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Customer Details */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-[#1F0715] mb-1 [font-family:var(--font-manrope)]">
                        Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Aarti Sharma"
                        value={custName}
                        onChange={(e) => setCustName(e.target.value)}
                        className="w-full rounded-xl border border-[#DDB66A]/40 bg-white px-3 py-2 text-xs font-medium text-[#2F101F] shadow-sm placeholder:text-[#9A8790] focus:border-[#5F0D3C] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1F0715] mb-1 [font-family:var(--font-manrope)]">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 98765 43210"
                        value={custPhone}
                        onChange={(e) => setCustPhone(e.target.value)}
                        className="w-full rounded-xl border border-[#DDB66A]/40 bg-white px-3 py-2 text-xs font-medium text-[#2F101F] shadow-sm placeholder:text-[#9A8790] focus:border-[#5F0D3C] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-xs font-bold text-white shadow-[0_8px_20px_rgba(95,13,60,.24)] transition-transform active:scale-[0.98] cursor-pointer bg-gradient-to-r from-[#5F0D3C] via-[#6F0F46] to-[#5F0D3C]"
                    >
                      <CheckCircle2 className="h-4 w-4 text-[#EACD8C]" />
                      <span>Confirm Consultation via WhatsApp</span>
                    </button>
                    <p className="mt-2 text-center text-[10.5px] font-medium text-[#88787E]">
                      Our bridal lounge team will promptly confirm your appointment.
                    </p>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. Showrooms Modal */}
        <AnimatePresence>
          {showroomsModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
              onClick={() => setShowroomsModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.92, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.92, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-md overflow-hidden rounded-[26px] border border-[#DDB66A]/50 bg-[#171116] p-5 text-white shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-[#370820] pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#610138] text-[#DDB66A]">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-white">Our 4 Showrooms</h3>
                      <p className="text-[11px] font-semibold text-[#DDB66A]">Jammu & Kashmir</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowroomsModalOpen(false)}
                    className="grid h-8 w-8 place-items-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <X className="h-4 w-4 text-white" />
                  </button>
                </div>

                <div className="mt-3.5 space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
                  {shopConfig.branches.map((b, idx) => (
                    <div
                      key={b.name}
                      className="rounded-2xl border border-[#370820] bg-[#231821] p-3.5 transition-all hover:border-[#DDB66A]/40"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="inline-block rounded-full bg-[#610138] px-2 py-0.5 text-[9px] font-bold text-[#DDB66A] uppercase mb-1">
                            Location {idx + 1}
                          </span>
                          <h4 className="text-[14px] font-bold text-white">{b.name}</h4>
                          <p className="mt-0.5 text-xs text-white/70 leading-snug">{b.address}</p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-2 pt-2 border-t border-white/10">
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.mapQuery)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#610138] py-2 text-xs font-bold text-white hover:bg-[#780145] transition-colors"
                        >
                          <MapPin className="h-3.5 w-3.5 text-[#DDB66A]" />
                          <span>Get Directions</span>
                        </a>
                        <a
                          href={getTelLink(shopConfig.contactPersons[0].phoneE164)}
                          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#DDB66A]/40 bg-[#DDB66A]/10 py-2 text-xs font-bold text-[#DDB66A] hover:bg-[#DDB66A]/20 transition-colors"
                        >
                          <Phone className="h-3.5 w-3.5" />
                          <span>Call Store</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3. Gold Exchange Modal */}
        <AnimatePresence>
          {goldExchangeOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
              onClick={() => setGoldExchangeOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.92, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.92, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-sm overflow-hidden rounded-[26px] border border-[#DDB66A]/50 bg-[#171116] p-5 text-white shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-[#370820] pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#610138] text-[#DDB66A]">
                      <RefreshCw className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-white">Gold Exchange Program</h3>
                      <p className="text-[11px] font-semibold text-[#DDB66A]">100% Value • Zero Deductions</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setGoldExchangeOpen(false)}
                    className="grid h-8 w-8 place-items-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <X className="h-4 w-4 text-white" />
                  </button>
                </div>

                <div className="mt-4 space-y-2.5">
                  <div className="rounded-2xl border border-[#DDB66A]/30 bg-[#251520] p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <ShieldCheck className="h-4 w-4 text-[#DDB66A]" />
                      <div className="text-[13px] font-extrabold text-white">100% Value For Your Gold</div>
                    </div>
                    <div className="text-[11px] text-white/75 leading-relaxed">
                      Exchange your hallmark jewellery at 100% current benchmark gold value without unnecessary making cuts.
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#370820] bg-[#1F121B] p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="h-4 w-4 text-[#DDB66A]" />
                      <div className="text-[13px] font-extrabold text-white">Computerised Karatmeter Testing</div>
                    </div>
                    <div className="text-[11px] text-white/75 leading-relaxed">
                      Instant, non-destructive purity evaluation tested live before you for absolute transparency.
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#370820] bg-[#1F121B] p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Gem className="h-4 w-4 text-[#DDB66A]" />
                      <div className="text-[13px] font-extrabold text-white">Upgrade To Bridal & Diamonds</div>
                    </div>
                    <div className="text-[11px] text-white/75 leading-relaxed">
                      Easily exchange old gold jewellery for natural certified solitaires, diamond chokers, or heritage polki.
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setGoldExchangeOpen(false)
                      setSelectedPurpose('Gold Exchange Consultation')
                      setConsultationModalOpen(true)
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-black text-white shadow-lg transition-transform active:scale-[0.98]"
                    style={{
                      background: 'linear-gradient(135deg, #610138 0%, #370820 100%)',
                      border: '1px solid rgba(221, 182, 106, 0.65)',
                    }}
                  >
                    <span>Book Gold Exchange Consultation</span>
                    <ChevronRight className="h-4 w-4 text-[#DDB66A]" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 4. Our Story Modal */}
        <AnimatePresence>
          {storyOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
              onClick={() => setStoryOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.92, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.92, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-sm overflow-hidden rounded-[26px] border border-[#DDB66A]/50 bg-[#171116] p-5 text-white shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-[#370820] pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#610138] text-[#DDB66A]">
                      <Landmark className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-white">Our Story</h3>
                      <p className="text-[11px] font-semibold text-[#DDB66A]">Since 1960 • Jammu & Kashmir</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setStoryOpen(false)}
                    className="grid h-8 w-8 place-items-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <X className="h-4 w-4 text-white" />
                  </button>
                </div>

                <div className="mt-4 space-y-3 text-xs leading-relaxed text-white/80">
                  <p>
                    Established in <strong>1960</strong>, <strong>Talla Jewellers</strong> has stood as Jammu &amp; Kashmir&apos;s symbol of uncompromised purity, royal craftsmanship, and enduring trust.
                  </p>
                  <p>
                    From opulent bridal polki to certified natural diamonds and modern 925 sterling silver, multiple generations have chosen Talla to celebrate life&apos;s most cherished milestones.
                  </p>
                  <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                    <div className="rounded-xl border border-[#370820] bg-[#22141F] p-2.5">
                      <div className="text-base font-black text-[#DDB66A]">64+</div>
                      <div className="text-[10px] text-white/60">Years</div>
                    </div>
                    <div className="rounded-xl border border-[#370820] bg-[#22141F] p-2.5">
                      <div className="text-base font-black text-[#DDB66A]">5</div>
                      <div className="text-[10px] text-white/60">Showrooms</div>
                    </div>
                    <div className="rounded-xl border border-[#370820] bg-[#22141F] p-2.5">
                      <div className="text-base font-black text-[#DDB66A]">100%</div>
                      <div className="text-[10px] text-white/60">BIS Hallmarked</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 5. Call Selector Pop-out */}
        <AnimatePresence>
          {callSelectorOpen && (
            <motion.div
              ref={callSelectorRef}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="popup-selector fixed bottom-0 left-0 right-0 z-[9999] bg-[#1A1118] border-t border-[#DDB66A]/40 rounded-3xl shadow-2xl p-6 pb-8 m-4 mb-6 text-white"
              style={{ 
                paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))',
                maxHeight: '80vh'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="text-base font-semibold text-white">Select Number to Call</div>
                <button
                  onClick={() => setCallSelectorOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-white/80" />
                </button>
              </div>
              <div className="flex gap-4 justify-center flex-wrap">
                {shopConfig.contactPersons.map((person) => (
                  <motion.button
                    key={person.label}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: shopConfig.contactPersons.indexOf(person) * 0.1 }}
                    onClick={() => handleCall(person)}
                    className="flex min-w-[112px] flex-col items-center gap-2 rounded-2xl border border-[#DDB66A]/50 bg-[#251520] px-4 py-3 shadow-lg outline-none touch-manipulation"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
                      style={{
                        background: 'linear-gradient(135deg, #610138, #370820)',
                        border: '1px solid rgba(221, 182, 106, 0.78)',
                      }}
                    >
                      <Phone className="w-7 h-7" style={{ color: '#DDB66A' }} />
                    </div>
                    <span className="text-xs font-semibold text-white text-center">{person.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 6. WhatsApp Selector Pop-out */}
        <AnimatePresence>
          {whatsappSelectorOpen && (
            <motion.div
              ref={whatsappSelectorRef}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="popup-selector fixed bottom-0 left-0 right-0 z-[9999] bg-[#1A1118] border-t border-[#DDB66A]/40 rounded-3xl shadow-2xl p-6 pb-8 m-4 mb-6 text-white"
              style={{ 
                paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))',
                maxHeight: '80vh'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="text-base font-semibold text-white">Select Showroom for WhatsApp</div>
                <button
                  onClick={() => setWhatsappSelectorOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-white/80" />
                </button>
              </div>
              <div className="flex gap-4 justify-center flex-wrap">
                {shopConfig.contactPersons.map((person) => (
                  <motion.button
                    key={person.label}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: shopConfig.contactPersons.indexOf(person) * 0.1 }}
                    onClick={() => handleWhatsApp(person)}
                    className="flex flex-col items-center gap-2 touch-manipulation"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-[#25D366] to-[#20BA5A] rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform">
                      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="white">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold text-white text-center">{person.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
})

ActionsRow.displayName = 'ActionsRow'

export default ActionsRow
