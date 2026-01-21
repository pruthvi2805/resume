export function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-text-muted">
          &copy; 2026 Pruthvi Kauticwar &middot;{' '}
          <a
            href="https://kpruthvi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-secondary transition-colors"
          >
            kpruthvi.com
          </a>
          {' '}&middot;{' '}
          <a
            href="https://kpruthvi.com/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-secondary transition-colors"
          >
            Contact
          </a>
          {' '}&middot;{' '}
          <a
            href="https://github.com/pruthvi2805/resume"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-secondary transition-colors"
          >
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}
