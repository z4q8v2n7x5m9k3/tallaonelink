'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { shopConfig } from '../config'

export default function InstagramCTA() {
  return (
    <motion.section initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto w-full max-w-md py-5 [font-family:var(--font-manrope)]">
      <div className="rounded-[30px] bg-[linear-gradient(125deg,#F9CE34_0%,#EE2A7B_42%,#6228D7_100%)] p-[1.5px] shadow-[0_16px_34px_rgba(0,0,0,.2)]">
        <div className="relative overflow-hidden rounded-[28.5px] bg-[#F8F4EC] p-4">
          <div className="mb-4">
            <div className="mb-2 flex items-center gap-3">
              <h2 className="shrink-0 text-[22px] font-bold tracking-tight text-[#32101F] sm:text-2xl">Follow us on Social</h2>
              <span className="h-px flex-1 bg-gradient-to-r from-[#610138] via-[#DDB66A]/60 to-transparent" />
            </div>
            <p className="text-sm font-normal tracking-tight text-[#78666C]">Campaigns • craft • new arrivals.</p>
          </div>

          <Link href={shopConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="group relative flex items-center gap-3 overflow-hidden rounded-[22px] border border-[#DDB66A]/30 bg-white px-3.5 py-3 shadow-[0_9px_20px_rgba(47,16,31,.08)]">
            <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[#DDB66A]/55 bg-[#610138]">
              <Image src={shopConfig.assets.logo} alt="Talla Jewellers" fill className="scale-[1.9] object-cover" sizes="48px" />
            </span>
            <span className="min-w-0 flex-1">
              <strong className="block truncate text-[14px] font-bold text-[#32101F]">@tallajewellers</strong>
              <span className="mt-0.5 block truncate text-[11px] font-medium text-[#78666C]">Official Talla Jewellers</span>
            </span>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#E8D7DE] bg-white shadow-sm">
              <Image src="/instagram-official.png" alt="Instagram" width={24} height={24} className="h-6 w-6 object-contain" />
            </span>
          </Link>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link
              href={shopConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 items-center justify-center gap-2 rounded-2xl border border-[#DDB66A]/55 bg-[#610138] text-[12.5px] font-extrabold text-white transition active:scale-[0.98] shadow-sm hover:brightness-105"
            >
              <Image src="/instagram-official.png" alt="" width={18} height={18} className="h-[18px] w-[18px] object-contain" aria-hidden />
              <span>Instagram</span>
            </Link>

            <Link
              href={shopConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 items-center justify-center gap-2 rounded-2xl border border-[#1877F2]/40 bg-[#1877F2] text-[12.5px] font-extrabold text-white transition active:scale-[0.98] shadow-sm hover:brightness-105"
            >
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current" aria-hidden>
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
