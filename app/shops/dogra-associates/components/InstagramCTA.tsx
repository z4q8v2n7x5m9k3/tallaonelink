'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { shopConfig } from '../config'

export default function InstagramCTA() {
  return (
    <motion.section initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto w-full max-w-md py-5">
      <div className="rounded-[30px] bg-[linear-gradient(125deg,#F9CE34_0%,#EE2A7B_42%,#6228D7_100%)] p-[1.5px] shadow-[0_16px_34px_rgba(0,0,0,.2)]">
      <div className="relative overflow-hidden rounded-[28.5px] bg-[#F8F4EC] p-4">
        <div className="mb-4">
          <div className="mb-2 flex items-center gap-3">
            <h2 className="shrink-0 text-[22px] font-bold tracking-tight text-[#32101F] sm:text-2xl">Follow us on Instagram</h2>
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
        <Link href={shopConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-[#DDB66A]/55 bg-[#610138] text-[13px] font-bold text-white transition active:scale-[0.98]">
          <Image src="/instagram-official.png" alt="" width={19} height={19} className="h-[19px] w-[19px] object-contain" aria-hidden />
          Open Instagram
        </Link>
      </div>
      </div>
    </motion.section>
  )
}
