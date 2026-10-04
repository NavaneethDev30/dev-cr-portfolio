"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="
        fixed top-0 left-0 z-50
        w-full h-16
        bg-white/10
        backdrop-blur-md
        border-b border-white/20
        px-6 md:px-8
      "
    >
      <div className="max-w-7xl mx-auto h-full flex justify-between items-center text-white">

        <a href="/" className="flex items-center gap-3">
          <Image
            src="/pp.png"
            alt="profile-pic"
            width={30}
            height={30}
            className="rounded-full"
          />
          <span className="text-xl font-bold italic whitespace-nowrap">
            Navaneeth Dev G
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          <a href="#">Home</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>

        {/* Desktop Button */}
        <a href="https://dev-cr-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="hidden md:block">
          <button className="px-6 py-3 border border-white/20 rounded-xl hover:bg-white/10 transition">
            Personal
          </button>
        </a>

        {/* Mobile Hamburger Icon */}
        <button 
          className="md:hidden text-white hover:text-cyan-400 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/20 p-8 flex flex-col gap-6 items-center text-white shadow-2xl">
          <a href="#" onClick={() => setIsOpen(false)} className="text-xl hover:text-cyan-400 transition">Home</a>
          <a href="#skills" onClick={() => setIsOpen(false)} className="text-xl hover:text-cyan-400 transition">Skills</a>
          <a href="#projects" onClick={() => setIsOpen(false)} className="text-xl hover:text-cyan-400 transition">Projects</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="text-xl hover:text-cyan-400 transition">Contact</a>
          <a 
            href="https://dev-cr-portfolio.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
          >
            <button className="px-8 py-3 border border-white/20 rounded-xl mt-4 hover:bg-white/10 transition">
              Personal
            </button>
          </a>
        </div>
      )}
    </nav>
  );
}

export default NavBar;