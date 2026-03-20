import Hero         from './components/Hero';
import MasonrySection from './components/MasonrySection';
import Process    from './components/Process';
import Artists    from './components/Artists';
import Booking    from './components/Booking';
import Footer     from './components/Footer';
import BackToTop  from './components/BackToTop';

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="divider" />
      <MasonrySection />
      <div className="divider" />
      <Process />
      <div className="divider" />
      <Artists />
      <div className="divider" />
      <Booking />
      <Footer />
      <BackToTop />
    </main>
  );
}
