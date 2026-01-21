import { useThemeStore } from './stores';

function App() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* Temporary landing - will be replaced with proper pages */}
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <h1 className="text-4xl font-bold mb-4">Resume Builder</h1>
        <p className="text-text-secondary mb-8">
          Resumes that get past the robots.
        </p>
        <div className="flex gap-4">
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-bg-surface border border-border rounded-md hover:bg-bg-hover transition-colors"
          >
            Toggle Theme ({theme})
          </button>
        </div>
        <p className="mt-8 text-text-muted text-sm">
          Phase 1 Setup Complete - Ready for Phase 2
        </p>
      </div>
    </div>
  );
}

export default App;
