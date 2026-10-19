export default function Loading() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: '#111011' }}
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-[#DDB66A]"
        aria-hidden
      />
      <p className="mt-4 text-[10px] font-semibold uppercase tracking-[.24em]" style={{ color: '#DDB66A' }}>
        Talla Jewellers
      </p>
    </div>
  )
}
