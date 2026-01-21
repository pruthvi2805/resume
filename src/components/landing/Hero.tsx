interface HeroProps {
  onStartFresh: () => void;
}

export function Hero({ onStartFresh }: HeroProps) {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-3xl mx-auto text-center px-4">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm text-accent bg-accent-light rounded-full">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          100% Private · No Signup Required
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4 leading-tight">
          Resumes that get past{' '}
          <span className="text-accent">the robots.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
          Most builders make pretty PDFs that fail ATS systems. We make clean,
          optimized resumes that actually reach human recruiters.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <button
            onClick={onStartFresh}
            className="w-full sm:w-auto px-8 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-colors"
          >
            Start Building
          </button>
          <button
            disabled
            className="w-full sm:w-auto px-8 py-3 bg-bg-surface border border-border text-text-muted font-medium rounded-lg cursor-not-allowed opacity-60"
            title="Coming soon"
          >
            Import from Portfolio Builder
          </button>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-text-muted">
          <span className="flex items-center gap-1.5">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-success"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            No signup
          </span>
          <span className="flex items-center gap-1.5">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-success"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            No watermarks
          </span>
          <span className="flex items-center gap-1.5">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-success"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Data stays in your browser
          </span>
        </div>
      </div>
    </section>
  );
}
