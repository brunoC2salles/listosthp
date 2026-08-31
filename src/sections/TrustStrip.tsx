import React from 'react';
import { FONT_STACK } from '../ui/fontStack';
import { useIsMobile } from '../hooks/useIsMobile';

const LOGOS = [
  { src: 'https://commons.wikimedia.org/wiki/Special:FilePath/BSabadell_Logo.svg', alt: 'Banco Sabadell', h: 28 },
  { src: 'https://logodownload.org/wp-content/uploads/2017/04/forbes-logo-0.png', alt: 'Forbes', h: 50 },
  { src: 'https://cdn.worldvectorlogo.com/logos/ing-groep-logo.svg', alt: 'ING', h: 28 },
  { src: 'https://logosmarcas.net/wp-content/uploads/2021/03/BBVA-Logo.png', alt: 'BBVA', h: 22 },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Logo_CaixaBank.svg/3840px-Logo_CaixaBank.svg.png', alt: 'CaixaBank', h: 26 },
];

export function TrustStrip() {
  const isMobile = useIsMobile();
  return (
    <div style={{ borderTop: '1px solid #F3F4F6', padding: isMobile ? '24px 0' : '32px 0 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: isMobile ? 'center' : 'space-between', gap: isMobile ? 24 : 48, flexWrap: 'wrap', filter: 'grayscale(1)', opacity: 0.75 }}>
        {LOGOS.map((l) => (
          <img key={l.alt} src={l.src} alt={l.alt} style={{ height: isMobile ? Math.max(16, l.h * 0.7) : l.h, width: 'auto', display: 'block', maxWidth: isMobile ? 100 : 170, objectFit: 'contain' }} />
        ))}
      </div>
    </div>
  );
}
