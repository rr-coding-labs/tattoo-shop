'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap';
import InstallPWAButton from './InstallPWA';

const NAV_ITEMS = ['Portfolio', 'Artists', 'Process', 'Book'];

export default function Hero() {
  const sectionRef  = useRef<HTMLElement>(null);
  const imgOverlay  = useRef<HTMLDivElement>(null);   // wipe panel over the image
  const navRef      = useRef<HTMLElement>(null);
  const eyebrowRef  = useRef<HTMLDivElement>(null);
  const headRef     = useRef<HTMLHeadingElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const menuRef        = useRef<HTMLDivElement>(null);
  const menuCloseRef   = useRef<HTMLButtonElement>(null);
  const menuBrandRef   = useRef<HTMLSpanElement>(null);
  const menuNavRef     = useRef<HTMLElement>(null);
  const menuBottomRef  = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  // ── Intro animation ───────────────────────────────────────────────────────
  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set(imgOverlay.current, { display: 'none' });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Image wipe: dark overlay slides off to the right, revealing the photo
      tl.to(imgOverlay.current, {
        x: '100%',
        duration: 1.3,
        ease: 'power3.inOut',
        onComplete: () => { gsap.set(imgOverlay.current, { display: 'none' }); },
      }, 0)

      // 2. Nav drops in from top
      .from(navRef.current, {
        y: -30, opacity: 0, duration: 0.7,
      }, 0.5)

      // 3. Text elements slide in from the left, staggered
      .from(eyebrowRef.current, { x: -50, opacity: 0, duration: 0.7 }, 0.65)
      .from(headRef.current,    { x: -70, opacity: 0, duration: 0.85 }, 0.75)
      .from(subRef.current,     { x: -50, opacity: 0, duration: 0.75 }, 0.9)
      .from(ctaRef.current,     { x: -40, opacity: 0, duration: 0.7 },  1.0)
      .from(statsRef.current,   { x: -30, opacity: 0, duration: 0.65 }, 1.1);
    });

    return () => { ctx.revert(); };
  }, []);

  // ── Mobile menu open/close ────────────────────────────────────────────────
  useEffect(() => {
    if (!menuRef.current) return;
    const inner = [menuCloseRef.current, menuBrandRef.current, menuNavRef.current, menuBottomRef.current];

    if (open) {
      document.body.style.overflow = 'hidden';
      if (!prefersReducedMotion()) {
        const tl = gsap.timeline();
        // Panel slides in
        tl.fromTo(menuRef.current,
          { x: '100%' },
          { x: '0%', duration: 0.45, ease: 'power4.out' }
        )
        // Inner elements fade + slide in with stagger
        .fromTo(inner,
          { x: 24, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.35, ease: 'power3.out', stagger: 0.06 },
          '-=0.25'
        );
      } else {
        gsap.set(menuRef.current, { x: '0%' });
        gsap.set(inner, { x: 0, opacity: 1 });
      }
      setTimeout(() => menuRef.current?.querySelector<HTMLElement>('button, a')?.focus(), 50);
    } else {
      if (!prefersReducedMotion()) {
        const tl = gsap.timeline();
        // Inner elements fade out quickly
        tl.to(inner,
          { x: 16, opacity: 0, duration: 0.18, ease: 'power2.in', stagger: 0.03 }
        )
        // Panel slides out
        .to(menuRef.current,
          { x: '100%', duration: 0.35, ease: 'power4.in' },
          '-=0.08'
        );
      } else {
        gsap.set(inner, { x: 24, opacity: 0 });
        gsap.set(menuRef.current, { x: '100%' });
      }
      document.body.style.overflow = '';
    }
  }, [open]);

  // Keep ScrollTrigger referenced to avoid unused import warning
  void ScrollTrigger;

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: '100svh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* ── Background image ─────────────────────────────────────── */}
      <div className="hero-img-bg" style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/tattoo_gun.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0,
      }} />

      {/* ── Gradient overlay ─────────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(100deg, rgba(10,8,5,0.78) 0%, rgba(10,8,5,0.42) 50%, rgba(10,8,5,0.12) 100%)',
        zIndex: 1,
      }} />

      {/* ── Intro wipe — dark panel that slides off to the right ──── */}
      <div
        ref={imgOverlay}
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          background: '#0E0C0A',
          zIndex: 20,
          transformOrigin: 'left center',
          willChange: 'transform',
        }}
      />

      {/* ── H5: Mobile backdrop — proper <button> instead of div[role="button"] ── */}
      {open && (
        <button
          aria-label="Close navigation menu"
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 30,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            cursor: 'pointer',
            border: 'none',
            padding: 0,
          }}
        />
      )}

      {/* ── Mobile slide-in menu ─────────────────────────────────── */}
      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{
          position: 'fixed', top: 0, right: 0,
          width: 'min(80vw, 320px)', height: '100svh',
          background: 'rgba(10,8,6,0.97)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderLeft: '1px solid rgba(192,122,46,0.2)',
          zIndex: 40,
          display: 'flex', flexDirection: 'column',
          padding: '2rem 2rem',
          transform: 'translateX(100%)',
        }}
      >
        <button
          ref={menuCloseRef}
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          style={{
            alignSelf: 'flex-end', background: 'none', border: 'none',
            cursor: 'pointer', padding: '0.5rem', marginBottom: '2.5rem',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <line x1="2" y1="2" x2="20" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <line x1="20" y1="2" x2="2" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <span ref={menuBrandRef} style={{
          fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)',
          marginBottom: '3rem',
        }}>YOUR LOGO HERE</span>
        <nav ref={menuNavRef} aria-label="Mobile navigation" style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setOpen(false)}
              style={{
                color: '#fff', textDecoration: 'none',
                fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em',
                padding: '0.6rem 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                transition: 'color 0.2s',
                // M3: removed dead animationDelay — no CSS animation defined on these elements
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = '#fff')}
            >{item}</a>
          ))}
        </nav>
        <div ref={menuBottomRef} style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <InstallPWAButton onInstalled={() => setOpen(false)} />
          <a
            href="/sale"
            onClick={() => setOpen(false)}
            className="btn-ghost"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', textDecoration: 'none' }}
          >
            <span className="nav-sale-dot" />
            This Site Is For Sale
          </a>
          <a href="#book" className="btn-primary" onClick={() => setOpen(false)}
            style={{ display: 'block', textAlign: 'center' }}>
            Book Session
          </a>
        </div>
      </div>

      {/* ── Nav bar ──────────────────────────────────────────────── */}
      <nav
        ref={navRef}
        aria-label="Main navigation"
        className="nav-inner nav-bar"
        style={{
          position: 'relative', zIndex: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1.75rem 3rem',
        }}
      >
        <span style={{
          fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.1em',
          textTransform: 'uppercase', color: '#fff',
        }}>YOUR LOGO HERE</span>

        <ul className="nav-links" style={{
          display: 'flex', gap: '2.5rem', listStyle: 'none', margin: 0, padding: 0,
          fontSize: '0.78rem', fontWeight: 500,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          alignItems: 'center',
        }}>
          {NAV_ITEMS.map(item => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                style={{
                  color: 'rgba(255,255,255,0.7)', textDecoration: 'none',
                  transition: 'color .2s', cursor: 'pointer',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
              >
                {item}
              </a>
            </li>
          ))}
          <li>
            <a href="/sale" className="nav-sale-badge">
              <span className="nav-sale-dot" />
              This Site Is For Sale
            </a>
          </li>
        </ul>

        <a href="#book" className="btn-primary nav-cta-desktop" style={{ fontSize: '0.72rem' }}>
          Book Session
        </a>

        <button
          className="hamburger"
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          style={{
            display: 'none',
            background: 'none', border: 'none',
            cursor: 'pointer', padding: '0.25rem',
            flexDirection: 'column', gap: '5px',
            position: 'relative', width: 28, height: 20,
          }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block', width: 24, height: 2,
              background: '#fff', borderRadius: 2,
              position: 'absolute',
              left: 0,
              top: i === 0 ? 0 : i === 1 ? 9 : 18,
              transformOrigin: 'center',
              transition: 'transform 0.3s ease, opacity 0.3s ease, top 0.3s ease',
              transform: open
                ? i === 0 ? 'translateY(9px) rotate(45deg)'
                : i === 2 ? 'translateY(-9px) rotate(-45deg)'
                : 'none'
                : 'none',
              opacity: open && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* ── Hero text ───────────────────────────────────────────── */}
      <div className="hero-content" style={{
        flex: 1, display: 'flex', alignItems: 'center',
        padding: '0 3rem 4rem',
        position: 'relative', zIndex: 2,
      }}>
        <div style={{ maxWidth: '600px', width: '100%' }}>

          <div ref={eyebrowRef} style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 'var(--radius-full)',
            padding: '0.35rem 1rem',
            marginBottom: '2rem',
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: 'var(--accent)', display: 'inline-block',
            }} />
            <span style={{
              fontSize: '0.7rem', fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.8)',
            }}>Premium Tattoo Studio</span>
          </div>

          <h1 ref={headRef} className="text-hero" style={{ color: '#fff', marginBottom: '1.5rem' }}>
            Art That<br />
            <span className="text-copper">Lives</span><br />
            Forever
          </h1>

          <p ref={subRef} className="text-subhead" style={{
            color: 'rgba(255,255,255,0.75)', marginBottom: '2.5rem', maxWidth: '420px',
          }}>
            Where precision engineering meets artistic vision.
            Each piece is a statement — executed with obsessive detail.
          </p>

          <div ref={ctaRef} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#book" className="btn-primary">Book Your Session</a>
            <a href="#portfolio" className="btn-ghost">View Portfolio</a>
          </div>

          <div ref={statsRef} className="hero-stats"
            style={{ display: 'flex', gap: '0', marginTop: '3.5rem' }}>
            {[
              { n: '12+', label: 'Years of Craft' },
              { n: '3K+', label: 'Pieces Completed' },
              { n: '99%', label: 'Client Retention' },
            ].map(({ n, label }, i) => (
              <div key={label} style={{
                paddingRight: '2rem',
                paddingLeft: i === 0 ? 0 : '2rem',
                borderLeft: i === 0 ? 'none' : '1px solid rgba(192,122,46,0.3)',
              }}>
                <div style={{
                  fontSize: '1.9rem', fontWeight: 900,
                  color: '#fff', letterSpacing: '-0.03em',
                }}>{n}</div>
                <div style={{
                  fontSize: '0.68rem', fontWeight: 500,
                  color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em',
                  textTransform: 'uppercase', marginTop: '0.25rem',
                }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll hint — luxury mouse-wheel indicator ───────────── */}
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem',
        zIndex: 5,
      }}>
        <span style={{
          fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.4)', fontWeight: 500,
        }}>Scroll to explore</span>
        <div style={{
          width: 24, height: 38,
          borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.25)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            width: 3, height: 7,
            background: 'var(--accent)',
            borderRadius: 2,
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'scrollWheel 1.8s ease-in-out infinite',
          }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hamburger        { display: flex !important; }
          .nav-cta-desktop  { display: none !important; }
        }
        .nav-sale-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.4rem 1rem 0.4rem 0.7rem;
          border-radius: 999px;
          border: 1px solid rgba(192,122,46,0.75);
          background: rgba(192,122,46,0.18);
          color: #E8952A;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;
          box-shadow: 0 0 16px rgba(192,122,46,0.28), inset 0 1px 0 rgba(255,255,255,0.06);
          white-space: nowrap;
        }
        .nav-sale-badge:hover {
          background: rgba(192,122,46,0.28);
          border-color: rgba(192,122,46,1);
          box-shadow: 0 0 28px rgba(192,122,46,0.45), inset 0 1px 0 rgba(255,255,255,0.08);
        }
        .nav-sale-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #C07A2E;
          box-shadow: 0 0 5px rgba(192,122,46,0.8);
          animation: navSalePulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes navSalePulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 5px rgba(192,122,46,0.8); }
          50%       { opacity: 0.45; box-shadow: 0 0 2px rgba(192,122,46,0.3); }
        }
      `}</style>
    </section>
  );
}
