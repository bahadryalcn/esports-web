'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePlayerData } from '@/lib/hooks/usePlayerData';
import {
  Trophy,
  Target,
  Star,
  Award,
  Zap,
  Sword,
  Shield,
  Crosshair,
  MapPin,
  Calendar,
  Users,
  ExternalLink,
  ArrowRight,
  Loader2,
  Youtube,
  Twitter,
  Instagram,
  MessageCircle,
  Gamepad2,
  Music,
  Video,
} from 'lucide-react';

// Types
interface PlayerStats {
  label: string;
  value: string;
  icon: string;
}

interface PlayerSocial {
  twitch?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
  discord?: string;
  steam?: string;
  tiktok?: string;
  kick?: string;
}

interface PlayerGame {
  game: string;
  rank: string;
  primary: boolean;
}

interface Player {
  name: string;
  nickname: string;
  position: string;
  avatar: string;
  age: number;
  nationality: string;
  joinDate?: string;
  featured: boolean;
  active: boolean;
  status: string;
  games: PlayerGame[];
  stats?: {
    career: PlayerStats[];
  };
  social?: PlayerSocial;
}

interface SelectedPlayer {
  player: string; // file path for TinaCMS reference
}

interface ResolvedPlayer {
  player: {
    name: string;
    nickname: string;
    position: string;
    avatar: string;
    age: number;
    nationality: string;
    featured: boolean;
    active: boolean;
    status: string;
    games: PlayerGame[];
    stats?: {
      career: PlayerStats[];
    };
    social?: PlayerSocial;
  };
}

interface PlayersSection {
  title: string;
  subtitle?: string;
  selectedPlayers: SelectedPlayer[];
  showFeaturedOnly?: boolean;
  background?: {
    image?: string;
    overlay?: {
      color?: string;
      opacity?: number;
    };
  };
  showViewAllButton?: boolean;
  viewAllButtonText?: string;
  viewAllButtonLink?: string;
  socialMediaText?: string;
}

// Icon mapping
const iconMap = {
  trophy: Trophy,
  target: Target,
  star: Star,
  award: Award,
  zap: Zap,
  sword: Sword,
  shield: Shield,
  crosshair: Crosshair,
  users: Users,
};

// Position/Role badges with red gaming theme
const positionColors = {
  adc: 'bg-gradient-to-r from-red-600/30 to-red-800/30 text-red-300 border-red-500/50',
  support:
    'bg-gradient-to-r from-red-500/30 to-red-700/30 text-red-200 border-red-400/50',
  mid: 'bg-gradient-to-r from-red-700/30 to-red-900/30 text-red-300 border-red-600/50',
  jungle:
    'bg-gradient-to-r from-red-600/30 to-red-800/30 text-red-300 border-red-500/50',
  top: 'bg-gradient-to-r from-red-500/30 to-red-700/30 text-red-200 border-red-400/50',
  rifler:
    'bg-gradient-to-r from-red-700/30 to-red-900/30 text-red-300 border-red-600/50',
  awper:
    'bg-gradient-to-r from-red-800/30 to-red-950/30 text-red-200 border-red-700/50',
  igl: 'bg-gradient-to-r from-red-600/30 to-red-800/30 text-red-300 border-red-500/50',
  'entry-fragger':
    'bg-gradient-to-r from-red-500/30 to-red-700/30 text-red-200 border-red-400/50',
  lurker:
    'bg-gradient-to-r from-red-700/30 to-red-900/30 text-red-300 border-red-600/50',
  duelist:
    'bg-gradient-to-r from-red-600/30 to-red-800/30 text-red-300 border-red-500/50',
  initiator:
    'bg-gradient-to-r from-red-500/30 to-red-700/30 text-red-200 border-red-400/50',
  controller:
    'bg-gradient-to-r from-red-700/30 to-red-900/30 text-red-300 border-red-600/50',
  sentinel:
    'bg-gradient-to-r from-red-600/30 to-red-800/30 text-red-300 border-red-500/50',
  default:
    'bg-gradient-to-r from-red-500/30 to-red-700/30 text-red-200 border-red-400/50',
};

