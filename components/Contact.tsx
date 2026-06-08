'use client'; // FIX: Added use client to allow ssr: false in dynamic import

import dynamic from 'next/dynamic'; // FIX 5: Added import for Next.js dynamic
// FIX 5: Replaced static import with dynamic import to lazy load ReflectiveCard
const ReflectiveCard = dynamic(() => import('@/components/ReflectiveCard'), { ssr: false });
import { Mail, MapPin } from 'lucide-react';
import { FaYoutube } from 'react-icons/fa';

const Contact = () => {
    return (
        <div className="w-full pb-10 md:pb-20">
            {/* Reduced padding and margins on mobile */}
            <div id="contact" className='flex items-center justify-center w-full bg-white/5 backdrop-blur-sm border-y border-white/10 py-8 md:py-12 mb-10 md:mb-16 mt-10 md:mt-20 relative z-20 will-change-transform [transform:translateZ(0)]'>
                {/* Scaled text size from 6xl to 4xl on mobile */}
                <h2 className="text-4xl md:text-6xl font-semibold text-white tracking-wide">Contact</h2>
            </div>
            {/* Reduced gap between columns and side padding */}
            <div className='max-w-6xl mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-10 md:gap-12'>
                {/* Center text on mobile, left align on md */}
                <div className="flex flex-col justify-center text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-white">Let&apos;s Build Something Together</h2>
                    <p className="text-zinc-400 mb-8 md:mb-10 text-base md:text-lg">I&apos;m currently looking for video editing and 3D animation opportunities.</p>

                    {/* Centered items on mobile */}
                    <div className="flex flex-col gap-6 items-center md:items-start">
                        {/* Email */}
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 border-b border-white/10 pb-6 group w-full md:w-auto">
                            <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:border-cyan-500/50 transition-all duration-300">
                                <Mail className="w-5 h-5 md:w-6 md:h-6 text-zinc-400 group-hover:text-cyan-400 transition-colors duration-300" />
                            </div>
                            <div>
                                <p className="text-zinc-500 text-xs md:text-sm font-semibold uppercase tracking-wider mb-1">Email</p>
                                <a href="mailto:navaneethdev30@gmail.com" className="text-white text-base md:text-lg font-medium hover:text-cyan-400 transition-colors duration-300 break-all">navaneethdev33@gmail.com</a>
                            </div>
                        </div>

                        {/* YouTube */}
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 border-b border-white/10 pb-6 group w-full md:w-auto">
                            <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:border-cyan-500/50 transition-all duration-300">
                                <FaYoutube className="w-5 h-5 md:w-6 md:h-6 text-zinc-400 group-hover:text-cyan-400 transition-colors duration-300" />
                            </div>
                            <div>
                                <p className="text-zinc-500 text-xs md:text-sm font-semibold uppercase tracking-wider mb-1">YouTube</p>
                                <a href="https://www.youtube.com/@NavaneethDev" target="_blank" rel="noopener noreferrer" className="text-white text-base md:text-lg font-medium hover:text-cyan-400 transition-colors duration-300 break-all">youtube.com/@NavaneethDev</a>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 pb-6 group w-full md:w-auto">
                            <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:border-cyan-500/50 transition-all duration-300">
                                <MapPin className="w-5 h-5 md:w-6 md:h-6 text-zinc-400 group-hover:text-cyan-400 transition-colors duration-300" />
                            </div>
                            <div>
                                <p className="text-zinc-500 text-xs md:text-sm font-semibold uppercase tracking-wider mb-1">Location</p>
                                <p className="text-white text-base md:text-lg font-medium">Bengaluru, Karnataka, India</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center w-full mt-8 md:mt-0">
                    {/* Reduced card height from 500px to 300px on mobile */}
                    <div className='w-full max-w-[300px] md:max-w-[400px] h-[300px] md:h-[500px] '>
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