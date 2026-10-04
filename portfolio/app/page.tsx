import LightRays from '@/components/LightRays';
import Image from 'next/image';
import LogoLoop from '@/components/LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';
import ScrollReveal from '@/components/ScrollReveal';
import { projects } from "@/lib/data";
import ProjectCard from "@/components/ProjectCard";
import Contact from '@/components/Contact';

export const dynamic = 'force-static';

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
];

const skillLogos = [
  { src: "/skills/javascript.svg", alt: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { src: "/skills/python.svg", alt: "Python", href: "https://www.python.org/" },
  { src: "/skills/html5.svg", alt: "HTML5", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { src: "/skills/css3.svg", alt: "CSS3", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { src: "/skills/tailwindcss.svg", alt: "Tailwind CSS", href: "https://tailwindcss.com/" },
  { src: "/skills/express.svg", alt: "Express.js", href: "https://expressjs.com/" },
  { src: "/skills/nodedotjs.svg", alt: "Node.js", href: "https://nodejs.org/" },
  { src: "/skills/mongodb.svg", alt: "MongoDB", href: "https://www.mongodb.com/" },
  { src: "/skills/react.svg", alt: "React", href: "https://react.dev/" },
  { src: "/skills/nextdotjs.svg", alt: "Next.js", href: "https://nextjs.org/" },
  { src: "/skills/figma.svg", alt: "Figma", href: "https://www.figma.com/" },
  { src: "/skills/git.svg", alt: "Git", href: "https://git-scm.com/" },
  { src: "/skills/github.svg", alt: "GitHub", href: "https://github.com/" },
  { src: "/skills/mysql.svg", alt: "MySQL", href: "https://www.mysql.com/" },
  { src: "/skills/powerbi.svg", alt: "Power BI", href: "https://powerbi.microsoft.com/" },
];


function Page(){
  return(
    <main>
  {/* HERO SECTION */}
      <section className="relative min-h-screen overflow-hidden">

        <LightRays
          raysOrigin="top-offset"
          raysColor="#ffffff"
          raysSpeed={1}
          lightSpread={0.4}
          rayLength={6}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          className="custom-rays"
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />

        <div className="absolute inset-0 z-10 pt-20 lg:pt-0 overflow-y-auto overflow-x-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full items-center px-6 lg:px-20 pt-4 lg:pt-0 gap-0 pb-20 lg:pb-0">

            {/* LEFT SIDE (Text - Now ordered 2nd on mobile, 1st on desktop) */}
            <div className="text-white flex flex-col justify-center h-full order-2 lg:order-1">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8 w-max">
                 Hi, I'm 
              </div>

              <h1 className="text-5xl lg:text-8xl font-black leading-none">
                NAVANEETH
                <br />
                <span className="text-zinc-300">DEV</span>
              </h1>

              <h2 className="text-xl lg:text-3xl mt-6 font-medium text-zinc-300">
                Full Stack Developer & Web Designer
              </h2>

              <p className="mt-6 max-w-xl text-base lg:text-lg text-zinc-400 leading-relaxed">
                I build modern web applications, responsive web designs,
                and scalable digital products. Passionate about creating
                beautiful user experiences as a web designer and solving
                real-world problems with technology.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <a href="#projects">
                <button className="w-full sm:w-auto px-6 py-3 bg-white text-black rounded-xl font-medium hover:scale-105 transition">
                  View Projects
                </button>
                </a>
                <a href="/Resume/Navaneeth-Dev-G.pdf"
                 target="_blank" 
                  rel="noopener noreferrer"
                >
                <button className="w-full sm:w-auto px-6 py-3 border border-white/20 rounded-xl hover:bg-white/5 transition">
                  Resume
                </button>
                </a>
              </div>
            
            </div>

            {/* RIGHT SIDE (Image - Now ordered 1st on mobile, 2nd on desktop) */}
            <div className="relative flex justify-center items-end h-[50vh] lg:h-full  order-1 lg:order-2">

              {/* Glow */}
              <div className="absolute w-[300px] h-[400px] lg:w-[600px] lg:h-[600px] rounded-full bg-blue-500/10 blur-3xl"></div>

              <Image
                src="/landingpagepic.png"
                alt="profile"
                width={1200}
                height={1600}
                priority
                className="relative z-10 h-full w-auto object-contain object-bottom [-webkit-mask-image:linear-gradient(to_top,transparent,black_20%)] [mask-image:linear-gradient(to_top,transparent,black_20%)] lg:[-webkit-mask-image:none] lg:[mask-image:none]"
              />

            </div>

          </div>
        </div>

      </section>

  <div className=' min-h-screen text-white'>
    {/* Skills Header with Glass Effect */}
    <div id='skills' className='w-full bg-white/5 backdrop-blur-md border-y border-white/10 py-12 mb-10 relative z-20'>
      <div className='flex items-center justify-center text-3xl md:text-6xl font-semibold text-center px-4'>
        <ScrollReveal
          baseOpacity={0.1}
          enableBlur
          baseRotation={3}
          blurStrength={4}
          wordAnimationEnd="bottom center"
          rotationEnd="bottom center"
        >
          Skills and Technologies
        </ScrollReveal>
      </div>
    </div>
    
    <div style={{ height: '200px', position: 'relative', overflow: 'hidden'}}>
      {/* Basic horizontal loop */}
      <LogoLoop
        logos={skillLogos}
        speed={100}
        direction="left"
        logoHeight={60}
        gap={50}
        hoverSpeed={0}
        scaleOnHover
        fadeOut
        fadeOutColor="#000000"
        ariaLabel="Technology partners"
      />
      
      {/* Vertical loop with deceleration on hover */}
  
    </div>
    {/* Projects Header with Glass Effect */}
    <div id='projects' className='w-full bg-white/5 backdrop-blur-md border-y border-white/10 py-12 mb-16 mt-20 relative z-20'>
      <div className='flex items-center justify-center text-4xl md:text-6xl font-semibold text-center px-4'>
        <ScrollReveal
          baseOpacity={0.1}
          enableBlur
          baseRotation={3}
          blurStrength={4}
          wordAnimationEnd="bottom center"
          rotationEnd="bottom center"
        >
          Projects
        </ScrollReveal>
      </div>
    </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-8 overflow-hidden">
  {projects.map((project) => (
    <ProjectCard
      key={project.title}
      {...project}
    />
  ))}
</div>
<div id='contact'>
<Contact/>
</div>
  </div>
  <div className="w-[90%] md:w-3/4 h-px bg-gray-500/50 my-6 mx-auto flex justify-center items-center"></div>
  <div className='text-gray-300 flex justify-center align-center w-full h-16'>© 2026 Navaneeth Dev G. All Rights Reserved.</div>
    </main>
  )
}

export default Page;
