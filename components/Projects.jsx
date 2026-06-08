'use client';

import { projectsData } from "@/lib/projects";
import YouTubeFacade from './YouTubeFacade';

const ProjectCard = ({ project, index }) => {
    // Extract YouTube ID
    const videoId = project.video?.split('/shorts/')[1]?.split('?')[0];

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
        </div>
    )
}