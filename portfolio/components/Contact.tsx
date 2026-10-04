import ReflectiveCard from '@/components/ReflectiveCard';
import { Mail, MapPin, Github } from 'lucide-react';

const Contact = () => {
  return (
     <div className="w-full pb-20">
      <div className='flex items-center justify-center text-6xl font-semibold w-full bg-white/5 backdrop-blur-md border-y border-white/10 py-12 mb-16 mt-20 relative z-20'>
            Contact
      </div>
      <div className='max-w-6xl mx-auto px-8 grid md:grid-cols-2 gap-12'>
            <div className="flex flex-col justify-center">
                <h2 className="text-4xl font-bold mb-4 text-white">Let's Build Something Together</h2>
                <p className="text-zinc-400 mb-10 text-lg">I'm currently looking for internships and software development opportunities.</p>
                
                <div className="flex flex-col gap-6">
                    {/* Email */}
                    <div className="flex items-center gap-6 border-b border-white/10 pb-6 group">
                        <div className="flex-shrink-0 w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:border-cyan-500/50 transition-all duration-300">
                            <Mail className="w-6 h-6 text-zinc-400 group-hover:text-cyan-400 transition-colors duration-300" />
                        </div>
                        <div>
                            <p className="text-zinc-500 text-sm font-semibold uppercase tracking-wider mb-1">Email</p>
                            <a href="mailto:navaneethdev30@gmail.com" className="text-white text-lg font-medium hover:text-cyan-400 transition-colors duration-300">navaneethdev33@gmail.com</a>
                        </div>
                    </div>

                    {/* GitHub */}
                    <div className="flex items-center gap-6 border-b border-white/10 pb-6 group">
                        <div className="flex-shrink-0 w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:border-cyan-500/50 transition-all duration-300">
                            <Github className="w-6 h-6 text-zinc-400 group-hover:text-cyan-400 transition-colors duration-300" />
                        </div>
                        <div>
                            <p className="text-zinc-500 text-sm font-semibold uppercase tracking-wider mb-1">GitHub</p>
                            <a href="https://github.com/NavaneethDev30" target="_blank" rel="noopener noreferrer" className="text-white text-lg font-medium hover:text-cyan-400 transition-colors duration-300">github.com/NavaneethDev30</a>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-6 pb-6 group">
                        <div className="flex-shrink-0 w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:border-cyan-500/50 transition-all duration-300">
                            <MapPin className="w-6 h-6 text-zinc-400 group-hover:text-cyan-400 transition-colors duration-300" />
                        </div>
                        <div>
                            <p className="text-zinc-500 text-sm font-semibold uppercase tracking-wider mb-1">Location</p>
                            <p className="text-white text-lg font-medium">Bengaluru, Karnataka, India</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="flex items-center justify-center w-full">
                <div className='w-full max-w-[400px] h-[400px] md:h-[500px] '>
                    <ReflectiveCard
                        overlayColor="rgba(0, 0, 0, 0.2)"
                        blurStrength={12}
                        glassDistortion={30}
                        metalness={1}
                        roughness={0.75}
                        displacementStrength={20}
                        noiseScale={1}
                        specularConstant={5}
                        grayscale={0.15}
                        color="#ffffff"
                    />
                </div>
            </div>
      </div>
    </div>
    
  )
}

export default Contact