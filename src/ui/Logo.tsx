import { FONT_STACK } from './fontStack';

const LOGO_URL = 'https://i.postimg.cc/g2DZF7pM/esta.png';

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <a href="#top" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
      <img src={LOGO_URL} alt="" width={36} height={36} style={{ width: 36, height: 36, display: 'block' }} />
      <span style={{ font: `700 19px/1 ${FONT_STACK}`, letterSpacing: '-0.02em', color: inverse ? '#fff' : '#0A0B0D' }}>
        Tu<span style={{ color: '#3D8BF7' }}>Hogar</span>Posible
      </span>
    </a>
  );
}
