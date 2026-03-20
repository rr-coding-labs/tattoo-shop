'use client';

import { useEffect, useState } from 'react';

const inputStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.10)',
  borderRadius: 'var(--radius-md)',
  padding: '0.9rem 1.25rem',
  color: '#fff',
  fontSize: '0.875rem',
  fontFamily: 'Inter, sans-serif',
  outline: 'none',
  transition: 'border-color 0.2s',
  width: '100%',
};

const ARTISTS = ['Marcus Vane', 'Sela Orin', 'Theo Blackwood'];

export default function Booking() {
  const [preferredArtist, setPreferredArtist] = useState('');

  useEffect(() => {
    // Pre-populate from ?artist= param (navigating from an artist page)
    const params = new URLSearchParams(window.location.search);
    const urlArtist = params.get('artist');
    if (urlArtist) {
      setPreferredArtist(urlArtist);
      // Remove the param from the URL without a page reload
      const clean = new URL(window.location.href);
      clean.searchParams.delete('artist');
      window.history.replaceState({}, '', clean.toString());
      // Scroll to this section after layout and animations have settled
      setTimeout(() => {
        document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' });
      }, 700);
    }

    // Pre-populate from custom event (clicking "Book with X" on the same page)
    const handler = (e: Event) => {
      setPreferredArtist((e as CustomEvent<string>).detail);
    };
    window.addEventListener('select-artist', handler);
    return () => window.removeEventListener('select-artist', handler);
  }, []);
  return (
    <section id="book" className="section-pad" style={{
      background: 'var(--bg-dark-2)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background warm glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px', height: '400px',
        background: 'radial-gradient(ellipse at center, rgba(192,122,46,0.08) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <div style={{
          fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1rem',
        }}>Ready?</div>

        <h2 className="text-section" style={{ color: '#fff', marginBottom: '1.5rem' }}>
          Start Your<br /><span className="text-copper">Journey</span>
        </h2>

        <p className="text-subhead" style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>
          Every great tattoo begins with a conversation.
          Reserve your consultation and let's create something permanent together.
        </p>

        {/* Simple form */}
        <form
          onSubmit={e => e.preventDefault()}
          aria-label="Booking consultation request"
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}
        >
          <div className="booking-inputs">
            <div>
              <label htmlFor="booking-name" className="sr-only">Your Name</label>
              <input
                id="booking-name"
                name="name"
                type="text"
                placeholder="Your Name"
                autoComplete="name"
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(192,122,46,0.5)')}
                onBlur={e  => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)')}
              />
            </div>
            <div>
              <label htmlFor="booking-email" className="sr-only">Email address</label>
              <input
                id="booking-email"
                name="email"
                type="email"
                placeholder="Email"
                autoComplete="email"
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(192,122,46,0.5)')}
                onBlur={e  => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)')}
              />
            </div>
          </div>

          <label htmlFor="booking-artist" className="sr-only">Preferred Artist</label>
          <select
            id="booking-artist"
            name="preferredArtist"
            value={preferredArtist}
            onChange={e => setPreferredArtist(e.target.value)}
            style={{
              ...inputStyle,
              cursor: 'pointer',
              appearance: 'none',
              WebkitAppearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='none' stroke='%23b87333' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' d='M2 4l4 4 4-4'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 1.25rem center',
              paddingRight: '2.5rem',
            }}
            onFocus={e => (e.currentTarget.style.borderColor = 'rgba(192,122,46,0.5)')}
            onBlur={e  => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)')}
          >
            <option value="" style={{ background: '#1a1410' }}>Preferred Artist (optional)</option>
            {ARTISTS.map(name => (
              <option key={name} value={name} style={{ background: '#1a1410' }}>Book with — {name}</option>
            ))}
          </select>

          <label htmlFor="booking-message" className="sr-only">Describe your tattoo idea</label>
          <textarea
            id="booking-message"
            name="message"
            placeholder="Describe your idea, placement, and approximate size…"
            rows={4}
            style={{ ...inputStyle, resize: 'vertical' }}
            onFocus={e => (e.currentTarget.style.borderColor = 'rgba(192,122,46,0.5)')}
            onBlur={e  => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)')}
          />

          <button type="submit" className="btn-primary" style={{ alignSelf: 'center', marginTop: '0.5rem' }}>
            Request Consultation
          </button>
        </form>

        <p style={{ color: 'var(--text-subtle)', fontSize: '0.75rem' }}>
          We respond within 24 hours · All consultations are complimentary
        </p>
      </div>
    </section>
  );
}
