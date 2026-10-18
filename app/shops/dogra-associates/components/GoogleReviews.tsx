'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Star, ArrowRight, ChevronRight, CheckCircle2 } from 'lucide-react'
import { shopConfig } from '../config'
import GoogleGIcon from '../../../components/GoogleGIcon'

interface Review {
  author_name: string
  author_url?: string
  profile_photo_url?: string
  rating: number
  relative_time_description: string
  text: string
  time: number
}

interface ReviewsData {
  rating: number
  totalReviews: number
  reviews: Review[]
  googleUrl?: string
  unavailable?: boolean
  message?: string
  demo?: boolean
}

function googleWriteReviewUrl(placeId: string) {
  return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`
}

function Stars({ rating, size = 'h-5 w-5' }: { rating: number; size?: string }) {
  return (
    <span className="flex shrink-0 gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${size} ${
            star <= Math.round(rating)
              ? 'fill-[#F59E0B] text-[#F59E0B]'
              : 'fill-transparent text-slate-200'
          }`}
          strokeWidth={1.8}
        />
      ))}
    </span>
  )
}

function ReviewAvatar({ review }: { review: Review }) {
  const [imageFailed, setImageFailed] = useState(false)
  const initial = review.author_name.trim().charAt(0).toUpperCase() || 'T'

  if (review.profile_photo_url && !imageFailed) {
    return (
      <Image
        src={review.profile_photo_url}
        alt={review.author_name}
        width={40}
        height={40}
        className="h-10 w-10 shrink-0 rounded-full object-cover border border-slate-100"
        onError={() => setImageFailed(true)}
        unoptimized
      />
    )
  }

  return (
    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#5F0D3C] text-sm font-black text-white shadow-sm">
      {initial}
    </div>
  )
}

