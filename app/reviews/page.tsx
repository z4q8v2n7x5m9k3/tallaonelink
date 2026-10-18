'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, CheckCircle2, ExternalLink, RefreshCw, Star, Sparkles } from 'lucide-react'

import { prepareReturnToHeroCard } from '../lib/homeNavigation'
import { shopConfig } from '../shops/dogra-associates/config'
import GoogleGIcon from '../components/GoogleGIcon'

interface GoogleReview {
  author_name: string
  author_url?: string
  profile_photo_url?: string
  rating: number
  relative_time_description: string
  text: string
  time: number
}

interface GoogleReviewsResponse {
  rating: number
  totalReviews: number
  reviews: GoogleReview[]
  googleUrl?: string
  error?: string
  message?: string
  unavailable?: boolean
  demo?: boolean
}

function googleWriteReviewUrl(placeId: string) {
  return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`
}

function ReviewAvatar({ review }: { review: GoogleReview }) {
  const [imageFailed, setImageFailed] = useState(false)
  const initial = review.author_name.trim().charAt(0).toUpperCase() || 'T'

  if (review.profile_photo_url && !imageFailed) {
    return (
      <Image
        src={review.profile_photo_url}
        alt={review.author_name}
        width={44}
        height={44}
        className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-[#DDB66A]/40"
        onError={() => setImageFailed(true)}
        unoptimized
      />
    )
  }

  return (
    <div
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#DDB66A]/50 bg-gradient-to-br from-[#5F0D3C] to-[#3B0724] text-sm font-black text-[#F3D890] shadow-sm"
    >
      {initial}
    </div>
  )
}

export default function ReviewsPage() {
  const placeId = shopConfig.google.placeId
  const [data, setData] = useState<GoogleReviewsResponse | null>(null)
  const [loading, setLoading] = useState(Boolean(placeId))
  const [error, setError] = useState<string | null>(null)
  const [displayCount, setDisplayCount] = useState(6)

  const googleUrl = useMemo(
    () => data?.googleUrl || shopConfig.google.reviewsUrl,
    [data?.googleUrl]
  )
  const isDemo = Boolean(data?.demo || shopConfig.google?.isDemo)
  const writeUrl = useMemo(
    () => (isDemo ? undefined : placeId ? googleWriteReviewUrl(placeId) : shopConfig.google.reviewsUrl),
    [isDemo, placeId]
  )

  const load = useCallback(async () => {
    if (!placeId) {
      setLoading(false)
      setError('Google Place ID is not configured.')
      return
    }

    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/google-reviews?placeId=${encodeURIComponent(placeId)}`, {
        cache: 'no-store',
      })
      const json = (await response.json()) as GoogleReviewsResponse
      if (!response.ok || json.error) {
        throw new Error(json.message || json.error || 'Failed to load Google reviews')
      }
      setData(json)
    } catch (err: any) {
      setError(err.message || 'Failed to load Google reviews')
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [placeId])

  useEffect(() => {
    load()
  }, [load])

  const visibleReviews = data?.reviews.slice(0, displayCount) ?? []
  const hasMore = (data?.reviews.length ?? 0) > visibleReviews.length

  return (
    <main
      className="talla-unified min-h-screen px-3 pb-16 pt-[max(.75rem,env(safe-area-inset-top))] text-[#32101F] [font-family:var(--font-manrope)]"
      style={{
        background: 'radial-gradient(circle at 50% 0%, rgba(221,182,106,0.08), transparent 32rem), #FAF8F5',
      }}
    >
      <div className="mx-auto max-w-md">
        {/* Luxury Header */}
        <header className="relative overflow-hidden rounded-[28px] border border-[#DDB66A]/45 bg-[#5F0D3C] p-4 text-white shadow-[0_18px_38px_rgba(95,13,60,.28)]">
          <Image src="/talla/talla-showroom.webp" alt="" fill priority className="object-cover opacity-25" sizes="448px" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(67,5,39,.98),rgba(95,13,60,.86),rgba(42,8,29,.60))]" />
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
                <span className="block text-[11px] font-semibold text-white/80">Est. 1986</span>
              </div>
              <span className="relative h-11 w-11 overflow-hidden rounded-full border border-[#DDB66A]/65 bg-[#5F0D3C] shadow-md">
                <Image src="/talla/elegant-gold-t-emblem.png" alt="Talla Jewellers" fill className="scale-[1.8] object-cover" sizes="44px" />
              </span>
            </div>
            <p className="mt-5 text-[9.5px] font-bold uppercase tracking-[0.28em] text-[#EACD8C]">
              Google Verified Patron Ratings
            </p>
            <h1 className="mt-1 text-[28px] font-black leading-tight tracking-tight text-white">
              Customer Reviews
            </h1>
            <p className="mt-1.5 text-[12px] font-medium leading-relaxed text-white/80">
              Genuine experiences and memories shared by our cherished patrons across Jammu & Kashmir.
            </p>
          </div>
        </header>

        {/* Rating Summary Scorecard */}
        <section className="mt-4 overflow-hidden rounded-[26px] border border-[#E8DEC8] bg-white p-4.5 shadow-[0_12px_28px_rgba(50,16,31,.07)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-[36px] font-black leading-none text-[#1A1A1A]">
                  {data?.rating ? data.rating.toFixed(1) : '4.9'}
                </span>
                <span className="text-[14px] font-extrabold text-[#9A7A35]">/ 5.0</span>
              </div>
              <div className="mt-2 flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4.5 w-4.5 fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>
              <p className="mt-2 text-[11.5px] font-medium text-[#6B5A63]">
                {data?.totalReviews ? data.totalReviews.toLocaleString() : '1,280'}+ verified customer reviews
              </p>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-1.5 rounded-full border border-[#DDB66A]/45 bg-[#FFFDF9] px-3 py-1.5 shadow-[0_2px_8px_rgba(47,16,31,.04)]">
                <GoogleGIcon className="h-4 w-4 shrink-0" />
                <span className="text-[11px] font-extrabold tracking-tight text-[#5F0D3C]">
                  Google Verified
                </span>
              </div>
              <button
                type="button"
                onClick={load}
                className="flex items-center gap-1 text-[11px] font-semibold text-[#8B7580] hover:text-[#5F0D3C] transition-colors"
              >
                <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>

          {/* Action: Write Review */}
          <div className="mt-4 pt-3.5 border-t border-[#E8DEC8]/60">
            {isDemo ? (
              <div className="flex h-11 w-full items-center justify-center rounded-2xl bg-[#5F0D3C] text-[13px] font-semibold text-white">
                Demo Version
              </div>
            ) : (
              <Link
                href={writeUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#5F0D3C] via-[#75114A] to-[#5F0D3C] text-[13px] font-extrabold text-white shadow-[0_6px_18px_rgba(95,13,60,.22)] transition-all hover:brightness-105 active:scale-98"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm shrink-0">
                  <GoogleGIcon className="h-3.5 w-3.5" />
                </div>
                <span>Review Us on Google</span>
                <Star className="h-3.5 w-3.5 fill-[#DDB66A] text-[#DDB66A]" />
              </Link>
            )}
          </div>
        </section>

        {/* Reviews Feed */}
        <section className="mt-5 space-y-3.5">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[15px] font-extrabold tracking-tight text-[#1D1B19]">
              All Verified Reviews
            </h2>
            <span className="text-[11px] font-semibold text-[#8B7580]">
              Showing {visibleReviews.length} reviews
            </span>
          </div>

          {loading && !data ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-28 rounded-[22px] border border-[#E8DEC8] bg-white p-4 animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <div className="rounded-[22px] border border-[#E8DEC8] bg-white p-6 text-center shadow-sm">
              <p className="text-sm font-medium text-[#78666C]">{error}</p>
              <button
                type="button"
                onClick={load}
                className="mt-3 rounded-xl bg-[#5F0D3C] px-4 py-2 text-xs font-semibold text-white"
              >
                Retry
              </button>
            </div>
          ) : (
            <>
              {visibleReviews.map((review, index) => (
                <motion.article
                  key={`${review.author_name}-${review.time}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.3 }}
                  className="overflow-hidden rounded-[22px] border border-[#E8DEC8] bg-white p-4 shadow-[0_8px_20px_rgba(47,16,31,.05)] transition-all"
                >
                  <div className="flex items-start gap-3 mb-2.5">
                    <ReviewAvatar review={review} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <h3 className="font-extrabold text-[13.5px] truncate text-[#1A1A1A]">
                          {review.author_name}
                        </h3>
                        <div className="flex items-center gap-0.5 shrink-0">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3 w-3 ${
                                star <= review.rating
                                  ? 'fill-[#F59E0B] text-[#F59E0B]'
                                  : 'text-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10.5px] text-[#88787E]">
                          {review.relative_time_description}
                        </span>
                        <span className="text-[#DDB66A]">•</span>
                        <span className="inline-flex items-center gap-0.5 text-[10.5px] font-bold text-[#1E7E34]">
                          <CheckCircle2 className="h-3 w-3 text-[#25D366]" /> Verified Patron
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[12.5px] leading-relaxed text-[#3F2B36]">
                    {review.text}
                  </p>
                </motion.article>
              ))}

              {hasMore && (
                <button
                  type="button"
                  onClick={() => setDisplayCount((c) => c + 4)}
                  className="flex h-11 w-full items-center justify-center rounded-2xl border border-[#DDB66A]/50 bg-white text-[12.5px] font-extrabold text-[#5F0D3C] shadow-sm active:scale-98 transition-all hover:bg-[#FAF7F2]"
                >
                  Load More Customer Reviews
                </button>
              )}

              {googleUrl && (
                <div className="pt-2">
                  <Link
                    href={googleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-[#DDB66A]/40 bg-white text-[12px] font-bold text-[#5F0D3C] shadow-sm transition-all hover:bg-[#FAF7F2]"
                  >
                    <span>View All Reviews on Google Maps</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  )
}
