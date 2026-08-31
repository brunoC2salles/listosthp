import React from 'react';
import { Logo } from '../ui/Logo';
import { FONT_STACK } from '../ui/fontStack';
import { useIsMobile } from '../hooks/useIsMobile';

const COLUMNS = [
  {
    h: 'Producto',
    items: [
      { label: 'Beneficios', href: '/#beneficios' },
      { label: 'Simulador', href: '/#simulador' },
      { label: 'Cómo funciona', href: '/#por-que' },
    ],
  },
  {
    h: 'Legal',
    items: [
      { label: 'Aviso legal', href: '#/legal' },
      { label: 'Privacidad', href: '#/legal' },
      { label: 'Cookies', href: '#/cookies' },
    ],
  },
];

export function Footer() {
  const isMobile = useIsMobile();
  return (
    <footer style={{ background: '#FFFFFF', borderTop: '1px solid #F3F4F6', padding: isMobile ? '48px 20px 32px' : '64px 40px 40px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.6fr 1fr 1fr', gap: isMobile ? 32 : 48, marginBottom: isMobile ? 40 : 64 }}>
          <div>
            <Logo />
            <p style={{ font: `400 14px/1.6 ${FONT_STACK}`, color: '#6B7280', margin: '20px 0 0', maxWidth: 320 }}>
              Tu hipoteca posible. 100% financiada, sin entrada.
            </p>
          </div>
          {COLUMNS.map((c) => (
            <div key={c.h}>
              <div style={{ font: `600 11px/1 ${FONT_STACK}`, color: '#9CA3AF', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 18 }}>{c.h}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {c.items.map((it) => (
                  <a key={it.label} href={it.href} style={{ font: `500 14px ${FONT_STACK}`, color: '#1A1A1A', textDecoration: 'none' }}>{it.label}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ paddingTop: 32, borderTop: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ font: `400 13px ${FONT_STACK}`, color: '#9CA3AF' }}>© {new Date().getFullYear()} Tu Hogar Posible. Todos los derechos reservados.</div>
            <div style={{ font: `400 12px ${FONT_STACK}`, color: '#9CA3AF' }}>Apunto Growth Agency S.L, con el nombre comercial Tu Hogar Posible</div>
          </div>
          <div style={{ font: `400 13px ${FONT_STACK}`, color: '#9CA3AF' }}>Hecho en España.</div>
        </div>
      </div>
    </footer>
  );
}
