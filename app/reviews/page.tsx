'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, RefreshCw, Star } from 'lucide-react'

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

function Stars({ rating, size = 'h-5 w-5' }: { rating: number; size?: string }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${size} ${
            star <= Math.round(rating)
              ? 'fill-[#9B8468] text-[#9B8468]'
              : 'text-slate-300'
          }`}
        />
      ))}
    </div>
  )
}

function InitialAvatar({ name }: { name: string }) {
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#9B8468] text-lg font-black text-white">
      {name.trim().charAt(0).toUpperCase() || 'G'}
    </div>
  )
}

function ReviewAvatar({ review }: { review: GoogleReview }) {
  const [imageFailed, setImageFailed] = useState(false)

  if (review.profile_photo_url && !imageFailed) {
    return (
      <Image
        src={review.profile_photo_url}
        alt={review.author_name}
        width={48}
        height={48}
        className="h-12 w-12 shrink-0 rounded-full object-cover"
        onError={() => setImageFailed(true)}
        unoptimized
      />
    )
  }

  return <InitialAvatar name={review.author_name} />
}

export default function ReviewsPage() {
  const placeId = shopConfig.google.placeId
  const [data, setData] = useState<GoogleReviewsResponse | null>(null)
  const [loading, setLoading] = useState(Boolean(placeId))
  const [error, setError] = useState<string | null>(null)
  const [displayCount, setDisplayCount] = useState(3)

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
      setError('Google Place ID is not configured. Add NEXT_PUBLIC_GOOGLE_PLACE_ID on Vercel.')
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
      className="veloura-page min-h-screen pb-12"
      style={{
        background: '#F4F1EB',
        paddingTop: 'max(0.4rem, env(safe-area-inset-top))',
      }}
    >
      <div className="mx-auto w-full max-w-md px-4">
        <header className="sticky top-0 z-20 -mx-4 mb-5 border-b border-[#e3ddd3] bg-white/95 px-4 py-3 backdrop-blur-xl">
          <div className="relative flex items-center justify-between">
            <Link
              href="/"
              onClick={() => prepareReturnToHeroCard()}
              className="flex h-11 w-11 items-center justify-center rounded-full text-slate-900 active:scale-95"
              aria-label="Back"
            >
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div className="pointer-events-none absolute inset-x-14 flex items-center justify-center gap-2"><GoogleGIcon className="h-5 w-5"/><h1 className="truncate text-[19px] font-extrabold tracking-[-.025em] text-slate-950">Google Reviews</h1></div>
            <button
              onClick={load}
              className="flex h-11 w-11 items-center justify-center rounded-full text-[#8B641E] active:scale-95"
              aria-label="Refresh reviews"
            >
              <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </header>

        <section className="mb-6 rounded-[24px] border border-[#e5d4a6] bg-[linear-gradient(145deg,#fffdf7,#f1e4c6)] p-5 text-center shadow-[0_14px_30px_rgba(96,75,34,0.12)]">
          <div className="mb-3 flex items-center justify-center gap-3">
            <GoogleGIcon className="h-7 w-7" />
            <h2 className="text-xl font-black text-slate-950">Review Us on Google</h2>
            <Star className="h-6 w-6 fill-[#B8872C] text-[#B8872C]" />
          </div>
          <p className="mx-auto max-w-xs text-sm font-medium leading-6 text-slate-600">
            Share your Veloura experience and help others discover the salon.
          </p>
          {isDemo ? (
            <div className="mt-4 inline-flex h-12 w-full items-center justify-center gap-3 rounded-2xl bg-[linear-gradient(135deg,#604B22,#9A7A35)] text-sm font-black text-white shadow-[0_10px_22px_rgba(96,75,34,.24)]">Demo Version</div>
          ) : (
            <Link href={writeUrl!} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex h-12 w-full items-center justify-center gap-3 rounded-2xl bg-[linear-gradient(135deg,#604B22,#9A7A35)] text-sm font-black text-white shadow-[0_10px_22px_rgba(96,75,34,.24)]">
              <Star className="h-6 w-6 fill-white text-white" />
              Write a Review
              <ExternalLink className="h-5 w-5" />
            </Link>
          )}
          <p className="mt-3 text-xs font-semibold text-slate-500">
            {isDemo ? 'Demo Version — sample review content' : 'Opens Google Maps to submit your review'}
          </p>
        </section>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-40 animate-pulse rounded-[24px] bg-white shadow-sm" />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-[24px] border border-[#D8EAF8] bg-white p-6 text-center shadow-[0_12px_28px_rgba(7,59,115,0.08)]">
            <p className="text-sm font-semibold leading-6 text-slate-600">{error}</p>
          </div>
        ) : data ? (
          <>
            <section className="mb-5 rounded-[24px] border border-[#F6EEC8] bg-white p-5 text-center shadow-[0_12px_26px_rgba(7,59,115,0.08)]">
              <div className="mb-3 flex items-center justify-center gap-3">
                <Stars rating={data.rating} size="h-7 w-7" />
                <span className="text-3xl font-black text-slate-950">{data.rating.toFixed(1)}</span>
              </div>
              <p className="text-base font-semibold text-slate-600">
                Based on {data.totalReviews.toLocaleString()} reviews on Google
              </p>
            </section>

            {data.unavailable && data.message ? (
              <div className="mb-5 rounded-[24px] border border-[#D8EAF8] bg-white p-5 text-center shadow-[0_12px_26px_rgba(7,59,115,0.08)]">
                <p className="text-sm font-semibold leading-6 text-slate-600">{data.message}</p>
              </div>
            ) : null}

            <div className="space-y-4">
              {visibleReviews.map((review) => (
                <motion.article
                  key={`${review.author_name}-${review.time}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-[24px] border border-[#F6EEC8] bg-white p-5 shadow-[0_12px_26px_rgba(7,59,115,0.08)]"
                >
                  <div className="mb-4 flex items-start gap-3">
                    <ReviewAvatar review={review} />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-black leading-tight text-slate-950">{review.author_name}</h3>
                        <Stars rating={review.rating} size="h-4 w-4" />
                      </div>
                      <p className="mt-1 text-sm font-medium text-slate-500">
                        {review.relative_time_description}
                      </p>
                    </div>
                  </div>
                  <p className="line-clamp-4 text-[15px] font-medium leading-7 text-slate-700">
                    {review.text}
                  </p>
                </motion.article>
              ))}
            </div>

            {hasMore ? (
              <button
                onClick={() => setDisplayCount((count) => count + 3)}
                className="mt-6 flex h-12 w-full items-center justify-center rounded-2xl border border-[#d8c58d] bg-white text-sm font-black text-[#604B22] shadow-sm"
              >
                View More ({(data.reviews.length - visibleReviews.length).toLocaleString()} more)
              </button>
            ) : null}

            {isDemo ? (
              <div className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#604B22,#9A7A35)] text-sm font-black text-white shadow-[0_12px_26px_rgba(96,75,34,0.24)]">Demo Version</div>
            ) : (
              <Link href={googleUrl} target="_blank" rel="noopener noreferrer" className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#604B22,#9A7A35)] text-sm font-black text-white shadow-[0_12px_26px_rgba(96,75,34,0.24)]">
                View All Reviews on Google
                <ExternalLink className="h-5 w-5" />
              </Link>
            )}
          </>
        ) : null}
      </div>
    </main>
  )
}
