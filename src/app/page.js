"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [newsApi, setNewsApi] = useState([
    {
        "id": 1,
        "title": "Indonesia Tekankan Kepentingan Nasional dalam Negosiasi Tarif AS",
        "contentNews": "Indonesia menekankan kepentingan nasional dalam negosiasi perdagangan dengan Amerika Serikat terkait tarif 32% yang diusulkan. Menteri Koordinator Bidang Perekonomian Airlangga Hartarto dan Menteri Keuangan Sri Mulyani Indrawati memimpin pembicaraan untuk membangun hubungan dagang yang adil dan setara. Diskusi mencakup pasokan energi, akses pasar AS untuk barang Indonesia, deregulasi, serta kolaborasi dalam mineral kritis, teknologi, dan sistem pembayaran.",
        "createdAt": "2025-04-25T01:00:00.000+00:00"
    },
    {
        "id": 2,
        "title": "Indonesia Prediksi Pertumbuhan Ekonomi Stabil di 5% pada 2025",
        "contentNews": "Menteri Keuangan Sri Mulyani Indrawati menyatakan bahwa ekonomi Indonesia diperkirakan tumbuh sekitar 5% pada tahun 2025, meskipun terdapat ketegangan perdagangan dengan Amerika Serikat. Pemerintah berkomitmen untuk mengurangi ancaman tarif melalui peningkatan impor barang AS dan pengurangan hambatan non-tarif. Target pertumbuhan pemerintah adalah 5,2%, sementara IMF menurunkan proyeksi menjadi 4,7%.",
        "createdAt": "2025-04-24T02:30:00.000+00:00"
    },
    {
        "id": 3,
        "title": "Surplus Perdagangan Indonesia Mencapai Tertinggi dalam Empat Bulan",
        "contentNews": "Pada Maret 2025, Indonesia mencatat surplus perdagangan sebesar $4,33 miliar, melampaui ekspektasi dan menjadi yang tertinggi dalam empat bulan terakhir. Pertumbuhan ekspor, terutama minyak sawit dan nikel, mendorong hasil ini. Total ekspor naik 3,16% dibandingkan tahun sebelumnya, sementara impor meningkat 5,34%.",
        "createdAt": "2025-04-21T03:15:00.000+00:00"
    },
    {
        "id": 4,
        "title": "Investasi Asing Langsung Indonesia Naik 12,7% pada Kuartal Pertama 2025",
        "contentNews": "Investasi asing langsung (FDI) Indonesia mencapai 230,4 triliun rupiah ($13,67 miliar) pada kuartal pertama 2025, meningkat 12,7% dibandingkan tahun sebelumnya. Sektor pertambangan dan peleburan logam tetap menarik bagi investor asing, didukung oleh larangan ekspor bijih nikel sejak 2020.",
        "createdAt": "2025-04-23T04:45:00.000+00:00"
    },
    {
        "id": 5,
        "title": "Bank Indonesia Pertahankan Suku Bunga Acuan di 5,75%",
        "contentNews": "Bank Indonesia diperkirakan mempertahankan suku bunga acuan sebesar 5,75% pada 23 April untuk mendukung rupiah yang melemah. Meskipun ada kekhawatiran perlambatan ekonomi, BI tidak mungkin menurunkan suku bunga dalam waktu dekat. Inflasi diproyeksikan sebesar 2,1% pada 2025.",
        "createdAt": "2025-04-21T07:00:00.000+00:00"
    },
    {
        "id": 6,
        "title": "China Sepakat Tingkatkan Impor Produk Indonesia",
        "contentNews": "Menteri Luar Negeri China, Wang Yi, menyatakan kesediaan China untuk meningkatkan impor produk Indonesia, menekankan hubungan dagang yang kuat antara kedua negara. Pertemuan ini mengikuti kunjungan delegasi Indonesia ke Washington untuk bernegosiasi mengenai peningkatan impor AS dan investasi.",
        "createdAt": "2025-04-21T09:20:00.000+00:00"
    },
    {
        "id": 7,
        "title": "Pasar Saham Indonesia Turun 4% Akibat Kekhawatiran Ekonomi",
        "contentNews": "Indeks saham utama Indonesia turun hampir 4% pada hari Selasa karena kekhawatiran terhadap melemahnya belanja konsumen dan inisiatif belanja besar Presiden Prabowo Subianto. Indeks Komposit Jakarta awalnya turun 7,1%, menyebabkan penghentian perdagangan sementara, sebelum ditutup turun 3,8%.",
        "createdAt": "2025-03-18T10:10:00.000+00:00"
    },
    {
        "id": 8,
        "title": "Bank Indonesia Lakukan Pemotongan Suku Bunga untuk Dukung Pertumbuhan",
        "contentNews": "Bank Indonesia mengejutkan pasar dengan memotong suku bunga acuan sebesar 25 basis poin menjadi 5,75%, terendah dalam lebih dari setahun, untuk mendukung pertumbuhan di tengah volatilitas keuangan dan melemahnya rupiah. Langkah ini menyimpang dari ekspektasi ekonom karena kekhawatiran atas penurunan nilai rupiah terhadap dolar AS yang menguat.",
        "createdAt": "2025-01-15T11:05:00.000+00:00"
    },
    {
        "id": 9,
        "title": "UNCTAD Ramal Pertumbuhan Ekonomi Indonesia Capai 5,2% pada 2025",
        "contentNews": "Dalam laporan Trade and Development Report 2024, UNCTAD memperkirakan pertumbuhan ekonomi Indonesia akan mencapai 5,2% pada 2025. Pertumbuhan ini didukung oleh peningkatan belanja pemerintah, pariwisata, dan ekspor logam dasar.",
        "createdAt": "2024-12-26T12:00:00.000+00:00"
    },
    {
        "id": 10,
        "title": "Apindo Proyeksikan Pertumbuhan Ekonomi Indonesia 2025 Stagnan di 4,9-5,2%",
        "contentNews": "Asosiasi Pengusaha Indonesia (Apindo) memproyeksikan bahwa pertumbuhan ekonomi Indonesia pada tahun 2025 akan tetap stagnan di kisaran 4,9% hingga 5,2%, dipengaruhi oleh tekanan eksternal seperti tensi geopolitik dan fragmentasi perdagangan global.",
        "createdAt": "2024-12-19T13:00:00.000+00:00"
    }
]);

  // useEffect(() => {

  //   async function fetchData() {
  //     const dataNews = await axios.get("http://localhost:8080/api/news");
  //     setNewsApi(dataNews?.data?.data);
  //   }

  //   fetchData();
  // }, []);

  const highlightKeyword = (text, keyword) => {
    if (!keyword) return text;
    const regex = new RegExp(`(${keyword})`, 'gi');
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <mark key={i} className="bg-yellow-400 text-black px-1 rounded">{part}</mark>
      ) : (
        part
      )
    );
  };

  const countOccurrences = (text, keyword) => {
    if (!text || !keyword) return 0;
    const regex = new RegExp(keyword, "gi");
    return (text.match(regex) || []).length;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const keyword = query.trim().toLowerCase();
  
    const scoredResults = newsApi
      .map((item) => {
        const titleScore = countOccurrences(item.titleNews, keyword);
        const contentScore = countOccurrences(item.contentNews, keyword);
        const totalScore = titleScore * 2 + contentScore;
        return { ...item, score: totalScore };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score);
  
    setResults(scoredResults);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="w-full max-w-xl p-4">
      <form onSubmit={handleSearch} className="w-full max-w-xl">
        <center
        style={{
          'fontSize': '32px',
          'marginBottom': '24px',
          fontWeight: 800
        }}
        ><p>TUGAS SEARCH : NLP</p></center>
          <div className="flex items-center border border-gray-600 rounded-full bg-gray-900 px-4 py-2 shadow-lg">
            <input
              type="text"
              placeholder="Cari berita..."
              className="bg-transparent flex-grow focus:outline-none text-white placeholder-gray-400"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button>
              <svg
                className="w-5 h-5 text-gray-400 hover:text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </form>
         {/* Hasil Pencarian */}
          <div className="mt-6 w-full max-w-xl space-y-4">
            {results.length > 0 ? (
              results.map((news, idx) => (
                  <div key={idx} className="bg-gray-800 p-4 rounded-lg shadow">
                    <Link
                      target="_blank"
                      href={{
                        pathname: '/detail',
                        query: {
                          title: news.title,
                          content: news.contentNews
                        }
                        
                      }}
                    >
                      <h2 className="text-lg font-bold">
                        {highlightKeyword(news.title, query)}
                      </h2>
                    </Link>
                    <p className="text-sm text-gray-300">
                        {highlightKeyword(news.contentNews, query)}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">Skor relevansi: {news.score}</p>
                  </div>
              ))
            ) : (
              query && (
                <p className="text-gray-400 mt-4 text-center">Berita tidak ditemukan.</p>
              )
            )}
          </div>
      </div>
    </main>
  );
}
