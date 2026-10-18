'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, CheckCircle2, ChevronDown, Clock, Gem, Phone, Sparkles, User, MapPin } from 'lucide-react'
import WhatsAppLogo from '@/components/WhatsAppLogo'
import { shopConfig } from '../shops/dogra-associates/config'
import { prepareReturnToHeroCard } from '../lib/homeNavigation'

const PURPOSES = [
  'Bridal Jewellery Consultation',
  'Gold & Diamond Shopping',
  'Custom Jewellery Enquiry',
  'Gold Exchange Consultation',
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
      className="talla-unified min-h-screen px-3 pb-16 pt-[max(.75rem,env(safe-area-inset-top))] text-[#32101F] [font-family:var(--font-manrope)]"
      style={{
        background: 'radial-gradient(circle at 50% 0%, rgba(221,182,106,0.08), transparent 32rem), #FAF8F5',
      }}
    >
      <div className="mx-auto w-full max-w-md">
        {/* Luxury Header */}
        <header className="relative overflow-hidden rounded-[28px] border border-[#DDB66A]/45 bg-[#5F0D3C] p-4 text-white shadow-[0_18px_38px_rgba(95,13,60,.28)]">
          <Image
            src="/talla/ruby-couture-editorial.jpg"
            alt=""
            fill
            priority
            className="object-cover opacity-25"
            sizes="448px"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(67,5,39,.98),rgba(95,13,60,.86),rgba(42,8,29,.60))]" />

          <div className="relative">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                onClick={() => prepareReturnToHeroCard()}
                aria-label="Back home"
                className="grid h-11 w-11 place-items-center rounded-xl border border-white/20 bg-black/20 text-white backdrop-blur-md active:scale-95 transition-transform"
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

            <p className="mt-5 text-[9.5px] font-bold uppercase tracking-[0.28em] text-[#EACD8C]">
              Bespoke Jewellery Experience
            </p>
            <h1 className="mt-1 text-[28px] font-black leading-tight tracking-tight text-white">
              Book a Visit
            </h1>
            <p className="mt-1.5 text-[12px] font-medium leading-relaxed text-white/80">
              Schedule a dedicated consultation with our master jewellery stylists for bridal, gold and solitaire curations.
            </p>
          </div>
        </header>

        {/* Consultation Form Card */}
        <section className="mt-4 overflow-hidden rounded-[26px] border border-[#E8DEC8] bg-white p-5 shadow-[0_12px_28px_rgba(50,16,31,.07)]">
          <div className="space-y-4">
            {/* Purpose */}
            <div>
              <span className="mb-2 flex items-center gap-1.5 text-[12px] font-extrabold text-[#1F0715]">
                <Gem className="h-4 w-4 text-[#9A7A35]" />
                Purpose of Visit
              </span>
              <div className="grid grid-cols-2 gap-2">
                {PURPOSES.map((item) => {
                  const isSel = purpose === item
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setPurpose(item)}
                      className={`p-3 rounded-2xl text-left text-[11.5px] font-bold transition-all border ${
                        isSel
                          ? 'bg-[#5F0D3C] border-[#5F0D3C] text-white shadow-sm'
                          : 'bg-white border-[#E8DEC8] text-[#4A323D] hover:bg-[#FAF5EC]'
                      }`}
                    >
                      {item}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Select Showroom */}
            <div>
              <span className="mb-1.5 flex items-center gap-1.5 text-[12px] font-extrabold text-[#1F0715]">
                <MapPin className="h-4 w-4 text-[#9A7A35]" />
                Select Showroom
              </span>
              <div className="relative">
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="h-11 w-full appearance-none rounded-xl border border-[#E8DEC8] bg-white px-3.5 pr-10 text-[12px] font-semibold text-[#1F0715] outline-none focus:border-[#5F0D3C] shadow-sm"
                >
                  {shopConfig.branches.map((b) => (
                    <option key={b.name} value={b.name}>
                      {b.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="mb-1.5 flex items-center gap-1.5 text-[12px] font-extrabold text-[#1F0715]">
                  <Calendar className="h-4 w-4 text-[#9A7A35]" />
                  Preferred Date
                </span>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="h-11 w-full rounded-xl border border-[#E8DEC8] bg-white px-3 text-[12px] font-semibold text-[#1F0715] outline-none focus:border-[#5F0D3C] shadow-sm"
                />
              </div>

              <div>
                <span className="mb-1.5 flex items-center gap-1.5 text-[12px] font-extrabold text-[#1F0715]">
                  <Clock className="h-4 w-4 text-[#9A7A35]" />
                  Preferred Time
                </span>
                <div className="relative">
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="h-11 w-full appearance-none rounded-xl border border-[#E8DEC8] bg-white px-3 pr-8 text-[12px] font-semibold text-[#1F0715] outline-none focus:border-[#5F0D3C] shadow-sm"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                </div>
              </div>
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="mb-1.5 flex items-center gap-1.5 text-[12px] font-extrabold text-[#1F0715]">
                  <User className="h-4 w-4 text-[#9A7A35]" />
                  Your Name
                </span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="h-11 w-full rounded-xl border border-[#E8DEC8] bg-white px-3 text-[12px] font-semibold text-[#1F0715] outline-none focus:border-[#5F0D3C] shadow-sm"
                />
              </div>

              <div>
                <span className="mb-1.5 flex items-center gap-1.5 text-[12px] font-extrabold text-[#1F0715]">
                  <Phone className="h-4 w-4 text-[#9A7A35]" />
                  Mobile Number
                </span>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 98765 43210"
                  type="tel"
                  className="h-11 w-full rounded-xl border border-[#E8DEC8] bg-white px-3 text-[12px] font-semibold text-[#1F0715] outline-none focus:border-[#5F0D3C] shadow-sm"
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
                    ? 'cursor-pointer bg-gradient-to-r from-[#5F0D3C] via-[#75114A] to-[#5F0D3C] shadow-[0_6px_20px_rgba(95,13,60,.25)]'
                    : 'opacity-50 pointer-events-none bg-slate-400'
                }`}
              >
                <WhatsAppLogo className="h-4.5 w-4.5" color="#25D366" />
                <span>Confirm Consultation via WhatsApp</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
