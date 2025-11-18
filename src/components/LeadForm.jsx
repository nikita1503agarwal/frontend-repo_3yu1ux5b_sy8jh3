import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

export default function LeadForm({ onSubmitted }) {
  const [form, setForm] = useState({
    industry: '',
    leads_per_month: '',
    bottleneck: '',
    budget: '',
    timeline: '',
  })
  const [status, setStatus] = useState({ loading: false, error: '' })

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, error: '' })
    try {
      const res = await fetch(`${backend}/api/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error(await res.text())
      onSubmitted?.()
    } catch (err) {
      setStatus({ loading: false, error: err.message || 'Failed to submit' })
      return
    }
    setStatus({ loading: false, error: '' })
  }

  // Subtle reactive 3D card that tilts as you type/move
  const cardRef = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useTransform(my, [0, 1], [8, -8])
  const ry = useTransform(mx, [0, 1], [-8, 8])

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      mx.set(x)
      my.set(y)
    }
    el.addEventListener('pointermove', onMove)
    return () => el.removeEventListener('pointermove', onMove)
  }, [mx, my])

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
      className="[transform:perspective(1000px)] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl will-change-transform"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <label className="block text-sm text-white/70 mb-2">Industry</label>
            <input name="industry" value={form.industry} onChange={handleChange} required placeholder="e.g., Real estate, SaaS" className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-white/30" />
          </div>

          <div>
            <label className="block text-sm text-white/70 mb-2">Leads per month</label>
            <input name="leads_per_month" value={form.leads_per_month} onChange={handleChange} required placeholder="e.g., 50-100" className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-white/30" />
          </div>

          <div>
            <label className="block text-sm text-white/70 mb-2">Main bottleneck</label>
            <textarea name="bottleneck" value={form.bottleneck} onChange={handleChange} required rows={3} placeholder="Follow-up, qualification, routing, etc." className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-white/30 resize-y" />
          </div>

          <div>
            <label className="block text-sm text-white/70 mb-2">Budget</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {['$1,500', '$3,000', 'Discuss first'].map((opt) => (
                <label key={opt} className={`cursor-pointer rounded-xl border px-4 py-3 text-center transition ${form.budget === opt ? 'border-white/40 bg-white/10' : 'border-white/10 hover:border-white/30'}`}>
                  <input type="radio" name="budget" value={opt} checked={form.budget === opt} onChange={handleChange} className="hidden" required />
                  <span className="text-sm text-white/80">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-white/70 mb-2">Timeline</label>
            <select name="timeline" value={form.timeline} onChange={handleChange} required className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-white/30">
              <option value="" disabled>Select a timeline</option>
              <option>ASAP (this week)</option>
              <option>Within 2 weeks</option>
              <option>Within a month</option>
              <option>Just exploring options</option>
            </select>
          </div>
        </div>

        {status.error && (
          <div className="text-red-300 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
            {status.error}
          </div>
        )}

        <button type="submit" disabled={status.loading} className="w-full bg-white text-black font-medium rounded-xl px-4 py-3 hover:bg-white/90 disabled:opacity-60 transition">{status.loading ? 'Submitting…' : 'Continue'}</button>
      </form>
    </motion.div>
  )
}
