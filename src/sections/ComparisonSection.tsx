import React from 'react';
import { Eyebrow } from '../ui/Eyebrow';
import { FONT_STACK } from '../ui/fontStack';
import { useIsMobile } from '../hooks/useIsMobile';

const COMPARISON_DATA = [
  {
    service: 'Hipotecas al 100%',
    thp: 'Sí',
    trad: 'La mayoría no',
  },
  {
    service: 'Estudio hipotecario gratuito',
    thp: 'Gratis incluso para hipotecas al 100%',
    trad: 'Muchos cobran',
  },
  {
    service: 'Estudios gratuitos',
    thp: 'Sin coste real',
    trad: 'Normalmente solo hasta el 80%',
  },
  {
    service: 'Asesoramiento personalizado',
    thp: 'Completo',
    trad: 'Limitado',
  },
  {
    service: 'Viviendas accesibles',
    thp: 'Especialistas',
    trad: 'Variable',
  },
  {
    service: 'Transparencia y cercanía',
    thp: 'Total',
    trad: 'No siempre',
  },
  {
    service: 'Acompañamiento integral',
    thp: 'De principio a fin',
    trad: 'Parcial',
  },
  {
    service: 'Ayuda en la búsqueda de vivienda',
    thp: 'Te ayudamos a encontrar vivienda y oportunidades reales',
    trad: 'La mayoría de empresas que gestionan hipotecas no ayudan a buscar vivienda',
  },
  {
    service: 'Viviendas de banco y oportunidades accesibles',
    thp: 'Trabajamos con viviendas accesibles y oportunidades bancarias',
    trad: 'Las pocas empresas que ayudan en la búsqueda normalmente no trabajan con viviendas de banco accesibles',
  },
  {
    service: 'Ayuda a jóvenes y familias',
    thp: 'Especializados',
    trad: 'Poco enfoque',
  },
];

export function ComparisonSection() {
  const isMobile = useIsMobile();

  return (
    <section id="comparativa" style={{ background: '#F5F7FA', padding: isMobile ? '48px 20px' : '72px 40px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: isMobile ? 32 : 56 }}>
          <Eyebrow>Por qué elegirnos</Eyebrow>
          <h2 style={{ 
            font: `400 ${isMobile ? '32px' : '48px'}/1.05 ${FONT_STACK}`, 
            letterSpacing: '-0.03em', 
            color: '#0A0B0D', 
            margin: '20px 0 16px' 
          }}>
            La diferencia está en los detalles
          </h2>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr 1fr',
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
        }}>
          {/* Header */}
          {!isMobile && (
            <div style={{ padding: '24px 32px', background: 'transparent', font: `600 11px/1 ${FONT_STACK}`, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9CA3AF', display: 'flex', alignItems: 'center' }}>
              Servicio
            </div>
          )}
          <div style={{ 
            padding: '16px 24px', 
            background: '#3D8BF7', 
            color: '#fff', 
            font: `600 13px/1 ${FONT_STACK}`, 
            letterSpacing: '0.05em', 
            textTransform: 'uppercase', 
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            Tu Hogar Posible
          </div>
          <div style={{ 
            padding: '16px 24px', 
            background: '#fff', 
            color: '#0A0B0D', 
            font: `600 13px/1 ${FONT_STACK}`, 
            letterSpacing: '0.05em', 
            textTransform: 'uppercase', 
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRight: '1px solid #E5E7EB',
            borderTop: '1px solid #E5E7EB'
          }}>
            Competencia tradicional
          </div>

          {/* Body */}
          {COMPARISON_DATA.map((row, i) => (
            <React.Fragment key={row.service}>
              {!isMobile && (
                <div style={{ 
                  padding: '11px 16px', 
                  background: 'transparent', 
                  font: `500 14px ${FONT_STACK}`, 
                  color: '#4B5563', 
                  display: 'flex', 
                  alignItems: 'center',
                  borderBottom: '1px solid #E5E7EB'
                }}>
                  {row.service}
                </div>
              )}
              <div style={{ 
                padding: '11px 16px', 
                background: '#3D8BF7', 
                color: '#fff', 
                font: `500 14px ${FONT_STACK}`, 
                display: 'flex', 
                alignItems: 'center', 
                borderBottom: '1px solid rgba(255,255,255,0.12)'
              }}>
                {row.thp}
              </div>
              <div style={{ 
                padding: '11px 16px', 
                background: '#fff', 
                color: '#1A1A1A', 
                font: `400 14px ${FONT_STACK}`, 
                display: 'flex', 
                alignItems: 'center', 
                borderBottom: '1px solid #F3F4F6',
                borderRight: '1px solid #E5E7EB'
              }}>
                {row.trad}
              </div>
            </React.Fragment>
          ))}
        </div>
        
        {isMobile && (
          <div style={{ marginTop: 24, font: `400 12px/1.4 ${FONT_STACK}`, color: '#9CA3AF', padding: '0 8px' }}>
            * Listado exhaustivo de servicios comparados.
          </div>
        )}
      </div>
    </section>
  );
}
