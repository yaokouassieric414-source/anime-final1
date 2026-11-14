'use client';

import { useState, useEffect } from 'react';
import { fetchAniList, CATALOG_QUERY } from '@/lib/anilist';
import { AnimeCard } from '@/components/AnimeCard';
import { AdBanner } from '@/components/AdBanner';

const GENRES = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Sci-Fi', 'Slice of Life', 'Sports'];
const FORMATS = ['TV', 'MOVIE', 'OVA', 'ONA', 'SPECIAL'];
const STATUSES = ['RELEASING', 'FINISHED', 'NOT_YET_RELEASED'];

export default function CatalogPage() {
  const [animes, setAnimes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    status: '',
    format: '',
  });

  useEffect(() => {
    async function load() {
      setLoading(true);
      const variables: any = { page: 1, perPage: 24 };
      if (filters.genre) variables.genre = filters.genre;
      if (filters.year) variables.year = parseInt(filters.year);
      if (filters.status) variables.status = filters.status;
      if (filters.format) variables.format = filters.format;

      const data = await fetchAniList(CATALOG_QUERY, variables);
      setAnimes(data?.Page?.media || []);
      setLoading(false);
    }
    load();
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">Catalogue</h1>

      {/* Filters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <select
          value={filters.genre}
          onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
          className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm"
        >
          <option value="">Tous les genres</option>
          {GENRES.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        <select
          value={filters.format}
          onChange={(e) => setFilters({ ...filters, format: e.target.value })}
          className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm"
        >
          <option value="">Tous les types</option>
          {FORMATS.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>

        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm"
        >
          <option value="">Tous les statuts</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Année"
          value={filters.year}
          onChange={(e) => setFilters({ ...filters, year: e.target.value })}
          className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm"
          min="1960"
          max={new Date().getFullYear() + 1}
        />
      </div>

      <AdBanner className="mb-8" />

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[2/3] bg-gray-300 dark:bg-gray-700 rounded-lg" />
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mt-2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {animes.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      )}

      {!loading && animes.length === 0 && (
        <p className="text-center text-gray-500 py-12">Aucun animé trouvé avec ces filtres.</p>
      )}
    </div>
  );
}