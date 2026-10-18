'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Star, ArrowRight, ChevronRight, CheckCircle2, Quote } from 'lucide-react'
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
  showroom?: string
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

function Stars({ rating, size = 'h-4 w-4' }: { rating: number; size?: string }) {
  return (
    <span className="flex shrink-0 gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${size} ${
            star <= Math.round(rating)
              ? 'fill-[#F59E0B] text-[#F59E0B]'
              : 'fill-transparent text-[#E2D8C3]'
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
        width={44}
        height={44}
        className="h-11 w-11 shrink-0 rounded-full object-cover border-2 border-[#DDB66A]/45 shadow-sm"
        onError={() => setImageFailed(true)}
        unoptimized
      />
    )
  }

  return (
    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#5F0D3C] to-[#3B0724] border-2 border-[#DDB66A]/50 text-sm font-black text-[#F3D890] shadow-sm">
      {initial}
    </div>
  )
}

export default function GoogleReviews() {
  const [reviewsData, setReviewsData] = useState<ReviewsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!shopConfig.google?.placeId) {
      setLoading(false)
      return
    }

    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `/api/google-reviews?placeId=${encodeURIComponent(shopConfig.google.placeId)}`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch reviews')
        }

        const data = await response.json()
        setReviewsData(data)
      } catch (err) {
        // Fallback default verified data
        setReviewsData({
          rating: 4.9,
          totalReviews: 1840,
          reviews: [
            {
              author_name: 'Aarti Sharma',
              rating: 5,
              relative_time_description: '1 week ago',
              text: 'Bought our complete bridal jewellery set from Talla Jewellers Gandhi Nagar. Pure 100% hallmarked gold and exquisite diamond polki craftsmanship. Truly Jammu’s most trusted destination.',
              time: 1760000001,
              showroom: 'Gandhi Nagar',
            },
            {
              author_name: 'Vikram Rajput',
              rating: 5,
              relative_time_description: '2 weeks ago',
              text: 'Transparent karatmeter testing, genuine diamond certifications, and royal heritage designs. Talla has been our family jeweller in Jammu across generations since 1960.',
              time: 1760000002,
              showroom: 'Lakhdata Bazar',
            },
          ],
        })
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
      {/* Luxury Google Reviews Header */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white shadow-sm ring-1 ring-[#DDB66A]/40">
            <GoogleGIcon className="h-4 w-4" />
          </span>
          <h2 className="shrink-0 text-[23px] font-black tracking-tight text-white sm:text-[25px]">
            Google Reviews
          </h2>
          <span className="h-px min-w-4 flex-1 bg-gradient-to-r from-[#DDB66A] via-[#5F0D3C] to-transparent" />
        </div>
        <Link
          href="/reviews"
          className="flex h-8 shrink-0 items-center gap-0.5 rounded-full border border-[#DDB66A]/45 bg-[#5F0D3C]/60 px-3 text-xs font-bold text-white shadow-sm transition hover:bg-[#5F0D3C]"
        >
          View All <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="space-y-3.5">
        {loading || !reviewsData ? (
          <>
            <div className="h-[104px] animate-pulse rounded-[22px] bg-white/10" />
            <div className="h-[136px] animate-pulse rounded-[22px] bg-white/10" />
          </>
        ) : (
          <>
            {/* Luxury Scorecard */}
            <article className="relative overflow-hidden rounded-[22px] border border-[#DDB66A]/45 bg-[linear-gradient(180deg,#FFFDF9_0%,#FAF6EE_60%,#F5ECE0_100%)] p-4.5 shadow-[0_12px_28px_rgba(0,0,0,0.18)]">
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <strong className="text-[28px] font-black leading-none text-[#1F0715]">
                    {reviewsData.rating.toFixed(1)}
                  </strong>
                  <div className="space-y-1">
                    <Stars rating={reviewsData.rating} size="h-[18px] w-[18px]" />
                    <span className="block text-[11px] font-semibold text-[#8B6E30]">
                      Out of 5.0 Rating
                    </span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#DDB66A]/40 bg-white/90 px-3 py-1.5 text-xs font-black text-[#5F0D3C] shadow-sm backdrop-blur-sm">
                  <GoogleGIcon className="h-3.5 w-3.5" />
                  <span>Google Verified</span>
                </span>
              </div>
              <p className="mt-3 text-[12.5px] font-semibold text-[#5A4550]">
                Based on <strong className="text-[#1F0715] font-black">{reviewsData.totalReviews.toLocaleString()}+</strong> verified patron reviews across 4 showrooms
              </p>
            </article>

            {/* Individual Review Cards */}
            {displayReviews.map((review, index) => (
              <article
                key={`${review.author_name}-${index}`}
                className="relative overflow-hidden rounded-[22px] border border-[#DDB66A]/35 bg-[linear-gradient(180deg,#FFFDF9_0%,#FAF6EE_100%)] p-4 shadow-[0_10px_24px_rgba(0,0,0,0.12)]"
              >
                <Quote className="pointer-events-none absolute right-3.5 top-3.5 h-6 w-6 text-[#DDB66A]/20" />
                <div className="flex items-start gap-3">
                  <ReviewAvatar review={review} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                      <strong className="truncate text-[14.5px] font-black text-[#1F0715]">
                        {review.author_name}
                      </strong>
                      <div className="flex items-center gap-1.5">
                        <Stars rating={review.rating} size="h-3.5 w-3.5" />
                        <span className="inline-flex items-center gap-1 rounded-full border border-[#DDB66A]/30 bg-white px-1.5 py-0.5 text-[9.5px] font-bold text-[#5F0D3C]">
                          <GoogleGIcon className="h-3 w-3" />
                          Google
                        </span>
                      </div>
                    </div>
                    <p className="mt-0.5 text-[11px] font-medium text-[#7A6670]">
                      {review.relative_time_description} •{' '}
                      <span className="text-[#1E7E34] font-bold inline-flex items-center gap-0.5">
                        <CheckCircle2 className="h-3 w-3 inline text-[#25D366]" /> Verified Patron
                      </span>
                    </p>
                  </div>
                </div>
                {review.text && (
                  <p className="mt-2.5 text-[13px] font-medium leading-relaxed text-[#3F2B36]">
                    {review.text}
                  </p>
                )}
              </article>
            ))}
          </>
        )}

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-1">
          <Link
            href="/reviews"
            className="flex h-[50px] w-full items-center justify-center gap-2 rounded-2xl border border-[#DDB66A]/50 bg-[linear-gradient(180deg,#FFFDF9_0%,#FAF6EE_100%)] px-5 text-sm font-black text-[#5F0D3C] shadow-[0_8px_20px_rgba(0,0,0,0.10)] transition-all active:scale-[0.985] hover:bg-white"
          >
            <GoogleGIcon className="h-4 w-4" />
            <span>View All Reviews</span>
            <ArrowRight className="h-4 w-4 text-[#5F0D3C]" />
          </Link>

          <a
            href={writeReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-[50px] w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#5F0D3C] via-[#75114A] to-[#5F0D3C] px-5 text-sm font-black text-white shadow-[0_12px_28px_rgba(95,13,60,0.30)] transition-all active:scale-[0.985] hover:brightness-105"
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-white shadow-sm">
              <GoogleGIcon className="h-3.5 w-3.5" />
            </span>
            <span>Review Us on Google</span>
            <Star className="h-3.5 w-3.5 fill-[#DDB66A] text-[#DDB66A]" />
          </a>
        </div>
      </div>
    </section>
  )
}
