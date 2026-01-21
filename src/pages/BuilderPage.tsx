import { useState } from 'react';
import { BuilderHeader } from '../components/layout/BuilderHeader';
import { Sidebar } from '../components/layout/Sidebar';
import { ResumePreview } from '../components/preview/ResumePreview';
import {
  PersonalInfoForm,
  SummaryForm,
  ExperienceForm,
  EducationForm,
  SkillsForm,
  CertificationsForm,
  ProjectsForm,
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
    default:
      return <PersonalInfoForm />;
  }
}

export function BuilderPage({ onBack }: BuilderPageProps) {
  const [activeSection, setActiveSection] = useState('personal');

  return (
    <div className="h-screen flex flex-col bg-bg-primary">
      <BuilderHeader onBack={onBack} />

      <div className="flex-1 flex overflow-hidden print:overflow-visible">
        {/* Sidebar - Always visible, scrollable, hidden when printing */}
        <div className="print:hidden">
          <Sidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col md:flex-row overflow-hidden print:overflow-visible print:block">
          {/* Form Area - Hidden when printing */}
          <div className="w-full md:w-[380px] lg:w-[420px] flex-shrink-0 border-b md:border-b-0 md:border-r border-border bg-bg-surface overflow-y-auto print:hidden">
            <div className="p-4 md:p-6">
              {renderForm(activeSection)}
            </div>
          </div>

          {/* Preview Area - Hidden on mobile, visible on md+, always visible when printing */}
          <div className="hidden md:flex flex-1 print:flex print:w-full">
            <ResumePreview />
          </div>
        </main>
      </div>
    </div>
  );
}
