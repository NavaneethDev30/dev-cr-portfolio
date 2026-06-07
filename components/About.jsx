import dynamic from "next/dynamic";

const CircularGallery = dynamic(() => import("@/components/CircularGallery"), {
    loading: () => <div className="w-full h-full flex items-center justify-center text-white/50">Loading Gallery...</div>
});

function About() {
    return (
        <main id="about" className="w-full pt-24 pb-24 text-white">
            <div className="flex flex-col w-full max-w-5xl mx-auto px-4 mt-15">
                <p className="text-gray-400 tracking-widest uppercase mb-2 ml-2">Hi, I am</p>
                <p className="text-6xl sm:text-8xl font-bold tracking-tight mb-4 text-white">NAVANEETH DEV</p> 
                <p className="text-gray-400 tracking-widest uppercase self-end mr-4 sm:mr-12">and I work on</p>       
            </div>
            
            <div className="-mt-8 mb-32" style={{ height: '600px', position: 'relative' }}>
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