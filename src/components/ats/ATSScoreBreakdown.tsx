import { useResumeStore } from '../../stores/resumeStore';
import { getScoreColor, getImprovementSuggestions } from '../../utils/atsScorer';
import type { ATSScore } from '../../types';

interface ATSScoreBreakdownProps {
  score: ATSScore;
  label: string;
  onClose: () => void;
}

export function ATSScoreBreakdown({ score, label, onClose }: ATSScoreBreakdownProps) {
  const { data } = useResumeStore();
  const suggestions = getImprovementSuggestions(data, score.breakdown);
  const colorClass = getScoreColor(score.overall);

  const breakdownItems = [
    { label: 'Contact Information', value: score.breakdown.contactInfo, max: 20, description: 'Name, email, phone, location, links' },
    { label: 'Content Sections', value: score.breakdown.sections, max: 55, description: 'Experience, education, summary' },
    { label: 'Content Length', value: score.breakdown.length, max: 15, description: 'Summary, bullets, and skills count' },
    { label: 'Formatting', value: score.breakdown.formatting, max: 10, description: 'Structure and completeness' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-bg-surface border border-border rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary">ATS Score Breakdown</h2>
          <button
            onClick={onClose}
            className="p-1 text-text-muted hover:text-text-primary transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Overall Score */}
        <div className="p-4 border-b border-border text-center">
          <div className={`text-5xl font-bold ${colorClass}`}>
            {score.overall}
          </div>
          <div className="text-sm text-text-secondary mt-1">{label}</div>
        </div>

        {/* Breakdown */}
        <div className="p-4 space-y-4">
          <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider">
            Score Breakdown
          </h3>
          <div className="space-y-3">
            {breakdownItems.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-text-primary">{item.label}</span>
                  <span className="text-sm text-text-secondary">
                    {item.value}/{item.max}
                  </span>
                </div>
                <div className="h-2 bg-bg-hover rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all duration-300"
                    style={{ width: `${(item.value / item.max) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-text-muted mt-1">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="p-4 border-t border-border">
            <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-3">
              Suggestions to Improve
            </h3>
            <ul className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-accent flex-shrink-0 mt-0.5"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span className="text-text-secondary">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Close Button */}
        <div className="p-4 border-t border-border">
          <button
            onClick={onClose}
            className="w-full py-2 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
