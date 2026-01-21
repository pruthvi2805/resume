import { useState } from 'react';
import { LandingPage } from './pages/LandingPage';

function App() {
  const [isBuilderView, setIsBuilderView] = useState(false);

  if (isBuilderView) {
    // Builder view - will be implemented in Phase 3
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg-primary text-text-primary p-8">
        <h1 className="text-2xl font-bold mb-4">Resume Builder</h1>
        <p className="text-text-secondary mb-8">Builder interface coming in Phase 3</p>
        <button
          onClick={() => setIsBuilderView(false)}
          className="px-6 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return <LandingPage onStartBuilder={() => setIsBuilderView(true)} />;
}

export default App;
