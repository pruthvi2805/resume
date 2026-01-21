import { useResumeStore } from '../../stores/resumeStore';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import type { EducationEntry } from '../../types';

function EducationEntryCard({ entry, onUpdate, onRemove }: {
  entry: EducationEntry;
  onUpdate: (updates: Partial<EducationEntry>) => void;
  onRemove: () => void;
}) {
  return (
    <div className="p-4 bg-bg-hover rounded-lg border border-border space-y-4">
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-medium text-text-primary">
          {entry.degree || entry.institution ? `${entry.degree}${entry.degree && entry.institution ? ' - ' : ''}${entry.institution}` : 'New Education'}
        </h4>
        <button
          onClick={onRemove}
          className="p-1 text-text-muted hover:text-error transition-colors"
          title="Remove education"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <Input
        label="Degree / Qualification"
        required
        placeholder="Bachelor of Science in Computer Science"
        value={entry.degree}
        onChange={(e) => onUpdate({ degree: e.target.value })}
      />

      <Input
        label="Institution"
        required
        placeholder="Stanford University"
        value={entry.institution}
        onChange={(e) => onUpdate({ institution: e.target.value })}
      />

      <Input
        label="Graduation Year"
        placeholder="2020"
        value={entry.year}
        onChange={(e) => onUpdate({ year: e.target.value })}
      />

      <Textarea
        label="Achievements / Notes"
        placeholder="Magna Cum Laude, Dean's List, Relevant coursework..."
        value={entry.achievements}
        onChange={(e) => onUpdate({ achievements: e.target.value })}
        rows={2}
        hint="Optional: Add honors, GPA, relevant coursework, or activities"
      />
    </div>
  );
}

export function EducationForm() {
  const { data, addEducation, updateEducation, removeEducation } = useResumeStore();
  const { education } = data;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-text-primary mb-1">Education</h2>
        <p className="text-sm text-text-muted">Add your educational background</p>
      </div>

      <div className="space-y-4">
        {education.map((entry) => (
          <EducationEntryCard
            key={entry.id}
            entry={entry}
            onUpdate={(updates) => updateEducation(entry.id, updates)}
            onRemove={() => removeEducation(entry.id)}
          />
        ))}
      </div>

      <button
        onClick={addEducation}
        className="w-full py-3 border-2 border-dashed border-border hover:border-accent text-text-secondary hover:text-accent rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Add Education
      </button>

      {education.length === 0 && (
        <div className="p-4 bg-bg-hover rounded-lg border border-border text-center">
          <p className="text-sm text-text-muted">
            No education added yet. Click "Add Education" to get started.
          </p>
        </div>
      )}
    </div>
  );
}
