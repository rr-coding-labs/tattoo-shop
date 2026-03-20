'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap';
import Lightbox from './Lightbox';

const Masonry = dynamic(() => import('./Masonry/Masonry'), { ssr: false });

const ITEMS = [
  { id: '1',  img: '/portfolio/1.jpg',  url: '#', height: 800 },
  { id: '2',  img: '/portfolio/2.jpg',  url: '#', height: 600 },
  { id: '3',  img: '/portfolio/3.jpg',  url: '#', height: 700 },
  { id: '4',  img: '/portfolio/4.jpg',  url: '#', height: 900 },
  { id: '5',  img: '/portfolio/5.jpg',  url: '#', height: 650 },
  { id: '6',  img: '/portfolio/6.jpg',  url: '#', height: 750 },
  { id: '7',  img: '/portfolio/7.jpg',  url: '#', height: 700 },
  { id: '8',  img: '/portfolio/8.jpg',  url: '#', height: 850 },
  { id: '9',  img: '/portfolio/9.jpg',  url: '#', height: 600 },
  { id: '10', img: '/portfolio/10.jpg', url: '#', height: 780 },
  { id: '11', img: '/portfolio/11.jpg', url: '#', height: 650 },
  { id: '12', img: '/portfolio/12.jpg', url: '#', height: 820 },
];

const IMAGES = ITEMS.map(i => i.img);

export default function MasonrySection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const eyebrowRef  = useRef<HTMLDivElement>(null);
  const headingRef  = useRef<HTMLDivElement>(null);
  const ctaRef      = useRef<HTMLAnchorElement>(null);
  const gridRef     = useRef<HTMLDivElement>(null);
  const [gridVisible, setGridVisible] = useState(false);
  // M5: start at 0 to avoid a hardcoded CLS-causing initial height
  const [gridHeight, setGridHeight] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const handleHeightChange = useCallback((h: number) => {
    setGridHeight(h + 20); // small buffer
  }, []);

  useEffect(() => {
    // H1: skip all motion if user prefers reduced motion
    if (prefersReducedMotion()) {
      // Still mount the grid immediately for reduced-motion users
      setGridVisible(true);
      return;
    }

    const ctx = gsap.context(() => {

      // Header elements reveal on scroll
      gsap.from(eyebrowRef.current, {
        y: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: {
          trigger: eyebrowRef.current,
          start: 'top 88%',
        },
      });

      gsap.from(headingRef.current, {
        y: 50, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 88%',
        },
      });

      gsap.from(ctaRef.current, {
        y: 20, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 90%',
        },
      });

      // Mount the Masonry grid only when it enters the viewport
      ScrollTrigger.create({
        trigger: gridRef.current,
        start: 'top 85%',
        onEnter: () => setGridVisible(true),
        once: true,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="portfolio" className="section-pad" style={{ background: 'var(--bg-dark)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '4rem' }}>
          <div ref={eyebrowRef} style={{
            fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1rem',
          }}>
            Selected Works
          </div>
          <div style={{
            display: 'flex', alignItems: 'flex-end',
            justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
          }}>
            <div ref={headingRef}>
              <h2 className="text-section" style={{ color: '#fff', maxWidth: '560px' }}>
                Ink That Tells<br /><span className="text-copper">Your Story</span>
              </h2>
            </div>
            <a ref={ctaRef} href="#book" className="btn-ghost">Book a Session</a>
          </div>
        </div>

        {/* M5: use minHeight so the container doesn't cause a large layout shift.
            Once gridHeight is known it switches to an exact height for Masonry positioning. */}
        <div
          ref={gridRef}
          style={{
            width: '100%',
            height: gridHeight > 0 ? `${gridHeight}px` : undefined,
            minHeight: gridHeight === 0 ? '60vh' : undefined,
          }}
        >
          {gridVisible && (
            <Masonry
              items={ITEMS}
              animateFrom="bottom"
              stagger={0.04}
              blurToFocus
              scaleOnHover
              hoverScale={0.97}
              colorShiftOnHover
              onHeightChange={handleHeightChange}
              onItemClick={setLightboxIndex}
            />
          )}
        </div>

        {lightboxIndex !== null && (
          <Lightbox
            images={IMAGES}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNav={setLightboxIndex}
          />
        )}

      </div>
    </section>
  );
}
