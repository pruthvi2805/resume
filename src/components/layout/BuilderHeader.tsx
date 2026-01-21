import { ThemeToggle } from '../ui/ThemeToggle';
import { ATSScore } from '../ats';
import { useResumeStore } from '../../stores/resumeStore';
import { canExportPDF, exportToPDF } from '../../utils/pdfExport';

interface BuilderHeaderProps {
  onBack: () => void;
}

export function BuilderHeader({ onBack }: BuilderHeaderProps) {
  const { data } = useResumeStore();
  const canExport = canExportPDF(data);

  const handleDownload = () => {
    if (canExport) {
      exportToPDF();
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-bg-primary/80 backdrop-blur-sm border-b border-border print:hidden">
      <div className="px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo with back action */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <svg width="28" height="28" viewBox="0 0 32 32" className="flex-shrink-0">
              <rect x="4" y="2" width="20" height="26" rx="2" className="fill-bg-surface stroke-accent" strokeWidth="1.5"/>
              <rect x="7" y="6" width="10" height="2" rx="0.5" className="fill-accent"/>
              <rect x="7" y="10" width="14" height="1.5" rx="0.5" className="fill-text-muted"/>
              <rect x="7" y="13" width="14" height="1.5" rx="0.5" className="fill-text-muted"/>
              <rect x="7" y="16" width="10" height="1.5" rx="0.5" className="fill-text-muted"/>
              <rect x="7" y="20" width="14" height="1.5" rx="0.5" className="fill-text-muted"/>
              <rect x="7" y="23" width="8" height="1.5" rx="0.5" className="fill-text-muted"/>
              <circle cx="24" cy="24" r="7" className="fill-accent"/>
              <path d="M21 24l2 2 4-4" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-semibold text-text-primary">Resume Builder</span>
          </button>

          {/* Center: ATS Score */}
          <div className="hidden sm:flex items-center gap-2">
            <ATSScore />
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1">
            <a
              href="https://kpruthvi.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-hover rounded-md transition-colors"
              title="Need help? Contact me"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </a>
            <ThemeToggle />
            <button
              onClick={handleDownload}
              className={`ml-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
                canExport
                  ? 'bg-accent hover:bg-accent-hover text-white cursor-pointer'
                  : 'bg-bg-hover text-text-muted cursor-not-allowed'
              }`}
              disabled={!canExport}
              title={canExport ? 'Download as PDF' : 'Fill in your resume first'}
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
