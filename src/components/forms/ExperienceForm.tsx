import { useResumeStore } from '../../stores/resumeStore';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Checkbox } from '../ui/Checkbox';
import type { ExperienceEntry } from '../../types';

function ExperienceEntry({ entry, onUpdate, onRemove }: {
  entry: ExperienceEntry;
  onUpdate: (updates: Partial<ExperienceEntry>) => void;
  onRemove: () => void;
}) {
  const updateBullet = (index: number, value: string) => {
    const newBullets = [...entry.bullets];
    newBullets[index] = value;
    onUpdate({ bullets: newBullets });
  };

  const addBullet = () => {
    onUpdate({ bullets: [...entry.bullets, ''] });
  };

  const removeBullet = (index: number) => {
    const newBullets = entry.bullets.filter((_, i) => i !== index);
    onUpdate({ bullets: newBullets.length > 0 ? newBullets : [''] });
  };

  return (
    <div className="p-4 bg-bg-hover rounded-lg border border-border space-y-4">
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-medium text-text-primary">
          {entry.jobTitle || entry.company ? `${entry.jobTitle}${entry.jobTitle && entry.company ? ' at ' : ''}${entry.company}` : 'New Experience'}
        </h4>
        <button
          onClick={onRemove}
          className="p-1 text-text-muted hover:text-error transition-colors"
          title="Remove experience"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Job Title"
          required
          placeholder="Senior Software Engineer"
          value={entry.jobTitle}
          onChange={(e) => onUpdate({ jobTitle: e.target.value })}
        />
        <Input
          label="Company"
          required
          placeholder="Acme Corp"
          value={entry.company}
          onChange={(e) => onUpdate({ company: e.target.value })}
        />
      </div>

      <Input
        label="Location"
        placeholder="San Francisco, CA (or Remote)"
        value={entry.location}
        onChange={(e) => onUpdate({ location: e.target.value })}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Start Date"
          type="month"
          required
          value={entry.startDate}
          onChange={(e) => onUpdate({ startDate: e.target.value })}
        />
        <div>
          <Input
            label="End Date"
            type="month"
            value={entry.isCurrentRole ? '' : entry.endDate}
            onChange={(e) => onUpdate({ endDate: e.target.value })}
            disabled={entry.isCurrentRole}
          />
          <div className="mt-2">
            <Checkbox
              label="I currently work here"
              checked={entry.isCurrentRole}
              onChange={(e) => onUpdate({
                isCurrentRole: e.target.checked,
                endDate: e.target.checked ? '' : entry.endDate
              })}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-text-secondary">
          Key Achievements / Responsibilities
          <span className="text-error ml-0.5">*</span>
        </label>
        {entry.bullets.map((bullet, index) => (
          <div key={index} className="flex gap-2">
            <Textarea
              placeholder="Built and deployed a microservices architecture that reduced system latency by 40%..."
              value={bullet}
              onChange={(e) => updateBullet(index, e.target.value)}
              rows={2}
              className="flex-1"
            />
            {entry.bullets.length > 1 && (
              <button
                onClick={() => removeBullet(index)}
                className="p-2 text-text-muted hover:text-error transition-colors self-start"
                title="Remove bullet"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
            )}
          </div>
        ))}
        <button
          onClick={addBullet}
          className="text-sm text-accent hover:text-accent-hover transition-colors flex items-center gap-1"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add bullet point
        </button>
      </div>
    </div>
  );
}

export function ExperienceForm() {
  const { data, addExperience, updateExperience, removeExperience } = useResumeStore();
  const { experience } = data;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-text-primary mb-1">Work Experience</h2>
        <p className="text-sm text-text-muted">Add your relevant work history, starting with the most recent</p>
      </div>

      <div className="space-y-4">
        {experience.map((entry) => (
          <ExperienceEntry
            key={entry.id}
            entry={entry}
            onUpdate={(updates) => updateExperience(entry.id, updates)}
            onRemove={() => removeExperience(entry.id)}
          />
        ))}
      </div>

      <button
        onClick={addExperience}
        className="w-full py-3 border-2 border-dashed border-border hover:border-accent text-text-secondary hover:text-accent rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Add Experience
      </button>

      {experience.length === 0 && (
        <div className="p-4 bg-bg-hover rounded-lg border border-border text-center">
          <p className="text-sm text-text-muted">
            No experience added yet. Click "Add Experience" to get started.
          </p>
        </div>
      )}
    </div>
  );
}
