import { useState, useEffect, useRef } from 'react';

interface MobileBottomSheetProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  activeView: 'edit' | 'preview';
  onViewChange: (view: 'edit' | 'preview') => void;
  atsScore?: number;
}

// All sections - no hidden "More" menu
const allSections = [
  { id: 'personal', label: 'Info', group: 'resume', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  )},
  { id: 'summary', label: 'Summary', group: 'resume', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h4" />
    </svg>
  )},
  { id: 'experience', label: 'Work', group: 'resume', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
    </svg>
  )},
  { id: 'education', label: 'Education', group: 'resume', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3L2 9l10 6 10-6-10-6z" />
      <path d="M6 11.5v5c0 1.5 2.5 3 6 3s6-1.5 6-3v-5" />
    </svg>
  )},
  { id: 'skills', label: 'Skills', group: 'resume', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  )},
  { id: 'certifications', label: 'Certs', group: 'resume', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="9" r="6" />
      <path d="M8.5 14.5L7 22l5-2 5 2-1.5-7.5" />
    </svg>
  )},
  { id: 'projects', label: 'Projects', group: 'resume', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  )},
  { id: 'job-matcher', label: 'Job Match', group: 'tools', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )},
];

export function MobileBottomSheet({
  activeSection,
  onSectionChange,
  activeView,
  onViewChange,
  atsScore = 0,
}: MobileBottomSheetProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll active section into view
  useEffect(() => {
    if (!isExpanded && scrollRef.current) {
      const activeEl = scrollRef.current.querySelector(`[data-section="${activeSection}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [activeSection, isExpanded]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-bg-surface border-t border-border shadow-lg">
      {/* Drag Handle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex justify-center py-2 min-h-[32px]"
        aria-label={isExpanded ? 'Collapse navigation' : 'Expand navigation'}
      >
        <div className={`w-10 h-1 rounded-full transition-colors ${isExpanded ? 'bg-accent' : 'bg-border'}`} />
      </button>

      {/* View Toggle - Always visible */}
      <div className="flex mx-3 mb-2 bg-bg-primary rounded-lg p-1">
        <button
          onClick={() => onViewChange('edit')}
          className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all min-h-[44px] ${
            activeView === 'edit'
              ? 'bg-accent text-white shadow-sm'
              : 'text-text-secondary'
          }`}
        >
          Edit
        </button>
        <button
          onClick={() => onViewChange('preview')}
          className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all min-h-[44px] ${
            activeView === 'preview'
              ? 'bg-accent text-white shadow-sm'
              : 'text-text-secondary'
          }`}
        >
          Preview
        </button>
      </div>

      {/* Collapsed: Horizontal scrollable pills */}
      {!isExpanded && (
        <div
          ref={scrollRef}
          className="flex gap-2 px-3 pb-3 overflow-x-auto scrollbar-hide"
        >
          {allSections.map((section) => (
            <button
              key={section.id}
              data-section={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`flex items-center gap-2 px-3 py-2 min-h-[44px] rounded-full whitespace-nowrap text-sm font-medium transition-all flex-shrink-0 ${
                activeSection === section.id
                  ? 'bg-accent text-white'
                  : 'bg-bg-hover text-text-primary'
              }`}
            >
              {section.icon}
              <span>{section.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Expanded: Full grid + ATS Score */}
      {isExpanded && (
        <div className="px-3 pb-4 pt-1 max-h-[60vh] overflow-y-auto">
          {/* ATS Score */}
          <div className="mb-4 p-3 bg-bg-hover rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted">
                <path d="M12 20V10M18 20V4M6 20v-4" />
              </svg>
              <span className="text-sm text-text-secondary">ATS Score</span>
            </div>
            <span className={`text-xl font-bold ${getScoreColor(atsScore)}`}>
              {atsScore}/100
            </span>
          </div>

          {/* Resume Sections */}
          <p className="text-xs text-text-muted uppercase tracking-wide mb-2 px-1">Resume Sections</p>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {allSections.filter(s => s.group === 'resume').map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  onSectionChange(section.id);
                  setIsExpanded(false);
                }}
                className={`flex flex-col items-center justify-center py-3 px-1 min-h-[64px] rounded-xl text-center transition-all ${
                  activeSection === section.id
                    ? 'bg-accent text-white'
                    : 'bg-bg-hover text-text-primary'
                }`}
              >
                <span className="mb-1">{section.icon}</span>
                <span className="text-xs leading-tight">{section.label}</span>
              </button>
            ))}
          </div>

          {/* Tools Section */}
          <p className="text-xs text-text-muted uppercase tracking-wide mb-2 px-1">Tools</p>
          <div className="grid grid-cols-4 gap-2">
            {allSections.filter(s => s.group === 'tools').map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  onSectionChange(section.id);
                  setIsExpanded(false);
                }}
                className={`flex flex-col items-center justify-center py-3 px-1 min-h-[64px] rounded-xl text-center transition-all ${
                  activeSection === section.id
                    ? 'bg-accent text-white'
                    : 'bg-bg-hover text-text-primary'
                }`}
              >
                <span className="mb-1">{section.icon}</span>
                <span className="text-xs leading-tight">{section.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
