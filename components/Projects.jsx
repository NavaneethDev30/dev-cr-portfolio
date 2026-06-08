'use client';

import { projectsData } from "@/lib/projects";
import YouTubeFacade from './YouTubeFacade';

const ProjectCard = ({ project, index }) => {
    // Extract YouTube ID from multiple possible formats
    let videoId = null;
    if (project.video) {
        if (project.video.includes('/shorts/')) {
            videoId = project.video.split('/shorts/')[1]?.split('?')[0];
        } else if (project.video.includes('youtu.be/')) {
            videoId = project.video.split('youtu.be/')[1]?.split('?')[0];
        } else if (project.video.includes('watch?v=')) {
            videoId = project.video.split('watch?v=')[1]?.split('&')[0];
        }
    }

    if (!videoId) return null;

    return (
        // Added mx-auto and w-full with max-w-sm to center properly on mobile
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden hover:border-cyan-500 transition-colors duration-500 w-full max-w-sm md:max-w-[360px] mx-auto flex flex-col will-change-transform [transform:translateZ(0)]">
            <YouTubeFacade videoId={videoId} title={`Project Video ${index + 1}`} />
        </div>
    );
};

export default function Projects() {
    return (
        // Tighter margins on mobile
        <div id="projects" className="w-full flex flex-col justify-center -mt-10 md:-mt-20 mb-16 md:mb-24 relative z-10 overflow-hidden">
            <div 
                // Scaled header height
                className="bg-white/5 backdrop-blur-sm border-y border-white/20 shadow-xl h-20 md:h-32 w-full flex items-center justify-center mb-8 md:mb-16 will-change-transform [transform:translateZ(0)]"
            >
                <h2 className="text-xl md:text-3xl font-semibold text-white tracking-wide">
                    Projects
                </h2>
            </div>

            {/* Reduced gap between project cards on mobile */}
            <div className="w-full max-w-7xl mx-auto px-4 flex flex-col md:flex-row flex-wrap justify-center gap-6 md:gap-12">
                {projectsData.map((project, index) => (
                    <ProjectCard key={index} project={project} index={index} />
                ))}
            </div>

            {/* View More Button */}
            <div className="w-full flex justify-center mt-12 md:mt-16 relative z-20">
                <a 
                    href="https://www.youtube.com/@NavaneethDev" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center justify-center px-8 py-3 md:px-10 md:py-4 font-semibold text-white transition-all duration-300 ease-in-out bg-white/5 border border-white/20 rounded-full hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:text-cyan-400 shadow-[0_0_0_rgba(34,211,238,0)] hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] backdrop-blur-sm"
                >
                    <span className="tracking-widest uppercase text-xs md:text-sm">View More on YouTube</span>
                    <svg className="w-4 h-4 md:w-5 md:h-5 ml-2 md:ml-3 transition-transform duration-300 ease-in-out group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </a>
            </div>
        </div>
    )
}