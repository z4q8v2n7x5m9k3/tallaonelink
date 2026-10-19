'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronRight, Star } from 'lucide-react'
import GoogleGIcon from './GoogleGIcon'
import { shopConfig } from '../shops/dogra-associates/config'

type Review = { author_name: string; rating: number; text: string; relative_time_description: string; time: number }
type Reviews = { rating: number | null; totalReviews: number; reviews: Review[]; unavailable?: boolean; googleUrl?: string }

const SAMPLE_REVIEWS: Review[] = [
  { author_name: 'Sample Guest A', rating: 5, text: 'A lovely selection of jewellery and a thoughtful, personal shopping experience.', relative_time_description: 'Design preview', time: 3 },
  { author_name: 'Sample Guest B', rating: 5, text: 'The bridal pieces are beautifully presented and the team made every detail easy.', relative_time_description: 'Design preview', time: 2 },
  { author_name: 'Sample Guest C', rating: 4, text: 'A welcoming space to discover jewellery for celebrations and everyday wear.', relative_time_description: 'Design preview', time: 1 },
]

function Stars({ rating, size = 'h-3.5 w-3.5' }: { rating: number; size?: string }) {
  return <span className="flex shrink-0 gap-0.5" aria-label={`${rating} out of 5 stars`}>{[1,2,3,4,5].map(star => <Star key={star} className={`${size} ${star <= Math.round(rating) ? 'fill-[#DFAE22] text-[#DFAE22]' : 'fill-transparent text-slate-300'}`} strokeWidth={1.9} />)}</span>
}

export default function ReviewsPanel({ full = false }: { full?: boolean }) {
  const [data, setData] = useState<Reviews | null>(null)
  const [sort, setSort] = useState('relevant')
  useEffect(() => {
    fetch(`/api/google-reviews?placeId=${encodeURIComponent(shopConfig.google.placeId)}`, { cache: 'no-store' })
      .then(response => response.ok ? response.json() : Promise.reject())
      .then(setData)
      .catch(() => setData({ rating: null, totalReviews: 0, reviews: [], unavailable: true }))
  }, [])

  const loading = !data
  const available = !!data && !data.unavailable && !!data.rating
  const sample = !loading && !available
  const googleUrl = data?.googleUrl || shopConfig.google.mapsUrl
  const realPlaceId = shopConfig.google.placeId.startsWith('ChI')
  const writeUrl = realPlaceId ? `https://search.google.com/local/writereview?placeid=${encodeURIComponent(shopConfig.google.placeId)}` : googleUrl
  const rating = available ? data.rating || 0 : 5
  const reviews = [...(sample ? SAMPLE_REVIEWS : data?.reviews || [])]
    .sort((a,b) => sort === 'newest' ? b.time-a.time : sort === 'highest' ? b.rating-a.rating : 0)
    .slice(0, full ? undefined : 2)

  return <div className="space-y-2.5 [font-family:var(--font-poppins)]">
    {loading ? <><div className="h-[96px] animate-pulse rounded-[20px] bg-white/90" /><div className="h-[128px] animate-pulse rounded-[20px] bg-white/90" /></> : <>
      <article className="rounded-[20px] border border-slate-200 bg-white p-4 shadow-[0_10px_24px_rgba(0,0,0,.12)]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2"><Stars rating={rating} size="h-[18px] w-[18px]" /><strong className="text-xl font-black text-[#111827]">{available ? rating.toFixed(1) : 'Google'}</strong></div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-extrabold text-slate-700"><GoogleGIcon className="h-3.5 w-3.5" />Reviews</span>
        </div>
        <p className="mt-2 text-[13px] font-medium text-slate-600">{available ? `Based on ${data.totalReviews.toLocaleString()} reviews on Google` : 'Talla Jewellers on Google'}</p>
        {sample && <p className="mt-1 text-[10px] font-semibold text-slate-400">Sample review cards shown for layout preview.</p>}
      </article>

      {full && reviews.length > 0 && <div className="flex items-center justify-between gap-3 py-2"><h2 className="text-[16px] font-bold text-white">Customer experiences</h2><select aria-label="Sort reviews" value={sort} onChange={e=>setSort(e.target.value)} className="rounded-full border border-white/15 bg-[#20191E] px-3 py-2 text-[11px] font-semibold text-white"><option value="relevant">Most relevant</option><option value="newest">Newest</option><option value="highest">Highest rated</option></select></div>}

      {reviews.map((review, index) => <article key={`${review.author_name}-${review.time}-${index}`} className="rounded-[20px] border border-slate-200 bg-white p-4 shadow-[0_8px_20px_rgba(0,0,0,.08)]">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#610138] text-base font-black text-white">{review.author_name.charAt(0).toUpperCase()}</span>
          <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-x-2 gap-y-1"><strong className="truncate text-[14px] font-black text-[#111827]">{review.author_name}</strong><Stars rating={review.rating} /><span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-1.5 py-0.5 text-[9px] font-bold text-slate-500">{sample ? 'Sample' : <><GoogleGIcon className="h-3 w-3" />Google</>}</span></div><p className="text-[11px] font-medium text-slate-500">{review.relative_time_description}</p></div>
        </div>
        <p className={`mt-2.5 text-[13px] font-medium leading-5 text-slate-700 ${full ? '' : 'line-clamp-3'}`}>{review.text}</p>
      </article>)}
    </>}

    {!full && <Link href="/reviews" className="flex h-[48px] w-full items-center justify-center gap-2 rounded-[16px] border border-[#DDB66A]/55 bg-[#610138] px-5 text-sm font-extrabold text-white shadow-[0_9px_20px_rgba(97,1,56,.22)] transition active:scale-[.985]">View All Reviews <ChevronRight className="h-4 w-4 text-[#EACD8C]" /></Link>}
    <a href={writeUrl} target="_blank" rel="noopener noreferrer" className="flex h-[48px] w-full items-center justify-center gap-2 rounded-[16px] border border-[#DADCE0] bg-white px-5 text-sm font-extrabold text-[#3C4043] shadow-[0_8px_18px_rgba(60,64,67,.15)] transition active:scale-[.985]"><span className="grid h-7 w-7 place-items-center rounded-full border border-slate-100 bg-white shadow-sm"><GoogleGIcon className="h-[18px] w-[18px]" /></span>{realPlaceId ? 'Write a Review' : 'View on Google'} <ArrowRight className="h-4 w-4 text-[#4285F4]" /></a>
  </div>
}
