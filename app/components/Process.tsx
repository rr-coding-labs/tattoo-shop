'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap';

const steps = [
  {
    n: '01',
    title: 'Consultation',
    body: 'We begin with a deep conversation about your vision, lifestyle, and skin — then translate that into a concept sketch.',
  },
  {
    n: '02',
    title: 'Custom Design',
    body: "Our artists produce original artwork tailored to your body\u2019s contours. No flash, no templates.",
  },
  {
    n: '03',
    title: 'The Session',
    body: 'Executed with medical-grade precision in a sterile, private studio. Your comfort is non-negotiable.',
  },
  {
    n: '04',
    title: 'Aftercare',
    body: 'We guide you through healing with premium care products and lifetime touch-up guarantee.',
  },
];

export default function Process() {
  const sectionRef  = useRef<HTMLElement>(null);
  const eyebrowRef  = useRef<HTMLDivElement>(null);
  const headingRef  = useRef<HTMLDivElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const stepsRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // H1: skip all motion if user prefers reduced motion
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {

      // Eyebrow + heading + subtext slide up on scroll
      gsap.from(eyebrowRef.current, {
        y: 24, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: eyebrowRef.current, start: 'top 88%' },
      });
      gsap.from(headingRef.current, {
        y: 40, opacity: 0, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 88%' },
      });
      gsap.from(subRef.current, {
        y: 30, opacity: 0, duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: subRef.current, start: 'top 90%' },
      });

      const cards = gsap.utils.toArray<HTMLElement>('.process-step');

      if (window.innerWidth >= 768) {
        // Desktop: stagger from container trigger — same speed as Masonry
        gsap.from(cards, {
          y: 60, opacity: 0, filter: 'blur(10px)', duration: 0.8, ease: 'power3.out', stagger: 0.04,
          scrollTrigger: { trigger: stepsRef.current, start: 'top 80%', once: true },
        });
        const lines = gsap.utils.toArray<HTMLElement>('.process-step-line');
        gsap.from(lines, {
          scaleY: 0, transformOrigin: 'top center', duration: 0.6, ease: 'power3.out',
          stagger: 0.04, delay: 0.3,
          scrollTrigger: { trigger: stepsRef.current, start: 'top 80%', once: true },
        });
      }

    }, sectionRef);

    // Mobile: IntersectionObserver is immune to cached scroll positions
    let observers: IntersectionObserver[] = [];
    if (window.innerWidth < 768) {
      const cards = sectionRef.current?.querySelectorAll<HTMLElement>('.process-step') ?? [];
      cards.forEach((card) => {
        gsap.set(card, { y: 60, opacity: 0, filter: 'blur(10px)' });
        const line = card.querySelector<HTMLElement>('.process-step-line');
        if (line) gsap.set(line, { scaleY: 0, transformOrigin: 'top center' });

        const io = new IntersectionObserver(([entry]) => {
          if (!entry.isIntersecting) return;
          const tl = gsap.timeline();
          tl.to(card, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' });
          if (line) tl.to(line, { scaleY: 1, duration: 0.6, ease: 'power3.out' }, '-=0.4');
          io.unobserve(card);
        }, { threshold: 0.15 });

        io.observe(card);
        observers.push(io);
      });
    }

    return () => { ctx.revert(); observers.forEach(io => io.disconnect()); };
  }, []);

  // Keep ScrollTrigger referenced to avoid unused import warning
  void ScrollTrigger;

  return (
    <section ref={sectionRef} id="process" className="section-pad" style={{ background: 'var(--bg-dark-2)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '5rem', display: 'flex', alignItems: 'flex-end', gap: '4rem', flexWrap: 'wrap' }}>
          <div>
            <div ref={eyebrowRef} style={{
              fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1rem',
            }}>How It Works</div>
            <div ref={headingRef}>
              <h2 className="text-section" style={{ color: '#fff' }}>
                The <span className="text-copper">Process</span>
              </h2>
            </div>
          </div>
          <p ref={subRef} className="text-subhead" style={{ color: 'var(--text-muted)', maxWidth: '380px' }}>
            Four steps between you and permanent art that exceeds your expectations.
          </p>
        </div>

        {/* Steps */}
        <div ref={stepsRef} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2px',
        }}>
          {steps.map(({ n, title, body }, i) => (
            <div key={n} className="process-step" style={{
              padding: '2.5rem 2rem',
              border: 'none',
              borderLeft: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.05)',
              background: 'rgba(255,255,255,0.02)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Animated copper top-border line */}
              <div className="process-step-line" style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, var(--accent), transparent)',
              }} />

              {/* H3: use rgba(192,122,46,0.18) — matching --accent value */}
              <div style={{
                fontSize: '3rem', fontWeight: 900,
                color: 'rgba(192,122,46,0.18)', letterSpacing: '-0.04em',
                lineHeight: 1, marginBottom: '1.5rem',
              }}>{n}</div>

              <h3 className="text-headline" style={{ color: '#fff', marginBottom: '0.75rem' }}>{title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>{body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
