'use client';

import { useEffect, useRef, useState } from 'react';

type Platform = 'ios' | 'android' | 'chrome' | 'other';

function detectPlatform(): Platform {
  const ua = navigator.userAgent;
  if (/iphone|ipad|ipod/i.test(ua)) return 'ios';
  if (/android/i.test(ua)) return 'android';
  if (/chrome/i.test(ua) && !/edg/i.test(ua)) return 'chrome';
  return 'other';
}

const INSTRUCTIONS: Record<Platform, { steps: string[]; note?: string }> = {
  ios: {
    steps: [
      'Open this page in Safari (not Chrome or Firefox)',
      'Tap the Share button at the bottom of the screen',
      'Scroll down and tap "Add to Home Screen"',
      'Tap "Add" in the top-right corner',
    ],
    note: 'iOS requires Safari — the share button looks like a box with an arrow pointing up.',
  },
  android: {
    steps: [
      'Tap the menu icon (⋮) in the top-right of Chrome',
      'Tap "Add to Home screen"',
      'Tap "Add" to confirm',
    ],
  },
  chrome: {
    steps: [
      'Click the install icon (⊕) in the address bar on the right',
      'Click "Install" in the dialog that appears',
    ],
    note: 'If you don\'t see the icon, click the ⋮ menu and choose "Install Your Logo Here".',
  },
  other: {
    steps: [
      'Open this page in Chrome or Safari',
      'Use the browser menu to find "Add to Home Screen" or "Install app"',
    ],
  },
};

interface Props {
  /** Called when the user accepts the Android/Chrome native install prompt */
  onInstalled?: () => void;
}

export default function InstallPWAButton({ onInstalled }: Props) {
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<Event & { prompt(): void; userChoice: Promise<{ outcome: string }> } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    setPlatform(detectPlatform());

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as typeof deferredPrompt);
    };
    const onInstall = () => { setIsInstalled(true); onInstalled?.(); };

    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstall);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstall);
    };
  }, [onInstalled]);

  // Focus close button when modal opens
  useEffect(() => {
    if (showModal) setTimeout(() => closeRef.current?.focus(), 50);
  }, [showModal]);

  const handleClick = async () => {
    // Android/Chrome with native prompt available — use it directly
    if (deferredPrompt && platform !== 'ios') {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') { setIsInstalled(true); onInstalled?.(); }
      setDeferredPrompt(null);
      return;
    }
    // iOS or no native prompt — show instructions
    setShowModal(true);
  };

  if (isInstalled || platform === null) return null;

  const info = INSTRUCTIONS[platform];

  return (
    <>
      {/* Trigger button — styled to sit in the mobile menu */}
      <button
        onClick={handleClick}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.6rem',
          background: 'rgba(192,122,46,0.08)',
          border: '1px solid rgba(192,122,46,0.3)',
          borderRadius: '999px',
          padding: '0.55rem 1.1rem',
          color: 'var(--accent)',
          fontSize: '0.72rem', fontWeight: 600,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          cursor: 'pointer', width: '100%',
          transition: 'background 0.2s, border-color 0.2s',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(192,122,46,0.15)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(192,122,46,0.08)'; }}
      >
        {/* Home screen icon */}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <rect x="1" y="1" width="12" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.3"/>
          <path d="M7 4v6M4 7h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
        Add to Home Screen
      </button>

      {/* Instructions modal */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Add to Home Screen instructions"
          onClick={() => setShowModal(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: '480px',
              background: '#1A1510',
              border: '1px solid rgba(192,122,46,0.2)',
              borderRadius: '20px 20px 16px 16px',
              padding: '2rem',
              position: 'relative',
            }}
          >
            {/* Close */}
            <button
              ref={closeRef}
              onClick={() => setShowModal(false)}
              aria-label="Close"
              style={{
                position: 'absolute', top: '1.25rem', right: '1.25rem',
                background: 'rgba(255,255,255,0.06)', border: 'none',
                borderRadius: '50%', width: 32, height: 32,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'rgba(255,255,255,0.6)',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Header */}
            <div style={{
              fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.6rem',
            }}>
              {platform === 'ios' ? 'iOS · Safari' : platform === 'android' ? 'Android · Chrome' : 'Desktop · Chrome'}
            </div>
            <h2 style={{
              fontSize: '1.2rem', fontWeight: 800, color: '#fff',
              letterSpacing: '-0.02em', marginBottom: '1.5rem',
            }}>Add to Home Screen</h2>

            {/* Steps */}
            <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {info.steps.map((step, i) => (
                <li key={i} style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                  <span style={{
                    flexShrink: 0,
                    width: 24, height: 24,
                    borderRadius: '50%',
                    background: 'rgba(192,122,46,0.15)',
                    border: '1px solid rgba(192,122,46,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.65rem', fontWeight: 700, color: 'var(--accent)',
                    marginTop: '0.1rem',
                  }}>{i + 1}</span>
                  <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>{step}</span>
                </li>
              ))}
            </ol>

            {/* iOS share icon visual hint */}
            {platform === 'ios' && (
              <div style={{
                marginTop: '1.5rem',
                padding: '0.85rem 1rem',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '10px',
                display: 'flex', alignItems: 'center', gap: '0.75rem',
              }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ color: '#0A84FF', flexShrink: 0 }}>
                  <path d="M10 1v11M6 4l4-3 4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 8H2v10h16V8h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
                  Look for this icon at the bottom of your Safari browser
                </span>
              </div>
            )}

            {/* Note */}
            {info.note && (
              <p style={{
                marginTop: '1rem', fontSize: '0.75rem',
                color: 'rgba(255,255,255,0.35)', lineHeight: 1.6,
              }}>{info.note}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
