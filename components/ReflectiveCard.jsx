'use client'

import { useEffect, useRef } from 'react';
import './ReflectiveCard.css';
import { Fingerprint, Activity, Handshake } from 'lucide-react';

const ReflectiveCard = ({
  blurStrength = 12,
  color = 'white',
  metalness = 1,
  roughness = 0.4,
  overlayColor = 'rgba(255, 255, 255, 0.1)',
  displacementStrength = 20,
  noiseScale = 1,
  specularConstant = 1.2,
  grayscale = 1,
  glassDistortion = 0,
  className = '',
  style = {}
}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Camera access disabled to remove permission prompt
    let stream = null;
    
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const baseFrequency = 0.03 / Math.max(0.1, noiseScale);
  const saturation = 1 - Math.max(0, Math.min(1, grayscale));

  const cssVariables = {
    '--blur-strength': `${blurStrength}px`,
    '--metalness': metalness,
    '--roughness': roughness,
    '--overlay-color': overlayColor,
    '--text-color': color,
    '--saturation': saturation
  };

  return (
    <div className={`reflective-card-container ${className}`} style={{ ...style, ...cssVariables }}>
      <svg className="reflective-svg-filters" aria-hidden="true">
        <defs>
          <filter id="metallic-displacement" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency={baseFrequency} numOctaves="2" result="noise" />
            <feColorMatrix in="noise" type="luminanceToAlpha" result="noiseAlpha" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={displacementStrength}
              xChannelSelector="R"
              yChannelSelector="G"
              result="rippled"
            />
            <feSpecularLighting
              in="noiseAlpha"
              surfaceScale={displacementStrength}
              specularConstant={specularConstant}
              specularExponent="20"
              lightingColor="#ffffff"
              result="light"
            >
              <fePointLight x="0" y="0" z="300" />
            </feSpecularLighting>
            <feComposite in="light" in2="rippled" operator="in" result="light-effect" />
            <feBlend in="light-effect" in2="rippled" mode="screen" result="metallic-result" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="solidAlpha"
            />
            <feMorphology in="solidAlpha" operator="erode" radius="45" result="erodedAlpha" />
            <feGaussianBlur in="erodedAlpha" stdDeviation="10" result="blurredMap" />
            <feComponentTransfer in="blurredMap" result="glassMap">
              <feFuncA type="linear" slope="0.5" intercept="0" />
            </feComponentTransfer>
            <feDisplacementMap
              in="metallic-result"
              in2="glassMap"
              scale={glassDistortion}
              xChannelSelector="A"
              yChannelSelector="A"
              result="final"
            />
          </filter>
        </defs>
      </svg>

      <video ref={videoRef} autoPlay playsInline muted className="reflective-video" />

      <div className="reflective-noise" />
      <div className="reflective-sheen" />
      <div className="reflective-border" />

      <div className="reflective-content">
        <div className="card-header">
          <div className="security-badge">
            <Handshake size={14} className="security-icon" />
            <span>Lets connect</span>
          </div>
          <Activity className="status-icon" size={20} />
        </div>

        <div className="card-body">
          <div className="user-info ">
            <h2 className="user-name">
              <input 
                className="bg-transparent border-b border-white/30 text-center text-white placeholder:text-white/50 focus:outline-none focus:border-white w-full max-w-[300px] transition-colors" 
                type="text" 
                placeholder="Enter Your Name" 
              />
            </h2>
            <p className="user-role">
              <input type="text" placeholder='Enter your Email' className='bg-transparent border-b border-white/30 text-center text-white/80 placeholder:text-white/40 focus:outline-none focus:border-white w-full max-w-[250px] transition-colors mt-2 text-sm' />
            </p>
          </div>
        </div>

        <div className="card-footer">
          <div className="id-section">
            <span className="label text-white !opacity-100">
              Drop Your Message
            </span>
            <span className="value">
              <input type="text" className='bg-transparent border-b border-white/30 text-white placeholder:text-white/40 focus:outline-none focus:border-white w-full transition-colors pb-1' placeholder='Send your Message' />
            </span>
          </div>
          <div className="fingerprint-section">
            <button className="flex-shrink-0 w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-300 cursor-pointer">
              <Fingerprint size={28} className="fingerprint-icon text-zinc-400 group-hover:text-cyan-400 group-hover:!opacity-100 transition-all duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReflectiveCard;
