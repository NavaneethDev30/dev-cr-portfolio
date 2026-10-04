'use client';

import { useEffect, useRef, useState } from 'react';
import { Activity, Fingerprint, Handshake } from 'lucide-react';
import './ReflectiveCard.css';

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
  style = {},
}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Camera access disabled to remove permission prompt.
    const stream = null;

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
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
    '--saturation': saturation,
  };

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ ...status, error: 'Please fill all fields' });
      return;
    }
    
    setStatus({ loading: true, success: false, error: '' });
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
        console.log(data.error)
      }
      
      setStatus({ loading: false, success: true, error: '' });
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(s => ({ ...s, success: false })), 3000);
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message || 'Network error' });
    }
  };

  return (
    <div
      className={`reflective-card-container ${className}`}
      style={{ ...style, ...cssVariables }}
    >
      <svg className="reflective-svg-filters" aria-hidden="true">
        <defs>
          <filter id="metallic-displacement" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="turbulence"
              baseFrequency={baseFrequency}
              numOctaves="2"
              result="noise"
            />
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
          <div className="user-info">
            <h2 className="user-name">
              <input
                className="bg-transparent border-b border-white/30 text-center text-white placeholder:text-white/50 focus:outline-none focus:border-white w-full max-w-[300px] transition-colors"
                type="text"
                placeholder="Enter Your Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </h2>
            <p className="user-role">
              <input type="email" placeholder="Enter your Email" className="outline-none bg-transparent w-full max-w-[280px] text-center text-white/90 border-b border-transparent focus:border-white/30 transition-colors" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
            </p>
          </div>
        </div>

        <div className="card-footer">
          <div className="id-section">
            <span className="label text-white !opacity-100 mb-2 block">Drop Your Message</span>
            <span className="value">
              <textarea 
                className="outline-none bg-black/20 w-full text-white/90 border border-white/10 rounded-xl p-3 focus:border-white/30 transition-colors resize-none" 
                placeholder="Send your Message" 
                rows="3"
                value={formData.message} 
                onChange={(e) => setFormData({...formData, message: e.target.value})} 
              />
            </span>
          </div>

          <div className="fingerprint-section relative flex flex-col items-center">
            {status.error && <span className="absolute -top-6 whitespace-nowrap text-red-400 text-[11px] font-bold tracking-wider">{status.error}</span>}
            {status.success && <span className="absolute -top-6 whitespace-nowrap text-green-400 text-[11px] font-bold tracking-wider">Sent successfully!</span>}
            <button 
              onClick={handleSubmit}
              disabled={status.loading}
              className={`flex-shrink-0 w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-300 cursor-pointer ${status.loading ? 'opacity-50' : ''}`}>
              <Fingerprint
                size={28}
                className={`fingerprint-icon text-zinc-400 group-hover:text-cyan-400 group-hover:!opacity-100 transition-all duration-300 ${status.loading ? 'animate-pulse text-cyan-400' : ''}`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReflectiveCard;
