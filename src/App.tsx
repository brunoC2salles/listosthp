import { useEffect, useState } from 'react';
import { LegalPage } from './components/LegalPage';
import { CookiesPage } from './components/CookiesPage';
import { TrainingPage } from './components/TrainingPage';
import { AgencySolutionPage } from './components/AgencySolutionPage';
import { NewHomePage } from './pages/NewHomePage';

const resolveViewFromHash = () => {
  const hash = window.location.hash.toLowerCase();
  const path = window.location.pathname.toLowerCase();
  const current = hash + path;

  if (current.includes('/formaciondeagentes')) return 'training';
  if (current.includes('/solucionparaagencias')) return 'agency-solution';
  if (current.includes('/legal')) return 'legal';
  if (current.includes('/cookies')) return 'cookies';
  return 'home';
};

export default function App() {
  const [view, setView] = useState(() => resolveViewFromHash());

  useEffect(() => {
    const handleHashChange = () => {
      setView(resolveViewFromHash());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (view === 'training') return <TrainingPage />;
  if (view === 'agency-solution') return <AgencySolutionPage />;
  if (view === 'legal') return <LegalPage onBack={() => window.location.hash = ''} />;
  if (view === 'cookies') return <CookiesPage onBack={() => window.location.hash = ''} />;

  return <NewHomePage />;
}
