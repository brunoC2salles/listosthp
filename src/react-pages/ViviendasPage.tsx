import { CSSProperties, FormEvent, ReactNode, useEffect, useRef, useState } from 'react';
import {
  BedDouble, ChevronLeft, ChevronRight, ExternalLink, MapPin, MessageCircle, Phone, Ruler, Search, Wallet,
} from 'lucide-react';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { Eyebrow } from '../ui/Eyebrow';
import { FONT_STACK } from '../ui/fontStack';

// /viviendas/
//  - Con enlace del lead (?i=<búsqueda Idealista del CRM> o ?ciudad=&max=): recomendaciones + búsqueda con su tope.
//  - Sin enlace: solo búsqueda, rango 70.000-250.000 € (decisión 13/10/2026).
//  - Búsqueda: todos los anuncios del Voxhouses con los filtros elegidos, paginando con cursor.
//  - Ciudad: obligatorio elegirla en la lista (envía su código INE); precio escrito en Desde/Hasta o con el slider (26/10/2026).
const API = 'https://tnzgpzablwfptagfbnvb.supabase.co/functions/v1/viviendas-recomendadas';
const LIBRE_MIN = 70000;
const LIBRE_MAX = 250000;
const BUSCAR_MAX = 250000; // tope de la búsqueda, con o sin enlace del lead (decisión 13/10/2026)
const STEP = 5000;

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
  contacto: Contacto | null;
};

type Respuesta = {
  ciudad: string;
  cod?: string | null;
  max: number;
  techo: number;
  minimo: number;
  total: number;
  nextOffset?: number;
  cursor?: string;
  hayMas: boolean;
  viviendas: Vivienda[];
  error?: string;
};

type Filtros = { ciudad: string; hab: string; tipo: string; m2: string };

const euros = (n: number) => `${Math.round(n).toLocaleString('es-ES', { useGrouping: true })} €`;
const WRAP: CSSProperties = { maxWidth: 1320, margin: '0 auto', padding: '0 24px' };
const GRID: CSSProperties = {
  display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
};
const TITLE: CSSProperties = { margin: 0, font: `700 26px/1.2 ${FONT_STACK}`, letterSpacing: '-0.02em', color: C.ink };
const LEAD: CSSProperties = { margin: 0, color: C.muted, fontSize: 17, lineHeight: 1.6 };

const RANGE_CSS = `
.thp-h1 { font-size: clamp(32px, 5.5vw, 52px) !important; }
.thp-h2 { font-size: 26px !important; }
.thp-range { position: relative; height: 32px; }
.thp-range input[type=range] {
  position: absolute; left: 0; right: 0; top: 0; width: 100%; height: 32px; margin: 0;
  background: none; pointer-events: none; -webkit-appearance: none; appearance: none;
}
.thp-range input[type=range]::-webkit-slider-runnable-track { background: none; height: 32px; }
.thp-range input[type=range]::-moz-range-track { background: none; }
.thp-range input[type=range]::-webkit-slider-thumb {
  pointer-events: auto; -webkit-appearance: none; appearance: none; width: 26px; height: 26px; margin-top: 3px;
  border-radius: 9999px; background: #fff; border: 2px solid ${C.blue}; box-shadow: 0 2px 6px rgba(10,11,13,0.18); cursor: grab;
}
.thp-range input[type=range]::-moz-range-thumb {
  pointer-events: auto; width: 22px; height: 22px; border-radius: 9999px; background: #fff;
  border: 2px solid ${C.blue}; box-shadow: 0 2px 6px rgba(10,11,13,0.18); cursor: grab;
}
.thp-range input[type=range]:focus-visible::-webkit-slider-thumb { outline: 3px solid rgba(61,139,247,0.35); }
.thp-range input[type=range]:focus-visible::-moz-range-thumb { outline: 3px solid rgba(61,139,247,0.35); }
`;

// Precio escrito o del slider, dentro de los límites y con el mínimo por debajo del máximo (26/10/2026)
function ajustarPrecio(v: [number, number], min: number, max: number): [number, number] {
  const c = (n: number) => Math.min(max, Math.max(min, Math.round(n) || 0));
  const a = c(v[0]), b = c(v[1]);
  return a <= b ? [a, b] : [b, a];
}

