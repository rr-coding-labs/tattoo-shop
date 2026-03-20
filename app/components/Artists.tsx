'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap';

import { ARTISTS } from '../lib/artists';

export default function Artists() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // H1: skip all motion if user prefers reduced motion
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {

      gsap.from(eyebrowRef.current, {
        y: 24, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: eyebrowRef.current, start: 'top 88%' },
      });

      gsap.from(headingRef.current, {
        y: 40, opacity: 0, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 88%' },
      });

      if (window.innerWidth >= 768) {
        // Desktop: stagger from container trigger
        const cards = gsap.utils.toArray<HTMLElement>('.artist-card');
        gsap.from(cards, {
          y: 70, opacity: 0, filter: 'blur(10px)', duration: 0.8, ease: 'power3.out', stagger: 0.04,
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', once: true },
        });
        const portraits = gsap.utils.toArray<HTMLElement>('.artist-portrait');
        gsap.from(portraits, {
          scale: 1.08, duration: 1.0, ease: 'power3.out', stagger: 0.04, delay: 0.1,
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', once: true },
        });
      }

    }, sectionRef);

    // Mobile: IntersectionObserver is immune to cached scroll positions
    let observers: IntersectionObserver[] = [];
    if (window.innerWidth < 768) {
      const cards = sectionRef.current?.querySelectorAll<HTMLElement>('.artist-card') ?? [];
      cards.forEach((card) => {
        gsap.set(card, { y: 70, opacity: 0, filter: 'blur(10px)' });
        const portrait = card.querySelector<HTMLElement>('.artist-portrait');
        if (portrait) gsap.set(portrait, { scale: 1.08 });

        const io = new IntersectionObserver(([entry]) => {
          if (!entry.isIntersecting) return;
          const tl = gsap.timeline();
          tl.to(card, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' });
          if (portrait) tl.to(portrait, { scale: 1, duration: 1.0, ease: 'power3.out' }, '-=0.6');
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
    <section ref={sectionRef} id="artists" className="section-pad" style={{ background: 'var(--bg-dark)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{ marginBottom: '4rem' }}>
          <div ref={eyebrowRef} style={{
            fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1rem',
          }}>Meet The Team</div>
          <div ref={headingRef}>
            <h2 className="text-section" style={{ color: '#fff' }}>
              The <span className="text-copper">Artists</span>
            </h2>
          </div>
        </div>

        <div ref={cardsRef} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {ARTISTS.map(({ name, role, years, img, slug }) => (
            // C2: removed div[role="button"] wrapping an <a> — restructured to avoid
            // nested interactive elements. The card link covers portrait+info; the
            // "Book with X" button lives outside the link.
            <div key={name} className="artist-card glass-card-warm" style={{ overflow: 'hidden', padding: 0 }}>

              {/* Entire portrait + info area is one link to the artist page */}
              <a
                href={`/artists/${slug}`}
                style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
                aria-label={`View ${name}'s profile`}
              >
                {/* Portrait — H2: use next/image with fill */}
                <div className="artist-portrait" style={{
                  height: '320px',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  <Image
                    src={img}
                    alt={name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    style={{ objectFit: 'cover', objectPosition: 'center top' }}
                  />
                  {/* Dark gradient overlay at bottom */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(10,8,6,0.7) 0%, transparent 50%)',
                  }} />
                  <div style={{
                    position: 'absolute', bottom: '1.5rem', left: '1.5rem',
                    fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: 'var(--accent)', fontWeight: 600,
                  }}>
                    {years} experience
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: '1.5rem 2rem 1rem' }}>
                  <h3 className="text-headline" style={{ color: '#fff', marginBottom: '0.35rem' }}>{name}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>{role}</p>
                </div>
              </a>

              {/* Book button lives outside the card link — no nested interactive elements */}
              <div style={{ padding: '0.75rem 2rem 2rem' }}>
                <a
                  href="#book"
                  className="btn-ghost"
                  style={{ fontSize: '0.7rem', padding: '0.6rem 1.4rem' }}
                  onClick={() => window.dispatchEvent(new CustomEvent('select-artist', { detail: name }))}
                >
                  Book with {name.split(' ')[0]}
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
