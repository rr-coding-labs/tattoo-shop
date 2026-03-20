'use client';

import { useRouter } from 'next/navigation';

interface Props {
  artistName: string;
  firstName: string;
}

export default function BookWithArtistButton({ artistName, firstName }: Props) {
  const router = useRouter();

  const handleClick = () => {
    sessionStorage.setItem('bookArtist', artistName);
    sessionStorage.setItem('skipIntro', '1');
    router.push('/');
  };

  return (
    <button onClick={handleClick} className="btn-primary" style={{ cursor: 'pointer', border: 'none' }}>
      Book with {firstName}
    </button>
  );
}
