'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, CalendarDays, ChevronDown, Clock3, Smartphone, UserRound, Store } from 'lucide-react'
import WhatsAppLogo from '@/components/WhatsAppLogo'
import { shopConfig } from '../shops/dogra-associates/config'
import { prepareReturnToHeroCard } from '../lib/homeNavigation'

const PURPOSES = [
  'Bridal Jewellery Consultation',
  'Gold & Diamond Shopping',
  'Custom Jewellery Enquiry',
  'Gold Exchange Consultation',
]

const PURPOSE_IMAGES = [
  '/talla/kriyon/fine-076.webp',
  '/talla/kriyon/fine-092.webp',
  '/talla/kriyon/fine-110.webp',
  '/talla/kriyon/fine-085.webp',
]

const TIME_SLOTS = [
  '11:00 AM',
  '1:00 PM',
  '3:00 PM',
  '5:00 PM',
  '6:30 PM',
]

function todayDateValue() {
  const date = new Date()
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
  return date.toISOString().slice(0, 10)
}

export default function BookConsultationPage() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [purpose, setPurpose] = useState(PURPOSES[0])
  const [branch, setBranch] = useState(shopConfig.branches[0]?.name || 'Talla Jewellers — Gandhi Nagar')
  const [date, setDate] = useState(todayDateValue)
  const [time, setTime] = useState(TIME_SLOTS[0])

  const canSubmit = name.trim().length > 1 && phone.trim().length > 5 && date && time
  const whatsappPhone = shopConfig.contact.clientPhoneE164 || '919000000000'

  const message = `Hi Talla Jewellers,

I would like to book a Private Jewellery Consultation.

• Purpose: ${purpose}
• Showroom: ${branch}
• Preferred Date: ${date}
• Preferred Time: ${time}
• Name: ${name.trim()}
• Phone: ${phone.trim()}

Please confirm the consultation appointment.`

  return (
    <main
      className="talla-unified min-h-screen bg-[#111011] px-3 pb-16 pt-[max(.75rem,env(safe-area-inset-top))] text-[#32101F] [font-family:var(--font-poppins)]"
      style={{
        background: '#111011',
      }}
    >
      <div className="mx-auto w-full max-w-md">
        {/* Luxury Header */}
        <header className="relative min-h-[255px] overflow-hidden rounded-[28px] border border-[#DDB66A]/45 bg-[#5F0D3C] p-5 text-white shadow-[0_20px_42px_rgba(0,0,0,.34)]">
          <Image
            src="/talla/kriyon/fine-076.webp"
            alt=""
            fill
            priority
            className="object-cover object-[63%_30%] opacity-58"
            sizes="448px"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(53,4,31,.98)_0%,rgba(95,13,60,.86)_55%,rgba(42,8,29,.22)_100%)]" />

          <div className="relative">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                onClick={() => prepareReturnToHeroCard()}
                aria-label="Back home"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md active:scale-95 transition-transform"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="text-center">
                <span className="block text-[9.5px] font-bold uppercase tracking-[0.24em] text-[#EACD8C]">
                  Talla Jewellers
                </span>
                <span className="block text-[11px] font-semibold text-white/80">Private Concierge</span>
              </div>
              <span className="relative h-11 w-11 overflow-hidden rounded-full border border-[#DDB66A]/65 bg-[#5F0D3C] shadow-md">
                <Image
                  src="/talla/elegant-gold-t-emblem.png"
                  alt="Talla Jewellers"
                  fill
                  className="scale-[1.8] object-cover"
                  sizes="44px"
                />
              </span>
            </div>

            <p className="mt-12 text-[9.5px] font-bold uppercase tracking-[0.28em] text-[#EACD8C]">
              Bespoke Jewellery Experience
            </p>
            <h1 className="mt-1 text-[30px] font-extrabold leading-tight tracking-[-.025em] text-white">
              Book a Visit
            </h1>
            <p className="mt-2 max-w-[330px] text-[12px] font-medium leading-5 text-white/82">
              Choose a showroom, purpose, date and preferred time for a dedicated jewellery consultation.
            </p>
          </div>
        </header>

        <div className="relative z-10 -mt-4 mx-4 grid grid-cols-3 rounded-[20px] border border-[#E7D8C3] bg-[#FFFDF8] p-2 shadow-[0_12px_28px_rgba(0,0,0,.2)]">
          {[['01','Choose'],['02','Schedule'],['03','Confirm']].map(([number,label], index) => <div key={label} className={`flex items-center justify-center gap-1.5 py-2 ${index ? 'border-l border-[#E8DED2]' : ''}`}><span className="text-[9px] font-bold text-[#A6782A]">{number}</span><span className="text-[10px] font-bold text-[#4A303D]">{label}</span></div>)}
        </div>

        {/* Consultation Form Card */}
        <section className="mt-4 overflow-hidden rounded-[26px] border border-[#E1D3C0] bg-[#FFFDF9] p-5 shadow-[0_16px_34px_rgba(72,37,52,.13)]">
          <div className="mb-5"><p className="text-[9px] font-bold uppercase tracking-[.22em] text-[#A6782A]">Appointment details</p><h2 className="mt-1 text-[20px] font-extrabold tracking-[-.02em] text-[#32101F]">Plan your showroom visit</h2></div>
          <div className="space-y-4">
            {/* Purpose */}
            <div>
              <span className="mb-2 flex items-center gap-1.5 text-[12px] font-extrabold text-[#1F0715]">
                <CalendarDays className="h-4 w-4 text-[#9A7A35]" />
                Purpose of Visit
              </span>
              <div className="grid grid-cols-2 gap-2">
                {PURPOSES.map((item, index) => {
                  const isSel = purpose === item
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setPurpose(item)}
                      className={`relative min-h-[70px] overflow-hidden rounded-[15px] border px-3 py-2.5 text-left transition-all ${
                        isSel
                          ? 'border-[#610138] bg-[#610138] text-white shadow-[0_8px_18px_rgba(97,1,56,.18)]'
                          : 'border-[#E8DEC8] bg-white text-[#4A323D] hover:border-[#DDB66A] hover:bg-[#FAF5EC]'
                      }`}
                    >
                      <Image src={PURPOSE_IMAGES[index]} alt="" fill className="object-cover opacity-35" sizes="200px" />
                      <span className={`absolute inset-0 ${isSel ? 'bg-[linear-gradient(90deg,rgba(66,3,37,.94),rgba(97,1,56,.46))]' : 'bg-[linear-gradient(90deg,rgba(255,253,249,.98),rgba(255,253,249,.50))]'}`} />
                      <span className="relative flex min-h-[50px] max-w-[138px] items-end text-[11.5px] font-extrabold leading-[1.3]">{item}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Select Showroom */}
            <div>
              <span className="mb-2 flex items-center gap-2 text-[13px] font-extrabold text-[#1F0715]">
                <Store className="h-4 w-4 text-[#9A7A35]" />
                Select Showroom
              </span>
              <div className="relative">
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="h-[54px] w-full appearance-none rounded-[16px] border border-[#D7C6AF] bg-white px-4 pr-12 text-[13.5px] font-bold text-[#32101F] shadow-[0_8px_18px_rgba(45,20,31,.08)] outline-none transition focus:border-[#610138] focus:ring-2 focus:ring-[#610138]/10"
                >
                  {shopConfig.branches.map((b) => (
                    <option key={b.name} value={b.name}>
                      {b.name}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-2.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-[#F6EFE5] text-[#610138]"><ChevronDown className="h-4 w-4" /></span>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="mb-1.5 flex items-center gap-1.5 text-[12px] font-extrabold text-[#1F0715]">
                  <CalendarDays className="h-4 w-4 text-[#9A7A35]" />
                  Preferred Date
                </span>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="h-[54px] w-full rounded-[16px] border border-[#D7C6AF] bg-white px-4 text-[13px] font-bold text-[#32101F] shadow-[0_8px_18px_rgba(45,20,31,.08)] outline-none transition focus:border-[#610138] focus:ring-2 focus:ring-[#610138]/10"
                />
              </div>

              <div>
                <span className="mb-1.5 flex items-center gap-1.5 text-[12px] font-extrabold text-[#1F0715]">
                  <Clock3 className="h-4 w-4 text-[#9A7A35]" />
                  Preferred Time
                </span>
                <div className="relative">
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="h-[54px] w-full appearance-none rounded-[16px] border border-[#D7C6AF] bg-white px-4 pr-10 text-[13px] font-bold text-[#32101F] shadow-[0_8px_18px_rgba(45,20,31,.08)] outline-none transition focus:border-[#610138] focus:ring-2 focus:ring-[#610138]/10"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-[#F6EFE5] text-[#610138]"><ChevronDown className="h-4 w-4" /></span>
                </div>
              </div>
            </div>

            {/* Name & Phone */}
            <div className="grid gap-4">
              <div>
                <span className="mb-1.5 flex items-center gap-1.5 text-[12px] font-extrabold text-[#1F0715]">
                  <UserRound className="h-4 w-4 text-[#9A7A35]" />
                  Your Name
                </span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="h-[54px] w-full rounded-[16px] border border-[#D7C6AF] bg-white px-3.5 text-[13px] font-semibold text-[#32101F] shadow-[0_8px_18px_rgba(45,20,31,.08)] outline-none transition focus:border-[#610138] focus:ring-2 focus:ring-[#610138]/10"
                />
              </div>

              <div>
                <span className="mb-1.5 flex items-center gap-1.5 text-[12px] font-extrabold text-[#1F0715]">
                  <Smartphone className="h-4 w-4 text-[#9A7A35]" />
                  Mobile Number
                </span>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 98765 43210"
                  type="tel"
                  className="h-[54px] w-full rounded-[16px] border border-[#D7C6AF] bg-white px-3.5 text-[13px] font-semibold text-[#32101F] shadow-[0_8px_18px_rgba(45,20,31,.08)] outline-none transition focus:border-[#610138] focus:ring-2 focus:ring-[#610138]/10"
                />
              </div>
            </div>

            {/* Submit via WhatsApp */}
            <div className="pt-2">
              <a
                href={canSubmit ? `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}` : undefined}
                target="_blank"
                rel="noreferrer"
                className={`group flex h-12 w-full items-center justify-center gap-2 rounded-2xl text-[13px] font-extrabold text-white shadow-lg transition-transform active:scale-[0.98] ${
                  canSubmit
                    ? 'cursor-pointer bg-[#610138] shadow-[0_8px_22px_rgba(95,13,60,.24)]'
                    : 'opacity-50 pointer-events-none bg-slate-400'
                }`}
              >
                <WhatsAppLogo className="h-[18px] w-[18px] shrink-0" color="#25D366" />
                <span>Confirm Consultation via WhatsApp</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
