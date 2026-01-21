import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/landing/Hero';
import { Features } from '../components/landing/Features';

interface LandingPageProps {
  onStartBuilder: () => void;
}

export function LandingPage({ onStartBuilder }: LandingPageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-bg-primary">
      <Header />
      <main className="flex-1">
        <Hero onStartFresh={onStartBuilder} />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
