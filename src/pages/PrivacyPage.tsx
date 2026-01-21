import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

export function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-primary">
      <Header />
      <main className="flex-1 px-4 sm:px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-text-primary mb-8">Privacy Policy</h1>

          <div className="space-y-6 text-text-secondary">
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">100% Client-Side</h2>
              <p>
                Resume Builder runs entirely in your browser. Your resume data never leaves your device
                and is never sent to any server. All processing, formatting, and PDF generation happens
                locally on your computer.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">Local Storage</h2>
              <p>
                Your resume data is saved in your browser's local storage for convenience. This allows
                your work to persist between sessions. You can clear this data at any time by clearing
                your browser's storage or using the app's clear function.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">No Tracking</h2>
              <p>
                We do not use cookies, analytics, or any tracking mechanisms. Your activity on this
                site is completely private.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">No Account Required</h2>
              <p>
                There's no sign-up, no login, and no account creation. Just open the app and start
                building your resume.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">Open Source</h2>
              <p>
                This project is open source. You can review the code on{' '}
                <a
                  href="https://github.com/pruthvi2805/resume"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  GitHub
                </a>{' '}
                to verify these privacy claims yourself.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-3">Contact</h2>
              <p>
                If you have any questions about this privacy policy, please{' '}
                <a
                  href="https://kpruthvi.com/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  contact me
                </a>
                .
              </p>
            </section>
          </div>

          <div className="mt-12 pt-6 border-t border-border">
            <a
              href={`${import.meta.env.BASE_URL}#`}
              className="inline-flex items-center gap-2 text-accent hover:underline"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Resume Builder
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
