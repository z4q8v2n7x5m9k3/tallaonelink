'use client'

import { shopConfig } from '../config'

export default function About() {
  return (
    <section className="mx-auto w-full max-w-md pb-4 pt-4">
      <div
        className="relative overflow-hidden rounded-[30px] border border-[#DDB66A]/35 shadow-[0_18px_38px_rgba(0,0,0,0.22)]"
        style={{ background: '#560431' }}
      >
        <div
          className="absolute -right-6 -bottom-6 h-48 w-48 pointer-events-none opacity-[0.14] select-none"
          style={{
            backgroundImage: 'url(/talla/talla-emblem.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}
          aria-hidden
        />
        <div className="relative p-6 sm:p-7">
          <div className="mb-3.5 flex items-center gap-3">
            <h2 className="whitespace-nowrap text-left text-[22px] font-extrabold leading-none tracking-[-0.035em] text-white sm:text-2xl">
              Welcome to Talla Jewellers
            </h2>
            <span className="h-px flex-1 bg-gradient-to-r from-[#DDB66A]/80 to-transparent" />
          </div>
          <p className="text-[15px] font-medium leading-[1.65] text-white/95 sm:text-[16px]">
            Since 1960, Talla Jewellers has created fine jewellery that becomes part of a family&apos;s most cherished celebrations. Every piece brings together uncompromised purity, master craftsmanship and a deep understanding of Jammu&apos;s wedding traditions.
          </p>
        </div>
      </div>
    </section>
  )
}
