'use client';
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  // Added state for mobile hamburger menu
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="text-white w-full">
      {/* Changed to flex-between on mobile, 3-col grid on md+ */}
      <div className="flex items-center justify-between md:grid md:grid-cols-3 w-full">
        
        {/* Logo */}
        <div className="flex">
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity z-50 relative">
            <Image src="/pp.png" alt="profil-pic" width={32} height={32} className="rounded-full object-cover"></Image>
            {/* Reduced text size on mobile */}
            <p className="font-bold text-sm sm:text-base">Navaneeth Dev G</p>
          </a>
        </div>
        
        {/* Desktop Links (Hidden on mobile) */}
        <div className="hidden md:flex items-center justify-center">
          <ol className="flex gap-4 lg:gap-8 text-xs lg:text-sm uppercase tracking-widest text-white/60">
            <a href="#about"><li className="hover:text-white cursor-pointer transition-colors">About</li></a>
            <a href="#skills"><li className="hover:text-white cursor-pointer transition-colors">Skills</li></a>
            <a href="#projects"><li className="hover:text-white cursor-pointer transition-colors">Projects</li></a>
            <a href="#contact"><li className="hover:text-white cursor-pointer transition-colors">Contact</li></a>
          </ol>
        </div>

        {/* Desktop Button & Mobile Toggle */}
        <div className="flex justify-end items-center gap-4 z-50 relative">
          {/* Hidden on very small screens, visible on sm+ */}
          <a href="https://navaneethdev-portfolio-dev.vercel.app/" className="hidden sm:block">
            <p className="text-xs sm:text-sm tracking-widest uppercase border border-white/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-sm hover:bg-white/10 transition-colors cursor-pointer whitespace-nowrap">
              Begin Nerd
            </p>
          </a>
          
          {/* Hamburger Icon (Visible only below md) */}
          <button 
            className="md:hidden flex flex-col gap-1.5 p-2 focus:outline-none" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className={`w-6 h-0.5 bg-white transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-white transition-all ${isOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-black/95 border-b border-white/10 backdrop-blur-xl transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-64 border-b' : 'max-h-0 border-transparent'}`}>
        <div className="flex flex-col items-center py-6 gap-6 text-sm uppercase tracking-widest text-white/80">
          <a href="#about" onClick={() => setIsOpen(false)} className="hover:text-white">About</a>
          <a href="#skills" onClick={() => setIsOpen(false)} className="hover:text-white">Skills</a>
          <a href="#projects" onClick={() => setIsOpen(false)} className="hover:text-white">Projects</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="hover:text-white">Contact</a>
          <a href="https://navaneethdev-portfolio-dev.vercel.app/" onClick={() => setIsOpen(false)} className="sm:hidden text-cyan-400 mt-2 font-bold">Begin Nerd</a>
        </div>
      </div>
    </div>
  )
}

export default Navbar