import React from 'react'

export default function AfterSubmit() {
  const bookingUrl = import.meta.env.VITE_BOOKING_URL || 'https://calendly.com/'
  return (
    <div className="text-center">
      <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400/40 grid place-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-7 h-7 text-emerald-300"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.5 12.75l6 6 9-13.5"/></svg>
      </div>
      <h3 className="mt-4 text-2xl font-semibold text-white/95" style={{ fontFamily: 'var(--font-display)' }}>Thanks—got your details!</h3>
      <p className="mt-2 text-white/70">Grab a time that works for you. I’ll review your answers and come prepared with a plan.</p>
      <a href={bookingUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center justify-center gap-2 bg-white text-black font-medium px-5 py-3 rounded-xl hover:bg-white/90 transition">
        Book your call
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 4.5H19.5M19.5 4.5V10.5M19.5 4.5L12 12"/></svg>
      </a>
      <a href="/test" className="mt-4 block text-sm text-white/60 underline">Check backend & database status</a>
    </div>
  )
}
