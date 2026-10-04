import dynamic from "next/dynamic";

const CircularGallery = dynamic(() => import("@/components/CircularGallery"), {
    loading: () => <div className="w-full h-full flex items-center justify-center text-white/50">Loading Gallery...</div>
});

function About() {
    return (
        // Adjusted padding for mobile
        <main id="about" className="w-full pt-16 md:pt-24 pb-16 md:pb-24 text-white">
            <div className="flex flex-col w-full max-w-5xl mx-auto px-4 mt-8 md:mt-15">
                {/* Scaled text sizes using sm: and md: prefixes */}
                <p className="text-gray-400 text-xs sm:text-sm tracking-widest uppercase mb-2 ml-1 sm:ml-2">Hi, I am</p>
                <p className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight mb-2 md:mb-4 text-white leading-none">NAVANEETH DEV</p> 
                <p className="text-gray-400 text-xs sm:text-sm tracking-widest uppercase self-end mr-2 sm:mr-12">and I work on</p>       
            </div>
            
            {/* Reduced gallery wrapper height on mobile (350px/450px) and kept 600px on desktop */}
            <div className="-mt-4 md:-mt-8 mb-16 md:mb-32 h-[350px] sm:h-[450px] md:h-[600px] relative">
                <CircularGallery
                    bend={1}
                    textColor="#ffffff"
                    borderRadius={0.05}
                    scrollEase={0.05}
                    fontUrl=""
                    font="bold 30px Orbitron"
                    scrollSpeed={2}
                    items={[
                        { image: '/what-i-do/prpro-img.png', text: 'Video Editing' },
                        { image: '/what-i-do/3d-animator.png', text: '3D Animation' },
                        { image: '/what-i-do/music-production.png', text: 'Sometimes Music Production' },
                        { image: '/what-i-do/prompt-enginnering.png', text: 'Prompt Engineering' },
                        { image: '/what-i-do/web-design.png', text: 'Web Design' },
                        {image:'/what-i-do/web-development.png', text:'Web Development'}
                    ]}
                />
            </div>
        </main>
    )
}

export default About