'use client';

import React, { useRef, useEffect } from 'react';

interface LightRaysProps {
  beamDensity?: number;
}

type DepthLayer = 'background' | 'midground' | 'foreground';

interface Strand {
  id: number;
  originX: number;
  y: number;
  length: number;
  width: number;
  baseOpacity: number;
  layer: DepthLayer;
  
  bendAmount: number;
  bendVelocity: number;
  bendY: number;

  pulseY: number;
  pulseSize: number;
  speed: number;
  pulseGrad: CanvasGradient | null; // cached gradient
}

export default function LightRaysBackground({
  beamDensity = 60, // FIX 3: Changed default beamDensity from 150 to 60
}: LightRaysProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const strandsRef = useRef<Strand[]>([]);
  const isVisibleRef = useRef(true); // FIX 1: Added visibility ref to pause canvas when off screen
  
  const mouse = useRef({ x: -1000, y: -1000, isHovering: false });

  const gaussianRandom = () => {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); 
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // FIX 1: Added IntersectionObserver to track if hero is visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(container);

    const ctx = canvas.getContext('2d', { alpha: false }); 
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let lastTime = performance.now();

    let coreGrad: CanvasGradient | null = null;
    let secondaryGrad: CanvasGradient | null = null;
    let outerGrad: CanvasGradient | null = null;

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;
      
      initScene();
    };

    const initScene = () => {
      const centerX = width / 2;
      const beamWidth = width * 0.5; // Doubled beam width
      const spread = beamWidth * 0.4; 

      const newStrands: Strand[] = [];
      for (let i = 0; i < beamDensity; i++) {
        const offset = gaussianRandom() * spread;
        const x = centerX + offset;
        const centerFactor = Math.max(0, 1 - Math.abs(offset) / (beamWidth / 2));
        
        const rand = Math.random();
        let layer: DepthLayer;
        let widthVal: number;
        let baseOpacity: number;

        if (rand < 0.25) {
          layer = 'foreground';
          widthVal = Math.random() * 1.5 + 0.5;
          baseOpacity = (Math.random() * 0.5 + 0.3) * centerFactor;
        } else if (rand < 0.65) {
          layer = 'midground';
          widthVal = Math.random() * 2 + 1;
          baseOpacity = (Math.random() * 0.2 + 0.1) * centerFactor;
        } else {
          layer = 'background';
          widthVal = Math.random() * 4 + 2;
          baseOpacity = (Math.random() * 0.1 + 0.05) * centerFactor;
        }

        newStrands.push({
          id: i,
          originX: x,
          y: -200, 
          length: height + 400,
          width: widthVal,
          baseOpacity,
          layer,
          bendAmount: 0,
          bendVelocity: 0,
          bendY: height / 2,
          pulseY: Math.random() * -height,
          pulseSize: Math.random() * 40 + 20, // Tiny energy streaks
          speed: Math.random() * 150 + 50, // Subtle, slow movement
          pulseGrad: null,
        });
      }
      strandsRef.current = newStrands;

      // Cache gradients to prevent 60FPS garbage collection thrashing
      coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, height * 1.2);
      coreGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      coreGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.9)');
      coreGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      secondaryGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, height * 1.2);
      secondaryGrad.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      secondaryGrad.addColorStop(0.4, 'rgba(200, 240, 255, 0.3)');
      secondaryGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      outerGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, height * 1.5);
      outerGrad.addColorStop(0, 'rgba(200, 230, 255, 0.25)');
      outerGrad.addColorStop(0.5, 'rgba(100, 150, 255, 0.05)');
      outerGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    };

    const render = (timeNow: number) => {
      const dt = Math.min((timeNow - lastTime) / 1000, 0.05);
      lastTime = timeNow;

      // FIX 1: Early return skipping all drawing if canvas is off screen
      if (!isVisibleRef.current) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = 'screen';

      const centerX = width / 2;

      // ==========================================
      // 1. HERO ELEMENT: Stable Volumetric Core
      // ==========================================
      ctx.save();
      ctx.translate(centerX, -height * 0.05);

      // A) Core Glow (Intensely bright white, narrow)
      if (coreGrad) {
        ctx.save();
        ctx.scale(0.15, 1); 
        ctx.fillStyle = coreGrad;
        ctx.fillRect(-height * 1.2, 0, height * 2.4, height * 1.2);
        ctx.restore();
      }

      // B) Secondary Glow (Wider, softer bloom, 50% width)
      if (secondaryGrad) {
        ctx.save();
        ctx.scale(0.5, 1); 
        ctx.fillStyle = secondaryGrad;
        ctx.fillRect(-height * 1.2, 0, height * 2.4, height * 1.2);
        ctx.restore();
      }

      // C) Outer Atmospheric Diffusion (Subtle, large blur radius)
      if (outerGrad) {
        ctx.save();
        ctx.scale(0.85, 1); 
        ctx.fillStyle = outerGrad;
        ctx.fillRect(-height * 1.5, 0, height * 3, height * 1.5);
        ctx.restore();
      }

      ctx.restore(); 

      // ==========================================
      // 2. FIBER OPTIC STRANDS
      // ==========================================
      for (const strand of strandsRef.current) {
        // --- PHYSICS ---
        const distToMouseX = Math.abs(mouse.current.x - strand.originX);
        const interactionRadius = 100; // Very localized interaction
        let targetBend = 0;
        let targetBendY = mouse.current.y;

        if (mouse.current.isHovering && distToMouseX < interactionRadius) {
          // Extremely subtle bending (Max 4-10px)
          const maxBend = strand.layer === 'foreground' ? 10 : strand.layer === 'midground' ? 7 : 4;
          const repulsion = (1 - distToMouseX / interactionRadius) * maxBend;
          targetBend = mouse.current.x < strand.originX ? repulsion : -repulsion;
        } else {
          targetBendY = strand.bendY; 
        }

        const stiffness = 300; 
        const damping = 20; 
        const force = stiffness * (targetBend - strand.bendAmount) - damping * strand.bendVelocity;
        
        strand.bendVelocity += force * dt;
        strand.bendAmount += strand.bendVelocity * dt;
        strand.bendY += (targetBendY - strand.bendY) * 15 * dt;

        // --- SPLINE RENDERING ---
        ctx.beginPath();
        const segments = 40; 
        const segmentHeight = strand.length / segments;
        
        for (let i = 0; i <= segments; i++) {
          const currentY = strand.y + i * segmentHeight;
          const dy = currentY - strand.bendY;
          const curveWidth = 60; 
          let displacement = 0;
          
          if (Math.abs(dy) < 200 && Math.abs(strand.bendAmount) > 0.1) {
            displacement = strand.bendAmount * Math.exp(-(dy * dy) / (2 * curveWidth * curveWidth));
          }
          
          const currentX = strand.originX + displacement;
          
          if (i === 0) ctx.moveTo(currentX, currentY);
          else ctx.lineTo(currentX, currentY);
        }

        // Base dim fiber
        ctx.strokeStyle = `rgba(255, 255, 255, ${strand.baseOpacity * 0.4})`;
        ctx.lineWidth = strand.width;
        ctx.lineCap = 'round';
        
        if (strand.layer === 'background') {
          ctx.shadowBlur = 0; // FIX 2: Disabled shadowBlur for background strands to save CPU/GPU
          ctx.shadowColor = `rgba(150, 200, 255, ${strand.baseOpacity})`;
        } else {
          ctx.shadowBlur = 0; 
        }
        ctx.stroke();

        // Subtle, tiny internal energy streaks
        strand.pulseY += strand.speed * dt;
        if (strand.pulseY > height + strand.pulseSize) {
          strand.pulseY = -strand.pulseSize;
        }

        // Only create gradient if it doesn't exist yet (once per strand, not per frame)
        if (!strand.pulseGrad) {
          const g = ctx.createLinearGradient(0, 0, 0, strand.pulseSize * 2);
          g.addColorStop(0, 'rgba(255, 255, 255, 0)');
          g.addColorStop(0.5, `rgba(255, 255, 255, ${strand.baseOpacity * 1.2})`);
          g.addColorStop(1, 'rgba(255, 255, 255, 0)');
          strand.pulseGrad = g;
        }

        // Apply it with a transform instead of recreating at new Y position
        ctx.save();
        ctx.translate(0, strand.pulseY - strand.pulseSize);
        ctx.strokeStyle = strand.pulseGrad;
        ctx.stroke();
        ctx.restore();
      }

      ctx.globalCompositeOperation = 'source-over';
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', resize);
    resize();
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect(); // FIX 1: Disconnect observer on cleanup
    };
  }, [beamDensity]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full bg-black overflow-hidden"
      style={{ touchAction: 'none' }}
      onPointerMove={(e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          mouse.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            isHovering: true
          };
        }
      }}
      onPointerLeave={() => {
        mouse.current.isHovering = false;
      }}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Cinematic Film Grain - Drastically reduced visibility (5%) */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-screen opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Deep Vignette originating from the top */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, transparent 20%, rgba(0, 0, 0, 0.8) 80%, rgba(0, 0, 0, 1) 100%)`
        }}
      />
    </div>
  );
}
