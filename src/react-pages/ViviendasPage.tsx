import { CSSProperties, useEffect, useRef, useState } from 'react';
import { BedDouble, ChevronLeft, ChevronRight, MapPin, MessageCircle, Ruler } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { Eyebrow } from '../ui/Eyebrow';
import { FONT_STACK } from '../ui/fontStack';

// Recomendaciones de vivienda para leads (enlace enviado por WhatsApp vía Spoki).
// Entrada: /viviendas/?i=<enlace de búsqueda Idealista del CRM>  o  ?ciudad=...&max=...
const API = 'https://tnzgpzablwfptagfbnvb.supabase.co/functions/v1/viviendas-recomendadas';
const WA_NUMBER = '34681198915';
const WA_TEXT = '¡Acabo de encontrar mi vivienda!';

const C = {
  blue: '#3D8BF7',
  ink: '#0A0B0D',
  text: '#1A1A1A',
  muted: '#6B7280',
  line: '#E5E9F0',
  surface: '#F5F7FA',
  white: '#FFFFFF',
};

type Vivienda = {
  slug: string;
  titulo: string;
  precio: number;
  habitaciones: number | null;
  m2: number | null;
  zona: string;
  descripcion: string;
  fotos: string[];
  tags: string[];
};

type Respuesta = {
  ciudad: string;
  max: number;
  total: number;
  nextOffset: number;
  hayMas: boolean;
  viviendas: Vivienda[];
  error?: string;
};

const euros = (n: number) => `${Math.round(n).toLocaleString('es-ES', { useGrouping: true })} €`;