function MoneyInput({
  id, label, value, onChange, onBlur,
}: { id: string; label: string; value: number; onChange: (n: number) => void; onBlur: () => void }) {
  const [focus, setFocus] = useState(false);
  const [raw, setRaw] = useState('');
  const recienFoco = useRef(false);
  const ref = useRef<HTMLInputElement>(null);
  // al entrar en el campo se selecciona el valor (después de cambiar al formato sin puntos) para escribir encima
  useEffect(() => { if (focus) ref.current?.select(); }, [focus]);
  return (
    <label htmlFor={id} style={{ display: 'grid', gap: 6, minWidth: 0 }}>
      <span style={{ fontSize: 12, fontWeight: 500, color: C.muted }}>{label}</span>
      <span style={{ position: 'relative', display: 'block', minWidth: 0 }}>
        <input
          id={id}
          style={{ ...INPUT, paddingRight: 34, fontVariantNumeric: 'tabular-nums' }}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={focus ? raw : Math.round(value).toLocaleString('es-ES', { useGrouping: true })}
          ref={ref}
          onFocus={() => {
            setFocus(true);
            setRaw(String(Math.round(value)));
            recienFoco.current = true;
          }}
          onMouseUp={(e) => {
            // el clic que da el foco no debe quitar la selección: así se escribe encima del valor
            if (recienFoco.current) { e.preventDefault(); recienFoco.current = false; }
          }}
          onChange={(e) => {
            const d = e.target.value.replace(/\D/g, '').slice(0, 7);
            setRaw(d);
            if (d) onChange(Number(d));
          }}
          onBlur={() => { setFocus(false); onBlur(); }}
        />
        <span
          aria-hidden="true"
          style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: C.muted, pointerEvents: 'none' }}
        >
          €
        </span>
      </span>
    </label>
  );
}

function PriceRange({
  min, max, value, onChange,
}: { min: number; max: number; value: [number, number]; onChange: (v: [number, number]) => void }) {
  const [lo, hi] = value;
  const pct = (n: number) => Math.min(100, Math.max(0, ((n - min) / Math.max(1, max - min)) * 100));
  const fijar = () => onChange(ajustarPrecio(value, min, max));
  return (
    <div style={{ display: 'grid', gap: 10, minWidth: 0 }}>
      <span style={{ font: `600 13px/1 ${FONT_STACK}`, color: C.text }}>Precio</span>
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
        <MoneyInput id="f-pdesde" label="Desde" value={lo} onChange={(n) => onChange([n, hi])} onBlur={fijar} />
        <MoneyInput id="f-phasta" label="Hasta" value={hi} onChange={(n) => onChange([lo, n])} onBlur={fijar} />
      </div>
      <div className="thp-range">
        <div style={{ position: 'absolute', left: 0, right: 0, top: 14, height: 4, borderRadius: 9999, background: C.line }} />
        <div
          style={{
            position: 'absolute', top: 14, height: 4, borderRadius: 9999, background: C.blue,
            left: `${pct(lo)}%`, right: `${100 - pct(hi)}%`,
          }}
        />
        <input
          id="f-pmin" type="range" aria-label="Precio mínimo" min={min} max={max} step={STEP} value={lo}
          style={{ zIndex: pct(lo) > 50 ? 3 : 1 }}
          onChange={(e) => onChange([Math.min(Number(e.target.value), hi - STEP), hi])}
        />
        <input
          id="f-pmax" type="range" aria-label="Precio máximo" min={min} max={max} step={STEP} value={hi}
          style={{ zIndex: 2 }}
          onChange={(e) => onChange([lo, Math.max(Number(e.target.value), lo + STEP)])}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: C.muted, fontSize: 12, fontVariantNumeric: 'tabular-nums' }}>
        <span>{euros(min)}</span>
        <span>{euros(max)}</span>
      </div>
    </div>
  );
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
      {fotos.length === 0 && (
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: C.muted, fontSize: 14 }}>
          Sin fotos
        </div>
      )}
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
  const wa = v.contacto?.tipo === 'whatsapp';
  const btn: CSSProperties = {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, textDecoration: 'none',
    borderRadius: 9999, padding: '14px 18px', font: `700 15px/1 ${FONT_STACK}`, letterSpacing: '-0.01em',
  };
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
        <div style={{ marginTop: 'auto', display: 'grid', gap: 8, paddingTop: 4 }}>
          {v.contacto && (
            <a
              href={v.contacto.url}
              target={wa ? '_blank' : undefined}
              rel={wa ? 'noopener' : undefined}
              style={{ ...btn, background: C.blue, color: C.white }}
            >
              {wa ? <MessageCircle size={18} /> : <Phone size={18} />}
              {wa ? 'Contactar por WhatsApp' : 'Llamar'}
            </a>
          )}
          <a
            href={v.url}
            target="_blank"
            rel="noopener"
            style={v.contacto
              ? { ...btn, color: C.blue, boxShadow: `inset 0 0 0 1.5px ${C.blue}` }
              : { ...btn, background: C.blue, color: C.white }}
          >
            Ver más <ExternalLink size={16} />
          </a>
          {(v.anunciante || v.contacto) && (
            <p style={{ margin: 0, textAlign: 'center', color: C.muted, fontSize: 13, userSelect: 'all' as const }}>
              {[v.anunciante, v.contacto?.numero].filter(Boolean).join(' · ')}
            </p>
          )}
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

