import React, { useEffect } from 'react';
import { ArrowLeft, Cookie, ShieldCheck, Globe, Settings } from 'lucide-react';

interface CookiesPageProps {
  onBack: () => void;
}

export const CookiesPage: React.FC<CookiesPageProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-blue-600 font-bold mb-8 hover:text-blue-700 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Volver al Inicio
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100">
          <div className="flex items-center gap-4 mb-8 text-slate-900 border-b border-slate-100 pb-6">
            <Cookie className="text-blue-600" size={32} />
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">Política de Cookies</h1>
          </div>

          <div className="prose prose-slate max-w-none text-slate-600 space-y-10">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">Información sobre el uso de cookies</h2>
              <p>Si quieres saber más sobre el uso de cookies que realiza este sitio web, estás en el lugar indicado. A continuación, vamos a explicarte qué son exactamente las cookies; qué tipo de cookies utilizamos y para qué; y cómo puedes ejercer tu derecho para configurar tu navegador y desestimar el uso de cualquiera de ellas.</p>
              <p className="bg-amber-50 p-4 rounded-xl border-l-4 border-amber-400 text-amber-900 text-sm italic">Eso sí, debes saber, que si decides no utilizar algunas cookies, este sitio web puede no funcionar perfectamente, afectando a tu experiencia de usuario.</p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                ¿Qué es una Cookie?
              </h3>
              <p>Una cookie es un fichero que se descarga en tu ordenador al acceder a determinadas páginas web o blogs.</p>
              <p>Las cookies permiten a esa página, entre otras cosas, almacenar y recuperar información sobre tus hábitos de navegación o de tu equipo, y dependiendo de la información que contengan y de la forma en que utilices tu equipo, pueden utilizarse para reconocerte.</p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                Tipos de Cookies
              </h3>
              <ul className="space-y-4 list-none pl-0">
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <Settings size={14} />
                  </div>
                  <div>
                    <strong className="text-slate-900">Cookies técnicas:</strong> Son aquellas que permiten al usuario la navegación a través de una página web y la utilización de las diferentes opciones o servicios como controlar el tráfico o compartir contenido.
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <Globe size={14} />
                  </div>
                  <div>
                    <strong className="text-slate-900">Cookies de personalización:</strong> Permiten al usuario acceder al servicio con algunas características de carácter general predefinidas como el idioma o el tipo de navegador.
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <ShieldCheck size={14} />
                  </div>
                  <div>
                    <strong className="text-slate-900">Cookies de análisis:</strong> Nos permiten cuantificar el número de usuarios y así realizar la medición y análisis estadístico de la utilización que hacen los usuarios del servicio.
                  </div>
                </li>
              </ul>
            </section>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button 
            onClick={onBack} 
            className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg"
          >
            Volver a la Página Principal
          </button>
        </div>
      </div>
    </div>
  );
};
