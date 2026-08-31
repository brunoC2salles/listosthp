import React, { useEffect } from 'react';
import { ArrowLeft, CheckCircle2, Play, Users, Building, ShieldCheck, BarChart3, Clock, Target } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';
import { TiltCard } from './TiltCard';
import { motion } from 'motion/react';

interface AgencySolutionPageProps {
  onBack: () => void;
}

export const AgencySolutionPage: React.FC<AgencySolutionPageProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleStartNow = () => {
    const message = encodeURIComponent("¡Hola! Me interesa la Solución para Agencias de Tu Hogar Posible. Quiero más información.");
    window.location.href = `https://wa.me/34722708068?text=${message}`;
  };

  const handleDemo = () => {
    const message = encodeURIComponent("¡Hola! Quiero agendar una demo personalizada de la Solución para Agencias.");
    window.location.href = `https://wa.me/34722708068?text=${message}`;
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop" 
            alt="Modern Office" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-slate-900 to-slate-900" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button 
            onClick={onBack} 
            className="flex items-center gap-2 text-blue-400 font-bold mb-12 hover:text-blue-300 transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Volver al Inicio
          </button>
          
            <div className="w-full">
              <div className="space-y-12 text-center" style={{ perspective: '2000px' }}>
                <motion.div 
                  initial={{ opacity: 0, y: 30, rotateX: 25, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, rotateX: 5, scale: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="space-y-4"
                >
                  <h1 className="text-5xl md:text-7xl lg:text-[10rem] font-black text-white leading-[0.9] tracking-tighter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]">
                    PROPRIEDADES <br /> MÁS ECONÓMICAS
                  </h1>
                  <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-blue-400 leading-tight tracking-tighter drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]">
                    con 100% de financiación
                  </h1>
                </motion.div>
              
              <RevealOnScroll direction="up">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
                  <div className="flex items-center gap-3 text-slate-300 text-xl">
                    <CheckCircle2 className="text-blue-500" size={24} />
                    <span>Sin cobrar nada al cliente.</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300 text-xl">
                    <CheckCircle2 className="text-blue-500" size={24} />
                    <span>Sin perder tiempo captando.</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300 text-xl">
                    <CheckCircle2 className="text-blue-500" size={24} />
                    <span>Sin operaciones que se bloquean por falta de ahorro.</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300 text-xl">
                    <CheckCircle2 className="text-blue-500" size={24} />
                    <span>Producto de vivienda bancaria más economico</span>
                  </div>
                </div>
              </RevealOnScroll>

                <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto">
                  Una estructura diseñada para agentes inmobiliarios en España que quieren cerrar más operaciones con mayor estabilidad.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                  <button 
                    onClick={handleStartNow}
                    className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:bg-blue-500 transition-all text-center"
                  >
                    QUIERO EMPEZAR AHORA
                  </button>
                  <button 
                    onClick={handleDemo}
                    className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all text-center"
                  >
                    RESERVAR DEMO PERSONALIZADA
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* Storyboard Section 1: The Problem */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
            <RevealOnScroll direction="left" className="flex flex-col justify-center">
              <div className="space-y-8">
                <h2 className="text-4xl font-black text-slate-900 tracking-tight">Una historia que conoces demasiado bien</h2>
                <div className="bg-slate-50 p-8 rounded-3xl border-l-8 border-blue-600 italic text-2xl text-slate-700 font-light">
                  “Me encantaría comprar, pero no tengo los ahorros suficientes.”
                </div>
                <p className="text-xl text-slate-600 leading-relaxed">
                  Durante años, esa frase ha sido el final de muchas operaciones.
                </p>
                <div className="space-y-4">
                  <p className="text-lg font-medium text-slate-800">El comprador quiere.</p>
                  <p className="text-lg font-medium text-slate-800">El agente ha trabajado.</p>
                  <p className="text-lg font-medium text-slate-800">La vivienda encaja.</p>
                </div>
                <p className="text-xl text-slate-600 leading-relaxed">
                  Pero al llegar al banco, la financiación no cuadra o el ahorro exigido es inasumible.
                </p>
                <p className="text-2xl font-bold text-red-600">Y la operación se detiene.</p>
                <div className="space-y-2 text-slate-500">
                  <p>No por falta de interés.</p>
                  <p>No por falta de profesionalidad.</p>
                  <p>Sino porque el proceso no acompaña.</p>
                </div>
              </div>
            </RevealOnScroll>
            <RevealOnScroll direction="right" className="flex flex-col">
              <TiltCard intensity={10} className="h-full">
                <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-50 h-full">
                  <img 
                    src="https://www.imovirtual.com/noticias/wp-content/uploads/2022/02/a4ca31f4-cc66-4c20-814c-2f98874a6410_iStock-1329458192.jpg" 
                    alt="Frustrated Agent" 
                    className="w-full h-full object-cover min-h-[500px]"
                  />
                </div>
              </TiltCard>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Section 2: The Model Problem */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RevealOnScroll>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-12 tracking-tight">El problema no es la demanda. Es el modelo.</h2>
            <p className="text-xl text-slate-600 mb-16 max-w-3xl mx-auto">
              El agente tradicional vive en un ciclo constante:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                { title: "Buscar propiedades", icon: <Building size={32} /> },
                { title: "Perseguir exclusivas", icon: <ShieldCheck size={32} /> },
                { title: "Realizar visitas", icon: <Users size={32} /> },
                { title: "Detectar interés real", icon: <Target size={32} /> },
                { title: "Descubrir tarde que no es financiable", icon: <Clock size={32} /> }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center gap-4">
                  <div className="text-blue-600">{item.icon}</div>
                  <p className="font-bold text-slate-800">{item.title}</p>
                </div>
              ))}
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="p-6 bg-red-50 rounded-2xl text-red-700 font-bold">El desgaste es alto.</div>
              <div className="p-6 bg-red-50 rounded-2xl text-red-700 font-bold">La previsibilidad es baja.</div>
              <div className="p-6 bg-red-50 rounded-2xl text-red-700 font-bold">La estabilidad es inexistente.</div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Section 3: The Solution */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600 blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealOnScroll direction="left">
              <TiltCard intensity={10}>
                <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white/10">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop" 
                    alt="Success Solution" 
                    className="w-full h-[500px] object-cover"
                  />
                </div>
              </TiltCard>
            </RevealOnScroll>
            <RevealOnScroll direction="right">
              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight">Solución para Agencias: un modelo diferente</h2>
                <p className="text-xl text-slate-300 leading-relaxed">
                  Solución para Agencias reorganiza el proceso inmobiliario desde el origen.
                </p>
                <div className="space-y-6">
                  {[
                    "Propiedades que ya cuentan con mandato en exclusiva.",
                    "Compradores previamente analizados.",
                    "Posibilidad de financiación hasta el 100%.",
                    "Servicio completamente gratuito para el cliente final.",
                    "Acceso a vivienda más económica mediante producto bancario cuando aplica."
                  ].map((text, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle2 size={16} />
                      </div>
                      <p className="text-lg text-slate-200">{text}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xl text-blue-400 font-bold pt-4">Esto cambia completamente la dinámica del agente.</p>
                <div className="flex gap-8 pt-4">
                  <div className="text-center">
                    <div className="text-3xl font-black">Menos</div>
                    <div className="text-slate-400 uppercase tracking-widest text-xs">Fricción</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black">Menos</div>
                    <div className="text-slate-400 uppercase tracking-widest text-xs">Incertidumbre</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black">Más</div>
                    <div className="text-slate-400 uppercase tracking-widest text-xs">Operaciones</div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Section 4: How it works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <h2 className="text-4xl font-black text-slate-900 mb-16 text-center tracking-tight">Cómo funciona</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                "Accedes a propriedades de manera formalizada",
                "Trabajas con compradores previamente evaluados.",
                "Ofreces financiación hasta el 100% sin coste para el cliente.",
                "El proceso se gestiona de forma más digital y estructurada.",
                "Aumenta la probabilidad real de cierre.",
                "El foco pasa de “intentar cerrar” a “cerrar con fundamento”."
              ].map((text, idx) => (
                <div key={idx} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex gap-4">
                  <div className="text-4xl font-black text-blue-200">{idx + 1}</div>
                  <p className="text-lg text-slate-700 font-medium">{text}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Section 5: Before vs After */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <h2 className="text-4xl font-black text-slate-900 mb-16 text-center tracking-tight">Qué cambia en tu día a día</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
                <h3 className="text-2xl font-bold text-red-600 mb-8 uppercase tracking-widest">Antes</h3>
                <ul className="space-y-6">
                  <li className="flex gap-4 text-slate-600 text-lg">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-3 flex-shrink-0" />
                    Captación constante.
                  </li>
                  <li className="flex gap-4 text-slate-600 text-lg">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-3 flex-shrink-0" />
                    Operaciones que se caen en fase bancaria.
                  </li>
                  <li className="flex gap-4 text-slate-600 text-lg">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-3 flex-shrink-0" />
                    Mucho esfuerzo, poca previsibilidad.
                  </li>
                </ul>
              </div>
              <div className="bg-blue-600 p-10 rounded-[3rem] shadow-xl text-white">
                <h3 className="text-2xl font-bold text-blue-200 mb-8 uppercase tracking-widest">Con Solución para Agencias</h3>
                <ul className="space-y-6">
                  <li className="flex gap-4 text-white text-lg">
                    <CheckCircle2 className="text-blue-300 mt-1 flex-shrink-0" size={24} />
                    Más tiempo dedicado a operaciones reales.
                  </li>
                  <li className="flex gap-4 text-white text-lg">
                    <CheckCircle2 className="text-blue-300 mt-1 flex-shrink-0" size={24} />
                    Menos bloqueos financieros.
                  </li>
                  <li className="flex gap-4 text-white text-lg">
                    <CheckCircle2 className="text-blue-300 mt-1 flex-shrink-0" size={24} />
                    Sin visitas
                  </li>
                  <li className="flex gap-4 text-white text-lg">
                    <CheckCircle2 className="text-blue-300 mt-1 flex-shrink-0" size={24} />
                    Sin tener que captar
                  </li>
                  <li className="flex gap-4 text-white text-lg">
                    <CheckCircle2 className="text-blue-300 mt-1 flex-shrink-0" size={24} />
                    Mayor confianza del vendedor.
                  </li>
                  <li className="flex gap-4 text-white text-lg">
                    <CheckCircle2 className="text-blue-300 mt-1 flex-shrink-0" size={24} />
                    Compradores con verdadera capacidad de compra.
                  </li>
                  <li className="flex gap-4 text-white text-lg">
                    <CheckCircle2 className="text-blue-300 mt-1 flex-shrink-0" size={24} />
                    Más estabilidad mensual.
                  </li>
                </ul>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Section 6: Demo */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RevealOnScroll>
            <h2 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">Demostración del sistema</h2>
            <p className="text-xl text-slate-600 mb-12">
              Descubre cómo funciona el modelo paso a paso y cómo implementarlo en tu agencia en España.
            </p>
            <div className="relative aspect-video bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl group cursor-pointer mb-12">
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1000&auto=format&fit=crop" 
                alt="Video Placeholder" 
                className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform">
                  <Play size={40} fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                <button className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold shadow-xl">
                  VER DEMOSTRACIÓN COMPLETA
                </button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleStartNow}
                className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-blue-500 transition-all"
              >
                ACTIVAR ACCESO AHORA
              </button>
              <button 
                onClick={handleDemo}
                className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-slate-800 transition-all"
              >
                AGENDAR DEMO PERSONALIZADA
              </button>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Section 7: Planes */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <h2 className="text-4xl font-black text-slate-900 mb-16 text-center tracking-tight">Planes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Plan 3 Meses */}
              <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">3 meses</h3>
                  <div className="text-4xl font-black text-blue-600 mb-6">250 € <span className="text-lg text-slate-400 font-normal">/ mes</span></div>
                  <p className="text-slate-500 mb-8">Pensado para agentes que desean validar el modelo e iniciar operaciones con mayor estabilidad.</p>
                </div>
                <button 
                  onClick={handleStartNow}
                  className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all"
                >
                  ACTIVAR PLAN 3 MESES
                </button>
              </div>

              {/* Plan 6 Meses - Featured */}
              <div className="bg-slate-900 p-10 rounded-[3rem] shadow-2xl border-4 border-blue-600 flex flex-col justify-between relative transform scale-105 z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-6 py-1 rounded-full text-sm font-black">RECOMENDADO</div>
                <div>
                  <h3 className="text-2xl font-black text-white mb-2">6 meses</h3>
                  <div className="text-4xl font-black text-blue-400 mb-2">170 € <span className="text-lg text-slate-500 font-normal">/ mes</span></div>
                  <div className="text-xl font-bold text-blue-300 mb-6">o 850 € <span className="text-sm font-normal opacity-80">pago único</span></div>
                  <p className="text-slate-400 mb-8">Mejor coste por periodo. Para agentes que buscan continuidad y previsibilidad.</p>
                </div>
                <button 
                  onClick={handleStartNow}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-500 transition-all"
                >
                  ACTIVAR PLAN 6 MESES
                </button>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Section 8: Planes para Agencias */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="bg-slate-900 rounded-[4rem] p-12 lg:p-20 text-white relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight">Planes para Agencias</h2>
                  <div className="space-y-8">
                    <div className="flex justify-between items-center border-b border-white/10 pb-6">
                      <span className="text-xl text-slate-300">Agencias con más de 5 empleados</span>
                      <span className="text-3xl font-black text-blue-400">170 € / mes</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/10 pb-6">
                      <span className="text-xl text-slate-300">Agencias con más de 10 empleados</span>
                      <span className="text-3xl font-black text-blue-400">120 € / mes por agente</span>
                    </div>
                  </div>
                  <p className="text-xl text-slate-400 mt-8 font-light">
                    Modelo escalable para equipos que desean aumentar cierres sin aumentar estructura.
                  </p>
                </div>
                <div className="flex flex-col gap-6">
                  <TiltCard intensity={5}>
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] text-center">
                      <Users size={48} className="mx-auto mb-6 text-blue-400" />
                      <button 
                        onClick={handleDemo}
                        className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-500 transition-all shadow-2xl shadow-blue-600/30"
                      >
                        SOLICITAR REUNIÓN PARA AGENCIAS
                      </button>
                    </div>
                  </TiltCard>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Section 9: Why it works */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RevealOnScroll>
            <h2 className="text-4xl font-black text-slate-900 mb-16 tracking-tight">Por qué este modelo funciona en España</h2>
            <div className="space-y-12">
              <div className="bg-white p-10 rounded-[3rem] shadow-lg border border-slate-100">
                <p className="text-2xl text-slate-700 font-light mb-4">Porque altera el orden del proceso inmobiliario:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <div className="text-blue-600 font-black text-xl">PASO 1</div>
                    <p className="text-slate-800 font-bold">Primero se valida la capacidad real.</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-blue-600 font-black text-xl">PASO 2</div>
                    <p className="text-slate-800 font-bold">Después se construye la operación.</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-10 rounded-[3rem] shadow-lg border border-slate-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <div className="text-blue-600 font-black text-xl">PASO 1</div>
                    <p className="text-slate-800 font-bold">Primero se estructura la financiación.</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-blue-600 font-black text-xl">PASO 2</div>
                    <p className="text-slate-800 font-bold">Después se ejecuta la compraventa.</p>
                  </div>
                </div>
              </div>
              <p className="text-3xl font-black text-slate-900 pt-8">Cuando el proceso cambia, la tasa de cierre mejora.</p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Section 10: Cierre */}
      <section className="py-32 bg-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[150%] rounded-full bg-white opacity-10 blur-[100px]" />
        </div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <RevealOnScroll>
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">El sector inmobiliario no necesita más esfuerzo.</h2>
            <p className="text-3xl font-light mb-16 text-blue-100">Necesita mejor estructura.</p>
            
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-12 rounded-[4rem] mb-16">
              <h3 className="text-2xl font-bold mb-8 uppercase tracking-widest text-blue-200">Si quieres:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                {[
                  "Mayor estabilidad.",
                  "Más claridad en cada operación.",
                  "Reducir operaciones bloqueadas.",
                  "Trabajar con compradores realmente preparados."
                ].map((text, idx) => (
                  <div key={idx} className="flex gap-4 items-center">
                    <CheckCircle2 className="text-blue-300" size={24} />
                    <span className="text-xl font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-3xl font-black mb-12">Solución para Agencias está diseñada para ti.</p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={handleStartNow}
                className="bg-white text-blue-600 px-12 py-6 rounded-2xl font-black text-xl shadow-2xl hover:scale-105 transition-all text-center"
              >
                QUIERO EMPEZAR AHORA
              </button>
              <button 
                onClick={handleDemo}
                className="bg-slate-900 text-white px-12 py-6 rounded-2xl font-black text-xl shadow-2xl hover:scale-105 transition-all text-center"
              >
                AGENDAR UNA DEMO
              </button>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Footer Back Button */}
      <div className="py-12 bg-slate-50 text-center">
        <button 
          onClick={onBack} 
          className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg"
        >
          Volver a la Página Principal
        </button>
      </div>
    </div>
  );
};
