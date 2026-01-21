import { useState, useEffect, useRef, useMemo } from 'react';
import { useResumeStore } from '../../stores/resumeStore';
import { useUIStore, accentColors } from '../../stores/uiStore';
import { TemplateClassic, TemplateModern, TemplateMinimal, TemplateCompact, TemplateExecutive, TemplateTechnical } from '../templates';
import { ATSPreview } from './ATSPreview';
import type { ResumeData } from '../../types';

// Sample data (same as ResumePreview)
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
    text: 'Results-driven software engineer with 5+ years of experience building scalable web applications. Passionate about clean code, user experience, and mentoring junior developers.',
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
      ],
    },
  ],
  education: [
    {
      id: '1',
      degree: 'B.S. Computer Science',
      institution: 'University of California',
      year: '2018',
      achievements: 'Magna Cum Laude',
    },
  ],
  skills: {
    items: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS'],
  },
  certifications: [],
  projects: [],
};

function isResumeEmpty(data: ResumeData): boolean {
  const hasName = data.personalInfo.fullName.trim().length > 0;
  const hasEmail = data.personalInfo.email.trim().length > 0;
  const hasSummary = data.summary.text.trim().length > 0;
  const hasExperience = data.experience.length > 0 && data.experience.some(e => e.jobTitle.trim().length > 0);
  return !hasName && !hasEmail && !hasSummary && !hasExperience;
}

export function MobilePreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const { data } = useResumeStore();
  const { viewMode, selectedTemplate } = useUIStore();
  const currentAccent = accentColors[useUIStore.getState().accentColor];

  const displayData = useMemo(() => {
    return isResumeEmpty(data) ? sampleData : data;
  }, [data]);

  const isShowingSample = isResumeEmpty(data);

  // Calculate scale to fit container
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const padding = 24; // 12px each side
        const availableWidth = containerWidth - padding;
        const targetWidth = 612;
        const newScale = Math.min(1, availableWidth / targetWidth);
        setScale(newScale);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

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
    <div
      ref={containerRef}
      className="h-full overflow-y-auto bg-bg-hover/50 flex flex-col"
    >
      {/* Sample Data Banner */}
      {isShowingSample && (
        <div className="px-3 py-2 bg-accent/10 border-b border-accent/20 text-center flex-shrink-0">
          <span className="text-xs text-accent">
            Preview with sample data
          </span>
        </div>
      )}

      {/* Scaled Preview */}
      <div className="flex-1 flex justify-center py-3 px-3 overflow-y-auto">
        <div
          className="origin-top"
          style={{
            transform: `scale(${scale})`,
            width: '612px',
            minHeight: '792px',
            transformOrigin: 'top center',
          }}
        >
          <div className="bg-white shadow-lg" style={{ minHeight: '792px' }}>
            {viewMode === 'normal' ? renderTemplate() : <ATSPreview data={displayData} />}
          </div>
        </div>
      </div>

      {/* ATS View Hint */}
      {viewMode === 'ats' && (
        <div className="px-3 py-2 bg-bg-surface border-t border-border text-center flex-shrink-0">
          <span className="text-xs text-text-muted">
            ATS View - How tracking systems see your resume
          </span>
        </div>
      )}

      {/* Spacer for bottom sheet */}
      <div className="h-[160px] flex-shrink-0" />
    </div>
  );
}
