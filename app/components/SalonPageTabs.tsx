'use client'

import Link from 'next/link'
import { ClipboardList, Scissors } from 'lucide-react'

export default function SalonPageTabs({ active }: { active: 'services' | 'prices' }) {
  return (
    <nav className="mb-4 grid grid-cols-2 gap-1.5 rounded-[21px] border border-[#DED9D2] bg-[#FCFBF8] p-1.5 shadow-[0_10px_28px_rgba(0,0,0,.10)]">
      <Link href="/services" className={`flex h-11 items-center justify-center gap-2 rounded-[15px] border text-sm font-extrabold transition ${active === 'services' ? 'border-[#D8C58D]/60 bg-[linear-gradient(135deg,#604B22,#8A733A)] text-white shadow-[0_8px_18px_rgba(0,0,0,.18)]' : 'border-transparent text-[#604B22] hover:bg-[#F4F1EB]'}`}><span className={`grid h-7 w-7 place-items-center rounded-xl ${active === 'services' ? 'bg-white/14' : 'bg-[#E9E2D8]'}`}><Scissors className="h-4 w-4" /></span>Services</Link>
      <Link href="/packages" className={`flex h-11 items-center justify-center gap-2 rounded-[15px] border text-sm font-extrabold transition ${active === 'prices' ? 'border-[#D8C58D]/60 bg-[linear-gradient(135deg,#604B22,#8A733A)] text-white shadow-[0_8px_18px_rgba(0,0,0,.18)]' : 'border-transparent text-[#604B22] hover:bg-[#F4F1EB]'}`}><span className={`grid h-7 w-7 place-items-center rounded-xl ${active === 'prices' ? 'bg-white/14' : 'bg-[#E9E2D8]'}`}><ClipboardList className="h-4 w-4" /></span>Price Menu</Link>
    </nav>
  )
}
