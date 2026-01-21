import { useResumeStore } from '../../stores/resumeStore';
import { Input } from '../ui/Input';
import type { CertificationEntry } from '../../types';

function CertificationEntryCard({ entry, onUpdate, onRemove }: {
  entry: CertificationEntry;
  onUpdate: (updates: Partial<CertificationEntry>) => void;
  onRemove: () => void;
}) {
  return (
    <div className="p-4 bg-bg-hover rounded-lg border border-border space-y-4">
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-medium text-text-primary">
          {entry.name || 'New Certification'}
        </h4>
        <button
          onClick={onRemove}
          className="p-1 text-text-muted hover:text-error transition-colors"
          title="Remove certification"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <Input
        label="Certification Name"
        required
        placeholder="AWS Certified Solutions Architect"
        value={entry.name}
        onChange={(e) => onUpdate({ name: e.target.value })}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Issuing Organization"
          placeholder="Amazon Web Services"
          value={entry.issuer}
          onChange={(e) => onUpdate({ issuer: e.target.value })}
        />
        <Input
          label="Year Obtained"
          placeholder="2023"
          value={entry.year}
          onChange={(e) => onUpdate({ year: e.target.value })}
        />
      </div>
    </div>
  );
}

export function CertificationsForm() {
  const { data, addCertification, updateCertification, removeCertification } = useResumeStore();
  const { certifications } = data;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-text-primary mb-1">Certifications</h2>
        <p className="text-sm text-text-muted">Add professional certifications and licenses</p>
      </div>

      <div className="space-y-4">
        {certifications.map((entry) => (
          <CertificationEntryCard
            key={entry.id}
            entry={entry}
            onUpdate={(updates) => updateCertification(entry.id, updates)}
            onRemove={() => removeCertification(entry.id)}
          />
        ))}
      </div>

      <button
        onClick={addCertification}
        className="w-full py-3 border-2 border-dashed border-border hover:border-accent text-text-secondary hover:text-accent rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Add Certification
      </button>

      {certifications.length === 0 && (
        <div className="p-4 bg-bg-hover rounded-lg border border-border text-center">
          <p className="text-sm text-text-muted">
            No certifications added yet. This section is optional.
          </p>
        </div>
      )}
    </div>
  );
}
