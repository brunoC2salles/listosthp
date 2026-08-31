import React, { useEffect, useRef, useState } from 'react';

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right';
  delay?: number;
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ 
  children, 
  className = "", 
  direction = 'up', 
  delay = 0 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current)
        observer.unobserve(ref.current);
    };
  }, []);

  const getDirectionClass = () => {
    switch (direction) {
      case 'left': return 'reveal-left';
      case 'right': return 'reveal-right';
      default: return 'reveal-element';
    }
  };

  return (
    <div 
      ref={ref} 
      className={`${getDirectionClass()} ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      id={`reveal-${direction}-${delay}`}
    >
      {children}
    </div>
  );
};
