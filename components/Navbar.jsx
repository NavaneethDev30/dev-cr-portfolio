import Link from "next/link"
import Image from "next/image"
const Navbar = () => {
  return (
    <div className="text-white w-full">
      <div className="grid grid-cols-3 items-center w-full">
        <div className="flex">
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image src="/pp.png" alt="profil-pic" width={32} height={32} className="rounded-full object-cover"></Image>
            <p className="font-bold">Navaneeth Dev G</p>
          </a>
        </div>
        
        <div className="flex items-center justify-center">
          <ol className="flex gap-8 text-sm uppercase tracking-widest text-white/60">
          <a href="#about">
            <li className="hover:text-white cursor-pointer transition-colors">About</li>
          </a>
          <a href="#skills">
            <li className="hover:text-white cursor-pointer transition-colors">Skills</li>
          </a>
          <a href="#projects">
            <li className="hover:text-white cursor-pointer transition-colors">Projects</li>
          </a>
          <a href="#contact">
            <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
          </a>
          </ol>
        </div>

        <div className="flex justify-end items-center">
          <a href="https://navaneethdev-portfolio-dev.vercel.app/">
            <p className="text-sm tracking-widest uppercase border border-white/20 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/10 transition-colors cursor-pointer">
              Begin Nerd
            </p>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Navbar