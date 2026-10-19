'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Phone, Navigation, MapPinned } from 'lucide-react'
import { shopConfig } from '../shops/dogra-associates/config'
import { prepareReturnToHeroCard } from '../lib/homeNavigation'

function GoogleMapsDirectionButton({ mapQuery, label = 'Directions' }: { mapQuery: string; label?: string }) {
  return (
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`}
      target="_blank"
      rel="noreferrer"
      className="flex h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-full border border-[#610138] bg-[#610138] px-4 text-[13px] font-semibold text-white shadow-[0_8px_18px_rgba(97,1,56,.20)] transition-all active:scale-[0.98] hover:bg-[#741048]"
    >
      <Navigation className="h-4 w-4 fill-[#EACD8C]/25 text-[#EACD8C]" strokeWidth={1.8} />
      <span>{label}</span>
    </a>
  )
}

const coordinates = [
  { lat: 32.7068, lng: 74.8618 },
  { lat: 32.7357, lng: 74.8691 },
  { lat: 32.7581, lng: 74.8562 },
  { lat: 32.9160, lng: 75.1416 },
]

const showroomImages = [
  '/talla/showrooms/showroom-hero-hd.png',
  '/talla/showrooms/showroom-hero-hd.png',
  '/talla/showrooms/showroom-hero-hd.png',
  '/talla/showrooms/showroom-hero-hd.png',
]

const showroomImagePositions = ['center center', '28% center', '62% center', '78% center']

const showrooms = shopConfig.branches.map((branch, index) => ({
  ...branch,
  ...coordinates[index],
  image: showroomImages[index],
  imagePosition: showroomImagePositions[index],
  isJewellery: false,
}))

const distanceKm = (lat1: number, lng1: number, lat2: number, lng2: number) => {
  const radius = 6371
  const rad = (value: number) => (value * Math.PI) / 180
  const dLat = rad(lat2 - lat1)
  const dLng = rad(lng2 - lng1)
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLng / 2) ** 2
  return radius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export default function NearestBranchPage() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const nearest = useMemo(() => {
    if (!location) return null
    return showrooms
      .map((showroom) => ({ ...showroom, distance: distanceKm(location.lat, location.lng, showroom.lat, showroom.lng) }))
      .sort((a, b) => a.distance - b.distance)[0]
  }, [location])

  const findNearest = () => {
    setError('')
    setLoading(true)
    if (!navigator.geolocation) {
      setError('Location is not available on this device.')
      setLoading(false)
      return
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocation({ lat: coords.latitude, lng: coords.longitude })
        setLoading(false)
        window.setTimeout(() => {
          document.getElementById('nearest-result')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 120)
      },
      (locationError) => {
        setError(
          locationError.code === locationError.PERMISSION_DENIED
            ? 'Allow location access to find your closest showroom.'
            : 'Could not detect location. Please check the showrooms below.'
        )
        setLoading(false)
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 300000 },
    )
  }

  return (
    <main className="talla-unified min-h-screen bg-[#FAF9F6] px-4 pb-12 pt-[max(1rem,env(safe-area-inset-top))] text-[#32101F]">
      <div className="mx-auto max-w-md">
        <header className="relative overflow-hidden rounded-[26px] bg-[#610138] p-5 text-white">
          <Image src="/talla/showrooms/showroom-hero-hd.png" alt="" fill priority className="object-cover object-center opacity-45" sizes="448px" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#39051F]/95 via-[#610138]/78 to-[#610138]/24" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <Link href="/" onClick={() => prepareReturnToHeroCard()} aria-label="Back home" className="grid h-10 w-10 place-items-center rounded-xl border border-white/20"><ArrowLeft className="h-[18px] w-[18px]" /></Link>
              <span className="relative h-10 w-10 overflow-hidden rounded-full border border-white/25"><Image src="/talla/elegant-gold-t-emblem.png" alt="Talla Jewellers" fill className="scale-[1.72] object-cover" sizes="40px" /></span>
            </div>
            <p className="mt-6 text-[9px] font-medium uppercase tracking-[.23em] text-[#E6C788]">Visit Talla</p>
            <h1 className="mt-2 text-[28px] font-extrabold leading-tight tracking-[-.025em]">Find a Showroom</h1>
            <p className="mt-2 text-[12px] leading-5 text-white/65">A personal welcome, at every destination.</p>
          </div>
        </header>

        <section id="nearest-section" className="mt-4 scroll-mt-4">
          <button onClick={findNearest} disabled={loading} className="group relative flex min-h-[104px] w-full items-center justify-between overflow-hidden rounded-[24px] border border-[#DDB66A]/55 bg-[#610138] px-5 text-left shadow-[0_14px_28px_rgba(97,1,56,.2)] disabled:opacity-60">
            <Image src="/talla/showrooms/talla-store-front.jpg" alt="" fill className="object-cover object-center opacity-58 transition-transform duration-700 group-hover:scale-[1.03]" sizes="448px" />
            <span className="absolute inset-0 bg-[linear-gradient(90deg,#420625_0%,rgba(97,1,56,.9)_45%,rgba(97,1,56,.2)_100%)]" />
            <span className="relative"><span className="block text-[15px] font-extrabold text-white">{loading ? 'Finding your showroom…' : 'Find Nearest Store'}</span><span className="mt-1 block text-[10px] font-semibold text-[#F1DFC0]">Locate your closest Talla destination</span></span>
            {loading && <motion.span initial={{ x: '-110%' }} animate={{ x: '230%' }} transition={{ duration: .8, repeat: Infinity, ease: 'linear' }} className="pointer-events-none absolute inset-y-0 w-24 rotate-12 bg-gradient-to-r from-transparent via-white/18 to-transparent" />}
            <motion.span animate={loading ? { rotate: 360, scale: [1,1.06,1] } : { rotate: 0, scale: 1 }} transition={loading ? { rotate: { duration: .72, repeat: Infinity, ease: 'linear' }, scale: { duration: .55, repeat: Infinity } } : { duration: .2 }} className="relative grid h-11 w-11 place-items-center rounded-full border border-white/35 bg-[#FFFDF8] text-[#610138] shadow-lg"><MapPinned className="h-5 w-5" strokeWidth={1.8} /></motion.span>
          </button>
          {error && <p role="status" className="mt-2 rounded-xl bg-[#F2EAEF] px-4 py-3 text-[11px] leading-5 text-[#79626D]">{error}</p>}
          <AnimatePresence>{nearest && <motion.article id="nearest-result" initial={{ opacity: 0, y: 18, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 330, damping: 25 }} className="mt-3 overflow-hidden rounded-[24px] border border-[#DDB66A]/55 bg-white shadow-[0_16px_34px_rgba(50,16,31,.12)]">
            <div className="relative h-[168px] overflow-hidden"><Image src="/talla/showrooms/showroom-hero-hd.png" alt="Talla showroom" fill className="object-cover" sizes="448px" /><span className="absolute inset-0 bg-gradient-to-t from-[#270617]/80 via-[#270617]/10 to-transparent" /><div className="absolute inset-x-4 bottom-4"><p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#EACD8C]">Nearest to you · {nearest.distance.toFixed(1)} km</p><h2 className="mt-1 text-[20px] font-extrabold text-white">{nearest.name.replace('Talla Jewellers — ', '')}</h2></div></div>
            <div className="border-t border-[#E8DED2] p-5"><p className="text-[12px] font-medium leading-5 text-[#87747D]">{nearest.address}</p>
            <div className="mt-4 flex gap-2"><a href={`tel:${nearest.phone.replace(/\s/g, '')}`} className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#610138] text-[12px] font-semibold text-white"><Phone className="h-4 w-4" strokeWidth={1.6} />Call showroom</a><GoogleMapsDirectionButton mapQuery={nearest.mapQuery} /></div></div>
          </motion.article>}</AnimatePresence>
        </section>

        <section id="all-showrooms" className="mt-7 scroll-mt-4">
          <div className="mb-4 flex items-center justify-between"><h2 className="text-[21px] font-extrabold tracking-[-.02em]">All Showrooms</h2><span className="rounded-full border border-[#E4D4C1] bg-white px-2.5 py-1 text-[10px] font-semibold text-[#7C6871]">{showrooms.length} destinations</span></div>
          <div className="space-y-4">{showrooms.map((showroom,index) => <article key={showroom.name} className={`relative overflow-hidden rounded-[25px] border bg-white shadow-[0_14px_32px_rgba(50,16,31,.10)] ${index % 2 ? 'border-[#C9A75F]/70' : 'border-[#8D456B]/45'}`}>
            <div className="relative h-[184px] overflow-hidden bg-[#F6F3ED]">
              <Image src={showroom.image} alt={showroom.isJewellery ? 'Original Talla gold jewellery' : `${showroom.name} showroom`} fill className={showroom.isJewellery ? 'object-contain p-3' : 'object-cover'} style={{ objectPosition: showroom.imagePosition }} sizes="448px" />
              <span className="absolute inset-0 bg-gradient-to-t from-[#17030D]/92 via-[#250717]/25 to-transparent" />
              <span className="absolute left-4 top-4 rounded-full border border-white/60 bg-white/90 px-2.5 py-1 text-[9px] font-semibold text-[#610138]">0{index+1} · Talla Jewellers</span>
              <div className="absolute inset-x-4 bottom-4 text-white drop-shadow-md"><h3 className="text-[20px] font-extrabold tracking-[-.02em]">{showroom.name.replace('Talla Jewellers — ', '')}</h3><p className="mt-1 line-clamp-1 text-[10px] font-medium text-white/82">{showroom.address}</p></div>
            </div>
            <div className="border-t border-[#E8DED2] bg-[linear-gradient(180deg,#FFFDF9_0%,#F8F1E8_100%)] p-5">
              <div className="flex gap-3"><a href={`tel:${showroom.phone.replace(/\s/g, '')}`} className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-[#E1C477]/70 bg-white text-[12px] font-semibold text-[#610138] shadow-[0_7px_16px_rgba(69,29,47,.08)]"><Phone className="h-4 w-4 text-[#9A742A]" strokeWidth={1.7} />Call showroom</a><GoogleMapsDirectionButton mapQuery={showroom.mapQuery} /></div>
            </div>
          </article>)}</div>
        </section>
      </div>
    </main>
  )
}
