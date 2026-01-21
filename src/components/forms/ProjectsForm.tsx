import { useResumeStore } from '../../stores/resumeStore';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import type { ProjectEntry } from '../../types';

function ProjectEntryCard({ entry, onUpdate, onRemove }: {
  entry: ProjectEntry;
  onUpdate: (updates: Partial<ProjectEntry>) => void;
  onRemove: () => void;
}) {
  return (
    <div className="p-4 bg-bg-hover rounded-lg border border-border space-y-4">
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-medium text-text-primary">
          {entry.name || 'New Project'}
        </h4>
        <button
          onClick={onRemove}
          className="p-1 text-text-muted hover:text-error transition-colors"
          title="Remove project"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <Input
        label="Project Name"
        required
        placeholder="E-commerce Platform"
        value={entry.name}
        onChange={(e) => onUpdate({ name: e.target.value })}
      />

      <Textarea
        label="Description"
        placeholder="Built a full-stack e-commerce platform with React, Node.js, and PostgreSQL. Features include real-time inventory, payment processing, and admin dashboard."
        value={entry.description}
        onChange={(e) => onUpdate({ description: e.target.value })}
        rows={3}
        hint="Briefly describe the project, technologies used, and your role"
      />

      <Input
        label="Project Link"
        type="url"
        placeholder="https://github.com/username/project"
        value={entry.link}
        onChange={(e) => onUpdate({ link: e.target.value })}
      />
    </div>
  );
}

export function ProjectsForm() {
  const { data, addProject, updateProject, removeProject } = useResumeStore();
  const { projects } = data;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-text-primary mb-1">Projects</h2>
        <p className="text-sm text-text-muted">Showcase personal or professional projects</p>
      </div>

      <div className="space-y-4">
        {projects.map((entry) => (
          <ProjectEntryCard
            key={entry.id}
            entry={entry}
            onUpdate={(updates) => updateProject(entry.id, updates)}
            onRemove={() => removeProject(entry.id)}
          />
        ))}
      </div>

      <button
        onClick={addProject}
        className="w-full py-3 border-2 border-dashed border-border hover:border-accent text-text-secondary hover:text-accent rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Add Project
      </button>

      {projects.length === 0 && (
        <div className="p-4 bg-bg-hover rounded-lg border border-border text-center">
          <p className="text-sm text-text-muted">
            No projects added yet. This section is optional but great for showcasing your work.
          </p>
        </div>
      )}
    </div>
  );
}
