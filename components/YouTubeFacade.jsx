'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

export default function YouTubeFacade({ videoId, title }) {
    const [isPlaying, setIsPlaying] = useState(false);
    
    // Auto-play the iframe when it's injected
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    
    // As per requirement: Default show YouTube thumbnail (hqdefault.jpg) + red circular play button overlay
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    return (
        <div 
            className="aspect-[9/16] w-full overflow-hidden relative bg-black group cursor-pointer"
            onClick={() => setIsPlaying(true)}
        >
            {!isPlaying ? (
                <>
                    <Image
                        src={thumbnailUrl}
                        alt={`Project Thumbnail - ${title}`}
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 360px"
                        className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                    
                    {/* Red Circular Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-red-600/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-red-500 transition-all duration-300 shadow-[0_0_30px_rgba(220,38,38,0.5)]">
                            <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                        </div>
                    </div>
                </>
            ) : (
                <iframe 
                    className="w-full h-full"
                    src={embedUrl}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            )}
        </div>
    );
}
