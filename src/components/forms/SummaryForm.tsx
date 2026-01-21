import { useResumeStore } from '../../stores/resumeStore';
import { Textarea } from '../ui/Textarea';

export function SummaryForm() {
  const { data, updateSummary } = useResumeStore();
  const { summary } = data;

  const charCount = summary.text.length;
  const isOptimalLength = charCount >= 150 && charCount <= 300;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-text-primary mb-1">Professional Summary</h2>
        <p className="text-sm text-text-muted">A brief overview of your experience and key strengths</p>
      </div>

      <div className="space-y-2">
        <Textarea
          label="Summary"
          placeholder="Experienced software engineer with 5+ years of expertise in building scalable web applications. Proven track record of leading cross-functional teams and delivering high-impact projects..."
          value={summary.text}
          onChange={(e) => updateSummary({ text: e.target.value })}
          rows={5}
        />
        <div className="flex justify-between items-center text-xs">
          <span className={`${isOptimalLength ? 'text-accent' : 'text-text-muted'}`}>
            {isOptimalLength ? 'Good length!' : '150-300 characters recommended'}
          </span>
          <span className={`${charCount > 300 ? 'text-warning' : 'text-text-muted'}`}>
            {charCount} characters
          </span>
        </div>
      </div>

      <div className="p-3 bg-bg-hover rounded-lg border border-border">
        <h4 className="text-xs font-medium text-text-secondary mb-2">Tips for a strong summary:</h4>
        <ul className="text-xs text-text-muted space-y-1">
          <li>- Start with your professional title and years of experience</li>
          <li>- Highlight 2-3 key skills or achievements</li>
          <li>- Tailor it to the job you're applying for</li>
          <li>- Keep it concise (2-3 sentences)</li>
        </ul>
      </div>
    </div>
  );
}
