import { CSSProperties, FormEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { BedDouble, ChevronLeft, ChevronRight, MapPin, MessageCircle, Phone, Ruler, Search } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { Eyebrow } from '../ui/Eyebrow';
import { FONT_STACK } from '../ui/fontStack';

// Recomendaciones de vivienda para leads (enlace enviado por WhatsApp vía Spoki) + búsqueda con filtros.
// Entrada: /viviendas/?i=<enlace de búsqueda Idealista del CRM>  o  ?ciudad=...&max=...
const API = 'https://tnzgpzablwfptagfbnvb.supabase.co/functions/v1/viviendas-recomendadas';

const C = {
  blue: '#3D8BF7',
  ink: '#0A0B0D',
  text: '#1A1A1A',
  muted: '#6B7280',
  line: '#E5E9F0',
  surface: '#F5F7FA',
  white: '#FFFFFF',
};

type Contacto = { tipo: 'whatsapp' | 'telefono'; numero: string; url: string };

type Vivienda = {
  slug: string;
  url: string;
  titulo: string;
  precio: number;
  habitaciones: number | null;
  m2: number | null;
  zona: string;
  descripcion: string;
  fotos: string[];
  tags: string[];
  anunciante: string | null;
  contacto: Contacto;
};

type Respuesta = {
  ciudad: string;
  max: number;
  techo: number;
  minimo: number;
  total: number;
  nextOffset: number;
  hayMas: boolean;
  viviendas: Vivienda[];
  error?: string;
};

type Filtros = { ciudad: string; pmin: string; pmax: string; hab: string; tipo: string; m2: string };

const euros = (n: number) => `${Math.round(n).toLocaleString('es-ES', { useGrouping: true })} €`;
const GRID: CSSProperties = {
  display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
};
const TITLE: CSSProperties = { margin: 0, font: `700 24px/1.2 ${FONT_STACK}`, letterSpacing: '-0.02em', color: C.ink };

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

function Card({ v, destacada = false }: { v: Vivienda; destacada?: boolean }) {
  const wa = v.contacto.tipo === 'whatsapp';
  return (
    <article
      style={{
        background: C.white, border: `1px solid ${destacada ? 'rgba(61,139,247,0.45)' : C.line}`, borderRadius: 24,
        overflow: 'hidden', display: 'flex', flexDirection: 'column', minWidth: 0, position: 'relative',
      }}
    >
      {destacada && (
        <span
          style={{
            position: 'absolute', top: 12, left: 12, zIndex: 1, background: C.blue, color: C.white,
            font: `700 12px/1 ${FONT_STACK}`, letterSpacing: '0.04em', padding: '7px 12px', borderRadius: 9999,
          }}
        >
          Recomendada
        </span>
      )}
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
        <div style={{ marginTop: 'auto', display: 'grid', gap: 8 }}>
          <a
            href={v.contacto.url}
            target={wa ? '_blank' : undefined}
            rel={wa ? 'noopener' : undefined}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              background: C.blue, color: C.white, textDecoration: 'none', borderRadius: 9999,
              padding: '15px 20px', font: `700 16px/1 ${FONT_STACK}`, letterSpacing: '-0.01em',
            }}
          >
            {wa ? <MessageCircle size={18} /> : <Phone size={18} />}
            {wa ? 'Contactar por WhatsApp' : 'Llamar'}
          </a>
          <p style={{ margin: 0, textAlign: 'center', color: C.muted, fontSize: 13, userSelect: 'all' as const }}>
            {v.anunciante ? `${v.anunciante} · ` : ''}{v.contacto.numero}
          </p>
        </div>
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

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} style={{ display: 'grid', gap: 6, minWidth: 0 }}>
      <span style={{ font: `600 13px/1 ${FONT_STACK}`, color: C.text }}>{label}</span>
      {children}
    </label>
  );
}

const INPUT: CSSProperties = {
  width: '100%', minWidth: 0, boxSizing: 'border-box', height: 46, borderRadius: 12, border: `1px solid ${C.line}`,
  background: C.white, padding: '0 14px', font: `500 15px/1 ${FONT_STACK}`, color: C.text,
};

