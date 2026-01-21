import { useResumeStore } from '../../stores/resumeStore';
import { getImprovementSuggestions } from '../../utils/atsScorer';
import type { ATSScore } from '../../types';

interface ATSScoreBreakdownProps {
  score: ATSScore;
  label: string;
  onClose: () => void;
}

export function ATSScoreBreakdown({ score, label, onClose }: ATSScoreBreakdownProps) {
  const { data } = useResumeStore();
  const suggestions = getImprovementSuggestions(data, score.breakdown);

  const getScoreRingColor = (score: number) => {
    if (score >= 80) return '#22c55e';
    if (score >= 60) return '#eab308';
    if (score >= 40) return '#f97316';
    return '#ef4444';
  };

  const getScoreTextColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    if (score >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  const breakdownItems = [
    {
      label: 'Contact Info',
      value: score.breakdown.contactInfo,
      max: 20,
      icon: '👤',
      tip: 'Name, email, phone, location'
    },
    {
      label: 'Content Sections',
      value: score.breakdown.sections,
      max: 55,
      icon: '📄',
      tip: 'Experience, education, summary'
    },
    {
      label: 'Content Depth',
      value: score.breakdown.length,
      max: 15,
      icon: '📝',
      tip: 'Detail in summaries and bullets'
    },
    {
      label: 'Structure',
      value: score.breakdown.formatting,
      max: 10,
      icon: '✓',
      tip: 'Completeness and organization'
    },
  ];

  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (score.overall / 100) * circumference;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-bg-surface rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden">
        {/* Header with Score Circle */}
        <div className="bg-gradient-to-br from-bg-primary to-bg-surface p-6 text-center border-b border-border">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-text-muted hover:text-text-primary hover:bg-bg-hover rounded-lg transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Circular Progress */}
          <div className="relative inline-flex items-center justify-center">
            <svg width="140" height="140" className="-rotate-90">
              {/* Background circle */}
              <circle
                cx="70"
                cy="70"
                r="54"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                className="text-border"
              />
              {/* Progress circle */}
              <circle
                cx="70"
                cy="70"
                r="54"
                fill="none"
                stroke={getScoreRingColor(score.overall)}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-4xl font-bold ${getScoreTextColor(score.overall)}`}>
                {score.overall}
              </span>
              <span className="text-xs text-text-muted">out of 100</span>
            </div>
          </div>

          <div className={`mt-3 text-sm font-medium ${getScoreTextColor(score.overall)}`}>
            {label}
          </div>
        </div>

        {/* Breakdown Section */}
        <div className="p-5">
          <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-4">
            Score Breakdown
          </h3>

          <div className="space-y-4">
            {breakdownItems.map((item) => {
              const percentage = Math.round((item.value / item.max) * 100);
              return (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{item.icon}</span>
                      <span className="text-sm font-medium text-text-primary">{item.label}</span>
                    </div>
                    <span className="text-sm tabular-nums">
                      <span className={percentage >= 70 ? 'text-green-500' : percentage >= 40 ? 'text-yellow-500' : 'text-text-muted'}>
                        {item.value}
                      </span>
                      <span className="text-text-muted">/{item.max}</span>
                    </span>
                  </div>
                  <div className="h-2 bg-bg-hover rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        percentage >= 70 ? 'bg-green-500' : percentage >= 40 ? 'bg-yellow-500' : 'bg-orange-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-text-muted mt-1">{item.tip}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Suggestions Section */}
        {suggestions.length > 0 && (
          <div className="px-5 pb-5">
            <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
              How to Improve
            </h3>
            <ul className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-accent mt-0.5">→</span>
                  <span className="text-text-secondary">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-border bg-bg-primary/50">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
