import { useState } from 'react';
import { LandingPage } from './pages/LandingPage';
import { BuilderPage } from './pages/BuilderPage';

function App() {
  const [isBuilderView, setIsBuilderView] = useState(false);

  if (isBuilderView) {
    return <BuilderPage onBack={() => setIsBuilderView(false)} />;
  }

  return <LandingPage onStartBuilder={() => setIsBuilderView(true)} />;
}

export default App;
