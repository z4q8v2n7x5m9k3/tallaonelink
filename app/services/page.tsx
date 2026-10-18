'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, CalendarDays, ChevronLeft, ChevronRight, IndianRupee, Scissors } from 'lucide-react'
import { getWhatsAppLink } from '../lib/phone'
import { prepareReturnToHeroCard } from '../lib/homeNavigation'
import { shopConfig } from '../shops/dogra-associates/config'
import { serviceCategories, type ServiceCategoryKey, type ServiceItem } from '../shops/dogra-associates/services'

const categoryKeys: ServiceCategoryKey[] = ['hairWomen', 'hairTreatments', 'beauty', 'hairSystems', 'nails', 'makeup', 'hairMen']
const categoryTabLabels: Record<ServiceCategoryKey, string> = { hairWomen: 'Hair', hairMen: 'Men', hairTreatments: 'Treatments', beauty: 'Beauty', nails: 'Nails', makeup: 'Makeup', hairSystems: 'Skin' }
const categoryIconMap: Record<ServiceCategoryKey, string> = { hairWomen: '✂', hairMen: '✂', hairTreatments: '✦', beauty: '✦', nails: '◈', makeup: '✧', hairSystems: '✦' }

function CategoryGlyph({ category, className = '' }: { category: ServiceCategoryKey; className?: string }) {
  return <span aria-hidden className={`select-none font-black leading-none ${className}`}>{categoryIconMap[category]}</span>
}

function whatsappMessage(service: string) {
  return `Hi Veloura, I would like to book ${service}. Please share appointment availability.`
}

function WhatsAppMark() {
  return <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#25D366" aria-hidden><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
}

function CategoryPill({ label, category, isActive, onClick }: { label: string; category: ServiceCategoryKey; isActive: boolean; onClick: () => void }) {
  return <motion.button type="button" data-category={category} onClick={onClick} whileTap={{ scale: 0.97 }} className="flex shrink-0 items-center gap-1.5 rounded-full border py-1 pl-1.5 pr-3 text-[13px] font-extrabold leading-none transition-all" style={{ background: isActive ? '#3F2F12' : 'rgba(255,255,255,0.10)', color: '#FFFFFF', borderColor: isActive ? '#E9D18A' : 'rgba(255,255,255,0.28)', boxShadow: isActive ? '0 8px 18px rgba(30,20,4,.28),inset 0 1px 0 rgba(255,255,255,.16)' : 'none' }}><span className="flex h-7 w-7 items-center justify-center rounded-full" style={{ background: isActive ? '#E9D18A' : 'rgba(255,255,255,0.14)', color: isActive ? '#3F2F12' : '#FFFFFF' }}><CategoryGlyph category={category} className="text-[14px]" /></span>{label}</motion.button>
}

