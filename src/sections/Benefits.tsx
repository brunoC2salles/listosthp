import React, { ComponentType } from 'react';
import { Eyebrow } from '../ui/Eyebrow';
import { ArrowRight, ShieldIcon, HomeIcon, HeartIcon } from '../ui/Icons';
import { PhotoPlaceholder } from '../ui/PhotoPlaceholder';
import { FONT_STACK } from '../ui/fontStack';
import { useIsMobile } from '../hooks/useIsMobile';

type Benefit = { eyebrow: string; title: string; body: string; Icon: ComponentType<{ size?: number }>; photoLabel: string; photo?: string };

interface BenefitRowProps {
  b: Benefit;
  reverse: boolean;
  isMobile: boolean;
  key?: React.Key;
}

const BENEFITS: Benefit[] = [
  { eyebrow: '01 — Más de 20 bancos', title: 'Las mejores condiciones para tu hipoteca', body: 'Trabajamos con más de 20 bancos, lo que nos permite acceder a mejores condiciones y encontrar opciones que se adapten a tu situación.', Icon: ShieldIcon, photoLabel: 'pareja firmando contrato', photo: 'https://i.postimg.cc/G3GhCYQ2/benefit-1.png' },
  { eyebrow: '02 — Te ayudamos a encontrarla', title: 'Encuentra tu vivienda', body: 'Te ayudamos a buscar la vivienda que encaja con tu situación y tu presupuesto, y te acompañamos en cada paso hasta la firma.', Icon: HomeIcon, photoLabel: 'edificio residencial moderno', photo: 'https://i.postimg.cc/wTkqtpZC/benefit-2.png' },
  { eyebrow: '03 — Renegociamos tu hipoteca', title: 'No pierdas tu casa', body: 'Si tu cuota se ha vuelto difícil de pagar, renegociamos tu hipoteca con el banco para que no pierdas tu vivienda. Y si lo que necesitas es liquidez, reorganizamos tu financiación para que tengas más margen cada mes.', Icon: HeartIcon, photoLabel: 'familia mirando su nueva casa', photo: 'https://i.postimg.cc/HsmWsxZ4/benefit-3.png' },
];

export function Benefits() {
  const isMobile = useIsMobile();
  return (
    <section id="beneficios" style={{ background: '#FFFFFF', padding: isMobile ? '48px 20px' : '64px 40px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: isMobile ? 40 : 80 }}>
          <Eyebrow>Por qué Tu Hogar Posible</Eyebrow>
          <h2 style={{ font: `400 ${isMobile ? '36px' : '64px'}/1.05 ${FONT_STACK}`, letterSpacing: '-0.02em', color: '#0A0B0D', margin: '20px 0 0', whiteSpace: isMobile ? 'normal' : 'nowrap' }}>
            Tres razones para decir <em style={{ color: '#3D8BF7', fontStyle: 'italic' }}>sí</em> hoy.
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 40 : 64 }}>
          {BENEFITS.map((b, i) => <BenefitRow key={b.title} b={b} reverse={isMobile ? false : i % 2 === 1} isMobile={isMobile} />)}
        </div>
      </div>
    </section>
  );
}

function BenefitRow({ b, reverse, isMobile }: BenefitRowProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 80, alignItems: 'center', direction: reverse ? 'rtl' : 'ltr' }}>
      <div style={{ direction: 'ltr' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: 12, background: '#EEF4FD', color: '#3D8BF7', marginBottom: 20 }}>
          <b.Icon size={20} />
        </div>
        <Eyebrow>{b.eyebrow}</Eyebrow>
        <h3 style={{ font: `400 ${isMobile ? '28px' : '40px'}/1.1 ${FONT_STACK}`, letterSpacing: '-0.025em', color: '#0A0B0D', margin: '14px 0 16px', textWrap: 'balance' }}>{b.title}</h3>
        <p style={{ font: `400 16px/1.6 ${FONT_STACK}`, color: '#4B5563', margin: 0, maxWidth: 480 }}>{b.body}</p>
        <div style={{ marginTop: 24, display: 'inline-flex', alignItems: 'center', gap: 8, font: `600 14px ${FONT_STACK}`, color: '#3D8BF7' }}>
          Saber más <ArrowRight size={14} />
        </div>
      </div>
      <div style={{ direction: 'ltr', order: isMobile ? -1 : 0 }}>
        {b.photo
          ? <div style={{ aspectRatio: '5 / 4', borderRadius: 20, overflow: 'hidden', background: '#F3F4F6' }}><img src={b.photo} alt={b.photoLabel} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div>
          : <PhotoPlaceholder label={b.photoLabel} ratio="5 / 4" radius={20} />}
      </div>
    </div>
  );
}
