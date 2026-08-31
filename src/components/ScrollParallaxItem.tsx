import React, { useRef, useEffect, useState } from 'react';

interface ScrollParallaxItemProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'from-left' | 'from-right';
}

export const ScrollParallaxItem: React.FC<ScrollParallaxItemProps> = ({ 
  children, 
  className = "", 
  direction = 'from-left' 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState({
    opacity: 0,
    transform: 'translate3d(0, 100px, 0)',
  });

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const startOffset = windowHeight * 0.9;
      const endOffset = windowHeight * 0.4;
      
      const elementTop = rect.top;
      const divisor = startOffset - endOffset;
      let progress = divisor !== 0 ? (startOffset - elementTop) / divisor : 0;
      
      // Handle NaN and bound the progress
      if (isNaN(progress)) progress = 0;
      progress = Math.max(0, Math.min(1, progress));
      
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      const maxTranslateX = 150;
      const maxRotate = 15;
      const maxTranslateY = 50;
      
      let translateX = 0;
      let rotateY = 0;
      
      if (direction === 'from-left') {
        translateX = -maxTranslateX * (1 - easeProgress);
        rotateY = -maxRotate * (1 - easeProgress);
      } else {
        translateX = maxTranslateX * (1 - easeProgress);
        rotateY = maxRotate * (1 - easeProgress);
      }
      
      const translateY = maxTranslateY * (1 - easeProgress);
      
      requestAnimationFrame(() => {
        setTransformStyle({
          opacity: progress,
          transform: `translate3d(${translateX}px, ${translateY}px, 0) rotateY(${rotateY}deg)`,
          // @ts-ignore
          transition: 'none',
          willChange: 'transform, opacity'
        });
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [direction]);

  return (
    <div 
      ref={ref} 
      className={`perspective-1000 ${className}`} 
      style={{ perspective: '1000px' }}
      id={`parallax-${direction}`}
    >
      <div style={transformStyle}>
        {children}
      </div>
    </div>
  );
};