function ServiceCard({ item, category, index }: { item: ServiceItem; category: ServiceCategoryKey; index: number }) {
  const detail = item.description || `${serviceCategories[category].shortDescription} Includes a consultation before your appointment.`
  return <motion.article initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index * 0.03, 0.24), duration: 0.25 }} className="overflow-hidden rounded-[28px] border border-[#E2D2B4] bg-white p-2 shadow-[0_18px_38px_rgba(79,56,18,.13)]">
    <div className="relative h-[148px] overflow-hidden rounded-[22px] bg-[#E9E2D8]">
      <Image src={serviceCategories[category].image} alt={item.name} fill sizes="448px" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
      <span className="absolute left-3 top-3 rounded-full border border-white/30 bg-black/30 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.12em] text-white backdrop-blur-md">{categoryTabLabels[category]}</span>
      {item.price && <span className="absolute bottom-3 right-3 rounded-full border border-white/30 bg-[#604B22]/90 px-3 py-1.5 text-xs font-black text-white backdrop-blur-md">{item.price}</span>}
    </div>
    <div className="px-2 pb-2 pt-3.5">
      <div className="min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-[17px] font-black leading-tight text-[#1D1B19]">{item.name}</h2>
        </div>
        <p className="mt-1.5 text-[13px] leading-5 text-[#746F69]">{detail}</p>
      </div>
    <div className="mt-3 grid grid-cols-2 gap-2.5">
      <Link href={`/book-consultation?service=${encodeURIComponent(item.name)}`} className="inline-flex h-11 items-center justify-center gap-1.5 rounded-2xl bg-[linear-gradient(135deg,#604B22,#9A8140)] text-[12px] font-extrabold text-white shadow-[0_8px_18px_rgba(96,75,34,.25)] transition-transform active:scale-[.98]">
        <CalendarDays className="h-3.5 w-3.5" /> Book Now
      </Link>
      <Link href={getWhatsAppLink(shopConfig.contact.clientPhoneE164, whatsappMessage(item.name))} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center justify-center gap-1.5 rounded-2xl border border-[#DED9D2] bg-white text-[12px] font-extrabold text-[#1D1B19] shadow-[0_8px_16px_rgba(0,0,0,.10)] transition-transform active:scale-[.98]">
        <WhatsAppMark /> WhatsApp
      </Link>
    </div>
    </div>
  </motion.article>
}

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategoryKey>('hairWomen')
  const searchParams = useSearchParams()
  const categoryScrollRef = useRef<HTMLDivElement>(null)
  const currentCategory = serviceCategories[activeCategory]
  const activeIndex = useMemo(() => categoryKeys.findIndex((key) => key === activeCategory), [activeCategory])
  const selectCategory = (key: ServiceCategoryKey) => { setActiveCategory(key); window.setTimeout(() => categoryScrollRef.current?.querySelector<HTMLElement>(`[data-category="${key}"]`)?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }), 0) }
  const goPrev = () => selectCategory(categoryKeys[activeIndex <= 0 ? categoryKeys.length - 1 : activeIndex - 1])
  const goNext = () => selectCategory(categoryKeys[activeIndex >= categoryKeys.length - 1 ? 0 : activeIndex + 1])
  useEffect(() => {
    const requested = searchParams.get('cat') as ServiceCategoryKey | null
    if (requested && categoryKeys.includes(requested)) setActiveCategory(requested)
  }, [searchParams])

  return <main className="veloura-page min-h-screen px-3 pb-10 pt-[max(0.75rem,env(safe-area-inset-top))]" style={{ background: '#F4F1EB' }}><div className="mx-auto w-full max-w-md">
    <div className="-mx-3 px-3 pt-2 pb-1"><header data-page-hero className="overflow-hidden rounded-[28px] border border-white/20 p-3.5 text-white shadow-[0_16px_34px_rgba(79,56,18,.24)]" style={{ backgroundImage: "linear-gradient(90deg,rgba(48,34,13,.98) 0%,rgba(103,77,28,.94) 54%,rgba(139,106,42,.68) 100%),url('/femina/veloura-salon-interior.png')", backgroundSize: 'cover', backgroundPosition: 'center right' }}>
      <div className="relative flex items-center justify-between"><Link href="/" onClick={() => prepareReturnToHeroCard()} className="z-10 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#181818] ring-1 ring-black/10 shadow-sm" aria-label="Back"><ArrowLeft className="h-5 w-5 text-[#181818]" /></Link><h1 className="absolute left-0 right-0 px-12 text-center text-[1.65rem] font-black leading-tight tracking-tight text-white">Services</h1><span className="z-10 rounded-full bg-white/14 px-2.5 py-1 text-[10px] font-black uppercase tracking-[.12em] ring-1 ring-white/20">Salon</span></div>
      <p className="relative mt-2.5 px-1 text-xs leading-5 text-white/78">Explore hair, beauty, skin, nails and makeup services.</p>
      <nav className="mt-3 grid grid-cols-3 gap-1.5 rounded-2xl border border-white/55 bg-white/95 p-1.5 shadow-[0_10px_22px_rgba(0,0,0,.15)]"><Link data-active="true" href="/services" className="flex h-9 items-center justify-center gap-1.5 rounded-xl bg-[linear-gradient(135deg,#665020,#9a7a35)] text-[11px] font-black text-white"><Scissors className="h-3.5 w-3.5"/>Services</Link><Link href="/packages" className="flex h-9 items-center justify-center gap-1.5 rounded-xl text-[11px] font-bold text-[#29231a]"><IndianRupee className="h-3.5 w-3.5"/>Prices</Link><Link href="/book-consultation" className="flex h-9 items-center justify-center gap-1.5 rounded-xl text-[11px] font-bold text-[#29231a]"><CalendarDays className="h-3.5 w-3.5"/>Book</Link></nav>
      <div className="mt-4"><div className="mb-2.5 flex items-center justify-between gap-2 px-0.5"><p className="text-[11px] font-black uppercase tracking-[0.14em] text-white/70">Categories</p><div className="flex items-center gap-1.5"><button type="button" onClick={goPrev} className="inline-flex items-center gap-0.5 rounded-full border border-white/20 bg-white/12 px-2.5 py-1.5 text-[12px] font-bold text-white shadow-sm" aria-label="Previous category"><ChevronLeft className="h-4 w-4" />Prev</button><button type="button" onClick={goNext} className="inline-flex items-center gap-0.5 rounded-full border border-white/20 bg-white/12 px-2.5 py-1.5 text-[12px] font-bold text-white shadow-sm" aria-label="Next category">Next<ChevronRight className="h-4 w-4" /></button></div></div><div ref={categoryScrollRef} className="-mx-0.5 flex gap-2 overflow-x-auto px-0.5 pb-1 pt-0.5 scrollbar-hide" style={{ scrollSnapType: 'x proximity' }}>{categoryKeys.map((key) => <CategoryPill key={key} label={categoryTabLabels[key]} category={key} isActive={activeCategory === key} onClick={() => selectCategory(key)} />)}</div></div>
    </header></div>
    <div className="relative mb-4 min-h-[118px] overflow-hidden rounded-[24px] border border-[#E2D2B4] bg-white p-4 shadow-[0_12px_28px_rgba(79,56,18,.10)]"><Image src={currentCategory.image} alt="" fill className="object-cover opacity-[.32]" sizes="448px" /><div className="absolute inset-0 bg-[linear-gradient(95deg,#fff_0%,rgba(255,255,255,.94)_55%,rgba(255,255,255,.34)_100%)]" /><div className="relative flex min-h-[86px] items-center justify-between gap-3"><div className="max-w-[75%]"><p className="text-[10px] font-black uppercase tracking-[.14em] text-[#9B7A32]">Veloura salon services</p><h2 className="mt-1 text-lg font-black text-[#181818]">{currentCategory.name}</h2><p className="mt-1 text-[13px] leading-snug text-[#5F5A54]">{currentCategory.shortDescription}</p></div><span className="shrink-0 rounded-full border border-[#D8C58D] bg-[#FFF9EA] px-2.5 py-1 text-xs font-black text-[#604B22]">{currentCategory.items.length}</span></div></div>
    <AnimatePresence mode="wait"><motion.div key={activeCategory} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }} className="space-y-3">{currentCategory.items.map((service, index) => <ServiceCard key={service.id} item={service} category={activeCategory} index={index} />)}</motion.div></AnimatePresence>
  </div></main>
}
