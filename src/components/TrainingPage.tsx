import React, { useEffect } from 'react';
import { ArrowLeft, BookOpen, Target, Megaphone, Cpu, CheckCircle2 } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';
import { TiltCard } from './TiltCard';

interface TrainingPageProps {
  onBack: () => void;
}

export const TrainingPage: React.FC<TrainingPageProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleStartNow = () => {
    const message = encodeURIComponent("¡Hola! Acabo de ver la página web de Tu Hogar Posible y quiero saber más sobre la formación de agentes.");
    window.location.href = `https://wa.me/34722708068?text=${message}`;
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="relative pt-32 pb-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/40 via-slate-900 to-slate-900" />
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600 blur-[120px] opacity-20" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button 
            onClick={onBack} 
            className="flex items-center gap-2 text-blue-400 font-bold mb-12 hover:text-blue-300 transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Volver al Inicio
          </button>
          <div className="max-w-4xl">
            <RevealOnScroll direction="up">
              <div className="space-y-8">
                <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600 text-white text-xs font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                  Academy • Tu Hogar Posible
                </span>
                <h1 className="text-5xl md:text-8xl font-black text-white leading-[1] tracking-tighter">
                  FORMACIÓN DE <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">AGENTES INMOBILIARIOS</span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-light max-w-2xl">
                  Programa orientado a convertir a cualquier perfil (nuevo o con experiencia) en un agente operativo, consistente y rentable. Domina el método que está cambiando el sector.
                </p>
                <div className="pt-4">
                  <button 
                    onClick={handleStartNow}
                    className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-blue-600/50 hover:bg-blue-500 hover:scale-105 transition-all w-fit block text-center"
                  >
                    Quiero empezar mi formación
                  </button>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <section className="py-24 space-y-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
            <RevealOnScroll direction="left" className="flex flex-col justify-center">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <BookOpen size={32} />
                </div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tight">Operativa Inmobiliaria</h2>
                <ul className="space-y-4">
                  {[
                    "Operativa inmobiliaria y ciclo completo de la venta",
                    "Captación, valoración y preparación del inmueble",
                    "Gestión de visitas, compradores y seguimiento",
                    "Documentación, procesos y control de la operación",
                    "Metodología de trabajo diaria (pipeline, prioridades, hábitos)"
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-slate-600 text-lg">
                      <CheckCircle2 className="text-blue-500 flex-shrink-0 mt-1" size={24} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
            <RevealOnScroll direction="right" className="h-full">
              <TiltCard intensity={10} className="h-full">
                <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white h-full relative min-h-[400px]">
                  <img 
                    src="https://st3.idealista.pt/news/arquivos/styles/fullwidth_xl/public/2023-03/images/pexels-edmond-dantes-4344860_1.jpg?VersionId=qmjWJv0yG5CFGP1rOEfRkHyHGESdaTpI&itok=bjyddOPa" 
                    alt="Formación Agentes" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay" />
                </div>
              </TiltCard>
            </RevealOnScroll>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
            <div className="order-2 lg:order-1 h-full">
              <RevealOnScroll direction="left" className="h-full">
                <TiltCard intensity={10} className="h-full">
                  <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white h-full relative min-h-[400px]">
                    <img 
                      src="https://i.postimg.cc/qq6xZV27/Chat-GPT-Image-Jan-27-2026-09-27-09-AM.png" 
                      alt="Estrategia Comercial" 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-indigo-600/10 mix-blend-overlay" />
                  </div>
                </TiltCard>
              </RevealOnScroll>
            </div>
            <div className="order-1 lg:order-2 flex flex-col justify-center">
              <RevealOnScroll direction="right">
                <div className="space-y-6">
                  <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Target size={32} />
                  </div>
                  <h2 className="text-4xl font-black text-slate-900 tracking-tight">Ventas y Estrategia</h2>
                  <ul className="space-y-4">
                    {[
                      "Técnicas de venta consultiva aplicadas al inmobiliario",
                      "Guiones de llamada, citas y presentación de servicios",
                      "Manejo de objeciones (precio, comisión, exclusividad)",
                      "Negociación y cierres con control del proceso",
                      "Estrategia comercial: segmentación y posicionamiento"
                    ].map((item, idx) => (
                      <li key={idx} className="flex gap-3 text-slate-600 text-lg">
                        <CheckCircle2 className="text-indigo-500 flex-shrink-0 mt-1" size={24} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RevealOnScroll>
            <h2 className="text-4xl font-black mb-12">¿Para quién es?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                "Nuevos agentes que quieren empezar con estructura",
                "Agentes con experiencia que buscan escalar resultados",
                "Equipos comerciales que necesitan método común",
                "Profesionales que quieren dominar leads y ventas"
              ].map((text, idx) => (
                <div key={idx} className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-center">
                  <p className="font-semibold text-blue-200">{text}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="py-32 bg-blue-600 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[150%] rounded-full bg-white opacity-10 blur-[100px]" />
        </div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <RevealOnScroll>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">¿Listo para convertirte en un Agente de Élite?</h2>
            <p className="text-2xl text-blue-100 mb-12 font-light">Únete hoy y domina el mercado inmobiliario con el método Tu Hogar Posible.</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={handleStartNow}
                className="bg-white text-blue-600 px-12 py-6 rounded-2xl font-black text-xl shadow-2xl hover:scale-105 transition-all text-center"
              >
                Inscribirme Ahora
              </button>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
};
