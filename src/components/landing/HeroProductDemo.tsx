import { useState, useEffect } from 'react';

interface HeroProductDemoProps {
  onStartFresh: () => void;
}

export function HeroProductDemo({ onStartFresh }: HeroProductDemoProps) {
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollHint(window.scrollY < 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative">

      {/* Main content - Split layout */}
      <div className="flex items-center justify-center px-4 sm:px-6 py-8 lg:py-12">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Left: Text content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 text-sm text-accent bg-accent-light/50 border border-accent/20 rounded-full">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              100% Private · Runs in Browser
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4 leading-tight">
              Build ATS-Friendly Resumes
            </h1>

            <p className="text-lg sm:text-xl text-accent font-medium mb-3">
              That actually reach human recruiters.
            </p>

            <p className="text-text-secondary mb-6 max-w-md mx-auto lg:mx-0">
              75% of resumes get rejected by ATS before anyone sees them. Our builder helps you beat the bots.
            </p>

            <button
              onClick={onStartFresh}
              className="group px-7 py-3.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              <span className="flex items-center gap-2">
                Start Building
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </button>

            {/* Quick stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-8">
              <div className="text-center min-w-[60px]">
                <div className="text-2xl font-bold text-text-primary leading-none">6</div>
                <div className="text-xs text-text-muted mt-1">Templates</div>
              </div>
              <div className="w-px bg-border self-stretch" />
              <div className="text-center min-w-[60px]">
                <div className="text-2xl font-bold text-text-primary leading-none">0</div>
                <div className="text-xs text-text-muted mt-1">Signups</div>
              </div>
              <div className="w-px bg-border self-stretch" />
              <div className="text-center min-w-[60px]">
                <div className="text-2xl font-bold text-text-primary leading-none">100%</div>
                <div className="text-xs text-text-muted mt-1">Free</div>
              </div>
            </div>
          </div>

          {/* Right: Single resume mockup */}
          <div className="hidden lg:flex justify-center lg:justify-end">
            <div className="relative">
              {/* Shadow/glow effect */}
              <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full scale-90" />
              {/* Resume mockup */}
              <div className="relative w-[380px] bg-white rounded-xl shadow-2xl overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-300">
                {/* Header */}
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-4">
                  <div className="h-4 w-32 bg-white/70 rounded mb-2" />
                  <div className="h-2.5 w-48 bg-white/40 rounded" />
                </div>
                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Summary */}
                  <div className="space-y-2">
                    <div className="h-2.5 w-full bg-gray-200 rounded" />
                    <div className="h-2.5 w-full bg-gray-200 rounded" />
                    <div className="h-2.5 w-2/3 bg-gray-200 rounded" />
                  </div>
                  {/* Section */}
                  <div className="pt-3">
                    <div className="h-3 w-24 bg-gray-300 rounded mb-3" />
                    <div className="flex justify-between mb-2">
                      <div className="h-2.5 w-32 bg-gray-300 rounded" />
                      <div className="h-2 w-16 bg-gray-200 rounded" />
                    </div>
                    <div className="h-2 w-24 bg-gray-200 rounded mb-2" />
                    <div className="pl-3 space-y-1.5">
                      <div className="h-2 w-full bg-gray-100 rounded" />
                      <div className="h-2 w-5/6 bg-gray-100 rounded" />
                      <div className="h-2 w-4/5 bg-gray-100 rounded" />
                    </div>
                  </div>
                  {/* Skills */}
                  <div className="pt-3">
                    <div className="h-3 w-16 bg-gray-300 rounded mb-3" />
                    <div className="flex flex-wrap gap-2">
                      <div className="h-6 w-16 bg-gray-100 border border-gray-200 rounded-full" />
                      <div className="h-6 w-20 bg-gray-100 border border-gray-200 rounded-full" />
                      <div className="h-6 w-14 bg-gray-100 border border-gray-200 rounded-full" />
                      <div className="h-6 w-18 bg-gray-100 border border-gray-200 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features bar */}
      <div id="features-bar" className="border-t border-border bg-bg-surface/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-text-secondary">
            <span className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                <path d="M9 12l2 2 4-4" />
                <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.12 0 4.07.74 5.62 1.98" />
              </svg>
              ATS-Optimized
            </span>
            <span className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                <path d="M12 20V10" />
                <path d="M18 20V4" />
                <path d="M6 20v-4" />
              </svg>
              Real-Time Score
            </span>
            <span className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              Job Matcher
            </span>
            <span className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>
              ATS Preview
            </span>
          </div>
        </div>
      </div>

      {/* Subtle scroll indicator - hidden on mobile, hides after scroll/click */}
      {showScrollHint && (
        <div
          className="hidden md:flex fixed bottom-4 left-1/2 -translate-x-1/2 z-40 items-center gap-1.5 px-3 py-1.5 text-text-muted hover:text-text-secondary cursor-pointer transition-colors opacity-60 hover:opacity-100"
          onClick={() => {
            setShowScrollHint(false);
            const el = document.getElementById('features-bar');
            if (el) {
              const headerHeight = 56;
              const top = el.getBoundingClientRect().top + window.scrollY - headerHeight;
              window.scrollTo({ top, behavior: 'smooth' });
            }
          }}
        >
          <span className="text-xs">Scroll</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-gentle-bounce">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      )}
    </section>
  );
}
