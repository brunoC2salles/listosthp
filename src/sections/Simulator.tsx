import React, { ReactNode, useMemo, useState } from 'react';
import { Eyebrow } from '../ui/Eyebrow';
import { Button } from '../ui/Button';
import { ArrowRight } from '../ui/Icons';
import { FONT_STACK } from '../ui/fontStack';
import { useIsMobile } from '../hooks/useIsMobile';

const fmtEUR = (n: number) =>
  new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n);

export function Simulator({ onCTA }: { onCTA: () => void }) {
  const [price, setPrice] = useState(220000);
  const [years, setYears] = useState(30);
  const isMobile = useIsMobile();
  const rate = 2.5;

  const monthly = useMemo(() => {
    const r = rate / 100 / 12;
    const n = years * 12;
    const P = price;
    const m = (P * r) / (1 - Math.pow(1 + r, -n));
    return Math.round(m);
  }, [price, years]);

  return (
    <section id="simulador" style={{ background: '#FFFFFF', padding: isMobile ? '48px 20px' : '64px 40px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ maxWidth: 720, marginBottom: isMobile ? 32 : 56 }}>
          <Eyebrow>Simulador</Eyebrow>
          <h2 style={{ font: `400 ${isMobile ? '32px' : '56px'}/1.05 ${FONT_STACK}`, letterSpacing: '-0.03em', color: '#0A0B0D', margin: '20px 0 16px' }}>
            ¿Cuánto pagarías al mes?
          </h2>
          <p style={{ font: `400 17px/1.6 ${FONT_STACK}`, color: '#6B7280', margin: 0 }}>
            Mueve los controles. Sin compromiso.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: isMobile ? 16 : 24 }}>
          <div style={{ background: '#fff', borderRadius: 24, padding: isMobile ? 24 : 48, boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)', border: '1px solid #F3F4F6' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              <Slider label="Valor del inmueble" value={price} min={60000} max={600000} step={5000} onChange={setPrice} fmt={fmtEUR} isMobile={isMobile} />
              <Slider label="Plazo" value={years} min={5} max={30} step={1} onChange={setYears} fmt={(v) => `${v} años`} isMobile={isMobile} />
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <Pill>Sin entrada</Pill>
                <Pill>100% financiado</Pill>
              </div>
            </div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #6FA9F9 0%, #2C6FD4 100%)', borderRadius: 24, padding: isMobile ? 32 : 48, color: '#fff', position: 'relative', overflow: 'hidden' }}>
            <div aria-hidden style={{ position: 'absolute', right: '-20%', top: '-20%', width: 320, height: 320, background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 70%)' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ font: `600 11px/1 ${FONT_STACK}`, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)' }}>Tu cuota mensual estimada</div>
              <div style={{ font: `400 ${isMobile ? '48px' : '72px'}/1 ${FONT_STACK}`, letterSpacing: '-0.035em', color: '#fff', margin: '18px 0 8px' }}>{fmtEUR(monthly)}</div>
              <div style={{ font: `400 13px ${FONT_STACK}`, color: 'rgba(255,255,255,0.7)' }}>durante {years * 12} meses</div>
              <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.16)', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Row k="Valor del inmueble" v={fmtEUR(price)} />
                <Row k="Total a pagar" v={fmtEUR(monthly * years * 12)} />
              </div>
              <div style={{ marginTop: 32 }}>
                <Button variant="inverse" size="lg" fullWidth onClick={onCTA}>
                  Solicitar mi estudio gratis<ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div style={{ font: `400 12px/1.5 ${FONT_STACK}`, color: '#9CA3AF', marginTop: 20, maxWidth: 720 }}>
          Cálculo orientativo. La cuota final depende del estudio personalizado y de las condiciones de cada entidad.
        </div>
      </div>
    </section>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 9999, background: '#F5F7FA', color: '#1A1A1A', font: `600 12px/1 ${FONT_STACK}` }}>
      <span style={{ width: 6, height: 6, borderRadius: 9999, background: '#3D8BF7' }} />
      {children}
    </span>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', font: `400 14px ${FONT_STACK}`, color: 'rgba(255,255,255,0.75)' }}>
      <span>{k}</span>
      <span style={{ color: '#fff', fontWeight: 600 }}>{v}</span>
    </div>
  );
}

type SliderProps = { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; fmt: (v: number) => string; isMobile?: boolean };

function Slider({ label, value, min, max, step, onChange, fmt, isMobile }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
        <div style={{ font: `600 11px/1 ${FONT_STACK}`, color: '#6B7280', letterSpacing: '0.10em', textTransform: 'uppercase' }}>{label}</div>
        <div style={{ font: `400 ${isMobile ? '20px' : '24px'}/1 ${FONT_STACK}`, letterSpacing: '-0.01em', color: '#0A0B0D' }}>{fmt(value)}</div>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: '100%', appearance: 'none', height: 6, borderRadius: 9999, outline: 0, background: `linear-gradient(to right, #3D8BF7 0%, #6FA9F9 ${pct}%, #E5E7EB ${pct}%, #E5E7EB 100%)` }} />
    </div>
  );
}
