import React, { CSSProperties, useEffect, useState } from 'react';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { FONT_STACK } from '../ui/fontStack';
import { useIsMobile } from '../hooks/useIsMobile';

const navLink: CSSProperties = {
  font: `500 14px ${FONT_STACK}`,
  color: '#1A1A1A',
  textDecoration: 'none',
  letterSpacing: '-0.005em',
};

type Props = {
  cta: string;
  onCTA: () => void;
};

export function TopNav({ cta, onCTA }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: scrolled ? 'rgba(255,255,255,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(10,11,13,0.06)' : '1px solid transparent',
        transition: 'all 200ms cubic-bezier(0.2, 0.8, 0.2, 1)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '16px 20px' : '20px 40px', display: 'grid', gridTemplateColumns: isMobile ? '1fr auto' : '1fr auto 1fr', alignItems: 'center', gap: isMobile ? 16 : 32 }}>
        <Logo />
        {!isMobile && (
          <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32 }}>
            <a href="#beneficios" style={navLink}>Beneficios</a>
            <a href="#simulador" style={navLink}>Simulador</a>
          </nav>
        )}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button size={isMobile ? "sm" : "md"} onClick={onCTA}>{cta}</Button>
        </div>
      </div>
    </header>
  );
}
