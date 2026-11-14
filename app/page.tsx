import { fetchAniList, TRENDING_QUERY, POPULAR_QUERY, NEW_QUERY } from '@/lib/anilist';
import { AnimeSection } from '@/components/AnimeSection';
import { AdBanner } from '@/components/AdBanner';

export default async function HomePage() {
  const [trending, popular, newest] = await Promise.all([
    fetchAniList(TRENDING_QUERY, { page: 1, perPage: 12 }, { revalidate: 3600 }),
    fetchAniList(POPULAR_QUERY, { page: 1, perPage: 12 }, { revalidate: 3600 }),
    fetchAniList(NEW_QUERY, { page: 1, perPage: 12 }, { revalidate: 3600 }),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero / Banner Ad */}
      <AdBanner type="banner" className="mb-8" />

      <AnimeSection
        title="Tendances"
        animes={trending?.Page?.media || []}
      />

      <AdBanner type="inline" className="mb-8" />

      <AnimeSection
        title="Nouveautés"
        animes={newest?.Page?.media || []}
      />

      <AdBanner type="inline" className="mb-8" />

      <AnimeSection
        title="Populaire"
        animes={popular?.Page?.media || []}
      />

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Recommandé pour toi</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
          Basé sur les tendances actuelles
        </p>
        <AnimeSection
          title=""
          animes={trending?.Page?.media?.slice(0, 6) || []}
        />
      </section>
    </div>
  );
}