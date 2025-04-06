// pages/index.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/insights/uri');
  }, [router]);
  
  return <div>Redirecting to insights...</div>;
}