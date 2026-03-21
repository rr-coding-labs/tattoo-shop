'use client';

const NAV = ['Portfolio', 'Artists', 'Process', 'Book a Session'];
const SOCIAL = [
  {
    label: 'Instagram',
    href: '#',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>,
  },
  {
    label: 'Pinterest',
    href: '#',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.64 1.267 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.772 0 2.981-2.263 2.981-4.942 0-2.044-1.378-3.573-3.868-3.573-2.814 0-4.567 2.108-4.567 4.453 0 .806.237 1.376.611 1.814.172.203.196.284.134.519-.044.172-.143.585-.186.749-.061.241-.246.328-.451.238-1.279-.524-1.875-1.935-1.875-3.517 0-2.612 2.211-5.753 6.587-5.753 3.537 0 5.87 2.57 5.87 5.329 0 3.659-2.027 6.398-5.01 6.398-.949 0-1.843-.516-2.148-1.093l-.584 2.237c-.211.812-.781 1.83-1.165 2.449.878.271 1.809.418 2.774.418 5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>,
  },
  {
    label: 'TikTok',
    href: '#',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.74a4.85 4.85 0 01-1.01-.05z"/></svg>,
  },
];

const linkStyle: React.CSSProperties = {
  color: 'rgba(255,255,255,0.45)',
  textDecoration: 'none',
  fontSize: '0.78rem',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  transition: 'color 0.2s',
  cursor: 'pointer',
};

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-dark)', position: 'relative', overflow: 'hidden' }}>
      {/* M1: aria-hidden="true" explicitly */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(192,122,46,0.5), transparent)',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 3rem 3rem' }}>

        {/* Top row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '3rem',
          marginBottom: '4rem',
        }} className="footer-top">

          {/* Brand */}
          <div>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 900,
              color: '#fff',
              letterSpacing: '-0.01em',
              marginBottom: '0.75rem',
            }}>Your Logo Here</div>
            <p style={{
              fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)',
              lineHeight: 1.7, maxWidth: '240px',
              fontStyle: 'italic',
            }}>
              By appointment only.<br />Every piece is original.
            </p>
            {/* Social */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              {SOCIAL.map(({ label, href, icon }) => (
                <a key={label} href={href} aria-label={label} style={{
                  width: '36px', height: '36px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.45)',
                  transition: 'color 0.2s, border-color 0.2s',
                  textDecoration: 'none',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--accent)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; }}
                >{icon}</a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div style={{
              fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.5rem',
            }}>Navigate</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {NAV.map(item => (
                <a
                  key={item}
                  href={`#${item.split(' ')[0].toLowerCase()}`}
                  style={linkStyle}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                >{item}</a>
              ))}
            </div>
          </div>

          {/* Studio info */}
          <div>
            <div style={{
              fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.5rem',
            }}>Studio</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { label: 'Location', value: '123 Art District, Scotland' },
                { label: 'Hours', value: 'Tue – Sat · 11am – 8pm' },
                { label: 'Booking', value: 'By appointment only' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>{label}</div>
                  <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom row */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.04em' }}>
            © {new Date().getFullYear()} Your Logo Here. All rights reserved.
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            {/* H6: removed dead href="#" Privacy/Terms links — no real pages exist yet */}

            <a href="/sale" className="footer-sale-badge">
              <span className="footer-sale-dot" />
              <span>This site is for sale,<br />click for details</span>
            </a>
          </div>
        </div>

      </div>

      <style>{`
        .footer-sale-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.4rem 1rem 0.4rem 0.7rem;
          border-radius: 999px;
          border: 1px solid rgba(34,197,94,0.75);
          background: rgba(34,197,94,0.18);
          color: #22C55E;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          text-align: center;
          line-height: 1.4;
          transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;
          box-shadow: 0 0 16px rgba(34,197,94,0.28), inset 0 1px 0 rgba(255,255,255,0.06);
        }
        .footer-sale-badge:hover {
          background: rgba(34,197,94,0.28);
          border-color: rgba(34,197,94,1);
          box-shadow: 0 0 28px rgba(34,197,94,0.45), inset 0 1px 0 rgba(255,255,255,0.08);
        }
        .footer-sale-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #22C55E;
          box-shadow: 0 0 5px rgba(34,197,94,0.8);
          animation: salePulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes salePulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 5px rgba(34,197,94,0.8); }
          50%       { opacity: 0.45; box-shadow: 0 0 2px rgba(34,197,94,0.3); }
        }
        @media (max-width: 1024px) {
          /* M6: two-column layout at tablet to prevent cramped three-column layout */
          .footer-top { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 768px) {
          .footer-top { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </footer>
  );
}
