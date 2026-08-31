import React, { useEffect } from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

interface LegalPageProps {
  onBack: () => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ onBack }) => {
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
            <ShieldCheck className="text-blue-600" size={32} />
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">Política de Privacidad y Aviso Legal</h1>
          </div>

          <div className="prose prose-slate max-w-none text-slate-600 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                POLÍTICA DE PRIVACIDAD
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-slate-800">1. Responsable del tratamiento</h3>
                  <p>Titular: Apunto Growth Agency S.L, con el nombre comercial Tu Hogar Posible</p>
                  <p>NIF/CIF: B67980078</p>
                  <p>Domicilio: Calle Muntaner 262, 5, 08021 Barcelona</p>
                  <p>Correo electrónico: contacto@tuhogarposible.com</p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">2. Datos personales que se recogen</h3>
                  <p>Se pueden recoger los siguientes datos personales:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Nombre y apellidos</li>
                    <li>Correo electrónico</li>
                    <li>Teléfono</li>
                    <li>Cualquier otro dato facilitado voluntariamente mediante formularios</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">3. Finalidad del tratamiento</h3>
                  <p>Los datos personales se utilizan para:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Gestionar consultas realizadas a través de la web</li>
                    <li>Prestar los servicios ofrecidos</li>
                    <li>Enviar comunicaciones comerciales (si el usuario lo autoriza)</li>
                    <li>Mejorar la experiencia de usuario y el funcionamiento del sitio web</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="pt-8 border-t border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                AVISO LEGAL
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-slate-800">1. Información general</h3>
                  <p>En cumplimiento de la normativa vigente, se informa que:</p>
                  <p>Titular del sitio web: Apunto Growth Agency S.L, con el nombre comercial Tu Hogar Posible</p>
                  <p>NIF/CIF: B67980078</p>
                  <p>Domicilio: Calle Muntaner 262, 5, 08021 Barcelona</p>
                  <p>Correo electrónico: contacto@tuhogarposible.com</p>
                  <p>Sitio web: tuhogarposible.com</p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">2. Objeto</h3>
                  <p>El presente Aviso Legal regula el acceso, navegación y uso del sitio web.</p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">3. Condiciones de uso</h3>
                  <p>El usuario se compromete a hacer un uso adecuado del sitio web y a no realizar actividades ilícitas, ilegales o contrarias a la buena fe y al orden público.</p>
                </div>
              </div>
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
