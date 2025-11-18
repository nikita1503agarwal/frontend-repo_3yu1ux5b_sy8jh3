import React from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-20%] h-[70vmin] w-[70vmin] -translate-x-1/2 rounded-full bg-white/[0.06] blur-[80px]" />
        <div className="absolute right-[-10%] bottom-[-20%] h-[50vmin] w-[50vmin] rounded-full bg-white/[0.04] blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white/95"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Design that feels effortless.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mx-auto mt-6 max-w-2xl text-center text-white/70 text-lg md:text-xl"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          We build conversion-obsessed sites with a premium, quiet aesthetic. Answer a few questions and book a time—no fluff.
        </motion.p>
      </div>
    </section>
  )
}
