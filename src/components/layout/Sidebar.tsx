import { useMemo, useState } from 'react';
import { useUIStore } from '../../stores/uiStore';
import { useResumeStore } from '../../stores/resumeStore';
import { calculateJobMatch } from '../../utils/keywordExtractor';

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
};

const sections = [
  { id: 'personal', label: 'Personal Info', icon: icons.personal },
  { id: 'summary', label: 'Summary', icon: icons.summary },
  { id: 'experience', label: 'Experience', icon: icons.experience },
  { id: 'education', label: 'Education', icon: icons.education },
  { id: 'skills', label: 'Skills', icon: icons.skills },
  { id: 'certifications', label: 'Certifications', icon: icons.certifications },
  { id: 'projects', label: 'Projects', icon: icons.projects },
];

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const { jobDescription, setJobDescription } = useUIStore();
  const { data } = useResumeStore();
  const [showAllMissing, setShowAllMissing] = useState(false);

  // Calculate job match when job description or resume data changes
  const matchResult = useMemo(() => {
    return calculateJobMatch(data, jobDescription);
  }, [data, jobDescription]);

  const getMatchColor = (percentage: number) => {
    if (percentage >= 70) return 'text-green-500';
    if (percentage >= 50) return 'text-yellow-500';
    if (percentage >= 30) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <aside className="w-full lg:w-72 flex-shrink-0 bg-bg-surface border-r border-border overflow-y-auto">
      <div className="p-4 space-y-6">
        {/* Sections Navigation */}
        <div>
          <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
            Sections
          </h3>
          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                  activeSection === section.id
                    ? 'bg-accent/10 text-accent'
                    : 'text-text-primary hover:bg-bg-hover'
                }`}
              >
                <span className="opacity-70">{section.icon}</span>
                <span>{section.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <hr className="border-border" />

        {/* Job Description Matcher */}
        <div>
          <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
            Job Matcher
          </h3>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste job description to see how well your resume matches..."
            className="w-full h-24 px-3 py-2 text-sm bg-bg-primary border border-border rounded-lg resize-none placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
          />
          {jobDescription && (
            <div className="mt-3 space-y-3">
              {/* Match Score */}
              <div className="p-3 bg-bg-primary border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-text-secondary">Match Score</span>
                  <span className={`text-lg font-bold ${getMatchColor(matchResult.matchPercentage)}`}>
                    {matchResult.matchPercentage}%
                  </span>
                </div>
                <div className="h-2 bg-bg-hover rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all duration-300"
                    style={{ width: `${matchResult.matchPercentage}%` }}
                  />
                </div>
              </div>

              {/* Found Keywords */}
              {matchResult.foundKeywords.length > 0 && (
                <div>
                  <h4 className="text-xs text-text-secondary mb-2">
                    Found ({matchResult.foundKeywords.length})
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {matchResult.foundKeywords.slice(0, 8).map((keyword, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-xs bg-green-500/10 text-green-600 dark:text-green-400 rounded"
                      >
                        {keyword}
                      </span>
                    ))}
                    {matchResult.foundKeywords.length > 8 && (
                      <span className="px-2 py-0.5 text-xs text-text-muted">
                        +{matchResult.foundKeywords.length - 8} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Missing Keywords */}
              {matchResult.missingKeywords.length > 0 && (
                <div>
                  <h4 className="text-xs text-text-secondary mb-2">
                    Missing ({matchResult.missingKeywords.length})
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {(showAllMissing ? matchResult.missingKeywords : matchResult.missingKeywords.slice(0, 6)).map((keyword, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-xs bg-red-500/10 text-red-600 dark:text-red-400 rounded"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                  {matchResult.missingKeywords.length > 6 && (
                    <button
                      onClick={() => setShowAllMissing(!showAllMissing)}
                      className="mt-2 text-xs text-accent hover:underline"
                    >
                      {showAllMissing ? 'Show less' : `Show all ${matchResult.missingKeywords.length}`}
                    </button>
                  )}
                </div>
              )}

              {/* Suggestions */}
              {matchResult.suggestions.length > 0 && (
                <div className="p-2 bg-accent/5 border border-accent/20 rounded-lg">
                  <h4 className="text-xs font-medium text-accent mb-1">Tip</h4>
                  <p className="text-xs text-text-secondary">
                    {matchResult.suggestions[0]}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
