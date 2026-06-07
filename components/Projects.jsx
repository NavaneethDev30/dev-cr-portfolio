import { projectsData } from "@/lib/projects";

function Projects() {
    return (
        <div id="projects" className="w-full flex flex-col justify-center -mt-20 mb-24 relative z-10 overflow-hidden">
            <div 
                className="bg-white/5 backdrop-blur-sm border-y border-white/20 shadow-xl h-32 w-full flex items-center justify-center mb-16 will-change-transform [transform:translateZ(0)]"
            >
                <h2 className="text-3xl font-semibold text-white tracking-wide">
                    Projects
                </h2>
            </div>

            <div className="w-full max-w-7xl mx-auto px-4 flex flex-col md:flex-row flex-wrap justify-center gap-12">
                {projectsData.map((project, index) => {
                    const videoId = project.video?.split('/shorts/')[1]?.split('?')[0];
                    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : '';

                    // Only render if there is a video
                    if (!embedUrl) return null;

                    return (
                        <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden hover:border-cyan-500 transition-colors duration-500 w-full max-w-[360px] flex flex-col will-change-transform [transform:translateZ(0)]">
                            
                            {/* Lazy-loaded Project Video (YouTube Short) */}
                            <div className="aspect-[9/16] w-full overflow-hidden relative bg-black">
                                <iframe 
                                    className="w-full h-full"
                                    src={embedUrl}
                                    title={`Project Video ${index + 1}`}
                                    loading="lazy"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Projects