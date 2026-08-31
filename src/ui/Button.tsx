import { CSSProperties, ReactNode, useState } from 'react';
import { FONT_STACK } from './fontStack';

type Variant = 'primary' | 'secondary' | 'ghost' | 'inverse' | 'inverse-ghost';
type Size = 'sm' | 'md' | 'lg' | 'xl';

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  style?: CSSProperties;
  fullWidth?: boolean;
};

export function Button({
  variant = 'primary',
  size = 'lg',
  children,
  onClick,
  type = 'button',
  style = {},
  fullWidth = false,
}: ButtonProps) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);

  const base: CSSProperties = {
    fontFamily: FONT_STACK,
    fontWeight: 700,
    letterSpacing: '-0.01em',
    border: 0,
    cursor: 'pointer',
    borderRadius: 9999,
    transition: 'all 200ms cubic-bezier(0.2, 0.8, 0.2, 1)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    whiteSpace: 'nowrap',
    transform: press ? 'scale(0.98)' : 'scale(1)',
  };

  const sizes: Record<Size, CSSProperties> = {
    sm: { fontSize: 14, padding: '10px 20px' },
    md: { fontSize: 15, padding: '14px 26px' },
    lg: { fontSize: 16, padding: '18px 32px' },
    xl: { fontSize: 17, padding: '22px 38px' },
  };

  const variants: Record<Variant, CSSProperties> = {
    primary: {
      background: hover ? '#6FA9F9' : '#3D8BF7',
      color: '#fff',
      boxShadow: hover ? '0 8px 24px rgba(61,139,247,0.28)' : '0 1px 3px rgba(61,139,247,0.18)',
    },
    secondary: {
      background: hover ? 'rgba(61,139,247,0.06)' : 'transparent',
      color: '#3D8BF7',
      boxShadow: 'inset 0 0 0 1.5px #3D8BF7',
    },
    ghost: {
      background: hover ? '#F5F7FA' : 'transparent',
      color: '#1A1A1A',
    },
    inverse: {
      background: hover ? '#F5F7FA' : '#fff',
      color: '#0A0B0D',
    },
    'inverse-ghost': {
      background: hover ? 'rgba(255,255,255,0.08)' : 'transparent',
      color: '#fff',
      boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.20)',
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        ...base,
        ...sizes[size],
        ...variants[variant],
        width: fullWidth ? '100%' : undefined,
        ...style,
      }}
    >
      {children}
    </button>
  );
}
