import { useState } from 'react';

const sections = [
  { id: 'personal', label: 'Personal Info', icon: '👤' },
  { id: 'summary', label: 'Summary', icon: '📝' },
  { id: 'experience', label: 'Experience', icon: '💼' },
  { id: 'education', label: 'Education', icon: '🎓' },
  { id: 'skills', label: 'Skills', icon: '⚡' },
  { id: 'certifications', label: 'Certifications', icon: '📜' },
  { id: 'projects', label: 'Projects', icon: '🚀' },
];

const templates = [
  { id: 'classic', label: 'Classic' },
  { id: 'modern', label: 'Modern' },
  { id: 'minimal', label: 'Minimal' },
  { id: 'compact', label: 'Compact' },
];

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [jobDescription, setJobDescription] = useState('');

  return (
    <aside className="w-full lg:w-72 flex-shrink-0 bg-bg-surface border-r border-border overflow-y-auto">
      <div className="p-4 space-y-6">
        {/* Sections Navigation */}
        <div>
          <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
            Sections
          </h3>
          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                  activeSection === section.id
                    ? 'bg-accent/10 text-accent'
                    : 'text-text-primary hover:bg-bg-hover'
                }`}
              >
                <span className="text-base">{section.icon}</span>
                <span>{section.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <hr className="border-border" />

        {/* Template Switcher */}
        <div>
          <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
            Template
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                  selectedTemplate === template.id
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-border text-text-secondary hover:border-text-muted'
                }`}
              >
                {template.label}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <hr className="border-border" />

        {/* Job Description Matcher */}
        <div>
          <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
            Job Matcher
          </h3>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste job description to see how well your resume matches..."
            className="w-full h-24 px-3 py-2 text-sm bg-bg-primary border border-border rounded-lg resize-none placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
          />
          {jobDescription && (
            <div className="mt-3 p-3 bg-bg-primary border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-text-secondary">Match Score</span>
                <span className="text-sm font-semibold text-text-muted">--%</span>
              </div>
              <p className="text-xs text-text-muted">
                Complete your resume to see match results
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
