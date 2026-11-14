import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À propos',
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">À propos d'AnimeStream</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          AnimeStream est un catalogue moderne et rapide d'animés, conçu pour vous aider à découvrir 
          de nouveaux titres et suivre vos favoris. Les données sont fournies par l'API publique d'AniList.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Ce site ne propose pas de streaming illégal. Nous encourageons le soutien des créateurs 
          via les plateformes officielles.
        </p>
        <h2 className="text-xl font-bold mt-8 mb-3">Fonctionnalités</h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
          <li>Catalogue complet avec filtres avancés</li>
          <li>Recherche en temps réel</li>
          <li>Système de favoris (localStorage)</li>
          <li>Mode sombre/clair</li>
          <li>Design responsive optimisé mobile</li>
        </ul>
      </div>
    </div>
  );
}