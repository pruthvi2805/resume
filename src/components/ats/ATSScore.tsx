import { useState } from 'react';
import { useResumeStore } from '../../stores/resumeStore';
import { calculateATSScore, getScoreColor, getScoreLabel } from '../../utils/atsScorer';
import { ATSScoreBreakdown } from './ATSScoreBreakdown';

export function ATSScore() {
  const { data } = useResumeStore();
  const [showBreakdown, setShowBreakdown] = useState(false);

  const score = calculateATSScore(data);
  const colorClass = getScoreColor(score.overall);
  const label = getScoreLabel(score.overall);

  return (
    <>
      <button
        onClick={() => setShowBreakdown(true)}
        className="flex items-center gap-2 px-3 py-1.5 bg-bg-surface border border-border rounded-lg hover:border-accent transition-colors group"
        title="Click for detailed breakdown"
      >
        <span className="text-sm text-text-secondary">ATS Score:</span>
        <span className={`text-sm font-semibold ${colorClass}`}>
          {score.overall}/100
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-text-muted group-hover:text-accent transition-colors"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      </button>

      {showBreakdown && (
        <ATSScoreBreakdown
          score={score}
          label={label}
          onClose={() => setShowBreakdown(false)}
        />
      )}
    </>
  );
}
