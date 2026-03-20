import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ARTISTS, getArtistBySlug } from '../../lib/artists';
import ArtistWorks from '../../components/ArtistWorks';

export function generateStaticParams() {
  return ARTISTS.map(a => ({ slug: a.slug }));
}

export default async function ArtistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);
  if (!artist) notFound();

  return (
    <main style={{ background: 'var(--bg-dark)', minHeight: '100vh', color: '#fff' }}>

      {/* Back link */}
      <div style={{ padding: '2rem 3rem 0', maxWidth: '1200px', margin: '0 auto' }}>
        <a href="/#artists" className="artist-back-link">
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          All Artists
        </a>
      </div>

      {/* Hero — H7: fluid minmax column instead of fixed 420px */}
      <section style={{
        maxWidth: '1200px', margin: '0 auto',
        padding: '3rem 3rem 5rem',
        display: 'grid',
        gridTemplateColumns: 'minmax(320px, 420px) 1fr',
        gap: '5rem',
        alignItems: 'start',
      }} className="artist-hero">

        {/* Portrait */}
        <div style={{ position: 'sticky', top: '5rem' }}>
          {/* H2: next/image with fill; parent needs position:relative */}
          <div style={{
            borderRadius: '16px',
            overflow: 'hidden',
            aspectRatio: '3/4',
            position: 'relative',
          }}>
            <Image
              src={artist.img}
              alt={artist.name}
              fill
              sizes="(max-width: 900px) 100vw, 420px"
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
              priority
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(10,8,6,0.6) 0%, transparent 60%)',
            }} />
            <div style={{
              position: 'absolute', bottom: '1.75rem', left: '1.75rem',
              fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'var(--accent)', fontWeight: 600,
            }}>{artist.years} experience</div>
          </div>

          {/* Specialties */}
          <div style={{ marginTop: '1.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {artist.specialties.map(s => (
              <span key={s} style={{
                fontSize: '0.68rem', letterSpacing: '0.08em', textTransform: 'uppercase',
                padding: '0.4rem 0.9rem',
                borderRadius: '999px',
                border: '1px solid rgba(192,122,46,0.35)',
                color: 'var(--accent)',
                background: 'rgba(192,122,46,0.08)',
              }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <div style={{
            fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1rem',
          }}>{artist.role}</div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 900, letterSpacing: '-0.03em',
            color: '#fff', lineHeight: 1, marginBottom: '2.5rem',
          }}>{artist.name}</h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem' }}>
            {artist.bio.map((para, i) => (
              <p key={i} style={{
                color: 'rgba(255,255,255,0.7)', fontSize: '1rem',
                lineHeight: 1.75, margin: 0,
              }}>{para}</p>
            ))}
          </div>

          <a
            href={`/?artist=${encodeURIComponent(artist.name)}#book`}
            className="btn-primary"
          >
            Book with {artist.name.split(' ')[0]}
          </a>
        </div>
      </section>

      {/* Divider */}
      <div className="divider" />

      {/* Portfolio */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 3rem' }}>
        <div style={{
          fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1rem',
        }}>Selected Works</div>
        <h2 style={{
          fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
          fontWeight: 800, letterSpacing: '-0.02em',
          color: '#fff', marginBottom: '3rem',
        }}>Portfolio</h2>

        <ArtistWorks
          works={artist.works}
          artistName={artist.name}
          workAlt={artist.workAlt}
        />
      </section>

      {/* Book CTA */}
      <section style={{
        background: 'var(--bg-dark-2)',
        textAlign: 'center',
        padding: '6rem 3rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div aria-hidden="true" style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '600px', height: '300px',
          background: 'radial-gradient(ellipse, rgba(192,122,46,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative' }}>
          <div style={{
            fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1rem',
          }}>Ready?</div>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 900, letterSpacing: '-0.02em',
            color: '#fff', marginBottom: '1.5rem',
          }}>Book a Session with<br />{artist.name.split(' ')[0]}</h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', marginBottom: '2.5rem', maxWidth: '400px', margin: '0 auto 2.5rem' }}>
            Every consultation is complimentary. We respond within 24 hours.
          </p>
          <a href="/#book" className="btn-primary">Request Consultation</a>
        </div>
      </section>

      <style>{`
        .artist-back-link {
          display: inline-flex; align-items: center; gap: 0.5rem;
          font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(255,255,255,0.45); text-decoration: none; transition: color 0.2s;
        }
        .artist-back-link:hover { color: #fff; }
        .portfolio-work-img { transition: transform 0.4s ease; }
        .portfolio-work-img:hover { transform: scale(1.04); }
        @media (max-width: 900px) {
          /* H7: break to single column at 900px, not 768px, to fix cramped tablet layout */
          .artist-hero { grid-template-columns: 1fr !important; gap: 2.5rem !important; padding: 2rem 1.25rem 4rem !important; }
        }
        @media (max-width: 768px) {
          .artist-works { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </main>
  );
}
