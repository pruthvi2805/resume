import { useState, useEffect } from 'react';
import { LandingPage } from './pages/LandingPage';
import { BuilderPage } from './pages/BuilderPage';
import { PrivacyPage } from './pages/PrivacyPage';

type View = 'landing' | 'builder' | 'privacy';

function getInitialView(): View {
  const hash = window.location.hash.slice(1);
  if (hash === 'privacy') return 'privacy';
  if (hash === 'builder') return 'builder';
  return 'landing';
}

function App() {
  const [view, setView] = useState<View>(getInitialView);

  useEffect(() => {
    const handleHashChange = () => {
      setView(getInitialView());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (newView: View) => {
    if (newView === 'landing') {
      window.location.hash = '';
    } else {
      window.location.hash = newView;
    }
    setView(newView);
  };

  if (view === 'privacy') {
    return <PrivacyPage />;
  }

  if (view === 'builder') {
    return <BuilderPage onBack={() => navigate('landing')} />;
  }

  return <LandingPage onStartBuilder={() => navigate('builder')} />;
}

export default App;
