import React, { useRef, useState } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  parallaxIntensity?: number;
}

export const TiltCard: React.FC<TiltCardProps> = ({ 
  children, 
  className = "", 
  intensity = 10, 
  parallaxIntensity = 20 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [scale, setScale] = useState(1);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    setRotateX(yPct * -intensity);
    setRotateY(xPct * intensity);

    setParallax({
      x: xPct * -parallaxIntensity,
      y: yPct * -parallaxIntensity
    });

    setGlarePosition({
      x: (mouseX / width) * 100,
      y: (mouseY / height) * 100,
      opacity: 1
    });
  };

  const handleMouseEnter = () => {
    setScale(1.02);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setScale(1);
    setParallax({ x: 0, y: 0 });
    setGlarePosition(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      className={`perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      id="tilt-card-container"
    >
      <div
        ref={ref}
        className="relative transition-transform duration-100 ease-out transform-style-3d h-full w-full"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`,
          // @ts-ignore
          '--parallax-x': `${parallax.x}px`,
          // @ts-ignore
          '--parallax-y': `${parallax.y}px`,
        }}
        id="tilt-card-inner"
      >
        {children}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none rounded-[inherit] z-50 mix-blend-overlay"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%)`,
            opacity: glarePosition.opacity,
            transition: 'opacity 0.3s ease'
          }}
          id="tilt-card-glare"
        />
      </div>
    </div>
  );
};