type Sugerencia = { nombre: string; region: string; cod: string };

function CityInput({
  value, onChange, onSelect,
}: { value: string; onChange: (v: string) => void; onSelect: (s: Sugerencia) => void }) {
  const [items, setItems] = useState<Sugerencia[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const timer = useRef<number | undefined>(undefined);
  const lastQ = useRef('');

  const pedir = (texto: string) => {
    window.clearTimeout(timer.current);
    const t = texto.trim();
    if (t.length < 2) { setItems([]); setOpen(false); return; }
    timer.current = window.setTimeout(() => {
      lastQ.current = t;
      fetch(`${API}?sugerir=${encodeURIComponent(t)}`)
        .then((r) => r.json())
        .then((d: { sugerencias?: Sugerencia[] }) => {
          if (lastQ.current !== t) return;
          setItems(d.sugerencias || []);
          setActive(-1);
          setOpen((d.sugerencias || []).length > 0);
        })
        .catch(() => setOpen(false));
    }, 180);
  };

  const elegir = (sug: Sugerencia) => {
    onSelect(sug);
    setOpen(false);
    setItems([]);
  };

  return (
    <div style={{ position: 'relative', minWidth: 0 }}>
      <input
        id="f-ciudad"
        style={INPUT}
        value={value}
        placeholder="Ej. Zaragoza"
        autoComplete="off"
        role="combobox"
        aria-expanded={open}
        aria-controls="f-ciudad-lista"
        aria-autocomplete="list"
        aria-activedescendant={active >= 0 ? `f-ciudad-op-${active}` : undefined}
        onChange={(e) => { onChange(e.target.value); pedir(e.target.value); }}
        onFocus={() => { if (items.length) setOpen(true); }}
        onBlur={() => window.setTimeout(() => setOpen(false), 150)}
        onKeyDown={(e) => {
          if (!open || !items.length) return;
          if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => (a + 1) % items.length); }
          else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => (a <= 0 ? items.length - 1 : a - 1)); }
          else if (e.key === 'Enter') { e.preventDefault(); elegir(items[active >= 0 ? active : 0]); }
          else if (e.key === 'Escape') setOpen(false);
        }}
      />
      {open && (
        <ul
          id="f-ciudad-lista"
          role="listbox"
          style={{
            position: 'absolute', zIndex: 20, top: 'calc(100% + 6px)', left: 0, right: 0, margin: 0, padding: 6,
            listStyle: 'none', background: C.white, border: `1px solid ${C.line}`, borderRadius: 14,
            boxShadow: '0 12px 32px rgba(10,11,13,0.12)', maxHeight: 320, overflowY: 'auto',
          }}
        >
          {items.map((it, i) => (
            <li
              key={it.cod || `${it.nombre}-${it.region}`}
              id={`f-ciudad-op-${i}`}
              role="option"
              aria-selected={i === active}
              onMouseDown={(e) => { e.preventDefault(); elegir(it); }}
              onMouseEnter={() => setActive(i)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, cursor: 'pointer',
                background: i === active ? 'rgba(61,139,247,0.08)' : 'transparent',
              }}
            >
              <MapPin size={16} color={C.blue} />
              <span style={{ display: 'grid', gap: 2, minWidth: 0 }}>
                <span style={{ font: `600 15px/1.2 ${FONT_STACK}`, color: C.ink }}>{it.nombre}</span>
                <span style={{ fontSize: 12, color: C.muted }}>{it.region}</span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const INFO = [
  {
    Icon: Search,
    titulo: 'Busca por ciudad y presupuesto',
    texto: 'Filtra por ciudad, precio, habitaciones, tipo de vivienda y superficie mínima. Te mostramos primero los anuncios más recientes.',
    enlace: null,
  },
  {
    Icon: MessageCircle,
    titulo: 'Contacta con el anunciante',
    texto: 'Los anuncios están publicados en Voxhouses y el contacto es directo con el anunciante, por WhatsApp o por teléfono. Precio y disponibilidad sujetos a confirmación.',
    enlace: null,
  },
  {
    Icon: Wallet,
    titulo: 'Financiación hasta el 100%',
    texto: 'En Tu Hogar Posible te ayudamos a conseguir financiación hasta el 100% para comprar tu vivienda.',
    enlace: { href: '/#simulador', texto: 'Calcula tu financiación' },
  },
];

export function ViviendasPage() {
  const [ready, setReady] = useState(false);
  const [libre, setLibre] = useState(false);
  const [base, setBase] = useState<URLSearchParams>(new URLSearchParams());
  const [rec, setRec] = useState<Respuesta | null>(null);
  const [recItems, setRecItems] = useState<Vivienda[]>([]);
  const [recLoading, setRecLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  const [f, setF] = useState<Filtros>({ ciudad: '', hab: '', tipo: '', m2: '' });
  // Ciudad elegida en la lista de sugerencias (código INE); escribir sin elegir no permite buscar (26/10/2026)
  const [cod, setCod] = useState('');
  const [ciudadOk, setCiudadOk] = useState(false);
  const [bounds, setBounds] = useState<[number, number]>([LIBRE_MIN, LIBRE_MAX]);
  const [precio, setPrecio] = useState<[number, number]>([LIBRE_MIN, LIBRE_MAX]);
  const [res, setRes] = useState<Respuesta | null>(null);
  const [resItems, setResItems] = useState<Vivienda[]>([]);
  const [resLoading, setResLoading] = useState(false);
  const [searched, setSearched] = useState<URLSearchParams | null>(null);
  const [aviso, setAviso] = useState('');

  const recSlugs = new Set(recItems.map((v) => v.slug));

  const searchQuery = (filtros: Filtros, rango: [number, number], lim: [number, number], b: URLSearchParams, codigo: string) => {
    const q = new URLSearchParams(b);
    q.set('modo', 'buscar');
    if (codigo) q.set('cod', codigo);
    (Object.keys(filtros) as (keyof Filtros)[]).forEach((k) => {
      const val = filtros[k].trim();
      if (val) q.set(k, val);
    });
    if (rango[0] > lim[0]) q.set('pmin', String(rango[0]));
    if (rango[1] < lim[1]) q.set('pmax', String(rango[1]));
    return q;
  };

  const runSearch = (q: URLSearchParams, cursor = '') => {
    setResLoading(true);
    if (!cursor) { setResItems([]); setSearched(q); setRes(null); }
    fetch(`${API}?${q.toString()}${cursor ? `&cursor=${cursor}` : ''}&count=6`)
      .then((r) => r.json())
      .then((d: Respuesta) => {
        if (d.error) throw new Error(d.error);
        setRes((prev) => (cursor && prev ? { ...d, total: prev.total } : d));
        setResItems((prev) => (cursor ? [...prev, ...d.viviendas] : d.viviendas));
      })
      .catch(() => setRes((prev) => (prev ? { ...prev, hayMas: false } : prev)))
      .finally(() => setResLoading(false));
  };

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const b = new URLSearchParams();
    if (sp.get('i')) b.set('i', sp.get('i') as string);
    else if (sp.get('max')) {
      b.set('max', sp.get('max') as string);
      if (sp.get('ciudad')) b.set('ciudad', sp.get('ciudad') as string);
    }
    setReady(true);
    if (!b.toString()) { setLibre(true); return; }
    setBase(b);
    setRecLoading(true);
    // rec: conjunto de viviendas enviado en el seguimiento por WhatsApp (19/10/2026)
    const rec = sp.get('rec');
    fetch(`${API}?${b.toString()}&count=3${rec ? `&rec=${encodeURIComponent(rec)}` : ''}`)
      .then((r) => r.json())
      .then((d: Respuesta) => {
        if (d.error) throw new Error(d.error);
        setRec(d);
        setRecItems(d.viviendas || []);
        const lim: [number, number] = [d.minimo, BUSCAR_MAX];
        const inicial: [number, number] = [d.minimo, Math.min(d.techo, BUSCAR_MAX)];
        setBounds(lim);
        setPrecio(inicial);
        const init: Filtros = { ciudad: d.ciudad, hab: '', tipo: '', m2: '' };
        setF(init);
        setCod(d.cod || '');
        setCiudadOk(true);
        runSearch(searchQuery(init, inicial, lim, b, d.cod || ''));
      })
      .catch(() => setFailed(true))
      .finally(() => setRecLoading(false));
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!f.ciudad.trim()) { setAviso('Escribe la ciudad donde quieres buscar.'); return; }
    if (!ciudadOk) { setAviso('Elige la ciudad en la lista de sugerencias.'); return; }
    setAviso('');
    const rango = ajustarPrecio(precio, bounds[0], bounds[1]);
    setPrecio(rango);
    runSearch(searchQuery(f, rango, bounds, base, cod));
  };

  const ciudad = rec?.ciudad;
  const techo = rec?.techo || 0;
  const visibles = resItems.filter((v) => !recSlugs.has(v.slug));
  const set = (k: keyof Filtros) => (e: { target: { value: string } }) => setF((p) => ({ ...p, [k]: e.target.value }));
  const showSearch = ready && !failed && (libre || !!rec);

  return (
    <div id="top" style={{ minHeight: '100vh', background: C.white, color: C.text, fontFamily: FONT_STACK }}>
      <style>{RANGE_CSS}</style>
      <header style={{ borderBottom: `1px solid ${C.line}` }}>
        <div style={{ ...WRAP, paddingTop: 16, paddingBottom: 16 }}>
          <Logo />
        </div>
      </header>

      <main style={WRAP}>
        <section style={{ padding: '44px 0 32px', display: 'grid', gap: 14, minHeight: 160 }}>
          {!ready || libre ? (
            <>
              <Eyebrow color={C.blue}>Tu Hogar Posible</Eyebrow>
              <h1
                className="thp-h1"
                style={{
                  margin: 0, font: `800 clamp(32px, 5.5vw, 52px)/1.05 ${FONT_STACK}`, letterSpacing: '-0.03em', color: C.ink,
                }}
              >
                Busca tu vivienda
              </h1>
              <p style={LEAD}>
                Encuentra tu vivienda en la zona que elijas.
                <br />
                Te mostramos los anuncios más recientes y puedes contactar directamente con cada anunciante.
              </p>
            </>
          ) : (
            <>
              <Eyebrow color={C.blue}>Selección de Tu Hogar Posible</Eyebrow>
              <h1
                className="thp-h1"
                style={{
                  margin: 0, font: `800 clamp(32px, 5.5vw, 52px)/1.05 ${FONT_STACK}`, letterSpacing: '-0.03em', color: C.ink,
                }}
              >
                {ciudad ? `Viviendas para ti en ${ciudad}` : 'Viviendas para ti'}
              </h1>
              <p style={LEAD}>
                Hemos analizado tu caso y hemos hecho una búsqueda personalizada de viviendas que encajan con tu capacidad de
                compra. Más abajo también puedes buscar otras opciones con tus propios filtros.
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
            </>
          )}
        </section>

        {!libre && (recLoading || recItems.length > 0) && (
          <section aria-labelledby="t-rec" style={{ display: 'grid', gap: 18, paddingBottom: 52 }}>
            <div style={{ display: 'grid', gap: 6 }}>
              <h3 id="t-rec" style={TITLE}>Tu búsqueda personalizada</h3>
              <p style={LEAD}>
                Hemos estudiado tu situación (ingresos, ahorros y capacidad de financiación) y hemos seleccionado las viviendas
                que mejor aprovechan tu presupuesto. Son nuestras recomendaciones para tu caso.
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

        {showSearch && (
          <section
            id="buscar"
            aria-labelledby={libre ? undefined : 't-buscar'}
            aria-label={libre ? 'Buscar viviendas' : undefined}
            style={{ display: 'grid', gap: 20, paddingBottom: 60, scrollMarginTop: 16 }}
          >
            {!libre && (
              <div style={{ display: 'grid', gap: 6 }}>
                <h3 id="t-buscar" style={TITLE}>Busca más viviendas</h3>
                <p style={LEAD}>
                  Ajusta los filtros para ver otras opciones. Te mostramos primero los anuncios más recientes.
                </p>
              </div>
            )}

            <form
              onSubmit={onSubmit}
              style={{ background: C.surface, borderRadius: 24, padding: 24, display: 'grid', gap: 20 }}
            >
              <div
                style={{
                  display: 'grid', gap: 14, gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
                }}
              >
                <Field label="Ciudad" htmlFor="f-ciudad">
                  <CityInput
                    value={f.ciudad}
                    onChange={(v) => { setF((p) => ({ ...p, ciudad: v })); setCod(''); setCiudadOk(false); }}
                    onSelect={(sug) => {
                      setF((p) => ({ ...p, ciudad: sug.nombre }));
                      setCod(sug.cod || '');
                      setCiudadOk(true);
                      setAviso('');
                    }}
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
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'flex-end' }}>
                <div style={{ flex: '1 1 320px', minWidth: 0 }}>
                  <PriceRange min={bounds[0]} max={bounds[1]} value={precio} onChange={setPrecio} />
                </div>
                <Button type="submit" variant="primary" size="md" style={{ height: 48, padding: '0 32px', flex: '0 0 auto' }}>
                  <Search size={18} /> Buscar
                </Button>
              </div>
              {aviso && <p role="alert" style={{ margin: 0, color: C.text, fontSize: 14, fontWeight: 600 }}>{aviso}</p>}
            </form>

            {res && res.total > 0 && (
              <p style={{ margin: 0, font: `700 18px/1.3 ${FONT_STACK}`, color: C.ink, fontVariantNumeric: 'tabular-nums' }}>
                {res.total.toLocaleString('es-ES', { useGrouping: true })} {res.total === 1 ? 'vivienda' : 'viviendas'} en {res.ciudad}
              </p>
            )}

            {resLoading && visibles.length === 0 ? (
              <div style={GRID}><SkeletonCard /><SkeletonCard /><SkeletonCard /></div>
            ) : visibles.length > 0 ? (
              <div style={GRID}>{visibles.map((v) => <Card key={v.slug} v={v} />)}</div>
            ) : searched && res ? (
              <p style={{ margin: 0, color: C.text, fontSize: 16 }}>
                No hay viviendas con estos filtros. Prueba a cambiar la ciudad, ampliar el precio o quitar algún filtro.
              </p>
            ) : null}

            {res?.hayMas && visibles.length > 0 && searched && (
              <div>
                <Button variant="secondary" size="md" onClick={() => runSearch(searched, res.cursor || '')}>
                  {resLoading ? 'Cargando…' : 'Cargar más'}
                </Button>
              </div>
            )}
          </section>
        )}

        <section aria-labelledby="t-como" style={{ display: 'grid', gap: 20, paddingBottom: 64 }}>
          <h2 id="t-como" className="thp-h2" style={TITLE}>Cómo funciona</h2>
          <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))' }}>
            {INFO.map(({ Icon, titulo, texto, enlace }) => (
              <article
                key={titulo}
                style={{ background: C.surface, borderRadius: 24, padding: 24, display: 'grid', gap: 10, alignContent: 'start' }}
              >
                <span
                  style={{
                    width: 44, height: 44, borderRadius: 9999, background: 'rgba(61,139,247,0.12)',
                    display: 'grid', placeItems: 'center',
                  }}
                >
                  <Icon size={20} color={C.blue} />
                </span>
                <h3 style={{ margin: 0, font: `700 19px/1.25 ${FONT_STACK}`, letterSpacing: '-0.01em', color: C.ink }}>{titulo}</h3>
                <p style={{ margin: 0, color: C.muted, fontSize: 15, lineHeight: 1.6 }}>{texto}</p>
                {enlace && (
                  <a href={enlace.href} style={{ color: C.blue, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
                    {enlace.texto}
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer style={{ borderTop: `1px solid ${C.line}` }}>
        <div style={{ ...WRAP, paddingTop: 22, paddingBottom: 22, display: 'grid', gap: 6, fontSize: 13, color: C.muted }}>
          <span>
            Anuncios publicados en Voxhouses. El contacto es directo con el anunciante. Precio y disponibilidad sujetos a confirmación.
          </span>
          <span>Tu Hogar Posible · Apunto Growth Agency S.L.</span>
        </div>
      </footer>
    </div>
  );
}
