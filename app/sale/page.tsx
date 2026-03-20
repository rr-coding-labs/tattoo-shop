'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

/* ─── Fade-in on scroll ───────────────────────────────────────────── */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); io.unobserve(el); } },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/* ─── Reusable animated section wrapper ──────────────────────────── */
function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useFadeIn();
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ─── Feature card data ───────────────────────────────────────────── */
const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 18.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Z"/>
        <path d="M12 22v-3.5M12 2v3.5M4.22 4.22l2.47 2.47M17.31 17.31l2.47 2.47M2 12h3.5M18.5 12H22M4.22 19.78l2.47-2.47M17.31 6.69l2.47-2.47"/>
      </svg>
    ),
    title: 'Progressive Web App',
    desc: 'Installs as a native app on iOS and Android. Offline-ready service worker, home screen icon, and full-screen standalone mode — no App Store required.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 3l14 9-14 9V3z"/>
      </svg>
    ),
    title: 'GSAP Animations',
    desc: 'Every element enters with intent. Scroll-triggered reveals, staggered cards, hero image wipe, and copper shimmer text — all powered by GSAP.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
    ),
    title: 'SEO Powerhouse',
    desc: 'Full Open Graph, Twitter Cards, JSON-LD TattooParlor schema, canonical URLs, and robots config. Ready for Google from day one.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>
      </svg>
    ),
    title: 'Mobile-First Design',
    desc: 'Pixel-perfect on every screen. Animated hamburger menu, touch-optimised gallery, responsive masonry grid — built for thumbs, not just cursors.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    ),
    title: 'Artist Portfolio Pages',
    desc: 'Each artist gets their own dynamic page with bio, specialty tags, portfolio grid, and book CTA. Add unlimited artists via a single data file.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 6.5A2.5 2.5 0 0 1 5 4h14a2.5 2.5 0 0 1 2.5 2.5v11A2.5 2.5 0 0 1 19 20H5a2.5 2.5 0 0 1-2.5-2.5v-11Z"/>
        <path d="M8 10h8M8 14h5"/>
      </svg>
    ),
    title: 'Booking Form',
    desc: 'Consultation request form with artist pre-selection, idea description field, and smart artist auto-fill when clicking "Book with [Name]".',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    title: 'Masonry Portfolio Gallery',
    desc: 'Animated masonry grid with blur-to-focus entrance, hover scale effects, copper overlay, and a full-screen lightbox with keyboard navigation.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"/>
        <path d="m9 12 2 2 4-4"/>
      </svg>
    ),
    title: 'WCAG 2.1 Accessible',
    desc: 'Screen reader labels, keyboard navigation, focus-visible styles, dialog focus traps, and semantic HTML throughout. Built the right way.',
  },
];

/* ─── Tech stack pills ────────────────────────────────────────────── */
const STACK = ['Next.js 16', 'React 19', 'TypeScript', 'GSAP 3', 'Tailwind CSS v4', 'next-pwa', 'App Router', 'Turbopack'];

/* ─── Included items ──────────────────────────────────────────────── */
const INCLUDED = [
  'Full source code (TypeScript)',
  '3 artist profile pages (expandable)',
  'Masonry gallery + lightbox',
  'Animated booking / consultation form',
  'Slide-in mobile navigation',
  'GSAP scroll-triggered animations',
  'PWA manifest + service worker',
  'SEO metadata, Open Graph & JSON-LD',
  'Dark / copper design token system',
  'Accessible — WCAG 2.1 compliant',
  'Back-to-top button',
  'Process / steps section',
  'Footer with social links',
  'Fully responsive (320px → 4K)',
];

