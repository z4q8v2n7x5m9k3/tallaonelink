'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, CalendarDays, CheckCircle2, ChevronDown, Clock, Gem, Phone, Sparkles, User, MapPin } from 'lucide-react'
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
      className="talla-page min-h-screen px-3 pt-[max(0.75rem,env(safe-area-inset-top))]"
      style={{
        background: '#FAF6EE',
      }}
    >
      <div className="mx-auto w-full max-w-md pb-6">
        <div className="-mx-3 bg-white px-3 pt-2 pb-1">
          <motion.header
            data-page-hero
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mb-3 overflow-hidden rounded-[28px] border border-[#DDB66A]/40 p-4 shadow-xl"
            style={{
              backgroundImage: "linear-gradient(105deg, rgba(55, 8, 32, 0.95), rgba(97, 1, 56, 0.88)), url('/talla/ruby-couture-editorial.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="relative flex items-center justify-between">
              <Link
                href="/"
                onClick={() => prepareReturnToHeroCard()}
                className="z-10 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/95 text-[#610138] shadow-md ring-1 ring-[#DDB66A]/40 backdrop-blur-md transition-transform active:scale-95"
                aria-label="Back to card"
              >
                <ArrowLeft className="h-5 w-5 text-[#610138]" />
              </Link>
              <div className="text-center flex-1 px-2">
                <span className="block text-[10px] uppercase font-bold tracking-widest text-[#DDB66A]">Since 1986</span>
                <h1 className="text-[1.2rem] font-black leading-tight text-white">
                  Jewellery Consultation
                </h1>
              </div>
              <span className="z-10 h-10 w-10" aria-hidden />
            </div>

            <nav className="mt-3 grid grid-cols-2 gap-2 rounded-2xl border border-white/20 bg-white/10 p-1.5 backdrop-blur-md">
              <Link href="/services" className="flex h-9 items-center justify-center gap-1.5 rounded-xl text-xs font-bold text-white/90 hover:bg-white/10">
                <Gem className="h-3.5 w-3.5 text-[#DDB66A]" />
                Our Collections
              </Link>
              <Link data-active="true" href="/book-consultation" className="flex h-9 items-center justify-center gap-1.5 rounded-xl bg-[#610138] border border-[#DDB66A]/60 text-xs font-black text-white shadow-sm">
                <CalendarDays className="h-3.5 w-3.5 text-[#DDB66A]" />
                Book Consultation
              </Link>
            </nav>
          </motion.header>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.35 }}
          className="rounded-[30px] border border-[#DDB66A]/40 bg-white p-5 shadow-lg"
          style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFDF8 100%)' }}
        >
          <div className="space-y-3.5">
            <div>
              <span className="mb-1.5 flex items-center gap-2 text-xs font-bold text-[#610138]">
                <Gem className="h-4 w-4 text-[#DDB66A]" />
                Purpose of Visit
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {PURPOSES.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setPurpose(item)}
                    className={`p-2.5 rounded-xl text-left text-xs font-semibold border transition-all ${
                      purpose === item
                        ? 'bg-[#610138] border-[#DDB66A] text-white shadow-sm'
                        : 'bg-[#FCFBF8] border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="mb-1.5 flex items-center gap-2 text-xs font-bold text-[#610138]">
                <MapPin className="h-4 w-4 text-[#DDB66A]" />
                Select Showroom
              </span>
              <div className="relative">
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-[#FCFBF8] px-3.5 pr-10 text-xs font-semibold text-slate-800 outline-none focus:border-[#610138]"
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

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="mb-1.5 flex items-center gap-2 text-xs font-bold text-[#610138]">
                  <Calendar className="h-4 w-4 text-[#DDB66A]" />
                  Preferred Date
                </span>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-[#FCFBF8] px-3 text-xs font-semibold text-slate-800 outline-none focus:border-[#610138]"
                />
              </div>

              <div>
                <span className="mb-1.5 flex items-center gap-2 text-xs font-bold text-[#610138]">
                  <Clock className="h-4 w-4 text-[#DDB66A]" />
                  Preferred Time
                </span>
                <div className="relative">
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-[#FCFBF8] px-3 pr-8 text-xs font-semibold text-slate-800 outline-none focus:border-[#610138]"
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

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="mb-1.5 flex items-center gap-2 text-xs font-bold text-[#610138]">
                  <User className="h-4 w-4 text-[#DDB66A]" />
                  Your Name
                </span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-[#FCFBF8] px-3 text-xs font-semibold text-slate-800 outline-none focus:border-[#610138]"
                />
              </div>

              <div>
                <span className="mb-1.5 flex items-center gap-2 text-xs font-bold text-[#610138]">
                  <Phone className="h-4 w-4 text-[#DDB66A]" />
                  Mobile Number
                </span>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 98765 43210"
                  type="tel"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-[#FCFBF8] px-3 text-xs font-semibold text-slate-800 outline-none focus:border-[#610138]"
                />
              </div>
            </div>

            <div className="pt-3">
              <a
                href={canSubmit ? `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}` : undefined}
                target="_blank"
                rel="noreferrer"
                className={`flex h-12 w-full items-center justify-center gap-2 rounded-xl text-xs font-black text-white shadow-lg transition-transform active:scale-[0.98] ${
                  canSubmit ? 'cursor-pointer' : 'opacity-60 pointer-events-none'
                }`}
                style={{
                  background: 'linear-gradient(135deg, #610138 0%, #370820 100%)',
                  border: '1px solid rgba(221, 182, 106, 0.65)',
                }}
              >
                <CheckCircle2 className="h-4 w-4 text-[#DDB66A]" />
                Confirm Consultation via WhatsApp
              </a>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  )
}
