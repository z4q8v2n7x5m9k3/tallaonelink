'use client'

import ReviewsPanel from '../../../components/ReviewsPanel'
import GoogleGIcon from '../../../components/GoogleGIcon'

export default function GoogleReviews() {
  return <section id="reviews" className="mx-auto w-full max-w-md pb-6 pt-7">
    <div className="mb-5"><div className="flex items-center gap-3"><h2 className="text-[23px] font-bold tracking-tight text-white">Customer Reviews</h2><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white shadow-sm"><GoogleGIcon className="h-4 w-4" /></span><span className="h-px max-w-[52px] flex-1 bg-gradient-to-r from-[#DDB66A]/60 to-transparent" /></div></div>
    <ReviewsPanel />
  </section>
}
