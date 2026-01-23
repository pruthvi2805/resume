const features = [
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 12l2 2 4-4" />
        <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.12 0 4.07.74 5.62 1.98" />
      </svg>
    ),
    title: 'ATS-Optimized Templates',
    description:
      'Every template is designed to pass Applicant Tracking Systems. No fancy graphics that confuse parsers.',
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 20V10" />
        <path d="M18 20V4" />
        <path d="M6 20v-4" />
      </svg>
    ),
    title: 'Real-Time ATS Score',
    description:
      'See how ATS-friendly your resume is as you build. Get instant feedback on what to improve.',
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
    title: 'Job Description Matcher',
    description:
      'Paste a job description and see which keywords you\'re missing. Tailor your resume for each application.',
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
    title: 'ATS Preview Mode',
    description:
      'Toggle to see your resume exactly how ATS systems see it. Plain text, no surprises.',
  },
];

export function Features() {
  return (
    <section className="py-10 bg-bg-surface border-y border-border" aria-label="Features">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
            Why ATS Matters
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-sm sm:text-base">
            75% of resumes are rejected by ATS before a human ever sees them.
            Our tools help you beat the bots.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex gap-3 p-4 bg-bg-primary rounded-lg border border-border"
            >
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-accent-light text-accent rounded-lg">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-text-secondary">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