export function ViviendasPage() {
  const [base, setBase] = useState<URLSearchParams | null>(null);
  const [rec, setRec] = useState<Respuesta | null>(null);
  const [recItems, setRecItems] = useState<Vivienda[]>([]);
  const [recLoading, setRecLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const [f, setF] = useState<Filtros>({ ciudad: '', pmin: '', pmax: '', hab: '', tipo: '', m2: '' });
  const [res, setRes] = useState<Respuesta | null>(null);
  const [resItems, setResItems] = useState<Vivienda[]>([]);
  const [resLoading, setResLoading] = useState(false);
  const [searched, setSearched] = useState<URLSearchParams | null>(null);

  const recSlugs = new Set(recItems.map((v) => v.slug));

  const searchQuery = (filtros: Filtros, b: URLSearchParams) => {
    const q = new URLSearchParams(b);
    q.set('modo', 'buscar');
    (Object.keys(filtros) as (keyof Filtros)[]).forEach((k) => {
      const val = filtros[k].trim();
      if (val) q.set(k, val);
    });
    return q;
  };

  const runSearch = (q: URLSearchParams, offset = 0) => {
    setResLoading(true);
    if (offset === 0) { setResItems([]); setSearched(q); }
    fetch(`${API}?${q.toString()}&offset=${offset}&count=6`)
      .then((r) => r.json())
      .then((d: Respuesta) => {
        if (d.error) throw new Error(d.error);
        setRes(d);
        setResItems((prev) => (offset === 0 ? d.viviendas : [...prev, ...d.viviendas]));
      })
      .catch(() => setRes((prev) => (prev ? { ...prev, hayMas: false } : prev)))
      .finally(() => setResLoading(false));
  };

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const b = new URLSearchParams();
    if (sp.get('i')) b.set('i', sp.get('i') as string);
    else {
      if (sp.get('ciudad')) b.set('ciudad', sp.get('ciudad') as string);
      if (sp.get('max')) b.set('max', sp.get('max') as string);
    }
    if (!b.toString()) { setRecLoading(false); setFailed(true); return; }
    setBase(b);
    fetch(`${API}?${b.toString()}&count=3`)
      .then((r) => r.json())
      .then((d: Respuesta) => {
        if (d.error) throw new Error(d.error);
        setRec(d);
        setRecItems(d.viviendas || []);
        const init: Filtros = { ciudad: d.ciudad, pmin: '', pmax: '', hab: '', tipo: '', m2: '' };
        setF(init);
        runSearch(searchQuery(init, b));
      })
      .catch(() => setFailed(true))
      .finally(() => setRecLoading(false));
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!base) return;
    runSearch(searchQuery(f, base));
  };

  const ciudad = rec?.ciudad;
  const techo = rec?.techo || rec?.max || 0;
  const visibles = resItems.filter((v) => !recSlugs.has(v.slug));
  const set = (k: keyof Filtros) => (e: { target: { value: string } }) => setF((p) => ({ ...p, [k]: e.target.value }));

  return (
    <div id="top" style={{ minHeight: '100vh', background: C.white, color: C.text, fontFamily: FONT_STACK }}>
      <header style={{ borderBottom: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '16px 20px' }}>
          <Logo />
        </div>
      </header>

      <main style={{ maxWidth: 1120, margin: '0 auto', padding: '0 20px' }}>
        <section style={{ padding: '40px 0 28px', display: 'grid', gap: 12 }}>
          <Eyebrow color={C.blue}>Selección de Tu Hogar Posible</Eyebrow>
          <h1
            style={{
              margin: 0, font: `800 clamp(30px, 6vw, 46px)/1.05 ${FONT_STACK}`, letterSpacing: '-0.03em',
              color: C.ink, textWrap: 'balance',
            } as CSSProperties}
          >
            {ciudad ? `Viviendas para ti en ${ciudad}` : 'Viviendas para ti'}
          </h1>
          <p style={{ margin: 0, color: C.muted, fontSize: 17, lineHeight: 1.55, maxWidth: 640 }}>
            Estas son las viviendas que te recomendamos según tu presupuesto. Si quieres ver otras opciones,
            más abajo puedes buscar entre todas las viviendas disponibles con tus propios filtros.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', marginTop: 4 }}>
            {techo ? (
              <span
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(61,139,247,0.08)',
                  borderRadius: 9999, padding: '11px 18px', fontWeight: 600, fontVariantNumeric: 'tabular-nums',
                }}
              >
                Tu presupuesto: hasta <b style={{ color: C.blue }}>{euros(techo)}</b>
              </span>
            ) : null}
            {!failed && (
              <a
                href="#buscar"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8, color: C.blue, textDecoration: 'none',
                  boxShadow: `inset 0 0 0 1.5px ${C.blue}`, borderRadius: 9999, padding: '11px 18px', fontWeight: 700,
                }}
              >
                <Search size={16} /> Buscar más viviendas
              </a>
            )}
          </div>
        </section>

        {(recLoading || recItems.length > 0) && (
          <section aria-labelledby="t-rec" style={{ display: 'grid', gap: 16, paddingBottom: 48 }}>
            <div style={{ display: 'grid', gap: 4 }}>
              <h3 id="t-rec" style={TITLE}>Nuestras recomendaciones</h3>
              <p style={{ margin: 0, color: C.muted, fontSize: 15 }}>
                Las viviendas que mejor encajan con tu presupuesto.
              </p>
            </div>
            {recLoading ? (
              <div style={GRID}><SkeletonCard /><SkeletonCard /><SkeletonCard /></div>
            ) : (
              <div style={GRID}>{recItems.map((v) => <Card key={v.slug} v={v} destacada />)}</div>
            )}
          </section>
        )}

        {failed && (
          <section style={{ background: C.surface, borderRadius: 24, padding: '28px 24px', display: 'grid', gap: 12, marginBottom: 48 }}>
            <h3 style={{ ...TITLE, fontSize: 21 }}>No hemos podido cargar las viviendas</h3>
            <p style={{ margin: 0, color: C.muted, fontSize: 16 }}>
              Revisa que has abierto el enlace completo que te enviamos por WhatsApp.
            </p>
          </section>
        )}

        {!failed && rec && (
          <section
            id="buscar"
            aria-labelledby="t-buscar"
            style={{ display: 'grid', gap: 20, paddingBottom: 56, scrollMarginTop: 16 }}
          >
            <div style={{ display: 'grid', gap: 4 }}>
              <h3 id="t-buscar" style={TITLE}>Busca más viviendas</h3>
              <p style={{ margin: 0, color: C.muted, fontSize: 15 }}>
                Te mostramos los anuncios más recientes, siempre dentro de tu presupuesto.
              </p>
            </div>

            <form
              onSubmit={onSubmit}
              style={{
                background: C.surface, borderRadius: 24, padding: 20, display: 'grid', gap: 14,
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))', alignItems: 'end',
              }}
            >
              <Field label="Ciudad" htmlFor="f-ciudad">
                <input id="f-ciudad" style={INPUT} value={f.ciudad} onChange={set('ciudad')} placeholder="Ej. Barcelona" />
              </Field>
              <Field label="Precio mínimo" htmlFor="f-pmin">
                <input
                  id="f-pmin" style={INPUT} type="number" inputMode="numeric" min={rec.minimo} max={techo} step={1000}
                  value={f.pmin} onChange={set('pmin')} placeholder={euros(rec.minimo)}
                />
              </Field>
              <Field label="Precio máximo" htmlFor="f-pmax">
                <input
                  id="f-pmax" style={INPUT} type="number" inputMode="numeric" min={rec.minimo} max={techo} step={1000}
                  value={f.pmax} onChange={set('pmax')} placeholder={euros(techo)}
                />
              </Field>
              <Field label="Habitaciones" htmlFor="f-hab">
                <select id="f-hab" style={INPUT} value={f.hab} onChange={set('hab')}>
                  <option value="">Cualquiera</option>
                  <option value="1">1 o más</option>
                  <option value="2">2 o más</option>
                  <option value="3">3 o más</option>
                  <option value="4">4 o más</option>
                </select>
              </Field>
              <Field label="Tipo" htmlFor="f-tipo">
                <select id="f-tipo" style={INPUT} value={f.tipo} onChange={set('tipo')}>
                  <option value="">Todos</option>
                  <option value="piso">Piso</option>
                  <option value="casa">Casa</option>
                </select>
              </Field>
              <Field label="Superficie mínima" htmlFor="f-m2">
                <input
                  id="f-m2" style={INPUT} type="number" inputMode="numeric" min={0} step={5}
                  value={f.m2} onChange={set('m2')} placeholder="m²"
                />
              </Field>
              <Button type="submit" variant="primary" size="md" fullWidth style={{ height: 46, padding: '0 20px' }}>
                <Search size={18} /> Buscar
              </Button>
            </form>
            <p style={{ margin: '-8px 0 0', color: C.muted, fontSize: 13 }}>
              El precio máximo no puede superar tu presupuesto de {euros(techo)}.
            </p>

            {resLoading && visibles.length === 0 ? (
              <div style={GRID}><SkeletonCard /><SkeletonCard /><SkeletonCard /></div>
            ) : visibles.length > 0 ? (
              <div style={GRID}>{visibles.map((v) => <Card key={v.slug} v={v} />)}</div>
            ) : searched ? (
              <p style={{ margin: 0, color: C.text, fontSize: 16 }}>
                No hay viviendas con estos filtros. Prueba a cambiar la ciudad o a quitar algún filtro.
              </p>
            ) : null}

            {res?.hayMas && visibles.length > 0 && searched && (
              <div>
                <Button variant="secondary" size="md" onClick={() => runSearch(searched, res.nextOffset)}>
                  {resLoading ? 'Cargando…' : 'Cargar más'}
                </Button>
              </div>
            )}
          </section>
        )}
      </main>

      <footer style={{ borderTop: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '22px 20px', display: 'grid', gap: 6, fontSize: 13, color: C.muted }}>
          <span>
            Anuncios publicados en Voxhouses. El contacto es directo con el anunciante. Precio y disponibilidad sujetos a confirmación.
          </span>
          <span>Tu Hogar Posible · Apunto Growth Agency S.L.</span>
        </div>
      </footer>
    </div>
  );
}
