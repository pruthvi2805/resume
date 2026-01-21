import { useResumeStore } from '../../stores/resumeStore';
import { useUIStore } from '../../stores/uiStore';
import { TemplateClassic, TemplateModern, TemplateMinimal, TemplateCompact } from '../templates';
import { ATSPreview } from './ATSPreview';
import type { TemplateId } from '../../types';

const templates: { id: TemplateId; label: string; style: React.CSSProperties }[] = [
  { id: 'classic', label: 'Classic', style: { fontFamily: 'Georgia, serif', fontWeight: 500 } },
  { id: 'modern', label: 'Modern', style: { fontFamily: 'system-ui, sans-serif', fontWeight: 700, letterSpacing: '-0.02em' } },
  { id: 'minimal', label: 'Minimal', style: { fontFamily: 'system-ui, sans-serif', fontWeight: 300, letterSpacing: '0.02em' } },
  { id: 'compact', label: 'Compact', style: { fontFamily: 'system-ui, sans-serif', fontWeight: 500, fontSize: '10px' } },
];

export function ResumePreview() {
  const { data } = useResumeStore();
  const { viewMode, setViewMode, selectedTemplate, setTemplate } = useUIStore();

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'classic':
        return <TemplateClassic data={data} />;
      case 'modern':
        return <TemplateModern data={data} />;
      case 'minimal':
        return <TemplateMinimal data={data} />;
      case 'compact':
        return <TemplateCompact data={data} />;
      default:
        return <TemplateModern data={data} />;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-bg-hover/50 overflow-hidden">
      {/* Preview Header */}
      <div className="flex items-center justify-between gap-2 px-3 py-2 bg-bg-surface border-b border-border">
        {/* Template Switcher */}
        <div className="flex items-center gap-1">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => setTemplate(template.id)}
              className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                selectedTemplate === template.id
                  ? 'bg-accent text-white'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'
              }`}
              style={template.style}
            >
              {template.label}
            </button>
          ))}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 p-1 bg-bg-primary rounded-lg border border-border">
          <button
            onClick={() => setViewMode('normal')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'normal'
                ? 'bg-bg-surface text-text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Normal
          </button>
          <button
            onClick={() => setViewMode('ats')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'ats'
                ? 'bg-bg-surface text-text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            ATS View
          </button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div
          className="mx-auto bg-white shadow-lg"
          style={{
            width: '100%',
            maxWidth: '612px',
            minHeight: '792px',
          }}
        >
          {viewMode === 'normal' ? renderTemplate() : <ATSPreview data={data} />}
        </div>

        {/* ATS View Explanation */}
        {viewMode === 'ats' && (
          <p className="text-center text-xs text-text-muted mt-4 max-w-md mx-auto">
            This is how ATS (Applicant Tracking Systems) see your resume.
            Make sure all important information is clearly visible in plain text.
          </p>
        )}
      </div>
    </div>
  );
}
