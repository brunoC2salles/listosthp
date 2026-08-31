import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { ArrowRight, Check } from '../ui/Icons';
import { FONT_STACK } from '../ui/fontStack';
import { useIsMobile } from '../hooks/useIsMobile';

type FormState = { nombre: string; email: string; telefono: string; importe: string };
type Errors = Partial<Record<keyof FormState, string>>;

export function LeadForm({ cta }: { cta: string }) {
  const [form, setForm] = useState<FormState>({ nombre: '', email: '', telefono: '', importe: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const isMobile = useIsMobile();
  const set = (k: keyof FormState) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Errors = {};
    if (!form.nombre.trim()) err.nombre = 'Indícanos cómo te llamas';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = 'Revisa tu email';
    if (!/^[0-9 +-]{8,}$/.test(form.telefono)) err.telefono = 'Teléfono no válido';
    if (Object.keys(err).length) { setErrors(err); return; }
    setErrors({});
    setSent(true);
  };

  return (
    <section id="contacto" style={{ background: '#0A0B0D', padding: isMobile ? '48px 20px' : '72px 40px', color: '#fff' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 40 : 96, alignItems: 'center' }}>
        <div>
          <div style={{ font: `600 11px/1 ${FONT_STACK}`, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>Empezar</div>
          <h2 style={{ font: `400 ${isMobile ? '36px' : '64px'}/1.04 ${FONT_STACK}`, letterSpacing: '-0.035em', color: '#fff', margin: '20px 0 24px', textWrap: 'balance' }}>
            Cuéntanos tu situación.{' '}<span style={{ color: '#6FA9F9' }}>Nosotros te decimos cómo.</span>
          </h2>
          <p style={{ font: `400 17px/1.6 ${FONT_STACK}`, color: 'rgba(255,255,255,0.7)', margin: 0, maxWidth: 460 }}>
            Te llamamos en menos de 24 h con un estudio gratuito y personalizado. Sin compromiso, sin afectar tu scoring.
          </p>
          <div style={{ marginTop: isMobile ? 32 : 40, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {['Estudio gratuito y personalizado', 'Te acompañamos hasta las llaves'].map((t) => (
              <div key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 12, font: `500 15px ${FONT_STACK}`, color: 'rgba(255,255,255,0.85)' }}>
                <span style={{ width: 22, height: 22, borderRadius: 9999, background: 'rgba(61,139,247,0.18)', color: '#6FA9F9', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={12} />
                </span>
                {t}
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#141618', borderRadius: 24, padding: isMobile ? 24 : 40, border: '1px solid rgba(255,255,255,0.06)' }}>
          {sent ? (
            <div style={{ padding: '32px 8px', textAlign: 'left' }}>
              <div style={{ width: 56, height: 56, borderRadius: 9999, background: 'rgba(61,139,247,0.16)', color: '#6FA9F9', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                <Check size={28} />
              </div>
              <h3 style={{ font: `400 28px/1.15 ${FONT_STACK}`, color: '#fff', margin: '0 0 12px', letterSpacing: '-0.02em' }}>Recibido, {form.nombre.split(' ')[0]}.</h3>
              <p style={{ font: `400 16px/1.55 ${FONT_STACK}`, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                Te llamamos en menos de 24 h al {form.telefono}. Si prefieres, agendamos una hora concreta por email.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <DarkInput label="Nombre completo" value={form.nombre} onChange={set('nombre')} placeholder="María García" error={errors.nombre} />
              <DarkInput label="Email" type="email" value={form.email} onChange={set('email')} placeholder="maria@ejemplo.com" error={errors.email} />
              <DarkInput label="Teléfono" value={form.telefono} onChange={set('telefono')} placeholder="+34 600 123 456" error={errors.telefono} />
              <DarkInput label="Importe aproximado de la vivienda" prefix="€" value={form.importe} onChange={set('importe')} placeholder="220.000" />
              <Button type="submit" size="lg" fullWidth>{cta}<ArrowRight size={16} /></Button>
              <div style={{ font: `400 12px/1.5 ${FONT_STACK}`, color: 'rgba(255,255,255,0.45)', textAlign: 'center' }}>
                Al enviar aceptas nuestra <a href="#/legal" style={{ color: 'rgba(255,255,255,0.7)' }}>política de privacidad</a>.
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

type DarkInputProps = { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; prefix?: string; error?: string };

function DarkInput({ label, value, onChange, placeholder, type = 'text', prefix, error }: DarkInputProps) {
  const [focus, setFocus] = useState(false);
  return (
    <label>
      <div style={{ font: `600 11px/1 ${FONT_STACK}`, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.10em', textTransform: 'uppercase', marginBottom: 8 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: focus ? '#1C1F23' : 'rgba(255,255,255,0.04)', borderRadius: 12, padding: '14px 16px', boxShadow: error ? '0 0 0 1.5px #EF4444' : focus ? '0 0 0 1.5px #6FA9F9, 0 0 0 5px rgba(111,169,249,0.15)' : 'inset 0 0 0 1px rgba(255,255,255,0.06)', transition: 'all 200ms cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
        {prefix && <span style={{ color: 'rgba(255,255,255,0.5)', font: `500 15px ${FONT_STACK}` }}>{prefix}</span>}
        <input type={type} value={value || ''} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{ background: 'transparent', border: 0, outline: 0, font: `400 15px/1.4 ${FONT_STACK}`, color: '#fff', width: '100%' }} />
      </div>
      {error && <div style={{ font: `400 12px/1.4 ${FONT_STACK}`, color: '#FCA5A5', marginTop: 6 }}>{error}</div>}
    </label>
  );
}
