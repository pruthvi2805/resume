import { ThemeToggle } from '../ui/ThemeToggle';

interface BuilderHeaderProps {
  onBack: () => void;
}

export function BuilderHeader({ onBack }: BuilderHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-bg-primary/80 backdrop-blur-sm border-b border-border">
      <div className="px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo with back action */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="w-8 h-8 flex items-center justify-center bg-accent text-white text-sm font-bold rounded-md">
              RB
            </span>
            <span className="font-semibold text-text-primary">Resume Builder</span>
          </button>

          {/* Center: ATS Score */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-bg-surface border border-border rounded-lg">
              <span className="text-sm text-text-secondary">ATS Score:</span>
              <span className="text-sm font-semibold text-accent">--/100</span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              className="ml-2 px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
              disabled
              title="Fill in your resume first"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span className="hidden sm:inline">Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
