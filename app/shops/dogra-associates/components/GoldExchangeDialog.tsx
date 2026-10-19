'use client'

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { X, ArrowRight } from 'lucide-react'

export default function GoldExchangeDialog({ onClose, onBook }: { onClose: () => void; onBook: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    modalRef.current?.showModal()
    dialogRef.current?.focus()
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'Tab') {
        const controls = dialogRef.current?.querySelectorAll<HTMLElement>('button, a[href]')
        if (!controls?.length) return
        const first = controls[0], last = controls[controls.length - 1]
        if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', key)
    return () => { document.removeEventListener('keydown', key); previous?.focus() }
  }, [onClose])
  return createPortal(<dialog ref={modalRef} onCancel={onClose} className="m-0 h-[100dvh] max-h-none w-screen max-w-none border-0 bg-transparent p-0 backdrop:bg-transparent">
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .22, ease: 'easeOut' }} className="fixed inset-0 z-[100000] flex items-center justify-center bg-[#160D13]/62 p-4 backdrop-blur-[6px]" onClick={onClose}>
      <motion.div initial={{ opacity: 0, y: 18, scale: .99 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .32, ease: [0.22,1,0.36,1] }} ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="gold-exchange-title" onClick={e=>e.stopPropagation()} className="relative max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-[28px] border border-[#E2C885]/65 bg-[#FFFDF9] text-[#32101F] shadow-[0_28px_70px_rgba(22,13,19,.34)] outline-none [font-family:var(--font-poppins)]">
        <div className="relative overflow-hidden rounded-t-[27px] bg-[#610138] px-5 pb-5 pt-4 text-white">
          <Image src="/talla/kriyon/fine-110.webp" alt="" fill className="object-cover object-[70%_40%] opacity-[.24]" sizes="448px" />
          <span className="absolute inset-0 bg-[linear-gradient(90deg,rgba(64,3,36,.98)_0%,rgba(97,1,56,.90)_58%,rgba(97,1,56,.48)_100%)]" />
          <div className="absolute -right-9 -top-10 h-36 w-36 opacity-[.14]"><Image src="/talla/talla-emblem.png" alt="" fill className="object-contain" /></div>
          <button type="button" onClick={onClose} aria-label="Close Gold Exchange" className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-[#E8CA85]/60 bg-[#7B174D] text-[#F2D58F] shadow-[0_7px_18px_rgba(0,0,0,.2)] transition hover:bg-[#8B1B59]"><X className="h-[17px] w-[17px]" strokeWidth={1.8} /></button>
          <span className="relative block h-12 w-12 overflow-hidden rounded-full border border-[#E8CA85]/60 bg-[#650039] shadow-md"><Image src="/talla/elegant-gold-t-emblem.png" alt="Talla Jewellers" fill className="scale-[1.78] object-cover" sizes="48px" /></span>
          <p className="relative mt-4 text-[9px] font-bold uppercase tracking-[.27em] text-[#E8CA85]">Talla Gold Exchange</p>
          <h2 id="gold-exchange-title" className="relative mt-1.5 max-w-[320px] text-[25px] font-extrabold leading-[1.12] tracking-[-.025em]">Exchange Your Gold, Beautifully</h2>
          <p className="relative mt-3 max-w-[325px] text-[11.5px] font-medium leading-[1.7] text-white/82">A private, transparent assessment of your gold, with personal guidance for choosing the Talla jewel that comes next.</p>
        </div>
        <div className="p-5">
          <div className="space-y-2.5">
            {[{ icon: '/talla/gold-exchange/valuation.svg', title: 'Transparent valuation', text: 'Understand the assessment clearly before making your decision.' }, { icon: '/talla/gold-exchange/purity.svg', title: 'Careful purity check', text: 'Your jewellery is evaluated professionally at the showroom.' }, { icon: '/talla/gold-exchange/new-jewellery.svg', title: 'Personal selection', text: 'Receive dedicated help choosing your next Talla jewel.' }].map(({icon,title,text})=><div key={title} className="flex w-full items-center gap-3.5 rounded-[18px] border border-[#E8DFD3] bg-white px-3.5 py-3.5 shadow-[0_7px_18px_rgba(67,31,47,.06)]"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-[13px] border border-[#E6D5BC] bg-[#F8F1E5]"><Image src={icon} alt="" width={20} height={20} className="h-5 w-5 opacity-80 [filter:sepia(1)_saturate(1.7)_hue-rotate(350deg)]" /></span><div className="min-w-0"><h3 className="text-[12.5px] font-extrabold tracking-[-.01em]">{title}</h3><p className="mt-1 text-[10.5px] font-medium leading-[1.55] text-[#78666F]">{text}</p></div></div>)}
          </div>
          <button type="button" onClick={onBook} className="mt-4 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl border border-[#DDB66A]/55 bg-[#610138] px-3 text-[12.5px] font-extrabold text-white shadow-[0_12px_24px_rgba(97,1,56,.24)] transition active:scale-[.99]">Book a Gold Exchange Visit<ArrowRight className="h-4 w-4 text-[#E8CA85]" /></button>
          <p className="mt-3 text-center text-[9px] font-medium leading-4 text-[#998791]">Final valuation and exchange terms are confirmed at the showroom.</p>
        </div>
      </motion.div>
    </motion.div>
  </dialog>, document.body)
}