/* ─── Customisation rows ──────────────────────────────────────────── */
const CUSTOMISATIONS = [
  { label: 'Brand colours', detail: 'One CSS file — swap copper for any accent in 30 seconds' },
  { label: 'Logo & name',   detail: 'Replace "Your Logo Here" across the app in seconds' },
  { label: 'Artists',       detail: 'Add or remove artists by editing a single data array' },
  { label: 'Portfolio',     detail: 'Drop in client\'s images — grid reflows automatically' },
  { label: 'Copy & text',   detail: 'All content is in plain JSX — no CMS complexity' },
  { label: 'Backend',       detail: 'Connect booking to Zapier, Make, Resend, or any API' },
  { label: 'New sections',  detail: 'Modular component architecture — add anything cleanly' },
  { label: 'Domain & host', detail: 'Deploys to Vercel, Netlify, or any Node host in minutes' },
  { label: 'Deployment',   detail: 'I handle the full go-live setup. Ongoing hosting costs remain with the client.' },
  { label: 'Image CMS',    detail: 'Connect existing image library or migrate to a headless CMS — all assets moved across. Additional cost may apply.' },
];

/* ─── Page component ──────────────────────────────────────────────── */
export default function SalePage() {
  return (
    <main style={{ background: '#08070A', color: '#fff', fontFamily: 'Inter, sans-serif', overflowX: 'hidden' }}>

      {/* ── TOP NAV ─────────────────────────────────────────────── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.1rem 3rem',
        background: 'rgba(8,7,10,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(192,122,46,0.12)',
      }}>
        <Link href="/" className="sale-back-link">
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to website
        </Link>
        <a href="/" target="_blank" rel="noopener noreferrer" style={{
          fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
          color: '#C07A2E', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem',
          border: '1px solid rgba(192,122,46,0.35)', borderRadius: '999px', padding: '0.45rem 1.1rem',
          transition: 'background 0.2s',
        }}>
          View live demo
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2.5 9.5l7-7M4 2.5h5.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section style={{
        minHeight: '90vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '8rem 2rem 6rem', textAlign: 'center',
        position: 'relative',
      }}>
        {/* ambient glow */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: '40%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '900px', height: '500px',
          background: 'radial-gradient(ellipse, rgba(192,122,46,0.10) 0%, transparent 65%)',
          filter: 'blur(60px)', pointerEvents: 'none',
        }} />
        <div aria-hidden="true" style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'radial-gradient(rgba(192,122,46,0.06) 1px, transparent 1px)',
          backgroundSize: '36px 36px', pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', maxWidth: '860px' }}>
          {/* badge */}
          <div className="sale-badge">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C07A2E', display: 'inline-block' }} />
            Bespoke Studio Website · Available Now
          </div>

          <h1 className="sale-hero-title">
            The&nbsp;<span className="sale-copper">Complete</span> Tattoo&nbsp;Studio Website
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.75, maxWidth: '640px', margin: '0 auto 3rem',
          }}>
            Production-ready. Visually stunning. Ship a world-class tattoo studio website for your client in&nbsp;days — not months. Built with the tools agencies trust and the polish clients love.
          </p>

          {/* Price */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '0.5rem' }}>One-time license</div>
            <div style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, color: '#fff' }}>
              £<span className="sale-copper">1,300</span>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/447817807613?text=Hi%2C%20I%27m%20interested%20in%20the%20tattoo%20studio%20website"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.65rem',
              background: '#25D366',
              color: '#fff', fontWeight: 700, fontSize: '0.78rem',
              letterSpacing: '0.08em', textTransform: 'uppercase',
              padding: '1rem 2.5rem', borderRadius: '999px', textDecoration: 'none',
              boxShadow: '0 4px 32px rgba(37,211,102,0.35)',
            }}
          >
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp me — 07817 807613
          </a>

          {/* stack strip */}
          <div style={{ marginTop: '4rem', display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center' }}>
            {STACK.map(t => (
              <span key={t} style={{
                fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '0.35rem 0.85rem', borderRadius: '999px',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.5)',
              }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREVIEW FRAME ───────────────────────────────────────── */}
      <section style={{ padding: '0 2rem 8rem', maxWidth: '1100px', margin: '0 auto' }}>
        <Reveal>
          <div style={{
            borderRadius: '20px', overflow: 'hidden',
            border: '1px solid rgba(192,122,46,0.2)',
            boxShadow: '0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(192,122,46,0.1)',
            position: 'relative',
          }}>
            {/* Browser chrome mockup */}
            <div style={{
              background: '#131009', padding: '0.75rem 1rem',
              display: 'flex', alignItems: 'center', gap: '0.6rem',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                {['#FF5F57','#FEBC2E','#28C840'].map(c => (
                  <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
                ))}
              </div>
              <div style={{
                flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: '6px',
                padding: '0.25rem 0.75rem', fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)',
                letterSpacing: '0.04em', maxWidth: '320px', margin: '0 auto',
              }}>
                yourlogoheretatoo.com
              </div>
            </div>
            <iframe
              src="/"
              title="Live preview of the tattoo studio website"
              style={{ width: '100%', height: '500px', border: 'none', display: 'block' }}
              loading="lazy"
            />
          </div>
        </Reveal>
      </section>

      {/* ── FEATURES ────────────────────────────────────────────── */}
      <section style={{ padding: '5rem 2rem 8rem', maxWidth: '1100px', margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="sale-eyebrow">Everything Included</div>
            <h2 className="sale-section-title">
              Built to <span className="sale-copper">Impress</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
              Every detail considered. Every feature a client would want — already built, already working.
            </p>
          </div>
        </Reveal>

        <div className="sale-features-grid">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 60}>
              <div className="sale-feature-card">
                <div className="sale-feature-icon">{f.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.6rem', color: '#fff' }}>{f.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem', lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── PWA SPOTLIGHT ───────────────────────────────────────── */}
      <section style={{ padding: '5rem 2rem', background: '#0D0B0F', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{
          position: 'absolute', right: '-200px', top: '50%', transform: 'translateY(-50%)',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(192,122,46,0.1) 0%, transparent 65%)',
          filter: 'blur(40px)', pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }} className="sale-split">
          <Reveal>
            <div className="sale-eyebrow">Progressive Web App</div>
            <h2 className="sale-section-title" style={{ textAlign: 'left' }}>
              Feels Like a <span className="sale-copper">Native App</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '2rem' }}>
              Your client's studio installs directly to a customer's home screen — no App Store, no download, no friction. The PWA service worker caches critical assets so the site loads instantly even on slow connections.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['Offline-capable service worker', 'Add to Home Screen prompt', 'Splash screen & themed status bar', 'App shortcuts (Book, Artists)', 'Lighthouse PWA score: 100'].map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <circle cx="8" cy="8" r="7" stroke="rgba(192,122,46,0.4)" strokeWidth="1"/>
                    <path d="M5 8l2.2 2.2L11 6" stroke="#C07A2E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100}>
            {/* Phone mockup */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{
                width: '220px', height: '420px',
                background: '#1a1812',
                borderRadius: '36px',
                border: '6px solid #2a2620',
                boxShadow: '0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(192,122,46,0.15), inset 0 0 0 1px rgba(255,255,255,0.04)',
                overflow: 'hidden', position: 'relative',
                display: 'flex', flexDirection: 'column',
              }}>
                {/* Status bar */}
                <div style={{ height: '28px', background: '#0A0806', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', fontSize: '9px', color: 'rgba(255,255,255,0.6)', flexShrink: 0 }}>
                  <span>9:41</span>
                  <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="rgba(255,255,255,0.6)" aria-hidden="true"><rect x="0" y="4" width="2" height="4" rx="0.5"/><rect x="3" y="2.5" width="2" height="5.5" rx="0.5"/><rect x="6" y="1" width="2" height="7" rx="0.5"/><rect x="9" y="0" width="2" height="8" rx="0.5"/></svg>
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="rgba(255,255,255,0.6)" aria-hidden="true"><path d="M5 1.5C3.5 1.5 2.2 2.1 1.2 3.1L0 1.8C1.3 0.7 3.1 0 5 0s3.7.7 5 1.8L8.8 3.1C7.8 2.1 6.5 1.5 5 1.5Z"/><path d="M5 4.5c-.8 0-1.5.3-2 .8L1.8 4C2.7 3.1 3.8 2.5 5 2.5s2.3.6 3.2 1.5L7 5.3c-.5-.5-1.2-.8-2-.8Z"/><circle cx="5" cy="7" r="1"/></svg>
                    <svg width="16" height="8" viewBox="0 0 16 8" fill="none" aria-hidden="true"><rect x="0.5" y="0.5" width="13" height="7" rx="2" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/><rect x="14" y="2.5" width="1.5" height="3" rx="0.5" fill="rgba(255,255,255,0.3)"/><rect x="1.5" y="1.5" width="9" height="5" rx="1.5" fill="rgba(255,255,255,0.7)"/></svg>
                  </div>
                </div>
                {/* Mini app render */}
                <div style={{ flex: 1, background: '#0A0806', overflow: 'hidden', position: 'relative' }}>
                  <div style={{ background: 'url(/tattoo_gun.jpg) center/cover', height: '120px', position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,8,6,0.3), rgba(10,8,6,0.6))' }} />
                    <div style={{ position: 'absolute', bottom: '10px', left: '12px', fontSize: '10px', fontWeight: 900, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.1 }}>Art That<br/><span style={{ color: '#C07A2E' }}>Lives</span><br/>Forever</div>
                  </div>
                  <div style={{ padding: '10px 12px' }}>
                    <div style={{ fontSize: '7px', color: '#C07A2E', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>Selected Works</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
                      {['/portfolio/1.jpg','/portfolio/2.jpg','/portfolio/3.jpg','/portfolio/4.jpg'].map((src, i) => (
                        <div key={i} style={{ aspectRatio: '1', borderRadius: '4px', background: `url(${src}) center/cover`, overflow: 'hidden' }} />
                      ))}
                    </div>
                    <div style={{ marginTop: '10px', background: 'linear-gradient(135deg, #C07A2E, #E09A50)', borderRadius: '999px', padding: '5px', textAlign: 'center', fontSize: '7px', fontWeight: 700, color: '#fff', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Book Your Session</div>
                  </div>
                </div>
                {/* Home indicator */}
                <div style={{ height: '20px', background: '#0A0806', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '60px', height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.2)' }} />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ─────────────────────────────────────── */}
      <section style={{ padding: '8rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }} className="sale-split">
          <Reveal>
            <div className="sale-eyebrow">No Hidden Extras</div>
            <h2 className="sale-section-title" style={{ textAlign: 'left' }}>
              Everything You <span className="sale-copper">Need</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
              One purchase. Full source code. No subscriptions, no locked features, no "pro plan" for the important stuff. Fork it, own it, deploy it.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {INCLUDED.map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)' }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                    <rect width="18" height="18" rx="5" fill="rgba(192,122,46,0.12)"/>
                    <path d="M5.5 9l2.5 2.5 4.5-5" stroke="#C07A2E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="sale-eyebrow">Total Flexibility</div>
            <h2 className="sale-section-title" style={{ textAlign: 'left', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
              Tailor It to <span className="sale-copper">Any Studio</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: '2rem' }}>
              Clean, modular architecture makes customisation fast. No framework lock-in, no opinionated CMS. Just well-structured code you can take anywhere.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {CUSTOMISATIONS.map((item, i) => (
                <div key={item.label} style={{
                  padding: '1rem 0',
                  borderBottom: i < CUSTOMISATIONS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  display: 'grid', gridTemplateColumns: '130px 1fr', gap: '1rem', alignItems: 'start',
                }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#C07A2E', letterSpacing: '0.04em' }}>{item.label}</span>
                  <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>{item.detail}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SETUP SERVICES ──────────────────────────────────────── */}
      <section style={{ background: '#0D0B0F', padding: '6rem 2rem', borderTop: '1px solid rgba(192,122,46,0.08)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <div className="sale-eyebrow">Included in the Price</div>
              <h2 className="sale-section-title">
                I Handle the <span className="sale-copper">Hard Part</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
                You get more than code. I set everything up, connect your assets, and hand you the keys to a fully running website.
              </p>
            </div>
          </Reveal>

          <div className="sale-services-grid">
            {/* Deployment */}
            <Reveal delay={0}>
              <div className="sale-service-card">
                <div className="sale-service-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 19V5M5 12l7-7 7 7"/>
                    <rect x="3" y="19" width="18" height="2" rx="1"/>
                  </svg>
                </div>
                <div className="sale-service-tag">Included</div>
                <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: '#fff', margin: '0.75rem 0 0.6rem' }}>Deployment &amp; Go-Live Setup</h3>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>
                  I configure and deploy the website to your chosen platform — Vercel, Netlify, or your own host. Domain pointing, SSL, environment variables, and production build all handled for you.
                </p>
                <div style={{ marginTop: '1.5rem', padding: '0.85rem 1rem', background: 'rgba(192,122,46,0.06)', border: '1px solid rgba(192,122,46,0.15)', borderRadius: '10px', fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
                  <strong style={{ color: 'rgba(255,255,255,0.65)' }}>Note:</strong> Ongoing hosting fees (typically £0–£20/month) are the client&apos;s responsibility and billed directly by the platform.
                </div>
              </div>
            </Reveal>

            {/* Image Migration */}
            <Reveal delay={100}>
              <div className="sale-service-card">
                <div className="sale-service-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                    <rect x="3" y="14" width="7" height="7" rx="1"/>
                    <path d="M17.5 14v6M14.5 17h6"/>
                  </svg>
                </div>
                <div className="sale-service-tag">Included</div>
                <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: '#fff', margin: '0.75rem 0 0.6rem' }}>Image &amp; Content Integration</h3>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>
                  Already have a portfolio of images? I&apos;ll wire them directly into the gallery, artist pages, and hero. No manual uploading needed on your end.
                </p>
                <div style={{ marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {[
                    'Connect existing Dropbox, Google Drive, or S3 library',
                    'Migrate to a headless CMS (Sanity, Contentful, etc.)',
                    'Editors can upload new work without touching code',
                  ].map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)' }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ marginTop: '2px', flexShrink: 0 }}>
                        <circle cx="7" cy="7" r="6" stroke="rgba(192,122,46,0.35)" strokeWidth="1"/>
                        <path d="M4.5 7l1.8 1.8L9.5 5.2" stroke="#C07A2E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {item}
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '1.5rem', padding: '0.85rem 1rem', background: 'rgba(192,122,46,0.06)', border: '1px solid rgba(192,122,46,0.15)', borderRadius: '10px', fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
                  <strong style={{ color: 'rgba(255,255,255,0.65)' }}>CMS migration</strong> (full headless setup, data modelling, editor training) is quoted separately depending on the scope.
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ─────────────────────────────────────────── */}
      <section style={{ background: '#0D0B0F', padding: '4rem 2rem', borderTop: '1px solid rgba(192,122,46,0.1)', borderBottom: '1px solid rgba(192,122,46,0.1)' }}>
        <Reveal>
          <div style={{ maxWidth: '700px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', textAlign: 'center' }} className="sale-stats-grid">
            {[
              { n: '100', label: 'Lighthouse Score', suffix: '' },
              { n: '8', label: 'Major Sections', suffix: '+' },
              { n: '3', label: 'Artist Pages', suffix: '' },
            ].map(({ n, label, suffix }) => (
              <div key={label}>
                <div style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>
                  {n}<span style={{ color: '#C07A2E' }}>{suffix}</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '0.4rem', fontWeight: 500 }}>{label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section id="buy" style={{
        padding: '10rem 2rem',
        textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div aria-hidden="true" style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '800px', height: '400px',
          background: 'radial-gradient(ellipse, rgba(192,122,46,0.13) 0%, transparent 65%)',
          filter: 'blur(60px)', pointerEvents: 'none',
        }} />
        <div aria-hidden="true" style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'radial-gradient(rgba(192,122,46,0.05) 1px, transparent 1px)',
          backgroundSize: '36px 36px', pointerEvents: 'none',
        }} />

        <Reveal>
          <div style={{ position: 'relative', maxWidth: '700px', margin: '0 auto' }}>
            <div className="sale-eyebrow">Ready to Ship?</div>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.05, marginBottom: '1.5rem' }}>
              Launch Something<br /><span className="sale-copper">Extraordinary</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1.05rem', lineHeight: 1.75, maxWidth: '500px', margin: '0 auto 3rem' }}>
              One-time license. Full source code. Includes setup guidance and one round of customisation support. Get in touch to discuss your client's needs.
            </p>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>
              Questions? hello@yourlogoheretatoo.com
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '1rem',
        fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)',
      }}>
        <span>© 2025 Your Logo Here Tattoo. All rights reserved.</span>
        <a href="/" target="_blank" rel="noopener noreferrer" style={{ color: '#C07A2E', textDecoration: 'none', letterSpacing: '0.06em' }}>
          View the live app →
        </a>
      </footer>

      {/* ── PAGE STYLES ─────────────────────────────────────────── */}
      <style>{`
        /* Back link */
        .sale-back-link {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-size: 0.7rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
          color: rgba(255,255,255,0.5); text-decoration: none; transition: color 0.2s;
        }
        .sale-back-link:hover { color: #fff; }

        /* Fade-in reveal */
        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Hero */
        .sale-badge {
          display: inline-flex; align-items: center; gap: 0.6rem;
          background: rgba(192,122,46,0.1); border: 1px solid rgba(192,122,46,0.3);
          border-radius: 999px; padding: 0.4rem 1.1rem;
          font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em;
          text-transform: uppercase; color: #C07A2E;
          margin-bottom: 2rem;
        }
        .sale-hero-title {
          font-size: clamp(2.5rem, 6vw, 5rem);
          font-weight: 900; letter-spacing: -0.03em;
          line-height: 1; color: #fff; margin-bottom: 1.75rem;
        }

        /* Copper shimmer */
        .sale-copper {
          background: linear-gradient(135deg, #7A4A18 0%, #C07A2E 25%, #E09A50 45%, #F0C882 60%, #E09A50 75%, #C07A2E 90%, #7A4A18 100%);
          background-size: 300% 300%;
          animation: copperShimmer 5s ease-in-out infinite;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        @keyframes copperShimmer {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Section labels */
        .sale-eyebrow {
          font-size: 0.68rem; font-weight: 600; letter-spacing: 0.14em;
          text-transform: uppercase; color: #C07A2E; margin-bottom: 1rem;
        }
        .sale-section-title {
          font-size: clamp(1.8rem, 4vw, 3rem);
          font-weight: 900; letter-spacing: -0.025em;
          color: #fff; line-height: 1.05; margin-bottom: 1.25rem;
        }

        /* Features grid */
        .sale-features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 1px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          overflow: hidden;
        }
        .sale-feature-card {
          background: #08070A;
          padding: 2rem 1.75rem;
          transition: background 0.25s;
        }
        .sale-feature-card:hover { background: #0e0c10; }
        .sale-feature-icon {
          width: 40px; height: 40px;
          color: #C07A2E;
          margin-bottom: 1.25rem;
        }
        .sale-feature-icon svg { width: 100%; height: 100%; }

        /* Split layouts */
        .sale-split { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }

        /* Services grid */
        .sale-services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        .sale-service-card {
          background: #08070A;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 2rem;
          transition: border-color 0.25s;
        }
        .sale-service-card:hover { border-color: rgba(192,122,46,0.3); }
        .sale-service-icon {
          width: 40px; height: 40px; color: #C07A2E;
        }
        .sale-service-icon svg { width: 100%; height: 100%; }
        .sale-service-tag {
          display: inline-block;
          font-size: 0.6rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
          color: #C07A2E; background: rgba(192,122,46,0.1); border: 1px solid rgba(192,122,46,0.25);
          border-radius: 999px; padding: 0.2rem 0.65rem; margin-top: 1rem;
        }

        /* Stats grid */
        .sale-stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }

        @media (max-width: 768px) {
          nav { padding: 1rem 1.25rem !important; }
          .sale-split { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .sale-stats-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .sale-features-grid { grid-template-columns: 1fr !important; }
          .sale-services-grid { grid-template-columns: 1fr !important; }
          .sale-hero-title { letter-spacing: -0.02em !important; }
        }
        @media (max-width: 600px) {
          /* L2: switch stats to single column at 600px — three wide labels were too cramped below 480px */
          .sale-stats-grid { grid-template-columns: 1fr !important; text-align: left !important; }
        }
      `}</style>
    </main>
  );
}