// Status badges with red gaming theme
const statusColors = {
  active:
    'bg-gradient-to-r from-red-600/30 to-red-800/30 text-red-300 border-red-500/50',
  inactive:
    'bg-gradient-to-r from-gray-600/30 to-gray-800/30 text-gray-300 border-gray-500/50',
  substitute:
    'bg-gradient-to-r from-red-500/30 to-red-700/30 text-red-200 border-red-400/50',
  coach:
    'bg-gradient-to-r from-red-700/30 to-red-900/30 text-red-300 border-red-600/50',
  retired:
    'bg-gradient-to-r from-gray-700/30 to-gray-900/30 text-gray-300 border-gray-600/50',
  transfer:
    'bg-gradient-to-r from-red-500/30 to-red-700/30 text-red-200 border-red-400/50',
};

// Game name mapping
const gameNames = {
  lol: 'League of Legends',
  valorant: 'Valorant',
  cs2: 'Counter-Strike 2',
  csgo: 'CS:GO',
  dota2: 'Dota 2',
  apex: 'Apex Legends',
  fortnite: 'Fortnite',
  overwatch: 'Overwatch 2',
  rainbow6: 'Rainbow Six Siege',
};

const PlayerCard: React.FC<{
  player: Player;
  isDetailed?: boolean;
  index: number;
  socialMediaText?: string;
}> = ({ player, isDetailed = false, index = 0, socialMediaText }) => {
  const primaryGame = player.games?.find((game) => game.primary);
  const IconComponent = player.stats?.career?.[0]?.icon
    ? iconMap[player.stats.career[0].icon as keyof typeof iconMap]
    : Trophy;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: 'easeOut',
      }}
      whileHover={{
        scale: 1.02,
        y: -5,
        transition: { type: 'spring', stiffness: 300 },
      }}
      className="group"
    >
      <div className="overflow-hidden rounded-2xl border border-red-500/30 bg-black/40 backdrop-blur-md transition-all duration-300 hover:border-red-500/50 hover:bg-black/60 hover:shadow-xl hover:shadow-red-500/20">
        {/* Avatar and Basic Info */}
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={player.avatar}
              alt={player.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            {/* Fallback Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950/50 to-red-900/50 opacity-30" />

            {/* Status Badge */}
            <div className="absolute right-3 top-3">
              <Badge
                variant="outline"
                className={`${statusColors[player.status as keyof typeof statusColors] || statusColors.active} text-xs font-medium backdrop-blur-sm`}
              >
                {player.status}
              </Badge>
            </div>

            {/* Featured Badge */}
            {player.featured && (
              <div className="absolute left-3 top-3">
                <Badge
                  variant="outline"
                  className="border-red-500/50 bg-gradient-to-r from-red-500/30 to-red-700/30 text-xs text-red-300 backdrop-blur-sm"
                >
                  <Star className="mr-1 h-3 w-3" />
                  Featured
                </Badge>
              </div>
            )}

            {/* Basic Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="mb-1 font-gaming text-2xl font-bold text-white transition-colors group-hover:text-red-200">
                {player.nickname}
              </h3>
              <p className="mb-3 font-display text-sm text-gray-300 transition-colors group-hover:text-white">
                {player.name}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`${positionColors[player.position as keyof typeof positionColors] || positionColors.default} text-xs font-medium backdrop-blur-sm`}
                  >
                    {player.position &&
                      player.position.toString().toUpperCase()}
                  </Badge>

                  {primaryGame && (
                    <Badge
                      variant="outline"
                      className="border-red-500/50 bg-gradient-to-r from-red-600/30 to-red-800/30 text-xs text-red-200 backdrop-blur-sm"
                    >
                      {gameNames[primaryGame.game as keyof typeof gameNames] ||
                        primaryGame.game}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center text-xs text-gray-300 transition-colors group-hover:text-red-200">
                  <MapPin className="mr-1 h-3 w-3" />
                  {player.nationality}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Stats (if enabled) */}
        {isDetailed && player.stats?.career && (
          <div className="border-t border-red-500/30 p-6">
            <div className="grid grid-cols-2 gap-4">
              {player.stats.career.slice(0, 4).map((stat, statIndex) => {
                const StatIcon =
                  iconMap[stat.icon as keyof typeof iconMap] || IconComponent;
                return (
                  <motion.div
                    key={statIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + statIndex * 0.1 }}
                    className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-gradient-to-br from-red-500/10 to-red-700/10 p-3 transition-all duration-300 hover:border-red-500/40"
                  >
                    <div className="rounded-lg bg-gradient-to-br from-red-500/30 to-red-700/30 p-2">
                      <StatIcon className="h-4 w-4 text-red-400" />
                    </div>
                    <div>
                      <div className="font-gaming text-sm font-bold text-white">
                        {stat.value}
                      </div>
                      <div className="font-display text-xs text-gray-300">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Social Links */}
            {player.social &&
              Object.keys(player.social).some(
                (key) => player.social?.[key as keyof PlayerSocial]
              ) && (
                <div className="mt-4 border-t border-red-500/20 pt-4">
                  <div className="mb-3 text-center text-xs font-medium uppercase tracking-wider text-gray-400">
                    {socialMediaText || 'Social Media'}
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {player.social.twitch && (
                      <motion.div
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          href={player.social.twitch}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-lg border border-purple-500/30 bg-gradient-to-br from-purple-500/20 to-purple-600/30 backdrop-blur-sm transition-all duration-300 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/20"
                          title="Twitch"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-500/0 to-purple-500/20 transition-all duration-300 group-hover:from-purple-500/10 group-hover:to-purple-500/30" />
                          <img
                            src="/icons/social/twitch.svg"
                            alt="Twitch"
                            className="relative z-10 h-4 w-4"
                            style={{
                              filter:
                                'brightness(0) saturate(100%) invert(76%) sepia(21%) saturate(2082%) hue-rotate(240deg) brightness(103%) contrast(101%)',
                            }}
                          />
                        </Link>
                      </motion.div>
                    )}
                    {player.social.youtube && (
                      <motion.div
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          href={player.social.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-lg border border-red-500/30 bg-gradient-to-br from-red-500/20 to-red-600/30 backdrop-blur-sm transition-all duration-300 hover:border-red-400/50 hover:shadow-lg hover:shadow-red-500/20"
                          title="YouTube"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-red-500/0 to-red-500/20 transition-all duration-300 group-hover:from-red-500/10 group-hover:to-red-500/30" />
                          <img
                            src="/icons/social/youtube.svg"
                            alt="YouTube"
                            className="relative z-10 h-4 w-4"
                            style={{
                              filter:
                                'brightness(0) saturate(100%) invert(55%) sepia(96%) saturate(3528%) hue-rotate(343deg) brightness(96%) contrast(106%)',
                            }}
                          />
                        </Link>
                      </motion.div>
                    )}
                    {player.social.twitter && (
                      <motion.div
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          href={player.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-lg border border-blue-500/30 bg-gradient-to-br from-blue-500/20 to-blue-600/30 backdrop-blur-sm transition-all duration-300 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20"
                          title="Twitter/X"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500/0 to-blue-500/20 transition-all duration-300 group-hover:from-blue-500/10 group-hover:to-blue-500/30" />
                          <img
                            src="/icons/social/twitter.svg"
                            alt="Twitter/X"
                            className="relative z-10 h-4 w-4"
                            style={{
                              filter:
                                'brightness(0) saturate(100%) invert(69%) sepia(96%) saturate(3157%) hue-rotate(200deg) brightness(103%) contrast(104%)',
                            }}
                          />
                        </Link>
                      </motion.div>
                    )}
                    {player.social.instagram && (
                      <motion.div
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          href={player.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-lg border border-pink-500/30 bg-gradient-to-br from-pink-500/20 to-pink-600/30 backdrop-blur-sm transition-all duration-300 hover:border-pink-400/50 hover:shadow-lg hover:shadow-pink-500/20"
                          title="Instagram"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-pink-500/0 to-pink-500/20 transition-all duration-300 group-hover:from-pink-500/10 group-hover:to-pink-500/30" />
                          <img
                            src="/icons/social/instagram.svg"
                            alt="Instagram"
                            className="relative z-10 h-4 w-4"
                            style={{
                              filter:
                                'brightness(0) saturate(100%) invert(64%) sepia(96%) saturate(3181%) hue-rotate(310deg) brightness(103%) contrast(106%)',
                            }}
                          />
                        </Link>
                      </motion.div>
                    )}
                    {player.social.discord && (
                      <motion.div
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div
                          className="group relative flex h-7 w-7 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-indigo-500/30 bg-gradient-to-br from-indigo-500/20 to-indigo-600/30 backdrop-blur-sm transition-all duration-300 hover:border-indigo-400/50 hover:shadow-lg hover:shadow-indigo-500/20"
                          title={`Discord: ${player.social.discord} (Click to copy)`}
                          onClick={() =>
                            navigator.clipboard.writeText(
                              player.social?.discord || ''
                            )
                          }
                        >
                          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-indigo-500/0 to-indigo-500/20 transition-all duration-300 group-hover:from-indigo-500/10 group-hover:to-indigo-500/30" />
                          <img
                            src="/icons/social/discord.svg"
                            alt="Discord"
                            className="relative z-10 h-4 w-4"
                            style={{
                              filter:
                                'brightness(0) saturate(100%) invert(58%) sepia(96%) saturate(3181%) hue-rotate(230deg) brightness(103%) contrast(106%)',
                            }}
                          />
                        </div>
                      </motion.div>
                    )}
                    {player.social.steam && (
                      <motion.div
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          href={player.social.steam}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-lg border border-gray-500/30 bg-gradient-to-br from-gray-500/20 to-gray-600/30 backdrop-blur-sm transition-all duration-300 hover:border-gray-400/50 hover:shadow-lg hover:shadow-gray-500/20"
                          title="Steam"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-gray-500/0 to-gray-500/20 transition-all duration-300 group-hover:from-gray-500/10 group-hover:to-gray-500/30" />
                          <img
                            src="/icons/social/steam.svg"
                            alt="Steam"
                            className="relative z-10 h-4 w-4"
                            style={{
                              filter:
                                'brightness(0) saturate(100%) invert(75%) sepia(0%) saturate(1969%) hue-rotate(344deg) brightness(103%) contrast(101%)',
                            }}
                          />
                        </Link>
                      </motion.div>
                    )}
                    {player.social.tiktok && (
                      <motion.div
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          href={player.social.tiktok}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-lg border border-gray-600/30 bg-gradient-to-br from-gray-800/30 to-black/40 backdrop-blur-sm transition-all duration-300 hover:border-gray-500/50 hover:shadow-lg hover:shadow-gray-600/20"
                          title="TikTok"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-gray-800/0 to-gray-800/20 transition-all duration-300 group-hover:from-gray-800/10 group-hover:to-gray-800/30" />
                          <img
                            src="/icons/social/tiktok.svg"
                            alt="TikTok"
                            className="relative z-10 h-4 w-4"
                            style={{
                              filter:
                                'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7500%) hue-rotate(344deg) brightness(103%) contrast(101%)',
                            }}
                          />
                        </Link>
                      </motion.div>
                    )}
                    {player.social.kick && (
                      <motion.div
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          href={player.social.kick}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-lg border border-green-500/30 bg-gradient-to-br from-green-500/20 to-green-600/30 backdrop-blur-sm transition-all duration-300 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-500/20"
                          title="Kick"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-green-500/0 to-green-500/20 transition-all duration-300 group-hover:from-green-500/10 group-hover:to-green-500/30" />
                          <img
                            src="/icons/social/kick.svg"
                            alt="Kick"
                            className="relative z-10 h-4 w-4"
                            style={{
                              filter:
                                'brightness(0) saturate(100%) invert(69%) sepia(96%) saturate(3157%) hue-rotate(120deg) brightness(103%) contrast(104%)',
                            }}
                          />
                        </Link>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const PlayersSection: React.FC<PlayersSection> = ({
  title,
  subtitle,
  selectedPlayers = [],
  showFeaturedOnly = false,
  background,
  showViewAllButton = true,
  viewAllButtonText = 'View All Players',
  viewAllButtonLink = '/players',
  socialMediaText = 'Social Media',
}) => {
  // Use hook to resolve player references to actual data
  const { resolvedPlayers, loading, error } = usePlayerData(selectedPlayers);

  // Process players based on settings
  let playersToShow: Player[] = [];

  if (loading) {
    // Show loading state
  } else if (showFeaturedOnly) {
    // Show only featured players from resolved players
    playersToShow = resolvedPlayers
      .map((rp: ResolvedPlayer) => rp.player)
      .filter((player: Player) => player.featured);
  } else {
    // Show resolved players (all of them)
    playersToShow =
      resolvedPlayers.length > 0
        ? resolvedPlayers.map((rp: ResolvedPlayer) => rp.player)
        : [];
  }

  const backgroundStyle = background?.image
    ? {
        backgroundImage: `url(${background.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }
    : {};

  const overlayStyle = background?.overlay
    ? {
        backgroundColor: background.overlay.color || 'rgba(0, 0, 0, 0.5)',
      }
    : {};

  return (
    <section className="relative overflow-hidden py-20" style={backgroundStyle}>
      {/* Fallback Gradient Background - only show if no background image */}
      {!background?.image && (
        <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950 to-red-900" />
      )}

      {/* Background Overlay */}
      {background?.overlay && (
        <div className="absolute inset-0 z-10" style={overlayStyle} />
      )}

      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ zIndex: 5 }}>
        <div className="absolute inset-0 bg-[url('/assets/hero-pattern.svg')] bg-repeat" />
      </div>

      <div className="container relative z-20 mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="mb-16 text-center"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="mb-6 font-gaming text-5xl font-bold leading-tight text-white md:text-7xl lg:text-8xl"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
              className="mx-auto max-w-4xl font-display text-xl leading-relaxed text-gray-200 md:text-2xl lg:text-3xl"
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>

        {/* Players Grid */}
        {loading ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="py-16 text-center"
          >
            <div className="mx-auto max-w-md rounded-2xl border border-red-500/30 bg-black/40 p-8 backdrop-blur-md">
              <Loader2 className="mx-auto mb-4 h-16 w-16 animate-spin text-red-400" />
              <p className="font-display text-lg text-gray-300">
                Loading players...
              </p>
            </div>
          </motion.div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="py-16 text-center"
          >
            <div className="mx-auto max-w-md rounded-2xl border border-red-500/30 bg-black/40 p-8 backdrop-blur-md">
              <Users className="mx-auto mb-4 h-16 w-16 text-red-400" />
              <p className="mb-2 font-display text-lg text-gray-300">
                Error loading players
              </p>
              <p className="text-sm text-gray-400">{error}</p>
            </div>
          </motion.div>
        ) : playersToShow.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
            className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {playersToShow.map((player, index) => (
              <Link
                key={index}
                href={`/players/${player.nickname?.toLowerCase() || 'player'}`}
                className="block"
              >
                <PlayerCard player={player} isDetailed={true} index={index} socialMediaText={socialMediaText} />
              </Link>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="py-16 text-center"
          >
            <div className="mx-auto max-w-md rounded-2xl border border-red-500/30 bg-black/40 p-8 backdrop-blur-md">
              <Users className="mx-auto mb-4 h-16 w-16 text-red-400" />
              <p className="font-display text-lg text-gray-300">
                No players to display yet.
              </p>
            </div>
          </motion.div>
        )}

        {/* View All Button */}
        {showViewAllButton && playersToShow.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: 'easeOut' }}
            className="text-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-block"
            >
              <Link
                href={viewAllButtonLink}
                className="inline-flex items-center justify-center space-x-3 rounded-xl bg-gradient-to-r from-red-600 to-red-800 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:from-red-700 hover:to-red-900 hover:shadow-xl hover:shadow-red-500/25"
              >
                <span>{viewAllButtonText}</span>
                <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PlayersSection;
