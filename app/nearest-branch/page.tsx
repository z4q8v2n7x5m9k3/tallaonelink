'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Compass, MapPin, Phone, Store } from 'lucide-react'
import { shopConfig } from '../shops/dogra-associates/config'
import { prepareReturnToHeroCard } from '../lib/homeNavigation'

function GoogleMapsDirectionButton({ mapQuery, label = 'Directions' }: { mapQuery: string; label?: string }) {
  return (
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`}
      target="_blank"
      rel="noreferrer"
      className="flex h-12 min-w-0 items-center justify-center gap-2 rounded-[16px] border border-slate-200 bg-white px-3 text-[13px] font-extrabold text-[#111827] shadow-[0_6px_16px_rgba(0,0,0,0.08)] transition-all active:scale-[0.98] hover:bg-[#FAF7F2]"
    >
      <span className="grid h-6 w-6 shrink-0 place-items-center" aria-hidden>
        <svg viewBox="0 0 24 24" className="h-5 w-5">
          <path d="m2.8 6.1 5.1-2.4v15.9L2.8 22V6.1Z" fill="#34A853" />
          <path d="m7.9 3.7 6 2.1v15.9l-6-2.1V3.7Z" fill="#FBBC05" />
          <path d="m13.9 5.8 7.3-2.7V19l-7.3 2.7V5.8Z" fill="#4285F4" />
          <path d="M16.6 2.2a4.3 4.3 0 0 0-4.3 4.3c0 3.2 4.3 7.8 4.3 7.8s4.3-4.6 4.3-7.8a4.3 4.3 0 0 0-4.3-4.3Z" fill="#EA4335" />
          <circle cx="16.6" cy="6.5" r="1.65" fill="white" />
        </svg>
      </span>
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
  '/talla/showrooms/gandhi-nagar.jpg',
  '/talla/showrooms/lakhdata-bazar.jpg',
  '/talla/showrooms/janipur.jpg',
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
        window.setTimeout(() => {
          document.getElementById('nearest-result')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 120)
      },
      (locationError) => {
        setError(
          locationError.code === locationError.PERMISSION_DENIED
            ? 'Allow location access to find the closest showroom.'
            : 'Could not detect location. Please check the showrooms below.'
        )
        setLoading(false)
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 300000 },
    )
  }

  return (
    <main
      className="talla-unified min-h-screen px-3 pb-16 pt-[max(.75rem,env(safe-area-inset-top))] text-[#32101F] [font-family:var(--font-manrope)]"
      style={{
        background: 'radial-gradient(circle at 50% 0%, rgba(221,182,106,0.08), transparent 32rem), #FAF8F5',
      }}
    >
      <div className="mx-auto max-w-md">
        {/* Simplified Premium Header */}
        <header className="relative overflow-hidden rounded-[28px] border border-[#DDB66A]/45 bg-[#5F0D3C] p-4 text-white shadow-[0_18px_38px_rgba(95,13,60,.28)]">
          <Image
            src="/talla/talla-showroom.webp"
            alt=""
            fill
            priority
            className="object-cover opacity-30"
            sizes="448px"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(67,5,39,.98),rgba(95,13,60,.84),rgba(42,8,29,.58))]" />

          <div className="relative">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                onClick={() => prepareReturnToHeroCard()}
                aria-label="Back home"
                className="grid h-11 w-11 place-items-center rounded-xl border border-white/20 bg-black/20 text-white backdrop-blur-md active:scale-95 transition-transform"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="text-center">
                <span className="block text-[9.5px] font-bold uppercase tracking-[0.24em] text-[#EACD8C]">
                  Talla Jewellers
                </span>
                <span className="block text-[11px] font-semibold text-white/80">Est. 1960</span>
              </div>
              <span className="relative h-11 w-11 overflow-hidden rounded-full border border-[#DDB66A]/65 bg-[#5F0D3C] shadow-md">
                <Image
                  src="/talla/elegant-gold-t-emblem.png"
                  alt="Talla Jewellers"
                  fill
                  className="scale-[1.8] object-cover"
                  sizes="44px"
                />
              </span>
            </div>

            <div className="mt-4">
              <span className="block text-[9.5px] font-bold uppercase tracking-[0.26em] text-[#EACD8C]">
                Jammu & Kashmir
              </span>
              <h1 className="mt-1 text-[26px] font-black leading-tight tracking-tight text-white">
                Find a Showroom
              </h1>
              <p className="mt-1 text-[12px] font-medium leading-relaxed text-white/80">
                Visit our four signature jewellery destinations across Jammu & Kashmir.
              </p>
            </div>

            {/* Clean Segmented Nav */}
            <nav className="mt-4 grid grid-cols-2 gap-2 rounded-2xl border border-white/15 bg-black/20 p-1.5 backdrop-blur-sm">
              <button
                type="button"
                onClick={() => {
                  document.getElementById('nearest-section')?.scrollIntoView({ behavior: 'smooth' })
                  findNearest()
                }}
                className="flex h-10 items-center justify-center gap-2 rounded-xl bg-white text-[11.5px] font-extrabold text-[#5F0D3C] shadow-md transition-transform active:scale-95"
              >
                <Compass className="h-4 w-4 text-[#5F0D3C]" />
                <span>Nearest Store</span>
              </button>
              <a
                href="#all-showrooms"
                className="flex h-10 items-center justify-center gap-2 rounded-xl text-[11.5px] font-bold text-white/90 transition-colors hover:bg-white/10"
              >
                <Store className="h-4 w-4 text-[#EACD8C]" />
                <span>All 4 Showrooms</span>
              </a>
            </nav>
          </div>
        </header>

        {/* Find Nearest Store Action Block */}
        <section id="nearest-section" className="mt-4 scroll-mt-3 overflow-hidden rounded-[26px] border border-[#DDB66A]/35 bg-white p-2.5 shadow-[0_12px_28px_rgba(50,16,31,.07)]">
          <button
            onClick={findNearest}
            disabled={loading}
            className="group relative block h-[106px] w-full overflow-hidden rounded-[22px] text-left disabled:opacity-60 cursor-pointer"
          >
            <Image
              src="/talla/talla-showroom.webp"
              alt="Talla Jewellers showroom"
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.025]"
              sizes="448px"
            />
            <span className="absolute inset-0 bg-[linear-gradient(90deg,rgba(47,4,29,.96)_0%,rgba(95,13,60,.84)_52%,rgba(29,7,19,.28)_100%)]" />
            <span className="absolute inset-[1px] rounded-[21px] border border-white/20" />
            <span className="relative flex h-full items-center justify-between px-5 text-white">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/30 px-2.5 py-0.5 text-[8.5px] font-bold uppercase tracking-[.20em] text-[#EACD8C]">
                  <Compass className="h-3 w-3" />
                  GPS Locator
                </span>
                <strong className="mt-1.5 block text-[18px] font-black leading-tight">
                  {loading ? 'Locating closest store…' : 'Find Nearest Store'}
                </strong>
                <span className="mt-0.5 block text-[11px] font-medium text-white/80">
                  Tap to calculate driving distance
                </span>
              </div>
              <span className={`grid h-12 w-12 place-items-center rounded-full border border-[#EACD8C]/50 bg-black/30 backdrop-blur-sm transition-transform ${loading ? 'animate-spin' : 'group-hover:scale-105'}`}>
                <Compass className="h-6 w-6 text-[#F3D890]" />
              </span>
            </span>
          </button>
          <div className="px-1">
            {error && (
              <p className="mt-2.5 rounded-xl border border-[#DDB66A]/30 bg-[#FAF7F2] px-3 py-2 text-center text-[11px] font-medium leading-5 text-[#78666C]">
                {error}
              </p>
            )}
          </div>

          <AnimatePresence>
            {nearest && (
              <motion.article
                id="nearest-result"
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="mx-1 mb-1 mt-3 overflow-hidden rounded-[24px] border border-[#DDB66A]/50 bg-white shadow-[0_14px_30px_rgba(95,13,60,.12)]"
              >
                <div className="relative aspect-[16/8.5]">
                  <Image
                    src={nearest.image}
                    alt={nearest.name}
                    fill
                    className="object-cover"
                    style={{ objectPosition: nearest.imagePosition }}
                    sizes="400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#220514]/95 via-black/25 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full border border-[#DDB66A]/40 bg-white/95 px-3 py-1 text-[8.5px] font-extrabold uppercase tracking-[0.14em] text-[#5F0D3C] shadow-sm backdrop-blur-md">
                    Closest Showroom
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-3.5 text-white">
                    <h2 className="text-[19px] font-black leading-tight">
                      {nearest.name.replace('Talla Jewellers — ', '')}
                    </h2>
                    <p className="mt-0.5 text-[11px] font-semibold text-[#F3D890]">
                      Approx. {nearest.distance.toFixed(1)} km away
                    </p>
                  </div>
                </div>
                <div className="p-3.5">
                  <p className="flex items-start gap-2 text-[11.5px] font-medium leading-5 text-[#5A4550]">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#5F0D3C]" />
                    {nearest.address}
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-2.5">
                    <a
                      href={`tel:${nearest.phone.replace(/\s/g, '')}`}
                      className="flex h-12 items-center justify-center gap-2 rounded-[16px] bg-gradient-to-r from-[#5F0D3C] via-[#75114A] to-[#5F0D3C] px-3 text-[13px] font-extrabold text-white shadow-[0_8px_20px_rgba(95,13,60,.24)] transition-all active:scale-[0.98] hover:brightness-105"
                    >
                      <Phone className="h-4 w-4 text-[#EACD8C]" />
                      <span>Call Now</span>
                    </a>
                    <GoogleMapsDirectionButton mapQuery={nearest.mapQuery} label="Directions" />
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
              <span className="h-2 w-2 rounded-full bg-[#5F0D3C]" />
              <h2 className="text-[17px] font-extrabold tracking-tight text-[#1D1B19]">
                Signature Showrooms
              </h2>
            </div>
            <span className="text-[11px] font-semibold text-[#8B7580]">
              4 Jammu & Kashmir Locations
            </span>
          </div>

          <div className="space-y-4">
            {showrooms.map((showroom) => (
              <article
                key={showroom.name}
                className="overflow-hidden rounded-[26px] border border-[#E8DEC8] bg-white p-2.5 shadow-[0_12px_28px_rgba(50,16,31,.07)]"
              >
                <div className="relative aspect-[16/9.5] overflow-hidden rounded-[22px] bg-[#24131D]">
                  <Image
                    src={showroom.image}
                    alt={`${showroom.name} showroom`}
                    fill
                    className="object-cover transition duration-500 hover:scale-[1.02]"
                    style={{ objectPosition: showroom.imagePosition }}
                    sizes="448px"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.05)_0%,rgba(37,4,23,.22)_40%,rgba(28,3,17,.96)_100%)]" />
                  <span className="absolute left-3 top-3 rounded-full border border-white/25 bg-black/45 px-3 py-1 text-[8.5px] font-bold uppercase tracking-[.18em] text-[#EACD8C] backdrop-blur-md">
                    Signature Showroom
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-3.5 text-white">
                    <h2 className="text-[20px] font-black leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                      {showroom.name.replace('Talla Jewellers — ', '')}
                    </h2>
                    <p className="mt-1 flex items-start gap-1.5 text-[11px] font-medium leading-4 text-white/90">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#EACD8C]" />
                      {showroom.address}
                    </p>
                  </div>
                </div>
                <div className="px-1.5 pt-3.5 pb-1">
                  <div className="grid grid-cols-2 gap-2.5">
                    <a
                      href={`tel:${showroom.phone.replace(/\s/g, '')}`}
                      className="flex h-12 items-center justify-center gap-2 rounded-[16px] bg-gradient-to-r from-[#5F0D3C] via-[#75114A] to-[#5F0D3C] px-3 text-[13px] font-extrabold text-white shadow-[0_8px_20px_rgba(95,13,60,.24)] transition-all active:scale-[0.98] hover:brightness-105"
                    >
                      <Phone className="h-4 w-4 text-[#EACD8C]" />
                      <span>Call Now</span>
                    </a>
                    <GoogleMapsDirectionButton mapQuery={showroom.mapQuery} label="Directions" />
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
