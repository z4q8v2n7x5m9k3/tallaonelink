'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Clock3, Compass, Home, MapPin, Navigation, Phone, Search, Store } from 'lucide-react'
import { shopConfig } from '../shops/dogra-associates/config'
import { prepareReturnToHeroCard } from '../lib/homeNavigation'

const coordinates = [
  { lat: 32.7068, lng: 74.8618 },
  { lat: 32.7357, lng: 74.8691 },
  { lat: 32.7581, lng: 74.8562 },
  { lat: 32.9160, lng: 75.1416 },
]

const showroomImages = [
  '/talla/talla-showroom.webp',
  '/talla/kriyon/fine-076.webp',
  '/talla/kriyon/fine-081.webp',
  '/talla/kriyon/fine-092.webp',
]

const showroomImagePositions = ['50% 50%', '22% 50%', '70% 50%', '42% 50%']

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
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const nearest = useMemo(() => {
    if (!location) return null
    return showrooms
      .map((showroom) => ({ ...showroom, distance: distanceKm(location.lat, location.lng, showroom.lat, showroom.lng) }))
      .sort((a, b) => a.distance - b.distance)[0]
  }, [location])

  const filteredShowrooms = useMemo(() => {
    const value = query.trim().toLowerCase()
    if (!value) return showrooms
    return showrooms.filter((showroom) => `${showroom.name} ${showroom.address}`.toLowerCase().includes(value))
  }, [query])

  const findNearest = () => {
    setError('')
    setLoading(true)
    if (!navigator.geolocation) {
      setError('Location is not available on this device. You can still search all showrooms below.')
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
          ? 'Allow location access to find the closest showroom, or search below.'
          : 'We could not detect your location. Please search the showroom list below.')
        setLoading(false)
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 300000 },
    )
  }

  return (
    <main className="talla-unified min-h-screen bg-white px-3 pb-12 pt-[max(.75rem,env(safe-area-inset-top))] text-[#32101F]">
      <div className="mx-auto max-w-md">
        <header className="relative overflow-hidden rounded-[28px] border border-[#DDB66A]/45 bg-[#610138] p-4 text-white shadow-[0_18px_38px_rgba(0,0,0,.24)]">
          <Image src="/talla/talla-showroom.webp" alt="" fill priority className="object-cover opacity-30" sizes="448px" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(67,5,39,.98),rgba(97,1,56,.84),rgba(42,8,29,.58))]" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <Link href="/" onClick={() => prepareReturnToHeroCard()} aria-label="Back" className="grid h-11 w-11 place-items-center rounded-xl border border-white/20 bg-black/15"><ArrowLeft className="h-5 w-5" /></Link>
              <span className="relative h-12 w-12 overflow-hidden rounded-full border border-[#DDB66A]/65 bg-[#610138]"><Image src="/talla/elegant-gold-t-emblem.png" alt="Talla Jewellers" fill className="scale-[1.9] object-cover" sizes="48px" /></span>
            </div>
            <p className="mt-5 [font-family:var(--font-manrope)] text-[9px] font-semibold uppercase tracking-[0.28em] text-[#EACD8C]">Four showrooms</p>
            <h1 className="mt-1 [font-family:var(--font-manrope)] text-[30px] font-bold leading-tight tracking-tight">Find Your Talla</h1>
            <nav className="mt-4 grid grid-cols-3 gap-2 rounded-2xl border border-white/15 bg-black/10 p-1.5">
              <Link href="/" onClick={() => prepareReturnToHeroCard()} className="flex h-9 items-center justify-center gap-1 rounded-xl [font-family:var(--font-manrope)] text-[10px] font-semibold text-white/90"><Home className="h-3.5 w-3.5" />Home</Link>
              <a href="#all-showrooms" className="flex h-9 items-center justify-center gap-1 rounded-xl [font-family:var(--font-manrope)] text-[10px] font-semibold text-white/90"><Store className="h-3.5 w-3.5" />All Stores</a>
              <button type="button" onClick={findNearest} className="flex h-9 items-center justify-center rounded-xl bg-white [font-family:var(--font-manrope)] text-[10px] font-bold text-[#610138]">Nearest</button>
            </nav>
          </div>
        </header>

        <section className="mt-4 overflow-hidden rounded-[28px] border border-[#DDB66A]/30 bg-[#F8F4EC] p-2 shadow-[0_16px_36px_rgba(50,16,31,.12)]">
          <button onClick={findNearest} disabled={loading} className="group relative block h-[112px] w-full overflow-hidden rounded-[23px] text-left disabled:opacity-60">
            <Image src="/talla/talla-showroom.webp" alt="Talla Jewellers showroom" fill className="object-cover transition duration-500 group-hover:scale-[1.025]" sizes="448px" />
            <span className="absolute inset-0 bg-[linear-gradient(90deg,rgba(47,4,29,.96)_0%,rgba(97,1,56,.78)_52%,rgba(29,7,19,.22)_100%)]" />
            <span className="absolute inset-[1px] rounded-[22px] border border-white/15" />
            <span className="relative flex h-full items-center justify-between px-5 text-white">
              <span>
                <span className="block text-[9px] font-semibold uppercase tracking-[.22em] text-[#EACD8C]">Closest Talla showroom</span>
                <strong className="mt-1.5 block text-[18px] font-bold">{loading ? 'Finding your showroom…' : 'Find Nearest Store'}</strong>
              </span>
              <span className="grid h-12 w-12 place-items-center rounded-full border border-[#EACD8C]/50 bg-black/20 backdrop-blur-sm"><Compass className="h-5 w-5 text-[#F3D890]" /></span>
            </span>
          </button>
          <div className="px-3 pb-2">
            {error && <p className="mt-3 rounded-xl border border-[#DDB66A]/30 bg-white px-3 py-2 text-center [font-family:var(--font-manrope)] text-[11px] font-medium leading-5 text-[#78666C]">{error}</p>}
          </div>

          {nearest && (
            <article id="nearest-result" className="mx-3 mb-3 mt-2 overflow-hidden rounded-[22px] border border-[#DDB66A]/35 bg-white shadow-[0_14px_30px_rgba(97,1,56,.14)]">
              <div className="relative aspect-[16/7]">
                <Image src={nearest.image} alt={nearest.name} fill className="object-cover" style={{ objectPosition: nearest.imagePosition }} sizes="400px" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#220514]/95 via-black/20 to-transparent" />
                <span className="absolute left-3 top-3 rounded-full bg-[#F8F4EC] px-3 py-1 [font-family:var(--font-manrope)] text-[8px] font-semibold uppercase tracking-[0.14em] text-[#610138]">Nearest showroom</span>
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <h2 className="[font-family:var(--font-manrope)] text-[21px] font-bold leading-tight">{nearest.name.replace('Talla Jewellers — ', '')}</h2>
                  <p className="mt-1 [font-family:var(--font-manrope)] text-[10px] font-medium text-white/72">Approx. {nearest.distance.toFixed(1)} km away</p>
                </div>
              </div>
              <div className="p-4">
                <p className="flex gap-2 [font-family:var(--font-manrope)] text-[11px] font-medium leading-5 text-[#78666C]"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#610138]" />{nearest.address}</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <a href={`tel:${nearest.phone.replace(/\s/g, '')}`} className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#DDB66A]/40 text-[11px] font-semibold text-[#610138]"><Phone className="h-4 w-4" />Call</a>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(nearest.mapQuery)}`} target="_blank" rel="noreferrer" className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#610138] text-[11px] font-semibold text-white"><Navigation className="h-4 w-4" />Directions</a>
                </div>
              </div>
            </article>
          )}
        </section>

        <section id="all-showrooms" className="mt-5 scroll-mt-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#610138]" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search showroom or city" className="h-13 min-h-[52px] w-full rounded-2xl border border-[#DDB66A]/40 bg-[#FFF9F5] pl-11 pr-4 [font-family:var(--font-manrope)] text-[12px] font-medium text-[#32101F] shadow-[0_8px_20px_rgba(50,16,31,.07)] outline-none placeholder:text-[#8B7580] focus:border-[#610138]" />
          </div>
          <div className="mt-4 space-y-4">
            {filteredShowrooms.map((showroom) => (
              <article key={showroom.name} className="relative overflow-hidden rounded-[28px] border border-[#DDB66A]/35 bg-white p-2 shadow-[0_14px_30px_rgba(50,16,31,.11)] after:absolute after:inset-x-9 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-[#DDB66A] after:to-transparent">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[23px]">
                  <Image src={showroom.image} alt={`${showroom.name} showroom`} fill className="object-cover" style={{ objectPosition: showroom.imagePosition }} sizes="448px" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.05)_0%,rgba(37,4,23,.22)_44%,rgba(28,3,17,.97)_100%)]" />
                  <span className="absolute left-3 top-3 rounded-full border border-white/30 bg-black/35 px-3 py-1.5 [font-family:var(--font-manrope)] text-[8px] font-semibold uppercase tracking-[.16em] text-white backdrop-blur">Talla Showroom</span>
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <h2 className="[font-family:var(--font-manrope)] text-[22px] font-bold leading-tight">{showroom.name.replace('Talla Jewellers — ', '')}</h2>
                    <p className="mt-1 flex items-start gap-1.5 [font-family:var(--font-manrope)] text-[10px] font-medium leading-4 text-white/88"><MapPin className="mt-px h-3.5 w-3.5 shrink-0 text-[#EACD8C]" />{showroom.address}</p>
                  </div>
                </div>
                <div className="px-3 pb-3 pt-3">
                  <p className="flex items-center gap-1.5 [font-family:var(--font-manrope)] text-[10px] font-semibold text-[#9A6B24]"><Clock3 className="h-3.5 w-3.5" />Daily 10:30 AM – 8:00 PM</p>
                  <div className="mt-3 grid grid-cols-2 gap-2.5">
                    <a href={`tel:${showroom.phone.replace(/\s/g, '')}`} className="flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-[#610138] [font-family:var(--font-manrope)] text-[12px] font-bold text-white shadow-[0_8px_18px_rgba(97,1,56,.18)]"><Phone className="h-4 w-4" />Call Now</a>
                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(showroom.mapQuery)}`} target="_blank" rel="noreferrer" className="flex min-h-[50px] items-center justify-center gap-2 rounded-full border border-[#DDB66A]/40 bg-[#FFF9F5] [font-family:var(--font-manrope)] text-[12px] font-bold text-[#610138]"><Navigation className="h-4 w-4" />Directions</a>
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
