/**
 * VDS Tecnologia - Homepage
 * 
 * Built with Next.js 15, TypeScript, and AI assistance
 * Pure CSS (no UI frameworks), optimized for performance
 * 
 * Architecture: Component-based with clean separation of concerns
 * State management: React hooks with localStorage persistence
 * Animations: GPU-accelerated CSS transforms only
 */

import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import VDSSystem from '@/components/VDSSystem/VDSSystem';
import About from '@/components/About/About';
import Services from '@/components/Services/Services';
import Technology from '@/components/Technology/Technology';
import HackerTerminal from '@/components/HackerTerminal/HackerTerminal';
import AIStackGrid from '@/components/AIStackGrid/AIStackGrid';
import Process from '@/components/Process/Process';
import Benefits from '@/components/Benefits/Benefits';
import ContactTerminal from '@/components/ContactTerminal/ContactTerminal';
import Footer from '@/components/Footer/Footer';
import AnimatedBackground from '@/components/AnimatedBackground/AnimatedBackground';
import FloatingCTA from '@/components/FloatingCTA/FloatingCTA';
import IntroSequence from '@/components/IntroSequence/IntroSequence';

export default function Home() {

  return (
    <>
      <IntroSequence />
      <main>
        <AnimatedBackground />
        <FloatingCTA />
        <Header />
        <Hero />
        <VDSSystem />
        <About />
        <Services />
        <Technology />
        <HackerTerminal />
        <AIStackGrid />
        <Process />
        <Benefits />
        <ContactTerminal />
        <Footer />
      </main>
    </>
  );
}

