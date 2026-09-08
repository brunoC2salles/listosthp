import React from 'react';
import { ChevronDown, Star } from 'lucide-react';
import { TiltCard } from './TiltCard';

export const Hero: React.FC = () => {
  const handleStartNow = () => {
    const message = encodeURIComponent("¡Hola! Acabo de ver la página web de Tu Hogar Posible y quiero saber más sobre la hipoteca que ofrecen.");
    window.location.href = `https://wa.me/34681198915?text=${message}`;
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-32 lg:pt-40 pb-20" id="hero">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=2000&auto=format&fit=crop" 
          alt="Luxury Home in Spain" 
          className="w-full h-full object-cover scale-110 animate-slow-zoom" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-transparent to-slate-50/10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-12 space-y-4 animate-fade-in-up text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full font-bold text-sm shadow-lg tracking-wide uppercase">
              <span className="animate-pulse inline-block w-2 h-2 rounded-full bg-green-400 shadow-[0_0_15px_rgba(74,222,128,0.8)]" />
              Financiación 100% Garantizada
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white leading-[0.9] tracking-tighter drop-shadow-2xl mx-auto lg:mx-0" style={{ fontFamily: 'Oswald, sans-serif' }}>
              La vivienda no debería <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 animate-gradient bg-[length:300%_300%]">
                ser un privilegio
              </span>
            </h1>

            <p className="text-xl lg:text-3xl text-slate-200 max-w-3xl leading-relaxed font-light tracking-wide mx-auto lg:mx-0">
              Por esto te ofrecemos financiación al 100% y viviendas de banco más accesibles. <br />
              Todo esto con un servicio gratuito con financiación hasta el 80%.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 pt-6 justify-center lg:justify-start">
              <button 
                onClick={handleStartNow}
                className="px-10 py-5 bg-blue-600 text-white rounded-full font-bold text-lg shadow-2xl shadow-blue-600/50 hover:bg-blue-500 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                Empezar Ahora
              </button>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 animate-bounce">
        <span className="text-white text-xs uppercase tracking-widest">Descubre más</span>
        <ChevronDown size={24} className="text-white" />
      </div>
    </section>
  );
};
