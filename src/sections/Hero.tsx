import React from 'react';
import { Eyebrow } from '../ui/Eyebrow';
import { Button } from '../ui/Button';
import { ArrowRight, Check } from '../ui/Icons';
import { TrustStrip } from './TrustStrip';
import { WHATSAPP_URL } from '../constants';
import { FONT_STACK } from '../ui/fontStack';
import { useIsMobile } from '../hooks/useIsMobile';

type Props = { headline: string; cta: string; onCTA: () => void };

export function Hero({ headline, cta, onCTA }: Props) {
  const isMobile = useIsMobile();
  return (
    <section id="top" style={{ background: '#FFFFFF', padding: isMobile ? '0 20px' : '0 40px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.15fr', gap: isMobile ? 40 : 64, alignItems: 'center', padding: isMobile ? '24px 0 40px' : '24px 0 56px' }}>
          <div>
            <Eyebrow>De inicio a fin sin coste</Eyebrow>
            <h1 style={{ font: `400 ${isMobile ? '42px' : '80px'}/1.02 ${FONT_STACK}`, letterSpacing: '-0.04em', color: '#0A0B0D', margin: isMobile ? '20px 0 16px' : '32px 0 28px', textWrap: 'balance' }}>{headline}</h1>
            <p style={{ font: `400 18px/1.55 ${FONT_STACK}`, color: '#4B5563', margin: '0 0 32px', maxWidth: 540 }}>
              Por esto te ofrecemos financiación al 100% y viviendas de banco más accesibles. Todo esto con un servicio gratuito.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <Button size={isMobile ? "lg" : "xl"} onClick={onCTA} fullWidth={isMobile}>{cta}<ArrowRight size={18} /></Button>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ font: `600 15px ${FONT_STACK}`, color: '#1A1A1A', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, padding: '14px 8px', width: isMobile ? '100%' : 'auto', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                Descubre más<span style={{ color: '#3D8BF7' }}>→</span>
              </a>
            </div>
            <div style={{ display: 'flex', gap: isMobile ? 16 : 28, marginTop: isMobile ? 32 : 48, flexWrap: 'wrap' }}>
              {['Respuesta en 24 h', '100% online'].map((t) => (
                <div key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, font: `500 13px/1 ${FONT_STACK}`, color: '#6B7280' }}>
                  <span style={{ color: '#3D8BF7', display: 'inline-flex' }}><Check size={14} /></span>{t}
                </div>
              ))}
            </div>
          </div>
          {!isMobile && (
            <div style={{ aspectRatio: '5 / 4', borderRadius: 24, overflow: 'hidden', background: '#F3F4F6' }}>
              <img src="https://i.postimg.cc/Vv92GXCG/thp-capa.jpg" alt="Pareja viendo opciones de vivienda en una tablet" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
            </div>
          )}
        </div>
        <TrustStrip />
      </div>
    </section>
  );
}
