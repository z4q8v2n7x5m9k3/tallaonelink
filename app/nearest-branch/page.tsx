'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Compass, Home, MapPin, Phone, Store } from 'lucide-react'
import { shopConfig } from '../shops/dogra-associates/config'
import { prepareReturnToHeroCard } from '../lib/homeNavigation'

function GoogleMapsPinIcon({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" fill="#EA4335" />
      <circle cx="12" cy="9" r="2.5" fill="#FFFFFF" />
    </svg>
  )
}

const coordinates = [
  { lat: 32.7068, lng: 74.8618 },
  { lat: 32.7357, lng: 74.8691 },
  { lat: 32.7581, lng: 74.8562 },
  { lat: 32.9160, lng: 75.1416 },
]

const showroomImages = [
  '/talla/showrooms/gandhi-nagar.jpg',
  '/talla/showrooms/lakhdata-bazar.jpg',
  '/talla/showrooms/janipur-store.jpg',
  '/talla/showrooms/udhampur.jpg',
]

const showroomImagePositions = ['50% 45%', '50% 50%', '50% 30%', '50% 45%']

const showrooms = shopConfig.branches.map((branch, index) => ({
  ...branch,
  ...coordinates[index],
  image: showroomImages[index],
  imagePosition: showroomImagePositions[index],
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
        window.setTimeout(() => document.getElementById('nearest-result')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 120)
      },
      (locationError) => {
        setError(locationError.code === locationError.PERMISSION_DENIED
          ? 'Allow location access to find the closest showroom.'
          : 'Could not detect location. Please check the showrooms below.')
        setLoading(false)
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 300000 },
    )
  }

  return (
    <main
      className="talla-unified min-h-screen px-3 pb-12 pt-[max(.75rem,env(safe-area-inset-top))] text-[#32101F]"
      style={{
        background: 'radial-gradient(circle at 50% 0%, rgba(221,182,106,0.08), transparent 32rem), #FAF8F5',
      }}
    >
      <div className="mx-auto max-w-md">
        <header className="relative overflow-hidden rounded-[28px] border border-[#DDB66A]/45 bg-[#5F0D3C] p-4 text-white shadow-[0_18px_38px_rgba(0,0,0,.24)]">
          <Image src="/talla/talla-showroom.webp" alt="" fill priority className="object-cover opacity-30" sizes="448px" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(67,5,39,.98),rgba(95,13,60,.84),rgba(42,8,29,.58))]" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <Link href="/" onClick={() => prepareReturnToHeroCard()} aria-label="Back" className="grid h-11 w-11 place-items-center rounded-xl border border-white/20 bg-black/15"><ArrowLeft className="h-5 w-5" /></Link>
              <span className="relative h-12 w-12 overflow-hidden rounded-full border border-[#DDB66A]/65 bg-[#5F0D3C]"><Image src="/talla/elegant-gold-t-emblem.png" alt="Talla Jewellers" fill className="scale-[1.9] object-cover" sizes="48px" /></span>
            </div>
            <p className="mt-5 [font-family:var(--font-manrope)] text-[9px] font-semibold uppercase tracking-[0.28em] text-[#EACD8C]">Four showrooms</p>
            <h1 className="mt-1 [font-family:var(--font-manrope)] text-[30px] font-bold leading-tight tracking-tight">Find Your Talla</h1>
            <nav className="mt-4 grid grid-cols-3 gap-2 rounded-2xl border border-white/15 bg-black/10 p-1.5">
              <Link href="/" onClick={() => prepareReturnToHeroCard()} className="flex h-9 items-center justify-center gap-1 rounded-xl [font-family:var(--font-manrope)] text-[10px] font-semibold text-white/90"><Home className="h-3.5 w-3.5" />Home</Link>
              <a href="#all-showrooms" className="flex h-9 items-center justify-center gap-1 rounded-xl [font-family:var(--font-manrope)] text-[10px] font-semibold text-white/90"><Store className="h-3.5 w-3.5" />All Stores</a>
              <button type="button" onClick={findNearest} className="flex h-9 items-center justify-center rounded-xl bg-white [font-family:var(--font-manrope)] text-[10px] font-bold text-[#5F0D3C]">Nearest</button>
            </nav>
          </div>
        </header>

        {/* Find Nearest Store Action Block */}
        <section className="mt-4 overflow-hidden rounded-[26px] border border-[#DDB66A]/35 bg-[#FAF7F2] p-2.5 shadow-[0_12px_28px_rgba(50,16,31,.08)]">
          <button onClick={findNearest} disabled={loading} className="group relative block h-[104px] w-full overflow-hidden rounded-[22px] text-left disabled:opacity-60">
            <Image src="/talla/talla-showroom.webp" alt="Talla Jewellers showroom" fill className="object-cover transition duration-500 group-hover:scale-[1.025]" sizes="448px" />
            <span className="absolute inset-0 bg-[linear-gradient(90deg,rgba(47,4,29,.96)_0%,rgba(95,13,60,.82)_52%,rgba(29,7,19,.22)_100%)]" />
            <span className="absolute inset-[1px] rounded-[21px] border border-white/15" />
            <span className="relative flex h-full items-center justify-between px-5 text-white">
              <span>
                <span className="block text-[9px] font-semibold uppercase tracking-[.22em] text-[#EACD8C]">Closest Talla showroom</span>
                <strong className="mt-1.5 block text-[17.5px] font-bold">{loading ? 'Locating closest store…' : 'Find Nearest Store'}</strong>
              </span>
              <span className={`grid h-11 w-11 place-items-center rounded-full border border-[#EACD8C]/50 bg-black/20 backdrop-blur-sm transition-transform ${loading ? 'animate-spin' : 'group-hover:scale-105'}`}><Compass className="h-5 w-5 text-[#F3D890]" /></span>
            </span>
          </button>
          <div className="px-2">
            {error && <p className="mt-2.5 rounded-xl border border-[#DDB66A]/30 bg-white px-3 py-2 text-center [font-family:var(--font-manrope)] text-[11px] font-medium leading-5 text-[#78666C]">{error}</p>}
          </div>

          <AnimatePresence>
            {nearest && (
              <motion.article
                id="nearest-result"
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="mx-1 mb-1 mt-2.5 overflow-hidden rounded-[22px] border border-[#DDB66A]/50 shadow-[0_14px_30px_rgba(95,13,60,.12)]"
                style={{ background: 'linear-gradient(160deg, #FFFFFF 0%, #FFFDF9 55%, #FAF2E2 100%)' }}
              >
                <div className="relative aspect-[16/7]">
                  <Image src={nearest.image} alt={nearest.name} fill className="object-cover" style={{ objectPosition: nearest.imagePosition }} sizes="400px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#220514]/95 via-black/20 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full border border-[#DDB66A]/40 bg-[#FAF7F2] px-3 py-1 [font-family:var(--font-manrope)] text-[8px] font-bold uppercase tracking-[0.14em] text-[#5F0D3C]">Nearest showroom</span>
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <h2 className="[font-family:var(--font-manrope)] text-[20px] font-bold leading-tight">{nearest.name.replace('Talla Jewellers — ', '')}</h2>
                    <p className="mt-0.5 [font-family:var(--font-manrope)] text-[10px] font-medium text-white/75">Approx. {nearest.distance.toFixed(1)} km away</p>
                  </div>
                </div>
                <div className="p-3.5">
                  <p className="flex gap-2 [font-family:var(--font-manrope)] text-[11px] font-medium leading-5 text-[#78666C]"><MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#5F0D3C]" />{nearest.address}</p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <a href={`tel:${nearest.phone.replace(/\s/g, '')}`} className="flex h-[38px] items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#5F0D3C] via-[#6F0F46] to-[#5F0D3C] text-[11.5px] font-semibold text-white shadow-[0_4px_12px_rgba(95,13,60,.18)] active:scale-95 transition-all"><Phone className="h-3 w-3 text-[#EACD8C]" />Call Now</a>
                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(nearest.mapQuery)}`} target="_blank" rel="noreferrer" className="flex h-[38px] items-center justify-center gap-1.5 rounded-full border border-[#DDB66A]/50 bg-white/95 text-[11.5px] font-semibold text-[#5F0D3C] shadow-sm active:scale-95 transition-all"><GoogleMapsPinIcon className="h-3.5 w-3.5" />Directions</a>
                  </div>
                </div>
              </motion.article>
            )}
          </AnimatePresence>
        </section>

        {/* All Showrooms List */}
        <section id="all-showrooms" className="mt-6 scroll-mt-4">
          <div className="mb-3.5 flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5F0D3C]" />
              <h2 className="[font-family:var(--font-manrope)] text-[15px] font-bold tracking-tight text-[#1D1B19]">All Showrooms</h2>
            </div>
            <span className="[font-family:var(--font-manrope)] text-[11px] font-semibold text-[#8B7580]">4 Jammu Locations</span>
          </div>

          <div className="space-y-4">
            {showrooms.map((showroom) => (
              <article
                key={showroom.name}
                className="relative overflow-hidden rounded-[26px] border border-[#DDB66A]/40 p-2 shadow-[0_12px_28px_rgba(50,16,31,.09)] after:absolute after:inset-x-9 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-[#DDB66A] after:to-transparent"
                style={{ background: 'linear-gradient(165deg, #FFFFFF 0%, #FFFDF9 50%, #FAF3E6 100%)' }}
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-[22px]">
                  <Image src={showroom.image} alt={`${showroom.name} showroom`} fill className="object-cover" style={{ objectPosition: showroom.imagePosition }} sizes="448px" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.05)_0%,rgba(37,4,23,.22)_44%,rgba(28,3,17,.97)_100%)]" />
                  <span className="absolute left-3 top-3 rounded-full border border-white/30 bg-black/40 px-3 py-1 [font-family:var(--font-manrope)] text-[8px] font-semibold uppercase tracking-[.18em] text-[#EACD8C] backdrop-blur-md">Talla Showroom</span>
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <h2 className="[font-family:var(--font-manrope)] text-[21px] font-bold leading-tight">{showroom.name.replace('Talla Jewellers — ', '')}</h2>
                    <p className="mt-1 flex items-start gap-1.5 [font-family:var(--font-manrope)] text-[10px] font-medium leading-4 text-white/88"><MapPin className="mt-px h-3.5 w-3.5 shrink-0 text-[#EACD8C]" />{showroom.address}</p>
                  </div>
                </div>
                <div className="px-3 pb-2.5 pt-3">
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`tel:${showroom.phone.replace(/\s/g, '')}`}
                      className="flex h-[38px] items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#5F0D3C] via-[#6F0F46] to-[#5F0D3C] [font-family:var(--font-manrope)] text-[11.5px] font-semibold text-white shadow-[0_4px_12px_rgba(95,13,60,.18)] active:scale-95 transition-all"
                    >
                      <Phone className="h-3 w-3 text-[#EACD8C]" />Call Now
                    </a>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(showroom.mapQuery)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-[38px] items-center justify-center gap-1.5 rounded-full border border-[#DDB66A]/50 bg-white/95 [font-family:var(--font-manrope)] text-[11.5px] font-semibold text-[#5F0D3C] shadow-sm active:scale-95 transition-all"
                    >
                      <GoogleMapsPinIcon className="h-3.5 w-3.5" />Directions
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
