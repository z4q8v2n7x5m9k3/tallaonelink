'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { shopConfig } from '../config'
import { getTelLink, getWhatsAppLink } from '../../../lib/phone'

/** Reusable premium card surface for each contact block (Mango "Get in Touch" treatment, blue) */
const CARD_BG = '#FFFDF8'
const CARD_BORDER = '1px solid rgba(221,182,106,.36)'
const CARD_SHADOW =
  '0 8px 20px rgba(47,16,31,.08)'

/** Reusable icon pill (white → blue gradient with blue border) – mirrors Mango's white→yellow pill */
const ICON_PILL_STYLE: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid rgba(221,182,106,.42)',
}

/** Reusable solid-blue CTA button class (mirrors Mango's bg-mango-green CTA) */
const CTA_CLASSES =
  'w-full h-10 text-white font-semibold rounded-xl border-0 shadow-md hover:opacity-95 transition-opacity'
const CTA_STYLE: React.CSSProperties = {
  background: '#610138',
}

export default function ContactCard() {
  const sectionRef = useRef<HTMLElement | null>(null)

  const openMap = () => {
    if (shopConfig.google?.isDemo) {
      window.alert('Demo Version — location directions are not connected.')
      return
    }
    window.open(
      `https://www.google.com/maps?q=${encodeURIComponent(shopConfig.contact.mapQuery)}`,
      '_blank',
    )
  }

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="veloura-contact mx-auto w-full max-w-md py-5 [font-family:var(--font-manrope)]"
    >
      <div
        className="rounded-[30px] border p-3.5 shadow-[0_16px_34px_rgba(0,0,0,.16)]"
        style={{
          background: '#610138',
          borderColor: 'rgba(221,182,106,.38)',
        }}
      >
        <div
          className="relative overflow-hidden rounded-[26px] p-3.5"
          style={{
            background: '#610138',
          }}
        >
          {/* Soft brand glow accents */}

          <div className="mb-5">
            <p className="[font-family:var(--font-manrope)] text-[9px] font-semibold uppercase tracking-[0.24em] text-[#E8C778]">Visit or connect</p>
            <h2 className="mt-1 [font-family:var(--font-manrope)] text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Get in Touch
            </h2>
          </div>

          <div className="space-y-4">
            {/* Phone — multi-person list with Call buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.05, duration: 0.3, ease: 'easeOut' }}
              className="rounded-[24px] p-4 hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              style={{ willChange: 'opacity', background: CARD_BG, border: CARD_BORDER, boxShadow: CARD_SHADOW }}
            >
              <div
                className="absolute inset-x-0 top-0 h-1/2 rounded-t-[24px] pointer-events-none opacity-60"
                style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%)' }}
              />
              <div className="flex items-start gap-3 mb-3 relative z-10">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={ICON_PILL_STYLE}>
                  <svg viewBox="0 0 24 24" className="w-5 h-5" style={{ color: '#7A2148' }} fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900 mb-2 text-base">Phone</h3>
                  <div className="space-y-2">
                    {shopConfig.contactPersons.map((person) => (
                      <div key={person.label} className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold text-slate-900">{person.label}</div>
                          <div className="text-xs text-slate-600">{person.phoneDisplay}</div>
                        </div>
                        <Button
                          onClick={() => (window.location.href = getTelLink(person.phoneE164))}
                          className="h-8 px-3 text-white text-xs font-semibold rounded-full border-0 shadow-md hover:opacity-95"
                          style={CTA_STYLE}
                        >
                          Call
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.08, duration: 0.3, ease: 'easeOut' }}
              className="rounded-[24px] p-4 relative overflow-hidden"
              style={{ background: CARD_BG, border: CARD_BORDER, boxShadow: CARD_SHADOW }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#DDB66A]/40 bg-white">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#610138]" fill="currentColor" aria-hidden><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </div>
                <div className="min-w-0 flex-1"><h3 className="text-base font-semibold text-slate-900">WhatsApp</h3><p className="text-sm text-slate-600">Appointments and service enquiries</p></div>
              </div>
              <Button onClick={() => window.open(getWhatsAppLink(shopConfig.contact.clientPhoneE164, shopConfig.whatsapp.defaultMessage), '_blank', 'noopener,noreferrer')} className="mt-3 h-10 w-full rounded-xl border border-[#DDB66A]/45 bg-[#610138] text-sm font-semibold text-white hover:bg-[#710242]">Chat on WhatsApp</Button>
            </motion.div>

            {/* LinkedIn */}
            {shopConfig.social?.linkedin && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: 0.1, duration: 0.3, ease: 'easeOut' }}
                className="rounded-[24px] p-4 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                style={{ willChange: 'opacity', background: CARD_BG, border: CARD_BORDER, boxShadow: CARD_SHADOW }}
              >
                <div
                  className="absolute inset-x-0 top-0 h-1/2 rounded-t-[24px] pointer-events-none opacity-60"
                  style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%)' }}
                />
                <div className="flex items-start gap-3 mb-3 relative z-10">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={ICON_PILL_STYLE}>
                    <svg viewBox="0 0 24 24" className="w-5 h-5" style={{ color: '#0A66C2' }} fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 mb-1.5 text-base">LinkedIn</h3>
                    <p className="text-sm text-slate-600 break-all">Get in touch on LinkedIn</p>
                  </div>
                </div>
                <Button
                  onClick={() => window.open(shopConfig.social.linkedin, '_blank', 'noopener,noreferrer')}
                  className={CTA_CLASSES}
                  style={CTA_STYLE}
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 mr-2 fill-current" aria-hidden>
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  Connect on LinkedIn
                </Button>
              </motion.div>
            )}

            {/* Enquiry */}
            {shopConfig.contact?.email && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: 0.12, duration: 0.3, ease: 'easeOut' }}
                className="rounded-[24px] p-4 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                style={{ willChange: 'opacity', background: CARD_BG, border: CARD_BORDER, boxShadow: CARD_SHADOW }}
              >
                <div
                  className="absolute inset-x-0 top-0 h-1/2 rounded-t-[24px] pointer-events-none opacity-60"
                  style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%)' }}
                />
                <div className="flex items-start gap-3 mb-3 relative z-10">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={ICON_PILL_STYLE}>
                    <svg viewBox="0 0 24 24" className="w-5 h-5" style={{ color: '#7A2148' }} fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 mb-1.5 text-base">Enquiry</h3>
                    <p className="text-sm text-slate-600 break-all">{shopConfig.contact.email}</p>
                  </div>
                </div>
                <Button asChild className={CTA_CLASSES} style={CTA_STYLE}>
                  <a
                    href={`mailto:${shopConfig.contact.email}?subject=${encodeURIComponent(
                      'Enquiry - Talla Jewellers',
                    )}&body=${encodeURIComponent(
                      'Hello,\n\nI would like to inquire about your services.\n\nPlease reply at your convenience.\n\nThank you.',
                    )}`}
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    Enquiry
                  </a>
                </Button>
              </motion.div>
            )}

            {/* Address with Map */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.15, duration: 0.3, ease: 'easeOut' }}
              className="rounded-[24px] overflow-hidden hover:shadow-xl transition-all duration-300 relative"
              style={{ willChange: 'opacity', background: CARD_BG, border: CARD_BORDER, boxShadow: CARD_SHADOW }}
            >
              <div
                className="absolute inset-x-0 top-0 h-20 rounded-t-[24px] pointer-events-none opacity-60 z-10"
                style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%)' }}
              />
              <div className="p-4 relative z-10">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={ICON_PILL_STYLE}>
                    <svg viewBox="0 0 24 24" className="w-5 h-5" style={{ color: '#7A2148' }} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 mb-1.5 text-base">Location</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-3">
                      {shopConfig.contact.address}
                    </p>
                    {shopConfig.google?.isDemo ? <p className="-mt-2 mb-3 text-xs font-semibold text-slate-500">Demo Version</p> : null}
                  </div>
                </div>
                <Button onClick={openMap} className={CTA_CLASSES} style={CTA_STYLE}>
                  <MapPin className="w-4 h-4 mr-2 text-white" />
                  Open in Maps
                </Button>
              </div>

              {/* Embedded Map */}
              <div className="h-48 bg-slate-800/50 backdrop-blur-sm">
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(shopConfig.contact.mapQuery)}&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </motion.div>


          </div>
        </div>
      </div>
    </motion.section>
  )
}
