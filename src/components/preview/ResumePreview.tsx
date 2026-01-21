import { useMemo } from 'react';
import { useResumeStore } from '../../stores/resumeStore';
import { useUIStore, accentColors } from '../../stores/uiStore';
import { TemplateClassic, TemplateModern, TemplateMinimal, TemplateCompact, TemplateExecutive, TemplateTechnical } from '../templates';
import { ATSPreview } from './ATSPreview';
import type { TemplateId, ResumeData, AccentColorId } from '../../types';

const templates: { id: TemplateId; label: string; style: React.CSSProperties }[] = [
  { id: 'classic', label: 'Classic', style: { fontFamily: 'Georgia, serif', fontWeight: 500 } },
  { id: 'modern', label: 'Modern', style: { fontFamily: 'system-ui, sans-serif', fontWeight: 700, letterSpacing: '-0.02em' } },
  { id: 'minimal', label: 'Minimal', style: { fontFamily: 'system-ui, sans-serif', fontWeight: 300, letterSpacing: '0.02em' } },
  { id: 'compact', label: 'Compact', style: { fontFamily: 'system-ui, sans-serif', fontWeight: 500, fontSize: '10px' } },
  { id: 'executive', label: 'Executive', style: { fontFamily: 'system-ui, sans-serif', fontWeight: 500 } },
  { id: 'technical', label: 'Technical', style: { fontFamily: 'monospace', fontWeight: 500, letterSpacing: '-0.02em' } },
];

// Sample data to show when resume is empty
const sampleData: ResumeData = {
  personalInfo: {
    fullName: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    linkedinUrl: 'linkedin.com/in/alexjohnson',
    portfolioUrl: 'alexjohnson.dev',
  },
  summary: {
    text: 'Results-driven software engineer with 5+ years of experience building scalable web applications. Passionate about clean code, user experience, and mentoring junior developers. Led teams that delivered products serving millions of users.',
  },
  experience: [
    {
      id: '1',
      jobTitle: 'Senior Software Engineer',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      startDate: '2021-03',
      endDate: 'present',
      isCurrentRole: true,
      bullets: [
        'Led development of microservices architecture serving 2M+ daily users',
        'Mentored team of 4 junior developers, improving code quality by 40%',
        'Reduced API response time by 60% through optimization initiatives',
      ],
    },
    {
      id: '2',
      jobTitle: 'Software Engineer',
      company: 'StartupXYZ',
      location: 'Remote',
      startDate: '2019-01',
      endDate: '2021-02',
      isCurrentRole: false,
      bullets: [
        'Built React dashboard used by 500+ enterprise clients',
        'Implemented CI/CD pipeline reducing deployment time by 70%',
      ],
    },
  ],
  education: [
    {
      id: '1',
      degree: 'B.S. Computer Science',
      institution: 'University of California',
      year: '2018',
      achievements: 'Magna Cum Laude, Dean\'s List',
    },
  ],
  skills: {
    items: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'PostgreSQL', 'GraphQL', 'Git'],
  },
  certifications: [
    {
      id: '1',
      name: 'AWS Solutions Architect',
      issuer: 'Amazon Web Services',
      year: '2023',
    },
  ],
  projects: [
    {
      id: '1',
      name: 'Open Source CLI Tool',
      description: 'Built a developer productivity tool with 2K+ GitHub stars',
      link: 'github.com/alexj/cli-tool',
    },
  ],
};

// Check if resume data is essentially empty
function isResumeEmpty(data: ResumeData): boolean {
  const hasName = data.personalInfo.fullName.trim().length > 0;
  const hasEmail = data.personalInfo.email.trim().length > 0;
  const hasSummary = data.summary.text.trim().length > 0;
  const hasExperience = data.experience.length > 0 && data.experience.some(e => e.jobTitle.trim().length > 0);

  // Consider empty if missing basic info
  return !hasName && !hasEmail && !hasSummary && !hasExperience;
}

