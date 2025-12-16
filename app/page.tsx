import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import Services from '@/components/Services/Services';
import Technology from '@/components/Technology/Technology';
import Partners from '@/components/Partners/Partners';
import Process from '@/components/Process/Process';
import Benefits from '@/components/Benefits/Benefits';
import Contact from '@/components/Contact/Contact';
import Footer from '@/components/Footer/Footer';
import AnimatedBackground from '@/components/AnimatedBackground/AnimatedBackground';

export default function Home() {
  return (
    <main>
      <AnimatedBackground />
      <Header />
      <Hero />
      <About />
      <Services />
      <Technology />
      <Partners />
      <Process />
      <Benefits />
      <Contact />
      <Footer />
    </main>
  );
}

