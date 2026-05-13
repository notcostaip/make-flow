'use client';

import { useEffect, useRef } from 'react';

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    let animationFrameId: number;
    let scrollY = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', handleScroll);
    resizeCanvas();

    const drawSilk = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const waves = 5;
      for (let i = 0; i < waves; i++) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        for (let x = 0; x < canvas.width; x += 20) {
          // Subtle rippling effect mixed with scroll physics
          const y = Math.sin(x * 0.002 + time + i) * 100 
                  + Math.sin(x * 0.005 - time * 0.5) * 50
                  + (canvas.height / 2) 
                  + (scrollY * 0.1) * (i % 2 === 0 ? 1 : -1) 
                  + i * 50;
                  
          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        
        // Velvet Crimson with varying opacities for depth
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, `rgba(153, 0, 0, ${0.05 + (i * 0.02)})`);
        gradient.addColorStop(1, 'rgba(5, 5, 5, 0.1)');
        
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.closePath();
      }

      time += 0.01;
      animationFrameId = requestAnimationFrame(drawSilk);
    };

    drawSilk();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 bg-[#050505] pointer-events-none"
    />
  );
}
