import { useMemo, useState } from 'react';
import { useResumeStore } from '../../stores/resumeStore';
import { useUIStore } from '../../stores/uiStore';
import { calculateJobMatch } from '../../utils/keywordExtractor';

export function JobMatcherForm() {
  const { data } = useResumeStore();
  const { jobDescription, setJobDescription } = useUIStore();
  const [showAllMissing, setShowAllMissing] = useState(false);

  const matchResult = useMemo(() => {
    return calculateJobMatch(data, jobDescription);
  }, [data, jobDescription]);

  const getMatchColor = (percentage: number) => {
    if (percentage >= 70) return 'text-green-500';
    if (percentage >= 50) return 'text-yellow-500';
    if (percentage >= 30) return 'text-orange-500';
    return 'text-red-500';
  };

  const getMatchBg = (percentage: number) => {
    if (percentage >= 70) return 'bg-green-500';
    if (percentage >= 50) return 'bg-yellow-500';
    if (percentage >= 30) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-text-primary mb-1">Job Matcher</h2>
        <p className="text-sm text-text-muted">
          Paste a job description to see how well your resume matches
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1.5">
            Job Description
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the full job description here..."
            className="w-full h-40 px-3 py-2 text-sm bg-bg-primary border border-border rounded-lg resize-none placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
          />
        </div>

        {jobDescription && (
          <div className="space-y-4">
            {/* Match Score Card */}
            <div className="p-4 bg-bg-primary border border-border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-text-secondary">Match Score</span>
                <span className={`text-2xl font-bold ${getMatchColor(matchResult.matchPercentage)}`}>
                  {matchResult.matchPercentage}%
                </span>
              </div>
              <div className="h-2.5 bg-bg-hover rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${getMatchBg(matchResult.matchPercentage)}`}
                  style={{ width: `${matchResult.matchPercentage}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-text-muted">
                {matchResult.matchPercentage >= 70
                  ? 'Great match! Your resume aligns well with this job.'
                  : matchResult.matchPercentage >= 50
                  ? 'Good match. Consider adding a few more relevant keywords.'
                  : matchResult.matchPercentage >= 30
                  ? 'Fair match. Review the missing keywords below.'
                  : 'Low match. You may need to tailor your resume for this role.'}
              </p>
            </div>

            {/* Found Keywords */}
            {matchResult.foundKeywords.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-text-secondary mb-2">
                  Found in Resume ({matchResult.foundKeywords.length})
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {matchResult.foundKeywords.map((keyword, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs bg-green-500/10 text-green-600 dark:text-green-400 rounded-md"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Missing Keywords */}
            {matchResult.missingKeywords.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-text-secondary mb-2">
                  Missing from Resume ({matchResult.missingKeywords.length})
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {(showAllMissing
                    ? matchResult.missingKeywords
                    : matchResult.missingKeywords.slice(0, 10)
                  ).map((keyword, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs bg-red-500/10 text-red-600 dark:text-red-400 rounded-md"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
                {matchResult.missingKeywords.length > 10 && (
                  <button
                    onClick={() => setShowAllMissing(!showAllMissing)}
                    className="mt-2 text-xs text-accent hover:underline"
                  >
                    {showAllMissing
                      ? 'Show less'
                      : `Show all ${matchResult.missingKeywords.length} missing keywords`}
                  </button>
                )}
              </div>
            )}

            {/* Suggestions */}
            {matchResult.suggestions.length > 0 && (
              <div className="p-3 bg-accent/5 border border-accent/20 rounded-lg">
                <h3 className="text-sm font-medium text-accent mb-2">Suggestions</h3>
                <ul className="space-y-1">
                  {matchResult.suggestions.map((suggestion, idx) => (
                    <li key={idx} className="text-xs text-text-secondary flex items-start gap-2">
                      <span className="text-accent mt-0.5">*</span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {!jobDescription && (
          <div className="p-6 bg-bg-primary border border-border rounded-lg text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-accent/10 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <p className="text-sm text-text-secondary mb-1">
              No job description yet
            </p>
            <p className="text-xs text-text-muted">
              Paste a job posting above to analyze how well your resume matches
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
