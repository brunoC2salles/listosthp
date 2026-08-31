import React from 'react';
import { Eyebrow } from '../ui/Eyebrow';
import { FONT_STACK } from '../ui/fontStack';
import { useIsMobile } from '../hooks/useIsMobile';

const PARAGRAPHS = [
  'Es un paso importante en tu vida, lleno de ilusión, dudas y, a veces, cierta incertidumbre.',
  'Sabemos que no sempre es un camino sencillo. Por eso, no solo te acompañamos en la parte técnica y económica del proceso, sino también en la emocional.',
  'Estamos a tu lado para ayudarte a tomar decisiones con confianza, resolver tus inquietudes y hacer que cada paso sea más claro y llevadero.',
];

export function EmotionalSection() {
  const isMobile = useIsMobile();
  return (
    <section id="por-que" style={{ background: '#F5F7FA', padding: isMobile ? '48px 20px' : '72px 40px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.1fr', gap: isMobile ? 32 : 96, alignItems: 'start' }}>
          <div>
            <Eyebrow>Más que una decisión financiera</Eyebrow>
            <h2 style={{ font: `400 ${isMobile ? '36px' : '64px'}/1.02 ${FONT_STACK}`, letterSpacing: '-0.035em', color: '#0A0B0D', margin: '24px 0 0' }}>
              Comprar una vivienda<br />es <span style={{ color: '#3D8BF7' }}>mucho más</span><br />que una decisión<br />financiera.
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 16 : 24, paddingTop: isMobile ? 8 : 32 }}>
            {PARAGRAPHS.map((p, i) => (
              <p key={i} style={{ font: `400 18px/1.6 ${FONT_STACK}`, color: '#1A1A1A', margin: 0, maxWidth: 540 }}>{p}</p>
            ))}
            <p style={{ font: `500 18px/1.6 ${FONT_STACK}`, color: '#0A0B0D', margin: '8px 0 0', maxWidth: 540, letterSpacing: '-0.01em', borderLeft: '3px solid #3D8BF7', paddingLeft: 20 }}>
              Porque encontrar tu hogar también implica sentirte seguro durante el camino.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
