'use client';
import { useSearchParams } from "next/navigation";

export default function BeritaDetailClient() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const content = searchParams.get("content");

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-lg leading-relaxed">{content}</p>
      </div>
    </main>
  );
}