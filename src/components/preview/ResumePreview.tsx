import { useResumeStore } from '../../stores/resumeStore';
import { useUIStore } from '../../stores/uiStore';
import { TemplateClassic, TemplateModern, TemplateMinimal, TemplateCompact } from '../templates';
import { ATSPreview } from './ATSPreview';

export function ResumePreview() {
  const { data } = useResumeStore();
  const { viewMode, setViewMode, selectedTemplate } = useUIStore();

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
      <div className="flex items-center justify-between px-4 py-3 bg-bg-surface border-b border-border">
        <h2 className="text-sm font-medium text-text-secondary">Preview</h2>
        <div className="flex items-center gap-1 p-1 bg-bg-primary rounded-lg border border-border">
          <button
            onClick={() => setViewMode('normal')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'normal'
                ? 'bg-bg-surface text-text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Normal
          </button>
          <button
            onClick={() => setViewMode('ats')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
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
      <div className="flex-1 overflow-y-auto p-4 sm:p-8">
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
