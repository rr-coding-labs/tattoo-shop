'use client';

import { useEffect, useState } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      aria-label="Back to top"
      // M2: hide from AT and keyboard when not visible
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 35,
        width: '52px',
        height: '52px',
        borderRadius: '50%',
        background: 'rgba(192,122,46,0.85)',
        border: '1px solid rgba(192,122,46,0.9)',
        boxShadow: '0 4px 24px rgba(192,122,46,0.45)',
        backdropFilter: 'blur(10px)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease, background 0.2s ease',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(192,122,46,1)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(192,122,46,0.85)'; }}
    >
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
        <path d="M8 12V4M4 8l4-4 4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
