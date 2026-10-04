export const dynamic = 'force-static';

import dynamicImport from "next/dynamic"
import Image from "next/image"
import Navbar from "@/components/Navbar"
import About from "@/components/About"
import Skills from "@/components/Skills"

import Contact from "@/components/Contact"

const LightRaysBackground = dynamicImport(() => import("@/components/LightRaysBackground"), { 
    loading: () => <div className="absolute inset-0 bg-black" />
})

const Projects = dynamicImport(() => import("@/components/Projects"), { 
    loading: () => <div className="w-full h-[500px] flex items-center justify-center text-white/50">Loading Projects...</div>
})

export default function Page() {
  return (
    <main className="bg-black w-full min-h-screen font-sans">
      {/* HERO SECTION */}
      {/* Reduced height on mobile to 65vh, anchored content to the bottom using flex-col justify-end so the image touches the navbar */}
      <section className="relative h-[65vh] md:h-screen w-full flex flex-col items-center justify-end overflow-hidden">
        {/* FIX 3: Explicitly passed beamDensity={60} */}
        <LightRaysBackground beamDensity={60} />
        
        <div className="relative z-10 text-center pointer-events-none w-full max-w-4xl px-4">
          {/* Added object-bottom to class so the image anchors perfectly to the bottom of its container */}
          <Image 
            className="w-full h-auto object-contain object-bottom mx-auto drop-shadow-2xl opacity-90" 
            src="/profile%20picture.png" 
            alt="heroimage" 
            width={1200} 
            height={1200}
            priority
          />
        </div>
      </section>

      {/* NAVBAR */}
      {/* Adjusted padding for mobile nav container */}
      <div className="w-full sticky top-0 z-50 bg-black/70 backdrop-blur-md border-b border-white/10 py-3 md:py-4 px-4 md:px-8 will-change-transform [transform:translateZ(0)]">
        <div className="max-w-7xl mx-auto">
          <Navbar/>
        </div>
      </div>
      <div>
        <About/>

      </div>
      <div>
        <Skills/>
      </div>

      <div>
        <Projects/>
      </div>
      
      <div>
        <Contact/>
      </div>

      {/* FOOTER */}
      {/* Adjusted padding and added text-center on mobile */}
      <footer className="w-full py-8 md:py-12 border-t border-white/10 mt-10 flex items-center justify-center relative z-20 px-4 text-center">
        <p className="text-zinc-600 text-xs md:text-sm tracking-widest uppercase font-medium">
          &copy; {new Date().getFullYear()} Navaneeth Dev G. All rights reserved.
        </p>
      </footer>
    </main>
  )
}