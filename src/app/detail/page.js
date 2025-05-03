import { Suspense } from 'react';
import BeritaDetailClient from './BeritaDetailClient';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BeritaDetailClient />
    </Suspense>
  );
}