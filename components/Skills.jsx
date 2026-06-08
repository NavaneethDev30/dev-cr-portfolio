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
        // Tighter margins on mobile
        <div id="skills" className="w-full flex flex-col justify-center -mt-10 md:-mt-20 mb-16 md:mb-24 relative z-10 overflow-hidden">
            <div 
                // Reduced height and padding for mobile header
                className="bg-white/5 backdrop-blur-sm border-y border-white/20 shadow-xl h-20 md:h-32 w-full flex items-center justify-center mb-8 md:mb-16"
            >
                {/* Scaled heading text */}
                <h2 className="text-xl md:text-3xl font-semibold text-white tracking-wide">
                    Skills and Technologies
                </h2>
            </div>
            {/* Reduced track height on mobile */}
            <div className="relative w-full overflow-hidden h-[60px] md:h-[100px]">
                <div 
                    className="flex w-max animate-marquee hover:animate-pause items-center h-full"
                    style={{ willChange: 'transform' }}
                >
                    {/* Original list */}
                    {techLogos.map((item, index) => (
                        // Reduced logo dimensions and horizontal margins on mobile
                        <div key={`orig-${index}`} className="relative h-[40px] md:h-[60px] w-[80px] md:w-[120px] mx-4 md:mx-8 flex-shrink-0 flex items-center justify-center">
                            <Image 
                                src={item.src} 
                                alt={item.alt} 
                                width={120}
                                height={60}
                                quality={50}
                                loading="lazy"
                                className="h-full w-auto object-contain pointer-events-none"
                            />
                        </div>
                    ))}
                    {/* Duplicated list for seamless loop */}
                    {techLogos.map((item, index) => (
                        <div key={`dup-${index}`} className="relative h-[40px] md:h-[60px] w-[80px] md:w-[120px] mx-4 md:mx-8 flex-shrink-0 flex items-center justify-center">
                            <Image 
                                src={item.src} 
                                alt={item.alt} 
                                width={120}
                                height={60}
                                quality={50}
                                loading="lazy"
                                className="h-full w-auto object-contain pointer-events-none"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Skills