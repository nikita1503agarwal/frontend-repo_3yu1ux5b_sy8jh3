import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import LeadForm from './components/LeadForm'
import AfterSubmit from './components/AfterSubmit'

function App() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Apple-like clean nav */}
      <Navbar />

      {/* Hero with quiet luxury vibe */}
      <Hero />

      {/* Lead intake section */}
      <section className="relative pb-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-start">
          <div className="">
            <h2 className="text-2xl md:text-3xl font-medium text-white/90" style={{ fontFamily: 'var(--font-display)' }}>Tell us about your goals</h2>
            <p className="mt-3 text-white/60 max-w-prose" style={{ fontFamily: 'var(--font-body)' }}>
              We’ll use your answers to tailor a plan and share it before the call.
            </p>
            <div className="mt-8 hidden lg:block text-white/50 text-sm">
              • Crisp type hierarchy • Gentle motion • Thoughtful spacing
            </div>
          </div>

          {!submitted ? (
            <LeadForm onSubmitted={() => setSubmitted(true)} />
          ) : (
            <AfterSubmit />
          )}
        </div>
      </section>

      <footer className="px-6 pb-10">
        <div className="max-w-7xl mx-auto text-center text-white/50 text-sm">
          © {new Date().getFullYear()} Studio. Built with intent.
        </div>
      </footer>
    </div>
  )
}

export default App
