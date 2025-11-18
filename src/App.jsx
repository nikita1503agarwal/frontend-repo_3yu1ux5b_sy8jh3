import { useState } from 'react'

function App() {
  const [form, setForm] = useState({
    industry: '',
    leads_per_month: '',
    bottleneck: '',
    budget: '',
    timeline: '',
  })
  const [status, setStatus] = useState({ loading: false, success: false, error: '' })

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const bookingUrl = import.meta.env.VITE_BOOKING_URL || 'https://calendly.com/'

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, success: false, error: '' })
    try {
      const res = await fetch(`${backend}/api/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || 'Failed to submit')
      }
      setStatus({ loading: false, success: true, error: '' })
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message || 'Something went wrong' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-[60rem] h-[60rem] bg-blue-600/10 rounded-full blur-3xl absolute -top-40 -left-40" />
        <div className="w-[50rem] h-[50rem] bg-cyan-500/10 rounded-full blur-3xl absolute bottom-0 right-0" />
      </div>

      <header className="relative px-6 py-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-400/30 grid place-items-center">
              <span className="text-blue-300 font-bold">AI</span>
            </div>
            <span className="text-lg font-semibold text-blue-100">Growth Call</span>
          </div>
        </div>
      </header>

      <main className="relative px-6 pb-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
          <section>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              Unlock predictable growth with AI and automation
            </h1>
            <p className="mt-4 text-blue-200/80 text-lg">
              Tell me about your business and current lead flow. I’ll review and share the exact system I’d build to fix your bottlenecks before we hop on a call.
            </p>

            <ul className="mt-8 space-y-3 text-blue-200/80">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                Faster qualification and follow-up
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-sky-400" />
                Automations that book more meetings
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-violet-400" />
                Built to your budget and timeline
              </li>
            </ul>
          </section>

          <section className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
            {!status.success ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm text-blue-200 mb-2">What industry are you in?</label>
                  <input
                    type="text"
                    name="industry"
                    value={form.industry}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Real estate, SaaS, E-commerce"
                    className="w-full rounded-lg bg-slate-800/60 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-blue-200 mb-2">How many leads are you getting per month?</label>
                  <input
                    type="text"
                    name="leads_per_month"
                    value={form.leads_per_month}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 50-100, around 200, very few"
                    className="w-full rounded-lg bg-slate-800/60 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-blue-200 mb-2">What's the main bottleneck?</label>
                  <textarea
                    name="bottleneck"
                    value={form.bottleneck}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder="Is it follow-up, lead qualification, routing, data capture, or something else?"
                    className="w-full rounded-lg bg-slate-800/60 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                  />
                </div>

                <div>
                  <label className="block text-sm text-blue-200 mb-2">What are you ready to invest if I provide the exact solution?</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {['$1,500', '$3,000', 'Discuss first'].map((opt) => (
                      <label key={opt} className={`cursor-pointer rounded-lg border px-4 py-3 text-center transition ${form.budget === opt ? 'border-blue-500 bg-blue-500/10' : 'border-white/10 hover:border-blue-500/50'}`}>
                        <input
                          type="radio"
                          name="budget"
                          value={opt}
                          checked={form.budget === opt}
                          onChange={handleChange}
                          className="hidden"
                          required
                        />
                        <span className="text-sm">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-blue-200 mb-2">When do you need the solution ready?</label>
                  <select
                    name="timeline"
                    value={form.timeline}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg bg-slate-800/60 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled>Select a timeline</option>
                    <option>ASAP (this week)</option>
                    <option>Within 2 weeks</option>
                    <option>Within a month</option>
                    <option>Just exploring options</option>
                  </select>
                </div>

                {status.error && (
                  <div className="text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3">
                    {status.error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-4 py-3 rounded-lg shadow-lg shadow-blue-600/20 transition"
                >
                  {status.loading ? 'Submitting...' : 'Submit and continue'}
                </button>
                <p className="text-xs text-blue-300/70 text-center">No spam. This just helps me prep for our call.</p>
              </form>
            ) : (
              <div className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400/40 grid place-items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-7 h-7 text-emerald-300"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.5 12.75l6 6 9-13.5"/></svg>
                </div>
                <h3 className="mt-4 text-2xl font-bold">Thanks — I got your details!</h3>
                <p className="mt-2 text-blue-200/80">Next, grab a time that works for you. I’ll review your answers and come prepared with a plan.</p>

                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-5 py-3 rounded-lg shadow-lg shadow-emerald-600/20 transition"
                >
                  Book your call
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 4.5H19.5M19.5 4.5V10.5M19.5 4.5L12 12M6 6h.01M6 12h.01M6 18h.01M12 6h.01M12 12h.01M12 18h.01M18 6h.01M18 12h.01M18 18h.01"/></svg>
                </a>

                <a href="/test" className="mt-4 block text-sm text-blue-300 hover:text-blue-200 underline">Check backend & database status</a>
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="relative px-6 pb-10">
        <div className="max-w-6xl mx-auto text-center text-blue-300/70 text-sm">
          Built with AI + automation in mind
        </div>
      </footer>
    </div>
  )
}

export default App
