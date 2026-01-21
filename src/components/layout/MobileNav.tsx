interface MobileNavProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  activeView: 'edit' | 'preview';
  onViewChange: (view: 'edit' | 'preview') => void;
}

const sections = [
  { id: 'personal', label: 'Info', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  )},
  { id: 'summary', label: 'Summary', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h4" />
    </svg>
  )},
  { id: 'experience', label: 'Work', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
    </svg>
  )},
  { id: 'education', label: 'Edu', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3L2 9l10 6 10-6-10-6z" />
      <path d="M6 11.5v5c0 1.5 2.5 3 6 3s6-1.5 6-3v-5" />
    </svg>
  )},
  { id: 'skills', label: 'Skills', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  )},
  { id: 'more', label: 'More', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  )},
];

const moreSections = [
  { id: 'certifications', label: 'Certifications' },
  { id: 'projects', label: 'Projects' },
];

export function MobileNav({ activeSection, onSectionChange, activeView, onViewChange }: MobileNavProps) {
  const isMoreActive = moreSections.some(s => s.id === activeSection);

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-bg-surface border-t border-border z-40">
      {/* View Toggle */}
      <div className="flex border-b border-border">
        <button
          onClick={() => onViewChange('edit')}
          className={`flex-1 py-2 text-xs font-medium transition-colors ${
            activeView === 'edit'
              ? 'bg-accent text-white'
              : 'text-text-secondary hover:bg-bg-hover'
          }`}
        >
          Edit
        </button>
        <button
          onClick={() => onViewChange('preview')}
          className={`flex-1 py-2 text-xs font-medium transition-colors ${
            activeView === 'preview'
              ? 'bg-accent text-white'
              : 'text-text-secondary hover:bg-bg-hover'
          }`}
        >
          Preview
        </button>
      </div>

      {/* Section Navigation */}
      <nav className="flex justify-around py-1">
        {sections.map((section) => {
          const isActive = section.id === 'more'
            ? isMoreActive
            : section.id === activeSection;

          if (section.id === 'more') {
            return (
              <div key={section.id} className="relative group">
                <button
                  className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg transition-colors ${
                    isActive
                      ? 'text-accent'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {section.icon}
                  <span className="text-[10px]">{section.label}</span>
                </button>
                {/* Dropdown for more options */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-focus-within:block bg-bg-surface border border-border rounded-lg shadow-lg py-1 min-w-[140px]">
                  {moreSections.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => onSectionChange(sub.id)}
                      className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                        sub.id === activeSection
                          ? 'bg-accent/10 text-accent'
                          : 'text-text-primary hover:bg-bg-hover'
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg transition-colors ${
                isActive
                  ? 'text-accent'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {section.icon}
              <span className="text-[10px]">{section.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
