import dynamic from "next/dynamic"
import Image from "next/image"
import Navbar from "@/components/Navbar"
import About from "@/components/About"
import Skills from "@/components/Skills"
import Projects from "@/components/Projects"
import Contact from "@/components/Contact"

const LightRaysBackground = dynamic(() => import("@/components/LightRaysBackground"), { 
    loading: () => <div className="absolute inset-0 bg-black" />
})

export default function Page() {
  return (
    <main className="bg-black w-full min-h-screen font-sans">
      {/* HERO SECTION */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <LightRaysBackground />
        
        <div className="relative z-10 text-center pointer-events-none w-full max-w-4xl px-4">
          <Image 
            className="w-full h-auto object-contain mx-auto drop-shadow-2xl opacity-90" 
            src="/profile%20picture.png" 
            alt="heroimage" 
            width={1200} 
            height={1200}
            priority
          />
        </div>
      </section>

      {/* NAVBAR */}
      <div className="w-full sticky top-0 z-50 bg-black/70 backdrop-blur-md border-b border-white/10 py-4 px-4 sm:px-8 will-change-transform [transform:translateZ(0)]">
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
      <footer className="w-full py-12 border-t border-white/10 mt-10 flex items-center justify-center relative z-20">
        <p className="text-zinc-600 text-sm tracking-widest uppercase font-medium">
          &copy; {new Date().getFullYear()} Navaneeth Dev G. All rights reserved.
        </p>
      </footer>
    </main>
  )
}