export default function GoogleReviews() {
  const [reviewsData, setReviewsData] = useState<ReviewsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!shopConfig.google?.placeId) {
      setLoading(false)
      setError('Google Place ID not configured')
      return
    }

    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `/api/google-reviews?placeId=${encodeURIComponent(shopConfig.google.placeId)}`
        )

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.message || errorData.error || 'Failed to fetch reviews')
        }

        const data = await response.json()
        if (data.error) {
          throw new Error(data.message || data.error)
        }
        setReviewsData(data)
      } catch (err: any) {
        setError(err.message || 'Failed to load reviews.')
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  const writeReviewUrl = shopConfig.google?.placeId
    ? googleWriteReviewUrl(shopConfig.google.placeId)
    : shopConfig.google.reviewsUrl

  const displayReviews = reviewsData?.reviews?.slice(0, 2) || []

  return (
    <section id="reviews" className="mx-auto w-full max-w-md pb-6 pt-7 [font-family:var(--font-manrope)]">
      {/* Burger Bazaar Style Header */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white shadow-sm">
            <GoogleGIcon className="h-4 w-4" />
          </span>
          <h2 className="shrink-0 text-[23px] font-black tracking-tight text-white sm:text-[25px]">
            Google Reviews
          </h2>
          <span className="h-px min-w-4 flex-1 bg-gradient-to-r from-[#5F0D3C] via-[#DDB66A]/55 to-transparent" />
        </div>
        <Link
          href="/reviews"
          className="flex h-8 shrink-0 items-center gap-0.5 rounded-full border border-white/20 bg-white/[0.08] px-2.5 text-xs font-extrabold text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition hover:bg-white/[0.14]"
        >
          View All <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="space-y-3">
        {loading || !reviewsData ? (
          <>
            <div className="h-[96px] animate-pulse rounded-[20px] bg-white/90" />
            <div className="h-[128px] animate-pulse rounded-[20px] bg-white/90" />
          </>
        ) : reviewsData.unavailable ? (
          <article className="rounded-[20px] border border-slate-200 bg-white p-4.5 shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-slate-200 bg-white shadow-sm">
                <GoogleGIcon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-sm font-black text-[#111827]">Talla Jewellers on Google</h3>
                <p className="mt-1 text-[12px] font-medium leading-5 text-slate-500">
                  {reviewsData.message || 'View ratings and verified customer reviews on our official Google Business Profile.'}
                </p>
              </div>
            </div>
          </article>
        ) : (
          <>
            {/* Scorecard (Burger Bazaar style: plenty of room, clean 20px corners, no clipping) */}
            <article className="rounded-[20px] border border-[#5F0D3C]/15 bg-white p-4.5 shadow-[0_10px_24px_rgba(0,0,0,0.12)]">
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <Stars rating={reviewsData.rating} size="h-[19px] w-[19px]" />
                  <strong className="text-xl font-black text-[#111827]">
                    {reviewsData.rating.toFixed(1)}
                  </strong>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#5F0D3C]/20 bg-[#FAF3F6] px-2.5 py-1 text-xs font-extrabold text-[#5F0D3C] shadow-sm">
                  <GoogleGIcon className="h-3.5 w-3.5" />
                  <span>Google Verified</span>
                </span>
              </div>
              <p className="mt-2 text-[12.5px] font-medium text-slate-600">
                Based on {reviewsData.totalReviews.toLocaleString()} verified reviews on Google
              </p>
            </article>

            {/* Individual Review Cards */}
            {displayReviews.map((review, index) => (
              <article
                key={`${review.author_name}-${index}`}
                className="rounded-[20px] border border-[#5F0D3C]/12 bg-white p-4 shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
              >
                <div className="flex items-start gap-3">
                  <ReviewAvatar review={review} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                      <strong className="truncate text-[14px] font-black text-[#111827]">
                        {review.author_name}
                      </strong>
                      <div className="flex items-center gap-1.5">
                        <Stars rating={review.rating} size="h-3.5 w-3.5" />
                        <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-1.5 py-0.5 text-[9px] font-bold text-slate-500">
                          <GoogleGIcon className="h-3 w-3" />
                          Google
                        </span>
                      </div>
                    </div>
                    <p className="mt-0.5 text-[11px] font-medium text-slate-500">
                      {review.relative_time_description} •{' '}
                      <span className="text-[#2E7D32] font-bold inline-flex items-center gap-0.5">
                        <CheckCircle2 className="h-3 w-3 inline text-[#25D366]" /> Verified Patron
                      </span>
                    </p>
                  </div>
                </div>
                {review.text && (
                  <p className="mt-2.5 line-clamp-3 text-[13px] font-medium leading-relaxed text-slate-700">
                    {review.text}
                  </p>
                )}
              </article>
            ))}
          </>
        )}

        {/* Action Buttons (Burger Bazaar style: clean 16px geometry, high-contrast, official icons) */}
        <Link
          href="/reviews"
          className="flex h-[48px] w-full items-center justify-center gap-2 rounded-[16px] border border-[#5F0D3C]/20 bg-white px-5 text-sm font-extrabold text-[#5F0D3C] shadow-[0_10px_22px_rgba(0,0,0,0.10)] transition-all active:scale-[0.985] hover:bg-[#FAF3F6]"
        >
          <GoogleGIcon className="h-4 w-4" />
          <span>View All Reviews</span>
          <ArrowRight className="h-4 w-4 text-[#5F0D3C]" />
        </Link>

        <a
          href={writeReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-[48px] w-full items-center justify-center gap-2 rounded-[16px] bg-gradient-to-r from-[#5F0D3C] via-[#75114A] to-[#5F0D3C] px-5 text-sm font-extrabold text-white shadow-[0_12px_26px_rgba(95,13,60,0.25)] transition-all active:scale-[0.985] hover:brightness-105"
        >
          <span className="grid h-6 w-6 place-items-center rounded-full bg-white shadow-sm">
            <GoogleGIcon className="h-3.5 w-3.5" />
          </span>
          <span>Review Us on Google</span>
          <Star className="h-3.5 w-3.5 fill-[#DDB66A] text-[#DDB66A]" />
        </a>
      </div>
    </section>
  )
}
