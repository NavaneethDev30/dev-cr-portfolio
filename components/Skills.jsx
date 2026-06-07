'use client';

import Image from 'next/image';

const techLogos = [
  { src: "/skills/blender.svg", alt: "Blender", title: "Blender" },
  { src: "/skills/premiere.svg", alt: "Premiere Pro", title: "Premiere Pro" },
  { src: "/skills/aftereffects.svg", alt: "After Effects", title: "After Effects" },
  { src: "/skills/flstudio.png", alt: "FL Studio", title: "FL Studio" },
  { src: "/skills/openai.svg", alt: "Generative AI", title: "Generative AI" },
];

function Skills() {
    return (
        <div id="skills" className="w-full flex flex-col justify-center -mt-20 mb-24 relative z-10 overflow-hidden">
            <div 
                className="bg-white/5 backdrop-blur-sm border-y border-white/20 shadow-xl h-32 w-full flex items-center justify-center mb-16"
                style={{ willChange: 'transform', transform: 'translateZ(0)' }}
            >
                <h2 className="text-3xl font-semibold text-white tracking-wide">
                    Skills and Technologies
                </h2>
            </div>
            <div className="relative w-full overflow-hidden" style={{ height: '100px' }}>
                <div className="flex w-max animate-marquee hover:animate-pause">
                    {/* Original list */}
                    {techLogos.map((item, index) => (
                        <div key={`orig-${index}`} className="relative h-[60px] w-[120px] mx-8 flex-shrink-0 flex items-center justify-center">
                            <Image 
                                src={item.src} 
                                alt={item.alt} 
                                width={120}
                                height={60}
                                quality={50} // Compress image quality to 50%
                                loading="lazy"
                                className="h-[60px] w-auto object-contain pointer-events-none"
                            />
                        </div>
                    ))}
                    {/* Duplicated list for seamless loop */}
                    {techLogos.map((item, index) => (
                        <div key={`dup-${index}`} className="relative h-[60px] w-[120px] mx-8 flex-shrink-0 flex items-center justify-center">
                            <Image 
                                src={item.src} 
                                alt={item.alt} 
                                width={120}
                                height={60}
                                quality={50} // Compress image quality to 50%
                                loading="lazy"
                                className="h-[60px] w-auto object-contain pointer-events-none"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Skills