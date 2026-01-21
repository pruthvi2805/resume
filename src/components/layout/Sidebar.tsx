// Minimalist SVG icons
const icons = {
  personal: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  ),
  summary: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h4" />
    </svg>
  ),
  experience: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
    </svg>
  ),
  education: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3L2 9l10 6 10-6-10-6z" />
      <path d="M2 9v6" />
      <path d="M6 11.5v5c0 1.5 2.5 3 6 3s6-1.5 6-3v-5" />
    </svg>
  ),
  skills: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  certifications: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="9" r="6" />
      <path d="M8.5 14.5L7 22l5-2 5 2-1.5-7.5" />
    </svg>
  ),
  projects: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  ),
  jobMatcher: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  ),
};

const resumeSections = [
  { id: 'personal', label: 'Personal Info', icon: icons.personal },
  { id: 'summary', label: 'Summary', icon: icons.summary },
  { id: 'experience', label: 'Experience', icon: icons.experience },
  { id: 'education', label: 'Education', icon: icons.education },
  { id: 'skills', label: 'Skills', icon: icons.skills },
  { id: 'certifications', label: 'Certifications', icon: icons.certifications },
  { id: 'projects', label: 'Projects', icon: icons.projects },
];

const toolSections = [
  { id: 'job-matcher', label: 'Job Matcher', icon: icons.jobMatcher },
];

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <aside className="w-16 flex-shrink-0 bg-bg-surface border-r border-border overflow-y-auto">
      <div className="p-2 space-y-2">
        {/* Resume Sections */}
        <nav className="space-y-1">
          {resumeSections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              title={section.label}
              className={`w-full flex items-center justify-center p-3 rounded-lg transition-colors ${
                activeSection === section.id
                  ? 'bg-accent/10 text-accent'
                  : 'text-text-primary hover:bg-bg-hover'
              }`}
            >
              {section.icon}
            </button>
          ))}
        </nav>

        {/* Divider */}
        <hr className="border-border" />

        {/* Tools */}
        <nav className="space-y-1">
          {toolSections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              title={section.label}
              className={`w-full flex items-center justify-center p-3 rounded-lg transition-colors ${
                activeSection === section.id
                  ? 'bg-accent/10 text-accent'
                  : 'text-text-primary hover:bg-bg-hover'
              }`}
            >
              {section.icon}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
