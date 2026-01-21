import { useEffect, useState } from 'react';
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    // Trigger fade-in after mount
    requestAnimationFrame(() => setIsVisible(true));
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Wait for animation to complete before unmounting
    setTimeout(onClose, 200);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#22c55e';
    if (score >= 60) return '#eab308';
    if (score >= 40) return '#f97316';
    return '#ef4444';
  };

  const breakdownItems = [
    { label: 'Contact', value: score.breakdown.contactInfo, max: 20, icon: '👤' },
    { label: 'Sections', value: score.breakdown.sections, max: 55, icon: '📄' },
    { label: 'Depth', value: score.breakdown.length, max: 15, icon: '📝' },
    { label: 'Structure', value: score.breakdown.formatting, max: 10, icon: '✓' },
  ];

  const circumference = 2 * Math.PI * 36;
  const strokeDashoffset = circumference - (score.overall / 100) * circumference;
  const scoreColor = getScoreColor(score.overall);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 transition-colors duration-200"
      style={{
        zIndex: 9999,
        backgroundColor: isVisible ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0)',
      }}
      onClick={handleClose}
    >
      <div
        className="relative rounded-xl shadow-2xl w-full max-w-xs transition-all duration-200"
        style={{
          backgroundColor: isDark ? '#252525' : '#ffffff',
          color: isDark ? '#fafaf8' : '#1a1a1a',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.95)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 p-1 rounded-md transition-colors hover:bg-black/10"
          style={{ color: isDark ? '#666' : '#9ca3af' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Header: Score + Label */}
        <div className="flex items-center gap-4 p-4">
          <div className="relative flex-shrink-0">
            <svg width="80" height="80" className="-rotate-90">
              <circle
                cx="40" cy="40" r="36"
                fill="none"
                stroke={isDark ? '#333' : '#e5e7eb'}
                strokeWidth="6"
              />
              <circle
                cx="40" cy="40" r="36"
                fill="none"
                stroke={scoreColor}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold" style={{ color: scoreColor }}>
                {score.overall}
              </span>
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold" style={{ color: isDark ? '#fafaf8' : '#1a1a1a' }}>
              ATS Score
            </div>
            <div className="text-sm" style={{ color: scoreColor }}>{label}</div>
          </div>
        </div>

        {/* Breakdown Grid */}
        <div
          className="grid grid-cols-2 gap-2 px-4 pb-3"
        >
          {breakdownItems.map((item) => {
            const pct = Math.round((item.value / item.max) * 100);
            const barColor = pct >= 70 ? '#22c55e' : pct >= 40 ? '#eab308' : '#f97316';
            return (
              <div
                key={item.label}
                className="p-2 rounded-lg"
                style={{ backgroundColor: isDark ? '#1a1a1a' : '#f9fafb' }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs" style={{ color: isDark ? '#a0a0a0' : '#6b7280' }}>
                    {item.icon} {item.label}
                  </span>
                  <span className="text-xs font-medium tabular-nums" style={{ color: barColor }}>
                    {item.value}/{item.max}
                  </span>
                </div>
                <div
                  className="h-1.5 rounded-full overflow-hidden"
                  style={{ backgroundColor: isDark ? '#333' : '#e5e7eb' }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, backgroundColor: barColor }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Suggestions (max 2) */}
        {suggestions.length > 0 && (
          <div
            className="px-4 pb-4 pt-2 border-t"
            style={{ borderColor: isDark ? '#333' : '#e5e7eb' }}
          >
            <div className="text-xs font-medium mb-2" style={{ color: isDark ? '#a0a0a0' : '#6b7280' }}>
              Quick wins
            </div>
            <div className="space-y-1.5">
              {suggestions.slice(0, 2).map((s, i) => (
                <div key={i} className="flex items-start gap-2 text-xs" style={{ color: isDark ? '#d1d5db' : '#4b5563' }}>
                  <span style={{ color: '#22c55e' }}>→</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function ATSScoreBreakdown(props: ATSScoreBreakdownProps) {
  return createPortal(
    <ModalContent {...props} />,
    document.body
  );
}