function waLink(v: Vivienda) {
  const text = `${WA_TEXT} Ref: ${v.titulo}, ${euros(v.precio)}`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

function Gallery({ fotos, titulo }: { fotos: string[]; titulo: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const go = (n: number) => {
    const t = track.current;
    if (!t) return;
    const next = Math.max(0, Math.min(fotos.length - 1, n));
    t.scrollTo({ left: t.clientWidth * next, behavior: 'smooth' });
  };
  const onScroll = () => {
    const t = track.current;
    if (t) setIdx(Math.round(t.scrollLeft / t.clientWidth));
  };
  const nav: CSSProperties = {
    position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: 36, height: 36,
    borderRadius: 9999, border: 0, background: 'rgba(255,255,255,0.92)', color: C.text,
    display: 'grid', placeItems: 'center', cursor: 'pointer', boxShadow: '0 1px 4px rgba(10,11,13,0.12)',
  };
  return (
    <div style={{ position: 'relative', aspectRatio: '4 / 3', background: C.surface, maxWidth: '100%' }}>
      <div
        ref={track}
        onScroll={onScroll}
        className="no-scrollbar"
        style={{ display: 'flex', height: '100%', overflowX: 'auto', scrollSnapType: 'x mandatory' }}
      >
        {fotos.map((f, i) => (
          <img
            key={f}
            src={f}
            alt={`Foto ${i + 1} de ${titulo}`}
            loading={i === 0 ? 'eager' : 'lazy'}
            style={{ flex: '0 0 100%', width: '100%', height: '100%', objectFit: 'cover', scrollSnapAlign: 'start' }}
          />
        ))}
      </div>
      {fotos.length > 1 && (
        <>
          <button type="button" aria-label="Foto anterior" onClick={() => go(idx - 1)} style={{ ...nav, left: 10 }}>
            <ChevronLeft size={18} />
          </button>
          <button type="button" aria-label="Foto siguiente" onClick={() => go(idx + 1)} style={{ ...nav, right: 10 }}>
            <ChevronRight size={18} />
          </button>
          <div style={{ position: 'absolute', bottom: 10, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 6 }}>
            {fotos.map((f, i) => (
              <span
                key={f}
                style={{
                  width: i === idx ? 16 : 6, height: 6, borderRadius: 9999,
                  background: i === idx ? C.white : 'rgba(255,255,255,0.55)', transition: 'width 200ms',
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Card({ v }: { v: Vivienda }) {
  return (
    <article
      style={{
        background: C.white, border: `1px solid ${C.line}`, borderRadius: 24, overflow: 'hidden',
        display: 'flex', flexDirection: 'column', minWidth: 0,
      }}
    >
      <Gallery fotos={v.fotos} titulo={v.titulo} />
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 6, color: C.muted, fontSize: 14 }}>
          <MapPin size={16} color={C.blue} /> {v.zona}
        </p>
        <h3
          style={{
            margin: 0, font: `600 19px/1.25 ${FONT_STACK}`, letterSpacing: '-0.01em', color: C.ink,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
            minHeight: '2.5em',
          }}
        >
          {v.titulo}
        </h3>
        <p style={{ margin: 0, font: `800 28px/1.1 ${FONT_STACK}`, letterSpacing: '-0.02em', color: C.ink, fontVariantNumeric: 'tabular-nums' }}>
          {euros(v.precio)}
        </p>
        {(v.habitaciones || v.m2) && (
          <div style={{ display: 'flex', gap: 18, color: C.text, fontWeight: 500, fontSize: 15 }}>
            {v.habitaciones ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <BedDouble size={18} color={C.muted} /> {v.habitaciones} hab.
              </span>
            ) : null}
            {v.m2 ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Ruler size={18} color={C.muted} /> {v.m2} m²
              </span>
            ) : null}
          </div>
        )}
        {v.descripcion && (
          <p style={{ margin: 0, color: C.muted, fontSize: 15, lineHeight: 1.55 }}>{v.descripcion}</p>
        )}
        {v.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {v.tags.map((t) => (
              <span
                key={t}
                style={{
                  fontSize: 13, fontWeight: 500, padding: '4px 12px', borderRadius: 9999,
                  background: C.surface, border: `1px solid ${C.line}`, color: C.text,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        )}
        <a
          href={waLink(v)}
          target="_blank"
          rel="noopener"
          style={{
            marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            background: C.blue, color: C.white, textDecoration: 'none', borderRadius: 9999,
            padding: '15px 20px', font: `700 16px/1 ${FONT_STACK}`, letterSpacing: '-0.01em',
          }}
        >
          <MessageCircle size={18} /> Me interesa
        </a>
      </div>
    </article>
  );
}

function SkeletonCard() {
  const bar = (w: string, h: number): CSSProperties => ({ width: w, height: h, borderRadius: 8, background: C.surface });
  return (
    <div style={{ border: `1px solid ${C.line}`, borderRadius: 24, overflow: 'hidden', background: C.white }}>
      <div style={{ aspectRatio: '4 / 3', background: C.surface }} />
      <div style={{ padding: 20, display: 'grid', gap: 12 }}>
        <div style={bar('40%', 14)} />
        <div style={bar('85%', 20)} />
        <div style={bar('50%', 28)} />
        <div style={bar('100%', 48)} />
      </div>
    </div>
  );
}

export function ViviendasPage() {
  const [query, setQuery] = useState<string | null>(null);
  const [data, setData] = useState<Respuesta | null>(null);
  const [items, setItems] = useState<Vivienda[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const q = new URLSearchParams();
    if (sp.get('i')) q.set('i', sp.get('i') as string);
    else {
      if (sp.get('ciudad')) q.set('ciudad', sp.get('ciudad') as string);
      if (sp.get('max')) q.set('max', sp.get('max') as string);
    }
    const qs = q.toString();
    setQuery(qs);
    if (!qs) { setLoading(false); setFailed(true); return; }
    fetch(`${API}?${qs}&count=3`)
      .then((r) => r.json())
      .then((d: Respuesta) => {
        if (d.error) throw new Error(d.error);
        setData(d);
        setItems(d.viviendas || []);
      })
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  }, []);

  const loadMore = () => {
    if (!data || !query) return;
    setLoadingMore(true);
    fetch(`${API}?${query}&offset=${data.nextOffset}&count=6`)
      .then((r) => r.json())
      .then((d: Respuesta) => {
        if (d.error) throw new Error(d.error);
        setData(d);
        setItems((prev) => [...prev, ...(d.viviendas || [])]);
      })
      .catch(() => setData((prev) => (prev ? { ...prev, hayMas: false } : prev)))
      .finally(() => setLoadingMore(false));
  };

  const ciudad = data?.ciudad;
  const vacio = !loading && (failed || items.length === 0);

  return (
    <div id="top" style={{ minHeight: '100vh', background: C.white, color: C.text, fontFamily: FONT_STACK }}>
      <header style={{ borderBottom: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '16px 20px' }}>
          <Logo />
        </div>
      </header>

      <main style={{ maxWidth: 1120, margin: '0 auto', padding: '0 20px' }}>
        <section style={{ padding: '40px 0 28px', display: 'grid', gap: 12 }}>
          <Eyebrow color={C.blue}>Selección para ti</Eyebrow>
          <h1
            style={{
              margin: 0, font: `800 clamp(30px, 6vw, 46px)/1.05 ${FONT_STACK}`, letterSpacing: '-0.03em',
              color: C.ink, textWrap: 'balance',
            } as CSSProperties}
          >
            {ciudad ? `Viviendas para ti en ${ciudad}` : 'Viviendas para ti'}
          </h1>
          <p style={{ margin: 0, color: C.muted, fontSize: 17, lineHeight: 1.55, maxWidth: 620 }}>
            Hemos elegido las viviendas que mejor encajan con tu hipoteca. Si alguna te gusta, pulsa en
            "Me interesa" y te ayudamos con el resto.
          </p>
          {data?.max ? (
            <span
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, width: 'fit-content', marginTop: 4,
                background: 'rgba(61,139,247,0.08)', borderRadius: 9999, padding: '9px 18px', fontWeight: 600,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              Tu presupuesto: hasta <b style={{ color: C.blue }}>{euros(data.max)}</b>
            </span>
          ) : null}
        </section>

        {loading && (
          <>
            <p style={{ margin: '0 0 16px', color: C.muted, fontSize: 15 }}>Buscando viviendas para ti…</p>
            <section
              style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', paddingBottom: 48 }}
            >
              <SkeletonCard /><SkeletonCard /><SkeletonCard />
            </section>
          </>
        )}

        {!loading && items.length > 0 && (
          <section
            aria-label="Viviendas recomendadas"
            style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', paddingBottom: 40 }}
          >
            {items.map((v) => <Card key={v.slug} v={v} />)}
          </section>
        )}

        {!loading && items.length > 0 && data?.hayMas && (
          <section
            style={{ background: C.surface, borderRadius: 24, padding: '28px 24px', display: 'grid', gap: 12, justifyItems: 'start', marginBottom: 48 }}
          >
            <h3 style={{ margin: 0, font: `700 21px/1.2 ${FONT_STACK}`, letterSpacing: '-0.01em', color: C.ink }}>
              ¿Quieres ver más opciones?
            </h3>
            <p style={{ margin: 0, color: C.muted, fontSize: 16 }}>
              Hay más viviendas en {ciudad} dentro de tu presupuesto.
            </p>
            <Button variant="secondary" size="md" onClick={loadMore}>
              {loadingMore ? 'Cargando…' : 'Ver más viviendas'}
            </Button>
          </section>
        )}

        {vacio && (
          <section
            style={{ background: C.surface, borderRadius: 24, padding: '28px 24px', display: 'grid', gap: 12, justifyItems: 'start', marginBottom: 48 }}
          >
            <h3 style={{ margin: 0, font: `700 21px/1.2 ${FONT_STACK}`, color: C.ink }}>
              Ahora mismo no tenemos viviendas que mostrarte aquí
            </h3>
            <p style={{ margin: 0, color: C.muted, fontSize: 16, maxWidth: 560 }}>
              Escríbenos por WhatsApp y te ayudamos a buscar la tuya.
            </p>
            <a
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank"
              rel="noopener"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, background: C.blue, color: C.white,
                textDecoration: 'none', borderRadius: 9999, padding: '14px 24px', font: `700 15px/1 ${FONT_STACK}`,
              }}
            >
              <MessageCircle size={18} /> Escribir por WhatsApp
            </a>
          </section>
        )}
      </main>

      <footer style={{ borderTop: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '22px 20px', display: 'grid', gap: 6, fontSize: 13, color: C.muted }}>
          <span>Información obtenida de anuncios publicados en portales inmobiliarios. Precio y disponibilidad sujetos a confirmación.</span>
          <span>Tu Hogar Posible · Apunto Growth Agency S.L.</span>
        </div>
      </footer>
    </div>
  );
}
