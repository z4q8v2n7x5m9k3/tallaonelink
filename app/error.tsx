'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { ArrowLeft, RefreshCw } from 'lucide-react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('App error:', error)
  }, [error])

  const returnHome = () => {
    window.sessionStorage.removeItem('talla-return-section')
    window.sessionStorage.removeItem('talla-skip-home-loader')
    window.location.assign('/')
  }

  return (
    <main className="talla-unified flex min-h-[100dvh] items-center justify-center bg-[#111011] px-5 py-10 [font-family:var(--font-poppins)]">
      <section className="relative w-full max-w-md overflow-hidden rounded-[30px] border border-[#DDB66A]/45 bg-[#FFFDF9] p-6 text-center shadow-[0_28px_70px_rgba(0,0,0,.34)]">
        <span className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 opacity-[.06]"><Image src="/talla/talla-emblem.png" alt="" fill className="object-contain" sizes="176px" /></span>
        <span className="relative mx-auto block h-16 w-16 overflow-hidden rounded-full bg-[#610138] shadow-[0_10px_24px_rgba(97,1,56,.24)]"><Image src="/talla/elegant-gold-t-emblem.png" alt="Talla Jewellers" fill className="scale-[1.58] object-cover" sizes="64px" /></span>
        <p className="mt-5 text-[9px] font-bold uppercase tracking-[.25em] text-[#9A742A]">Talla Jewellers</p>
        <h1 className="mt-2 text-[26px] font-extrabold tracking-[-.025em] text-[#32101F]">We couldn’t open this page</h1>
        <p className="mx-auto mt-2 max-w-[310px] text-[12px] font-medium leading-5 text-[#7A6770]">The page did not finish loading. Retry it, or return safely to the Talla Jewellers home page.</p>
        <div className="mt-6 grid gap-2.5">
          <button type="button" onClick={reset} className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#610138] text-[13px] font-bold text-white shadow-[0_10px_22px_rgba(97,1,56,.22)] transition active:scale-[.98]"><RefreshCw className="h-4 w-4 text-[#EACD8C]" />Try Again</button>
          <button type="button" onClick={returnHome} className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-[#DDB66A]/60 bg-white text-[13px] font-bold text-[#610138] shadow-[0_8px_18px_rgba(45,20,31,.08)] transition active:scale-[.98]"><ArrowLeft className="h-4 w-4 text-[#9A742A]" />Return to Home</button>
        </div>
        {error.digest && <p className="mt-4 text-[9px] font-medium text-[#A3949B]">Reference: {error.digest}</p>}
      </section>
    </main>
  )
}
