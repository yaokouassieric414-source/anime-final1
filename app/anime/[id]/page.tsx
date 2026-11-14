import { fetchAniList, MEDIA_DETAIL_QUERY } from '@/lib/anilist';
import { VideoPlayer } from '@/components/VideoPlayer';
import { AdBanner } from '@/components/AdBanner';
import { TelegramButton } from '@/components/TelegramButton';
import { FavoriteButton } from '@/components/FavoriteButton';
import { ShareButton } from '@/components/ShareButton';
import { Comments } from '@/components/Comments';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const data = await fetchAniList(MEDIA_DETAIL_QUERY, { id: parseInt(id) }, { revalidate: 3600 });
  const anime = data?.Media;
  if (!anime) return { title: 'Animé introuvable' };
  
  const title = anime.title.english || anime.title.romaji;
  return {
    title,
    description: anime.description?.slice(0, 160) || `Découvrez ${title}`,
  };
}

export default async function AnimeDetailPage({ params }: PageProps) {
  const { id } = await params;
  const data = await fetchAniList(MEDIA_DETAIL_QUERY, { id: parseInt(id) }, { revalidate: 3600 });
  const anime = data?.Media;

  if (!anime) notFound();

  const title = anime.title.english || anime.title.romaji || 'Sans titre';
  const score = anime.averageScore ? (anime.averageScore / 10).toFixed(1) : null;
  const studios = anime.studios?.nodes?.map((s: any) => s.name).join(', ') || 'Inconnu';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Banner */}
      {anime.bannerImage && (
        <div className="relative h-48 md:h-64 lg:h-80 rounded-xl overflow-hidden mb-8 -mx-4 sm:-mx-6 lg:-mx-8">
          <Image
            src={anime.bannerImage}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          <div className="flex gap-6 mb-6">
            <div className="relative w-32 md:w-40 aspect-[2/3] flex-shrink-0 rounded-lg overflow-hidden">
              {anime.coverImage?.large && (
                <Image
                  src={anime.coverImage.large}
                  alt={title}
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{title}</h1>
              {anime.title.native && (
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">{anime.title.native}</p>
              )}
              <div className="flex flex-wrap items-center gap-3 text-sm">
                {score && (
                  <span className="flex items-center gap-1 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 px-2 py-1 rounded">
                    <Star size={14} className="fill-current" />
                    {score}
                  </span>
                )}
                <span className="text-gray-500">{anime.seasonYear}</span>
                <span className="text-gray-500">{anime.format}</span>
                {anime.episodes && <span className="text-gray-500">{anime.episodes} épisodes</span>}
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {anime.genres?.slice(0, 5).map((g: string) => (
                  <span key={g} className="text-xs bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Video Player */}
          <VideoPlayer
            animeId={anime.id}
            title={title}
            trailer={anime.trailer}
            streamingEpisodes={anime.streamingEpisodes}
          />

          <AdBanner className="mt-6" />

          {/* Synopsis */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-3">Synopsis</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {anime.description || 'Aucun synopsis disponible.'}
            </p>
          </div>

          {/* Info */}
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Studio:</span>
              <p className="font-medium">{studios}</p>
            </div>
            <div>
              <span className="text-gray-500">Statut:</span>
              <p className="font-medium">{anime.status}</p>
            </div>
          </div>

          <Comments animeId={anime.id} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <AdBanner type="sidebar" />
          
          <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4">
            <h3 className="font-medium mb-3">Actions</h3>
            <div className="space-y-2">
              <FavoriteButton animeId={anime.id} />
              <ShareButton title={title} />
            </div>
          </div>

          <TelegramButton className="w-full justify-center" />
        </div>
      </div>
    </div>
  );
}