'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Star, ArrowRight, ChevronRight } from 'lucide-react'
import { shopConfig } from '../config'

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

function ReviewAvatar({ review }: { review: Review }) {
  const [imageFailed, setImageFailed] = useState(false)
  const initial = review.author_name.trim().charAt(0).toUpperCase() || 'G'

  if (review.profile_photo_url && !imageFailed) {
    return (
      <Image
        src={review.profile_photo_url}
        alt={review.author_name}
        width={40}
        height={40}
        className="h-10 w-10 rounded-full object-cover"
        onError={() => setImageFailed(true)}
        unoptimized
      />
    )
  }

  return (
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
      style={{ background: '#FFF7D6', color: '#8B641E' }}
    >
      <span className="text-sm font-black" style={{ color: '#8B641E' }}>
        {initial}
      </span>
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
        setError(err.message || 'Failed to load reviews. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  if (!shopConfig.google?.placeId) {
    return (
      <section id="reviews" className="w-full max-w-md mx-auto pt-8 pb-6">
        <div className="section-title-accent mb-5">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-[#1D1B19] text-left">Google Reviews</h2>
          <p className="mt-2 text-sm text-[#746F69]">Read customer experiences and view Talla Jewellers on Google.</p>
        </div>
        <div className="rounded-[24px] border border-[#DED9D2] bg-[#FCFBF8] p-5 shadow-[0_8px_24px_rgba(29,27,25,.05)]">
          <div className="flex items-center gap-1 text-[#9B8468]" aria-hidden>{[1,2,3,4,5].map((star) => <Star key={star} className="h-5 w-5" />)}</div>
          <p className="mt-3 text-sm leading-6 text-[#746F69]">Google rating details will appear here when the Place ID is configured.</p>
          <Link href={shopConfig.google.reviewsUrl} target="_blank" rel="noopener noreferrer" className="mt-4 flex h-11 items-center justify-center rounded-2xl border border-[#DED9D2] bg-[#E9E2D8] text-sm font-semibold text-[#1D1B19]">View on Google</Link>
        </div>
      </section>
    )
  }

  // Show skeleton loader
  if (loading) {
    return (
      <section id="reviews" className="w-full max-w-md mx-auto pt-8 pb-6">
        <div className="mb-5">
          <div className="section-title-accent">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#181818] text-left">
              Google Reviews
            </h2>
          </div>
        </div>
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="rounded-2xl p-4 animate-pulse border"
              style={{ height: '120px', background: '#FFFFFF', borderColor: '#E5ECF6' }}
            />
          ))}
        </div>
      </section>
    )
  }

  // Show error state with message
  if (error || (!reviewsData && !loading)) {
    return (
      <section id="reviews" className="w-full max-w-md mx-auto pt-8 pb-6">
        <div className="flex items-center justify-between mb-5">
          <div className="section-title-accent">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white text-left">
              Google Reviews
            </h2>
          </div>
          <Link
            href="/reviews"
            className="text-sm font-semibold text-[#d8b968] hover:text-[#f0d494] transition-colors flex items-center gap-1"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="rounded-2xl p-6 text-center border" style={{ background: '#FFFFFF', borderColor: '#E5ECF6', boxShadow: '0 8px 20px rgba(15,42,68,0.06)' }}>
          <p className="mb-4" style={{ color: '#6B7A90' }}>
            {error || 'Unable to load reviews at the moment.'}
          </p>
          <Link
            href={shopConfig.google.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-semibold py-2 px-4 rounded-xl transition-all text-white"
            style={{ background: 'linear-gradient(135deg,#604B22,#9A7A35)' }}
          >
            Open Google Reviews
          </Link>
        </div>
      </section>
    )
  }

  if (!reviewsData) return null

  const displayReviews = reviewsData.reviews.slice(0, 2)
  const isDemo = Boolean(reviewsData.demo || shopConfig.google?.isDemo)
  const writeReviewUrl = googleWriteReviewUrl(shopConfig.google.placeId)

  return (
    <section id="reviews" className="mx-auto w-full max-w-md pb-6 pt-8 [font-family:var(--font-manrope)]">
      <div className="flex items-center justify-between mb-5">
        <div className="section-title-accent talla-title-accent">
          <h2 className="[font-family:var(--font-manrope)] text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Customer Reviews
          </h2>
        </div>
        <Link
          href="/reviews"
          aria-label="View all reviews"
          className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[#DDB66A]/50 bg-[#610138]"
        >
          <Image src="/talla/elegant-gold-t-emblem.png" alt="" fill unoptimized className="scale-[1.9] object-cover" sizes="40px" />
        </Link>
      </div>

      {/* Rating Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="mb-4 rounded-[22px] border border-[#DDB66A]/35 bg-white p-4 shadow-[0_8px_20px_rgba(47,16,31,.08)]"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.round(reviewsData.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-2xl font-black leading-none" style={{ color: '#111827' }}>
                {reviewsData.rating.toFixed(1)}
              </span>
            </div>
            <p className="[font-family:var(--font-manrope)] text-[11px] font-medium text-[#78666C]">
              {reviewsData.totalReviews.toLocaleString()} verified Google reviews
            </p>
          </div>
          <span
            className="mt-1 shrink-0 rounded-full border px-4 py-2 text-sm font-black"
            style={{ borderColor: '#E7D6AE', color: '#610138', background: '#F8F4EC' }}
          >
            {isDemo ? 'Demo Version' : 'Google'}
          </span>
        </div>
      </motion.div>

      {/* Review Cards */}
      {reviewsData.unavailable ? (
        <div className="rounded-2xl border bg-white p-5 shadow-[0_8px_20px_rgba(15,42,68,0.06)]" style={{ borderColor: '#E5ECF6' }}>
          <div className="mb-3 flex items-center gap-2">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <span className="text-lg font-black text-slate-950">
              {reviewsData.rating > 0 ? reviewsData.rating.toFixed(1) : 'Google'}
            </span>
          </div>
          <p className="text-sm leading-6 text-slate-600">
            {reviewsData.message || 'Google reviews are temporarily unavailable.'}
          </p>
        </div>
      ) : (
      <div className="space-y-3">
        {displayReviews.map((review, index) => (
          <motion.div
            key={review.time}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.05, duration: 0.3, ease: 'easeOut' }}
            className="rounded-2xl p-4 transition-all"
            style={{
              background: '#FFFFFF',
              border: '1px solid rgba(221,182,106,.32)',
              borderRadius: 16,
              boxShadow: '0 7px 18px rgba(47,16,31,.07)',
            }}
          >
            <div className="flex items-start gap-3 mb-2">
              <ReviewAvatar review={review} />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-semibold text-sm" style={{ color: '#0F2A44' }}>
                    {review.author_name}
                  </h3>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3.5 h-3.5 ${
                          star <= review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs" style={{ color: '#6B7A90' }}>
                  {review.relative_time_description}
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed line-clamp-3" style={{ color: '#0B1F33' }}>
              {review.text}
            </p>
          </motion.div>
        ))}
      </div>
      )}

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: 0.15, duration: 0.3 }}
        className="mt-5 space-y-3"
      >
        <Link
          href="/reviews"
          className="block w-full font-semibold py-3 px-4 rounded-2xl transition-all flex items-center justify-center gap-2"
          style={{
            background: '#FFFFFF',
            color: '#610138',
            border: '1px solid rgba(216,197,141,.58)',
            boxShadow: '0 8px 20px rgba(96,75,34,.13)',
          }}
        >
          View All Reviews
          <ArrowRight className="w-4 h-4" style={{ color: '#80652C' }} />
        </Link>
        {isDemo ? (
          <div
            className="block w-full font-semibold py-3 px-4 rounded-2xl text-center text-white"
            style={{ background: '#610138' }}
          >
            Demo Version
          </div>
        ) : (
          <Link
            href={writeReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full font-semibold py-3 px-4 rounded-2xl transition-all flex items-center justify-center gap-2 text-white"
            style={{ background: '#610138' }}
          >
            Write on Google
            <Star className="w-4 h-4 fill-white text-white" />
          </Link>
        )}
      </motion.div>
    </section>
  )
}
