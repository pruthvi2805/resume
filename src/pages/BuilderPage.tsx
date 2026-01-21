import { useState } from 'react';
import { BuilderHeader } from '../components/layout/BuilderHeader';
import { Sidebar } from '../components/layout/Sidebar';
import { MobileNav } from '../components/layout/MobileNav';
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
  const [mobileView, setMobileView] = useState<'edit' | 'preview'>('edit');

  return (
    <div className="h-screen flex flex-col bg-bg-primary">
      <BuilderHeader onBack={onBack} />

      <div className="flex-1 flex overflow-hidden print:overflow-visible">
        {/* Sidebar - Hidden on mobile, visible on lg+, hidden when printing */}
        <div className="hidden lg:block print:hidden">
          <Sidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col lg:flex-row overflow-hidden print:overflow-visible print:block">
          {/* Form Area - Shows based on mobileView on mobile, always on lg+ */}
          <div className={`w-full lg:w-[420px] flex-shrink-0 border-b lg:border-b-0 lg:border-r border-border bg-bg-surface overflow-y-auto print:hidden pb-28 lg:pb-0 ${
            mobileView === 'edit' ? 'block' : 'hidden lg:block'
          }`}>
            <div className="p-4 lg:p-6">
              {renderForm(activeSection)}
            </div>
          </div>

          {/* Preview Area - Shows based on mobileView on mobile, always on lg+ */}
          <div className={`flex-1 print:flex print:w-full pb-28 lg:pb-0 ${
            mobileView === 'preview' ? 'flex' : 'hidden lg:flex'
          }`}>
            <ResumePreview />
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        activeView={mobileView}
        onViewChange={setMobileView}
      />
    </div>
  );
}
