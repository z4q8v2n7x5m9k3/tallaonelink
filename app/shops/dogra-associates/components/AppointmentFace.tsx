'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar as CalendarIcon, CheckCircle2 } from 'lucide-react'
import { shopConfig } from '../config'
import { playClickSound } from '../../../lib/playClickSound'

interface AppointmentFaceProps {
  onBack: () => void
}

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

export default function AppointmentFace({ onBack }: AppointmentFaceProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [purpose, setPurpose] = useState(PURPOSES[0])
  const [branch, setBranch] = useState(shopConfig.branches[0]?.name || 'Talla Jewellers — Gandhi Nagar')
  const [date, setDate] = useState(() => {
    const d = new Date()
    return d.toISOString().split('T')[0]
  })
  const [time, setTime] = useState(TIME_SLOTS[0])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    playClickSound()
    const msg = `Hi Talla Jewellers,

I would like to book a Private Jewellery Consultation.

• Purpose: ${purpose}
• Showroom: ${branch}
• Date: ${date}
• Time: ${time}
• Name: ${name.trim() || 'Valued Customer'}
• Phone: ${phone.trim() || 'Provided on WhatsApp'}

Please confirm availability.`

    const defaultPhone = shopConfig.contact.clientPhoneE164 || '919000000000'
    window.open(`https://wa.me/${defaultPhone}?text=${encodeURIComponent(msg)}`, '_blank')
    onBack()
  }

  return (
    <div
      className="absolute inset-0 rounded-[24px] overflow-hidden flex flex-col text-white"
      style={{
        background: 'linear-gradient(155deg, #1C111A 0%, #2A1525 45%, #610138 100%)',
        padding: 22,
        minHeight: '580px',
        boxSizing: 'border-box',
        boxShadow: 'inset 0 1px 0 rgba(221,182,106,0.3), 0 4px 20px rgba(0,0,0,0.5)',
      }}
    >
      <div className="flex-1 overflow-y-auto pr-1">
        <div className="flex items-center justify-between mb-3">
          <button
            type="button"
            onClick={() => {
              playClickSound()
              onBack()
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-[#DDB66A] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Card
          </button>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#DDB66A]/80">
            Talla Jewellers
          </span>
        </div>

        <h2 className="font-extrabold text-xl text-white mb-0.5">
          Book Jewellery Consultation
        </h2>
        <p className="text-xs text-white/70 mb-4">
          Experience private bridal & diamond curation
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Purpose of visit */}
          <div>
            <label className="block text-xs font-bold text-white/90 mb-1">
              Purpose of visit
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {PURPOSES.map((item) => {
                const isSel = purpose === item
                return (
                  <button
                    type="button"
                    key={item}
                    onClick={() => setPurpose(item)}
                    className={`p-2 rounded-xl text-left text-[11px] font-semibold transition-all border ${
                      isSel
                        ? 'bg-[#610138] border-[#DDB66A] text-white shadow-sm'
                        : 'bg-[#231821] border-[#370820] text-white/75 hover:bg-[#2e1d2c]'
                    }`}
                  >
                    {item}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Showroom */}
          <div>
            <label className="block text-xs font-bold text-white/90 mb-1">
              Select showroom
            </label>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full rounded-xl border border-[#370820] bg-[#231821] px-3 py-2.5 text-xs font-medium text-white focus:border-[#DDB66A] focus:outline-none"
            >
              {shopConfig.branches.map((b) => (
                <option key={b.name} value={b.name} className="bg-[#1C111A] text-white">
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-bold text-white/90 mb-1">
                Preferred date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl border border-[#370820] bg-[#231821] px-3 py-2 text-xs font-medium text-white focus:border-[#DDB66A] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-white/90 mb-1">
                Preferred time
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full rounded-xl border border-[#370820] bg-[#231821] px-3 py-2 text-xs font-medium text-white focus:border-[#DDB66A] focus:outline-none"
              >
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot} className="bg-[#1C111A] text-white">
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Name & Phone */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-bold text-white/90 mb-1">
                Your Name
              </label>
              <input
                type="text"
                placeholder="e.g. Priya Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-[#370820] bg-[#231821] px-3 py-2 text-xs font-medium text-white placeholder:text-white/40 focus:border-[#DDB66A] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-white/90 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="e.g. 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-[#370820] bg-[#231821] px-3 py-2 text-xs font-medium text-white placeholder:text-white/40 focus:border-[#DDB66A] focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xs font-black text-white shadow-lg transition-transform active:scale-[0.98] cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #610138 0%, #370820 100%)',
                border: '1px solid rgba(221, 182, 106, 0.65)',
              }}
            >
              <CheckCircle2 className="h-4 w-4 text-[#DDB66A]" />
              <span>Confirm Consultation via WhatsApp</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
