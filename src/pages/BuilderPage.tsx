import { useState } from 'react';
import { BuilderHeader } from '../components/layout/BuilderHeader';
import { Sidebar } from '../components/layout/Sidebar';
import { MobileBottomSheet } from '../components/layout/MobileBottomSheet';
import { ResumePreview } from '../components/preview/ResumePreview';
import { MobilePreview } from '../components/preview/MobilePreview';
import { useResumeStore } from '../stores/resumeStore';
import { calculateATSScore } from '../utils/atsScorer';
import {
  PersonalInfoForm,
  SummaryForm,
  ExperienceForm,
  EducationForm,
  SkillsForm,
  CertificationsForm,
  ProjectsForm,
  JobMatcherForm,
} from '../components/forms';

interface BuilderPageProps {
  onBack: () => void;
}

function renderForm(section: string) {
  switch (section) {
    case 'personal':
      return <PersonalInfoForm />;
    case 'summary':
      return <SummaryForm />;
    case 'experience':
      return <ExperienceForm />;
    case 'education':
      return <EducationForm />;
    case 'skills':
      return <SkillsForm />;
    case 'certifications':
      return <CertificationsForm />;
    case 'projects':
      return <ProjectsForm />;
    case 'job-matcher':
      return <JobMatcherForm />;
    default:
      return <PersonalInfoForm />;
  }
}

export function BuilderPage({ onBack }: BuilderPageProps) {
  const [activeSection, setActiveSection] = useState('personal');
  const [mobileView, setMobileView] = useState<'edit' | 'preview'>('edit');
  const { data } = useResumeStore();

  const atsScore = calculateATSScore(data).overall;

  return (
    <div className="h-dvh max-h-screen flex flex-col bg-bg-primary overflow-hidden">
      <BuilderHeader onBack={onBack} />

      {/* Desktop Layout */}
      <div className="hidden lg:flex flex-1 min-h-0 overflow-hidden print:overflow-visible">
        {/* Sidebar */}
        <div className="print:hidden">
          <Sidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 flex overflow-hidden print:overflow-visible print:block">
          {/* Form Area */}
          <div className="w-[400px] xl:w-[420px] flex-shrink-0 border-r border-border bg-bg-surface overflow-y-auto print:hidden">
            <div className="p-6">
              {renderForm(activeSection)}
            </div>
          </div>

          {/* Preview Area */}
          <div className="flex-1 min-h-0 overflow-hidden print:flex print:w-full print:overflow-visible">
            <ResumePreview />
          </div>
        </main>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Animated View Container */}
        <div
          className="flex-1 flex min-h-0 transition-transform duration-300 ease-out"
          style={{
            width: '200%',
            transform: mobileView === 'preview' ? 'translateX(-50%)' : 'translateX(0)',
          }}
        >
          {/* Edit View */}
          <div className="w-1/2 min-h-0 overflow-y-auto bg-bg-surface">
            <div className="p-4 pb-[200px]">
              {renderForm(activeSection)}
            </div>
          </div>

          {/* Preview View */}
          <div className="w-1/2 min-h-0">
            <MobilePreview />
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomSheet
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        activeView={mobileView}
        onViewChange={setMobileView}
        atsScore={atsScore}
      />
    </div>
  );
}
