import { ReactNode } from 'react';
import { FONT_STACK } from './fontStack';

export function Eyebrow({
  children,
  color = '#6B7280',
}: {
  children: ReactNode;
  color?: string;
}) {
  return (
    <div
      style={{
        font: `600 12px/1 ${FONT_STACK}`,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color,
      }}
    >
      {children}
    </div>
  );
}
