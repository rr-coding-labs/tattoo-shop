'use client';

import { useEffect, useCallback, useRef } from 'react';

interface LightboxProps {
  images: string[];
  index: number;
  onClose: () => void;
  onNav: (index: number) => void;
}

export default function Lightbox({ images, index, onClose, onNav }: LightboxProps) {
  const prev = useCallback(() => onNav((index - 1 + images.length) % images.length), [index, images.length, onNav]);
  const next = useCallback(() => onNav((index + 1) % images.length), [index, images.length, onNav]);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Focus close button on open; restore focus on close
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => { previouslyFocused?.focus(); };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     { onClose(); return; }
      if (e.key === 'ArrowLeft')  { prev(); return; }
      if (e.key === 'ArrowRight') { next(); return; }

      // Focus trap — keep Tab inside the dialog
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last  = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
        }
      }
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, prev, next]);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Portfolio image ${index + 1} of ${images.length}`}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(0,0,0,0.92)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(6px)',
      }}
    >
      {/* Image container */}
      <div
        onClick={e => e.stopPropagation()}
        style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh', display: 'flex', alignItems: 'center' }}
      >
        <img
          key={index}
          src={images[index]}
          alt={`Portfolio ${index + 1}`}
          style={{
            maxWidth: '90vw',
            maxHeight: '85vh',
            objectFit: 'contain',
            borderRadius: '8px',
            display: 'block',
          }}
        />

        {/* Prev — outside on desktop, overlaid on mobile */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="lb-btn lb-btn-prev"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 4l-5 5 5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Next */}
        <button
          onClick={next}
          aria-label="Next"
          className="lb-btn lb-btn-next"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M7 4l5 5-5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Counter */}
        <div
          aria-live="polite"
          aria-atomic="true"
          style={{
            position: 'absolute', bottom: '-2.5rem', left: '50%', transform: 'translateX(-50%)',
            fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em',
          }}
        >
          {index + 1} / {images.length}
        </div>
      </div>

      <style>{`
        .lb-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(10,8,5,0.6);
          border: 1px solid rgba(192,122,46,0.3);
          border-radius: 50%;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          backdrop-filter: blur(8px);
          transition: background 0.2s, border-color 0.2s;
          z-index: 2;
        }
        .lb-btn:hover, .lb-btn:focus-visible {
          background: rgba(192,122,46,0.25);
          border-color: rgba(192,122,46,0.7);
          outline: 2px solid rgba(192,122,46,0.8);
          outline-offset: 2px;
        }
        .lb-btn-prev { left: -64px; }
        .lb-btn-next { right: -64px; }
        @media (max-width: 768px) {
          .lb-btn-prev { left: 8px; }
          .lb-btn-next { right: 8px; }
        }
      `}</style>

      {/* Close */}
      <button
        ref={closeRef}
        onClick={onClose}
        aria-label="Close lightbox"
        style={{
          position: 'fixed', top: '1.5rem', right: '1.5rem',
          background: 'rgba(10,8,5,0.6)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '50%',
          width: '40px', height: '40px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: '#fff',
          backdropFilter: 'blur(8px)',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 1l12 12M13 1L1 13" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
}