// Color option buttons
const colorOptions: { id: AccentColorId; label: string }[] = [
  { id: 'slate', label: 'Slate' },
  { id: 'navy', label: 'Navy' },
  { id: 'burgundy', label: 'Burgundy' },
  { id: 'teal', label: 'Teal' },
];

export function ResumePreview() {
  const { data } = useResumeStore();
  const { viewMode, setViewMode, selectedTemplate, setTemplate, accentColor, setAccentColor } = useUIStore();

  // Use sample data if resume is empty
  const displayData = useMemo(() => {
    return isResumeEmpty(data) ? sampleData : data;
  }, [data]);

  const isShowingSample = isResumeEmpty(data);
  const currentAccent = accentColors[accentColor];

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'classic':
        return <TemplateClassic data={displayData} accentColor={currentAccent} />;
      case 'modern':
        return <TemplateModern data={displayData} accentColor={currentAccent} />;
      case 'minimal':
        return <TemplateMinimal data={displayData} accentColor={currentAccent} />;
      case 'compact':
        return <TemplateCompact data={displayData} accentColor={currentAccent} />;
      case 'executive':
        return <TemplateExecutive data={displayData} accentColor={currentAccent} />;
      case 'technical':
        return <TemplateTechnical data={displayData} accentColor={currentAccent} />;
      default:
        return <TemplateModern data={displayData} accentColor={currentAccent} />;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-bg-hover/50 overflow-hidden print:overflow-visible print:bg-white">
      {/* Preview Header - Hidden when printing */}
      <div className="flex flex-col gap-2 px-3 py-2 bg-bg-surface border-b border-border print:hidden">
        {/* Top row: Template and View Mode */}
        <div className="flex items-center justify-between gap-2">
          {/* Template Switcher with Label */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-muted hidden sm:inline">Template:</span>
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
          </div>

          {/* View Mode Toggle - Improved visibility */}
          <div className="flex items-center gap-1 p-0.5 bg-bg-primary rounded-lg border border-border">
            <button
              onClick={() => setViewMode('normal')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                viewMode === 'normal'
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Normal
            </button>
            <button
              onClick={() => setViewMode('ats')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                viewMode === 'ats'
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              ATS View
            </button>
          </div>
        </div>

        {/* Bottom row: Color Picker */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted">Color:</span>
          <div className="flex items-center gap-1.5">
            {colorOptions.map((color) => (
              <button
                key={color.id}
                onClick={() => setAccentColor(color.id)}
                className={`w-5 h-5 rounded-full transition-all ${
                  accentColor === color.id
                    ? 'ring-2 ring-offset-2 ring-offset-bg-surface ring-accent scale-110'
                    : 'hover:scale-110'
                }`}
                style={{ backgroundColor: accentColors[color.id].primary }}
                title={color.label}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Sample Data Banner - Hidden when printing */}
      {isShowingSample && (
        <div className="px-3 py-1.5 bg-accent/10 border-b border-accent/20 text-center print:hidden">
          <span className="text-xs text-accent">
            Preview with sample data — fill in your details to see your resume
          </span>
        </div>
      )}

      {/* Preview Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 print:p-0 print:overflow-visible">
        <div
          id="resume-print-area"
          className="mx-auto bg-white shadow-lg print:shadow-none print:max-w-none"
          style={{
            width: '100%',
            maxWidth: '612px',
            minHeight: '792px',
          }}
        >
          {viewMode === 'normal' ? renderTemplate() : <ATSPreview data={displayData} />}
        </div>

        {/* ATS View Explanation - Hidden when printing */}
        {viewMode === 'ats' && (
          <p className="text-center text-xs text-text-muted mt-4 max-w-md mx-auto print:hidden">
            This is how ATS (Applicant Tracking Systems) see your resume.
            Make sure all important information is clearly visible in plain text.
          </p>
        )}
      </div>
    </div>
  );
}
