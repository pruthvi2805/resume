import { useState } from 'react';

export function ResumePreview() {
  const [viewMode, setViewMode] = useState<'normal' | 'ats'>('normal');

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
        <div className="mx-auto bg-white shadow-lg" style={{ width: '100%', maxWidth: '612px', minHeight: '792px' }}>
          {viewMode === 'normal' ? (
            <div className="p-8 text-gray-900">
              {/* Placeholder Resume Content */}
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Your Name</h1>
                <p className="text-sm text-gray-600 mt-1">
                  email@example.com • City, Country • linkedin.com/in/yourprofile
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">
                  Professional Summary
                </h2>
                <p className="text-sm text-gray-600">
                  Your professional summary will appear here. Write 2-3 sentences highlighting your experience and key strengths.
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">
                  Experience
                </h2>
                <div className="text-sm text-gray-500 italic">
                  Fill in the Experience section to see your work history here
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">
                  Education
                </h2>
                <div className="text-sm text-gray-500 italic">
                  Fill in the Education section to see your education here
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">
                  Skills
                </h2>
                <div className="text-sm text-gray-500 italic">
                  Add your skills to see them displayed here
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 font-mono text-sm text-gray-900">
              {/* ATS Plain Text View */}
              <pre className="whitespace-pre-wrap">
{`YOUR NAME
email@example.com | City, Country | linkedin.com/in/yourprofile

PROFESSIONAL SUMMARY
---
Your professional summary will appear here.

EXPERIENCE
---
[Fill in the Experience section]

EDUCATION
---
[Fill in the Education section]

SKILLS
---
[Add your skills]`}
              </pre>
            </div>
          )}
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
