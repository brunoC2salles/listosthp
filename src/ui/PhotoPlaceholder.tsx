import { CSSProperties } from 'react';
import { FONT_STACK } from './fontStack';

type Props = {
  label: string;
  ratio?: string;
  radius?: number;
  dark?: boolean;
  style?: CSSProperties;
};

export function PhotoPlaceholder({
  label,
  ratio = '4 / 5',
  radius = 20,
  dark = false,
  style = {},
}: Props) {
  return (
    <div
      role="img"
      aria-label={label}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: ratio,
        borderRadius: radius,
        background: dark
          ? 'linear-gradient(135deg, #1C1F23 0%, #0A0B0D 100%)'
          : 'linear-gradient(135deg, #EEF4FD 0%, #DCE7F8 50%, #C8D9F4 100%)',
        overflow: 'hidden',
        boxShadow: dark ? 'none' : '0 1px 3px rgba(0,0,0,0.04)',
        ...style,
      }}
    >
      <svg viewBox="0 0 400 500" preserveAspectRatio="none" aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: dark ? 0.18 : 0.5 }}>
        <defs>
          <linearGradient id="phStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={dark ? '#6FA9F9' : '#3D8BF7'} stopOpacity="0.6" />
            <stop offset="100%" stopColor={dark ? '#3D8BF7' : '#6FA9F9'} stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <rect x="40" y="60" width="160" height="220" fill="none" stroke="url(#phStroke)" strokeWidth="1.5" />
        <rect x="220" y="120" width="140" height="320" fill="none" stroke="url(#phStroke)" strokeWidth="1.5" />
        <line x1="40" y1="380" x2="360" y2="380" stroke="url(#phStroke)" strokeWidth="1.5" />
      </svg>
      <div style={{
        position: 'absolute', left: 18, bottom: 18,
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '8px 12px',
        background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.78)',
        backdropFilter: 'blur(8px)',
        border: dark ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(10,11,13,0.06)',
        borderRadius: 9999,
        font: `500 11px/1 ${FONT_STACK}`,
        letterSpacing: '0.04em',
        color: dark ? 'rgba(255,255,255,0.72)' : '#6B7280',
      }}>
        <span style={{ width: 6, height: 6, borderRadius: 9999, background: '#3D8BF7' }} />
        Foto: {label}
      </div>
    </div>
  );
}
