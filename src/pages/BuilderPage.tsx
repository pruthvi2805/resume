import { useState } from 'react';
import { BuilderHeader } from '../components/layout/BuilderHeader';
import { Sidebar } from '../components/layout/Sidebar';
import { ResumePreview } from '../components/preview/ResumePreview';

interface BuilderPageProps {
  onBack: () => void;
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
          {/* Form Area - Will be implemented in Phase 4 */}
          <div className="w-full lg:w-[400px] flex-shrink-0 border-r border-border bg-bg-surface overflow-y-auto">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-text-primary mb-4 capitalize">
                {activeSection.replace('-', ' ')} Info
              </h2>
              <div className="space-y-4">
                <p className="text-sm text-text-muted">
                  Form fields for {activeSection} will appear here in Phase 4.
                </p>

                {/* Placeholder Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Sample Field
                    </label>
                    <input
                      type="text"
                      placeholder="Enter value..."
                      className="w-full px-3 py-2 bg-bg-primary border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Another Field
                    </label>
                    <input
                      type="text"
                      placeholder="Enter value..."
                      className="w-full px-3 py-2 bg-bg-primary border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Area */}
          <ResumePreview />
        </main>
      </div>
    </div>
  );
}
