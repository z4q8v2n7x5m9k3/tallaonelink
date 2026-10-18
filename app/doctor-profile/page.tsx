'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Award, Calendar, CheckCircle2, MapPin, Sparkles } from 'lucide-react'

import { prepareReturnToHeroCard } from '../lib/homeNavigation'

const credentials = ['Demo Studio', 'Luxury Salon', 'Demo City']

const expertise = [
  'Hair & Styling',
  'Hair Colour & Care',
  'Beauty & Skin Care',
  'Bridal & Occasion Makeup',
  'Nails & Hand Care',
  'Hair Systems & Wigs',
]

export default function DoctorProfilePage() {
  return (
    <main
      className="min-h-screen px-3 pb-10 pt-[max(0.75rem,env(safe-area-inset-top))]"
      style={{ background: '#f8fafc' }}
    >
      <div className="mx-auto w-full max-w-md">
        <header
          className="mb-5 overflow-hidden rounded-[28px] border border-[rgba(10,102,178,0.18)] p-4 shadow-[0_26px_60px_rgba(0,0,0,0.1),0_10px_26px_rgba(15,23,42,0.05),inset_0_1px_0_rgba(255,255,255,0.96)]"
          style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, #ffffff 54%, #eef7ff 100%)' }}
        >
          <div className="relative flex items-center justify-between">
            <Link
              href="/"
              onClick={() => prepareReturnToHeroCard()}
              className="z-10 inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-white/90 px-3 text-sm font-black text-[#7A2148] shadow-[0_10px_22px_rgba(0,0,0,0.1)] ring-1 ring-black/5 backdrop-blur-md transition-transform active:scale-95"
              aria-label="Back"
            >
              <ArrowLeft className="h-5 w-5" />
              Back
            </Link>
            <h1 className="absolute left-0 right-0 px-20 text-center text-[1.18rem] font-black leading-tight tracking-tight text-slate-900">
              Salon Profile
            </h1>
            <span className="z-10 h-10 w-12" aria-hidden />
          </div>
        </header>

        <section className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_18px_44px_rgba(7,59,115,0.12)]">
          <div className="relative h-[320px] overflow-hidden">
            <Image
              src="/femina/beauty.jpg"
              alt="Veloura Salon demo studio"
              fill
              sizes="(max-width: 480px) 100vw, 430px"
              className="object-cover"
              style={{ objectPosition: 'center 18%' }}
              priority
              unoptimized
            />
            <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-white via-white/86 to-transparent" />
          </div>

          <div className="-mt-16 relative z-10 px-5 pb-5">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#2BA24C]">
              Veloura Salon Demo Studio
            </p>
            <h2 className="mt-1 text-[1.8rem] font-black leading-tight tracking-tight text-[#B32A64]">
              Veloura Salon
            </h2>
            <p className="mt-1 text-sm font-bold leading-snug text-slate-700">
              Luxury Hair, Beauty, Makeup & Nail Services
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {credentials.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#B32A64]/14 bg-[#FFF1F6] px-3 py-1.5 text-[11px] font-black tracking-wide text-[#B32A64]"
                >
                  {item}
                </span>
              ))}
            </div>

            <div
              className="mt-4 rounded-[22px] border p-4 shadow-[0_10px_24px_rgba(7,59,115,0.08)]"
              style={{
                background: 'linear-gradient(135deg, rgba(234,243,255,0.98) 0%, rgba(255,255,255,0.96) 100%)',
                borderColor: '#F3C7D8',
              }}
            >
              <p className="text-[13px] font-semibold leading-5 text-slate-700">
                A trusted salon destination for personalised hair, beauty, makeup, nails and hair-system services, with complimentary consultation for every appointment.
              </p>
            </div>

            <div className="mt-4 grid grid-cols-3 overflow-hidden rounded-[20px] border border-[#F3C7D8] bg-white shadow-[0_10px_26px_rgba(7,59,115,0.08)]">
              {[
                { icon: Award, title: 'Since 1986', label: 'Experience', color: '#B32A64' },
                { icon: MapPin, title: '5 Branches', label: 'North India', color: '#B32A64' },
                { icon: Sparkles, title: 'Luxury', label: 'Salon Care', color: '#B32A64' },
              ].map(({ icon: Icon, title, label, color }, index) => (
                <div
                  key={title}
                  className={`flex min-w-0 flex-col items-center px-2 py-3 text-center ${index > 0 ? 'border-l border-[#F3C7D8]' : ''}`}
                >
                  <span className="mb-1.5 flex h-9 w-9 items-center justify-center rounded-full" style={{ background: `${color}14`, color }}>
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <span className="text-[12px] font-black leading-tight text-slate-900">{title}</span>
                  <span className="text-[10.5px] font-semibold leading-tight text-slate-500">{label}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {expertise.map((item, index) => (
                <span
                  key={item}
                  className="rounded-2xl border px-2.5 py-2 text-center text-[11px] font-black leading-tight text-slate-800"
                  style={{
                    background: index % 2 === 0 ? 'rgba(43,162,76,0.07)' : 'rgba(10,102,178,0.07)',
                    borderColor: '#F3C7D8',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-4 rounded-[20px] border border-[#F3C7D8] bg-white p-3.5">
              {[
                'Accurate diagnosis is the foundation of effective healthcare.',
                'Modern imaging support with ethical medical practice.',
                'Clear radiology reporting for timely treatment decisions.',
              ].map((item) => (
                <div key={item} className="flex gap-2 py-1 text-[12.5px] font-semibold leading-5 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2BA24C]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <Link
              href="/book-consultation"
              className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-[18px] text-sm font-black text-white shadow-[0_14px_30px_rgba(10,102,178,0.24)] transition-transform active:scale-[0.98]"
              style={{ background: 'linear-gradient(135deg, #B32A64 0%, #932653 100%)' }}
            >
              <Calendar className="h-4 w-4" />
              Book Appointment
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
