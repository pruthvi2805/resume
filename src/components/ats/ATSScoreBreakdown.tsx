import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useResumeStore } from '../../stores/resumeStore';
import { useThemeStore } from '../../stores/themeStore';
import { getImprovementSuggestions } from '../../utils/atsScorer';
import type { ATSScore } from '../../types';

interface ATSScoreBreakdownProps {
  score: ATSScore;
  label: string;
  onClose: () => void;
}

function ModalContent({ score, label, onClose }: ATSScoreBreakdownProps) {
  const { data } = useResumeStore();
  const { theme } = useThemeStore();
  const suggestions = getImprovementSuggestions(data, score.breakdown);
  const isDark = theme === 'dark';

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

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
    <div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex: 9999 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative rounded-2xl shadow-2xl w-full max-w-sm max-h-[90vh] overflow-y-auto"
        style={{
          backgroundColor: isDark ? '#252525' : '#ffffff',
          color: isDark ? '#fafaf8' : '#1a1a1a'
        }}
      >
        {/* Header with Score Circle */}
        <div
          className="p-6 text-center border-b"
          style={{ borderColor: isDark ? '#404040' : '#e5e5e5' }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg transition-colors"
            style={{
              color: isDark ? '#a0a0a0' : '#9ca3af',
            }}
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
                stroke={isDark ? '#404040' : '#e5e7eb'}
                strokeWidth="10"
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
              <span style={{ color: isDark ? '#a0a0a0' : '#6b7280', fontSize: '12px' }}>out of 100</span>
            </div>
          </div>

          <div className={`mt-3 text-sm font-medium ${getScoreTextColor(score.overall)}`}>
            {label}
          </div>
        </div>

        {/* Breakdown Section */}
        <div className="p-5">
          <h3
            className="text-xs font-semibold uppercase tracking-wider mb-4"
            style={{ color: isDark ? '#a0a0a0' : '#6b7280' }}
          >
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
                      <span
                        className="text-sm font-medium"
                        style={{ color: isDark ? '#fafaf8' : '#1a1a1a' }}
                      >
                        {item.label}
                      </span>
                    </div>
                    <span className="text-sm tabular-nums">
                      <span className={percentage >= 70 ? 'text-green-500' : percentage >= 40 ? 'text-yellow-500' : 'text-gray-400'}>
                        {item.value}
                      </span>
                      <span style={{ color: isDark ? '#666666' : '#9ca3af' }}>/{item.max}</span>
                    </span>
                  </div>
                  <div
                    className="h-2 rounded-full overflow-hidden"
                    style={{ backgroundColor: isDark ? '#333333' : '#f3f4f6' }}
                  >
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        percentage >= 70 ? 'bg-green-500' : percentage >= 40 ? 'bg-yellow-500' : 'bg-orange-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p
                    className="text-xs mt-1"
                    style={{ color: isDark ? '#666666' : '#9ca3af' }}
                  >
                    {item.tip}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Suggestions Section */}
        {suggestions.length > 0 && (
          <div className="px-5 pb-5">
            <h3
              className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{ color: isDark ? '#a0a0a0' : '#6b7280' }}
            >
              How to Improve
            </h3>
            <ul className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-green-500 mt-0.5">→</span>
                  <span style={{ color: isDark ? '#d1d5db' : '#4b5563' }}>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer */}
        <div
          className="p-4 border-t"
          style={{ borderColor: isDark ? '#404040' : '#e5e5e5' }}
        >
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}

export function ATSScoreBreakdown(props: ATSScoreBreakdownProps) {
  // Use portal to render modal at document body level
  return createPortal(
    <ModalContent {...props} />,
    document.body
  );
}
