import React from 'react'

export default function Navbar() {
  return (
    <div className="relative z-20 w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3 select-none">
          <div className="h-7 w-7 rounded-md bg-white/5 ring-1 ring-white/15 grid place-items-center">
            <span className="text-white/90 text-sm font-semibold">⌁</span>
          </div>
          <span className="text-white/90 text-sm tracking-wide">Studio</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/70">
          <a href="#about" className="hover:text-white/90 transition-colors">About</a>
          <a href="#work" className="hover:text-white/90 transition-colors">Work</a>
          <a href="#contact" className="hover:text-white/90 transition-colors">Contact</a>
        </div>
      </div>
    </div>
  )
}
