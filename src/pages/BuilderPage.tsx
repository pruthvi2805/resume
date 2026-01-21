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
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-bg-primary">
      <BuilderHeader onBack={onBack} />

      <div className="flex-1 flex overflow-hidden">
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="lg:hidden fixed bottom-4 left-4 z-50 p-3 bg-accent text-white rounded-full shadow-lg hover:bg-accent-hover transition-colors"
          aria-label="Toggle sidebar"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {showSidebar ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>

        {/* Sidebar - Hidden on mobile unless toggled */}
        <div
          className={`${
            showSidebar ? 'fixed inset-0 z-40' : 'hidden'
          } lg:relative lg:block lg:z-auto`}
        >
          {/* Backdrop for mobile */}
          {showSidebar && (
            <div
              className="absolute inset-0 bg-black/50 lg:hidden"
              onClick={() => setShowSidebar(false)}
            />
          )}

          {/* Sidebar Content */}
          <div className={`${
            showSidebar ? 'absolute left-0 top-0 h-full' : ''
          } lg:relative lg:h-full`}>
            <Sidebar
              activeSection={activeSection}
              onSectionChange={(section) => {
                setActiveSection(section);
                setShowSidebar(false);
              }}
            />
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 flex overflow-hidden">
          {/* Form Area */}
          <div className="w-full lg:w-[400px] flex-shrink-0 border-r border-border bg-bg-surface overflow-y-auto">
            <div className="p-6">
              {renderForm(activeSection)}
            </div>
          </div>

          {/* Preview Area */}
          <ResumePreview />
        </main>
      </div>
    </div>
  );
}
