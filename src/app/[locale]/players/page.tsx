import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Trophy, Target } from 'lucide-react';
import { getPlayers } from '@/lib/tina-client';
import { formatDate } from '@/lib/utils';

interface PlayersPageProps {
  params: Promise<{ locale: string }>;
}

const locales = ['tr', 'en'];

const positionColors: Record<string, string> = {
  carry: 'bg-red-500/20 text-red-400',
  support: 'bg-green-500/20 text-green-400',
  mid: 'bg-blue-500/20 text-blue-400',
  jungle: 'bg-purple-500/20 text-purple-400',
  top: 'bg-orange-500/20 text-orange-400',
};

export async function generateMetadata({ params }: PlayersPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  const title = locale === 'tr' ? 'Oyuncular - AIM Agency' : 'Players - AIM Agency';
  const description = locale === 'tr' 
    ? 'Profesyonel e-spor takımımızın yetenekli oyuncularını tanıyın.'
    : 'Meet our professional e-sports team\'s talented players.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: locale,
    },
  };
}

export default async function PlayersPage({ params }: PlayersPageProps) {
  const { locale } = await params;
  
  if (!locales.includes(locale)) {
    notFound();
  }

  try {
    const playersData = await getPlayers(locale);
    const players = playersData.data.players;

    const pageTitle = locale === 'tr' ? 'Oyuncularımız' : 'Our Players';
    const pageSubtitle = locale === 'tr' 
      ? 'Profesyonel takımımızın yetenekli üyeleri'
      : 'Talented members of our professional team';

    return (
      <div className="min-h-screen bg-gaming-dark">
        <div className="container-custom py-16">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-gaming font-bold mb-6">
              <span className="neon-text">{pageTitle}</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {pageSubtitle}
            </p>
          </div>

          {/* Players Grid */}
          {players.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {players.map((player, index) => (
                <div
                  key={`${player.slug}-${index}`}
                  className="gaming-card overflow-hidden group hover:scale-105 transition-all duration-300"
                >
                  {/* Player Avatar */}
                  <div className="relative h-64 overflow-hidden">
                    {player.avatar ? (
                      <Image
                        src={player.avatar}
                        alt={player.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gaming-primary/20 to-gaming-dark flex items-center justify-center">
                        <div className="text-6xl font-bold text-gaming-primary/50">
                          {player.nickname.charAt(0).toUpperCase()}
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gaming-dark/80 to-transparent"></div>
                    
                    {/* Position Badge */}
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        positionColors[player.position] || 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {player.position.toUpperCase()}
                      </span>
                    </div>

                    {/* Player Info Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-1">
                        {player.nickname}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {player.name}
                      </p>
                      {player.nationality && (
                        <p className="text-gray-400 text-xs mt-1">
                          {player.nationality}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Player Stats */}
                  <div className="p-6 space-y-4">
                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {player.age && (
                        <div>
                          <span className="text-gray-400">
                            {locale === 'tr' ? 'Yaş' : 'Age'}:
                          </span>
                          <span className="ml-2 text-white">{player.age}</span>
                        </div>
                      )}
                      {player.joinDate && (
                        <div>
                          <span className="text-gray-400">
                            {locale === 'tr' ? 'Katılım' : 'Joined'}:
                          </span>
                          <span className="ml-2 text-white">
                            {formatDate(player.joinDate).split(' ')[0]}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Player Stats */}
                    {player.stats && (
                      <div className="grid grid-cols-3 gap-2 py-4 border-t border-gray-700">
                        <div className="text-center">
                          <div className="text-lg font-bold text-gaming-primary">
                            {player.stats.matches}
                          </div>
                          <div className="text-xs text-gray-400">
                            {locale === 'tr' ? 'Maç' : 'Matches'}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-400">
                            {player.stats.wins}
                          </div>
                          <div className="text-xs text-gray-400">
                            {locale === 'tr' ? 'Galibiyet' : 'Wins'}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-400">
                            {player.stats.kda}
                          </div>
                          <div className="text-xs text-gray-400">KDA</div>
                        </div>
                      </div>
                    )}

                    {/* Achievements Preview */}
                    {player.achievements && player.achievements.length > 0 && (
                      <div className="pt-4 border-t border-gray-700">
                        <div className="flex items-center gap-2 mb-2">
                          <Trophy size={16} className="text-gaming-primary" />
                          <span className="text-sm font-semibold text-gray-300">
                            {locale === 'tr' ? 'Son Başarı' : 'Latest Achievement'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400">
                          {player.achievements[0].title}
                        </p>
                      </div>
                    )}

                    {/* View Profile Link */}
                    <Link
                      href={`/${locale}/players/${player.slug}`}
                      className="block w-full text-center gaming-button mt-4"
                    >
                      {locale === 'tr' ? 'Profili Görüntüle' : 'View Profile'}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-gray-400 mb-4">
                {locale === 'tr' ? 'Henüz oyuncu yok' : 'No players yet'}
              </h3>
              <p className="text-gray-500">
                {locale === 'tr' 
                  ? 'Yakında takım üyelerimizi tanıtacağız.'
                  : 'We will introduce our team members soon.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading players page:', error);
    
    return (
      <div className="min-h-screen bg-gaming-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            {locale === 'tr' ? 'Hata' : 'Error'}
          </h1>
          <p className="text-gray-400">
            {locale === 'tr' 
              ? 'Oyuncular yüklenirken bir hata oluştu.'
              : 'An error occurred while loading players.'
            }
          </p>
        </div>
      </div>
    );
  }
}

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}