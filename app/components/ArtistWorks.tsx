'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from './Lightbox';

interface Props {
  works: string[];
  artistName: string;
  workAlt?: string[];
}

export default function ArtistWorks({ works, artistName, workAlt }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1rem',
      }} className="artist-works">
        {works.map((src, i) => (
          <button
            key={i}
            onClick={() => setLightboxIndex(i)}
            aria-label={`Open ${workAlt?.[i] ?? `${artistName} work ${i + 1}`} in lightbox`}
            style={{
              padding: 0, border: 'none', background: 'none',
              borderRadius: '12px', overflow: 'hidden',
              aspectRatio: i % 3 === 0 ? '4/5' : '1/1',
              backgroundColor: 'var(--bg-dark-2)',
              position: 'relative',
              cursor: 'zoom-in',
              display: 'block',
              width: '100%',
            }}
          >
            <Image
              src={src}
              alt={workAlt?.[i] ?? `${artistName} work ${i + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 600px"
              style={{ objectFit: 'cover' }}
              className="portfolio-work-img"
            />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={works}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNav={setLightboxIndex}
        />
      )}
    </>
  );
}
