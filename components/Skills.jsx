import LogoLoop from '@/components/LogoLoop';

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
             <div style={{ height: '200px', position: 'relative', overflow: 'hidden'}}>
                    {/* Basic horizontal loop */}
                    <LogoLoop
                        logos={techLogos}
                        speed={100}
                        direction="left"
                        logoHeight={60}
                        gap={60}
                        hoverSpeed={0}
                        scaleOnHover
                        fadeOut
                        fadeOutColor="#000000ff"
                        ariaLabel="Technology partners"
                    />
            </div>
        </div>
    )
}

export default Skills