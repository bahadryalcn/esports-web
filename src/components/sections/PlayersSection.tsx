'use client';

import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePlayerData } from '@/lib/hooks/usePlayerData';
import {
  useAdvancedParallax,
  useMultiLayerParallax,
  useTextParallax,
} from '@/lib/hooks/useAdvancedParallax';
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
  Sparkles,
  Crown,
} from 'lucide-react';

// Types (unchanged)
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
  player: string;
}

interface ResolvedPlayer {
  player: Player;
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

// Position colors using Tailwind default colors
const positionColors = {
  adc: 'bg-gradient-to-br from-red-600/40 via-red-700/30 to-red-800/20 text-red-200 border-red-500/60',
  support:
    'bg-gradient-to-br from-gray-600/40 via-gray-700/30 to-gray-800/20 text-gray-200 border-gray-500/60',
  mid: 'bg-gradient-to-br from-red-700/40 via-red-800/30 to-red-900/20 text-red-200 border-red-600/60',
  jungle:
    'bg-gradient-to-br from-slate-600/40 via-slate-700/30 to-slate-800/20 text-slate-200 border-slate-500/60',
  top: 'bg-gradient-to-br from-zinc-600/40 via-zinc-700/30 to-zinc-800/20 text-zinc-200 border-zinc-500/60',
  rifler:
    'bg-gradient-to-br from-red-800/40 via-red-900/30 to-red-950/20 text-red-200 border-red-700/60',
  awper:
    'bg-gradient-to-br from-gray-700/40 via-gray-800/30 to-gray-900/20 text-gray-200 border-gray-600/60',
  igl: 'bg-gradient-to-br from-red-600/40 via-red-700/30 to-red-800/20 text-red-200 border-red-500/60',
  'entry-fragger':
    'bg-gradient-to-br from-neutral-600/40 via-neutral-700/30 to-neutral-800/20 text-neutral-200 border-neutral-500/60',
  lurker:
    'bg-gradient-to-br from-stone-700/40 via-stone-800/30 to-stone-900/20 text-stone-200 border-stone-600/60',
  duelist:
    'bg-gradient-to-br from-red-700/40 via-red-800/30 to-red-900/20 text-red-200 border-red-600/60',
  initiator:
    'bg-gradient-to-br from-gray-600/40 via-gray-700/30 to-gray-800/20 text-gray-200 border-gray-500/60',
  controller:
    'bg-gradient-to-br from-slate-700/40 via-slate-800/30 to-slate-900/20 text-slate-200 border-slate-600/60',
  sentinel:
    'bg-gradient-to-br from-zinc-700/40 via-zinc-800/30 to-zinc-900/20 text-zinc-200 border-zinc-600/60',
  default:
    'bg-gradient-to-br from-red-600/40 via-red-700/30 to-red-800/20 text-red-200 border-red-500/60',
};

// Status colors using Tailwind default colors
const statusColors = {
  active:
    'bg-gradient-to-r from-red-500/40 to-red-600/40 text-red-200 border-red-500/60 animate-pulse',
  inactive:
    'bg-gradient-to-r from-gray-600/40 to-gray-800/40 text-gray-300 border-gray-500/60',
  substitute:
    'bg-gradient-to-r from-slate-500/40 to-slate-600/40 text-slate-200 border-slate-500/60',
  coach:
    'bg-gradient-to-r from-zinc-500/40 to-zinc-600/40 text-zinc-200 border-zinc-500/60',
  retired:
    'bg-gradient-to-r from-gray-700/40 to-gray-900/40 text-gray-300 border-gray-600/60',
  transfer:
    'bg-gradient-to-r from-neutral-500/40 to-neutral-600/40 text-neutral-200 border-neutral-500/60',
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

// Enhanced Player Card with 3D effects
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

  // 3D tilt effect
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateX = ((e.clientY - centerY) / rect.height) * -15;
    const rotateY = ((e.clientX - centerX) / rect.width) * 15;
    setRotateX(rotateX);
    setRotateY(rotateY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.8, rotateY: -30 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.215, 0.61, 0.355, 1],
      }}
      whileHover={{
        scale: 1.05,
        y: -10,
        transition: { type: 'spring', stiffness: 400, damping: 25 },
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: 'preserve-3d',
      }}
      className="group relative"
    >
      {/* Glow effect */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-red-600/20 via-red-700/20 to-red-800/20 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100" />

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-black/60 via-gray-900/60 to-black/60 backdrop-blur-xl transition-all duration-500 hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-500/30">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-red-700/5 to-red-800/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Main Content */}
        <div className="relative">
          <div className="relative aspect-square overflow-hidden">
            {/* Image with parallax effect */}
            <motion.div
              className="absolute inset-0"
              animate={{
                scale: 1.1,
              }}
              whileHover={{
                scale: 1.2,
              }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <Image
                src={player.avatar}
                alt={player.name}
                fill
                className="object-cover"
                priority={index < 4}
              />
            </motion.div>

            {/* Enhanced gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-red-950/20" />

            {/* Animated particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-1 w-1 rounded-full bg-red-400/50"
                  initial={{
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                  }}
                  animate={{
                    x: Math.random() * 300,
                    y: Math.random() * 300,
                  }}
                  transition={{
                    duration: 10 + i * 2,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'linear',
                  }}
                />
              ))}
            </div>

            {/* Status Badge with animation */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="absolute right-3 top-3 z-10"
            >
              <Badge
                variant="outline"
                className={`${statusColors[player.status as keyof typeof statusColors] || statusColors.active} text-xs font-semibold backdrop-blur-md`}
              >
                {player.status}
              </Badge>
            </motion.div>

            {/* Featured Badge with crown */}
            {player.featured && (
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.4 }}
                className="absolute left-3 top-3 z-10"
              >
                <Badge
                  variant="outline"
                  className="border-red-500/60 bg-gradient-to-r from-red-500/40 to-red-600/40 text-xs font-semibold text-red-200 backdrop-blur-md"
                >
                  <Crown className="mr-1 h-3 w-3" />
                  Featured
                </Badge>
              </motion.div>
            )}

            {/* Player Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.5 }}
                className="mb-1 font-gaming text-2xl font-bold text-white drop-shadow-2xl transition-all duration-300 group-hover:text-red-300"
              >
                {player.nickname}
              </motion.h3>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.6 }}
                className="mb-3 font-display text-sm text-gray-200 drop-shadow-lg transition-all duration-300 group-hover:text-white"
              >
                {player.name}
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.7 }}
                className="flex items-center justify-between"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`${positionColors[player.position as keyof typeof positionColors] || positionColors.default} text-xs font-bold backdrop-blur-md`}
                  >
                    <Gamepad2 className="mr-1 h-3 w-3" />
                    {player.position?.toUpperCase()}
                  </Badge>

                  {primaryGame && (
                    <Badge
                      variant="outline"
                      className="border-red-600/60 bg-gradient-to-r from-red-700/40 to-red-800/40 text-xs font-semibold text-red-200 backdrop-blur-md"
                    >
                      {gameNames[primaryGame.game as keyof typeof gameNames] ||
                        primaryGame.game}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center rounded-md bg-black/30 px-2 py-1 text-xs text-gray-200 backdrop-blur-sm transition-all duration-300 group-hover:bg-black/50 group-hover:text-red-200">
                  <MapPin className="mr-1 h-3 w-3" />
                  {player.nationality}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Enhanced Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gradient-to-t from-black/95 via-black/90 to-black/80 p-6 backdrop-blur-xl"
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 animate-pulse bg-[url('/assets/grid-pattern.svg')] bg-repeat" />
          </div>

          {/* Statistics with enhanced design */}
          {isDetailed && player.stats?.career && (
            <div className="relative z-10 mb-6 w-full">
              <h4 className="mb-4 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-center text-sm font-bold uppercase tracking-wider text-transparent">
                <Sparkles className="mr-2 inline-block h-4 w-4 text-red-400" />
                Career Stats
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {player.stats.career.slice(0, 4).map((stat, statIndex) => {
                  const StatIcon =
                    iconMap[stat.icon as keyof typeof iconMap] || IconComponent;
                  return (
                    <motion.div
                      key={statIndex}
                      initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ delay: 0.1 + statIndex * 0.05 }}
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 p-3 backdrop-blur-md transition-all duration-300 hover:border-red-500/50 hover:from-red-500/10 hover:to-red-700/10"
                    >
                      <div className="flex items-center gap-2">
                        <div className="rounded-lg bg-gradient-to-br from-red-500/30 to-red-700/30 p-2">
                          <StatIcon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="font-gaming text-sm font-bold text-white">
                            {stat.value}
                          </div>
                          <div className="font-display text-xs text-gray-300">
                            {stat.label}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Enhanced Social Media Links */}
          {player.social &&
            Object.keys(player.social).some(
              (key) => player.social?.[key as keyof PlayerSocial]
            ) && (
              <div className="relative z-10 w-full">
                <div className="mb-3 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-center text-xs font-bold uppercase tracking-wider text-transparent">
                  {socialMediaText || 'Connect'}
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {player.social.twitch && (
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Link
                        href={player.social.twitch}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative flex h-5 w-5 items-center justify-center overflow-hidden rounded-xl border border-red-500/30 bg-gradient-to-br from-red-600/20 to-red-800/30 backdrop-blur-sm transition-all duration-300 hover:border-red-400/60 hover:shadow-lg hover:shadow-red-500/30"
                        title="Twitch"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-red-500/0 to-red-600/20" />
                        <img
                          src="/icons/social/twitch.svg"
                          alt="Twitch"
                          className="relative z-10 h-5 w-5"
                          style={{
                            filter:
                              'brightness(0) saturate(100%) invert(76%) sepia(21%) saturate(2082%) hue-rotate(343deg) brightness(103%) contrast(101%)',
                          }}
                        />
                      </Link>
                    </motion.div>
                  )}
                  {player.social.youtube && (
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: -5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Link
                        href={player.social.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-red-500/30 bg-gradient-to-br from-red-600/20 to-red-800/30 backdrop-blur-sm transition-all duration-300 hover:border-red-400/60 hover:shadow-lg hover:shadow-red-500/30"
                        title="YouTube"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-red-500/0 to-red-600/20" />
                        <img
                          src="/icons/social/youtube.svg"
                          alt="YouTube"
                          className="relative z-10 h-5 w-5"
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
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Link
                        href={player.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-gray-500/30 bg-gradient-to-br from-gray-600/20 to-gray-800/30 backdrop-blur-sm transition-all duration-300 hover:border-gray-400/60 hover:shadow-lg hover:shadow-gray-500/30"
                        title="Twitter/X"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-500/0 to-gray-600/20" />
                        <img
                          src="/icons/social/twitter.svg"
                          alt="Twitter/X"
                          className="relative z-10 h-5 w-5"
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
                      whileHover={{ scale: 1.2, rotate: -5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Link
                        href={player.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-red-500/30 bg-gradient-to-br from-red-600/20 to-red-800/30 backdrop-blur-sm transition-all duration-300 hover:border-red-400/60 hover:shadow-lg hover:shadow-red-500/30"
                        title="Instagram"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-red-500/0 to-red-600/20" />
                        <img
                          src="/icons/social/instagram.svg"
                          alt="Instagram"
                          className="relative z-10 h-5 w-5"
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
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <div
                        className="relative flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-gray-600/30 bg-gradient-to-br from-gray-700/20 to-gray-900/30 backdrop-blur-sm transition-all duration-300 hover:border-gray-500/60 hover:shadow-lg hover:shadow-gray-600/30"
                        title={`Discord: ${player.social.discord} (Click to copy)`}
                        onClick={() =>
                          navigator.clipboard.writeText(
                            player.social?.discord || ''
                          )
                        }
                      >
                        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-600/0 to-gray-700/20" />
                        <img
                          src="/icons/social/discord.svg"
                          alt="Discord"
                          className="relative z-10 h-5 w-5"
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
                      whileHover={{ scale: 1.2, rotate: -5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Link
                        href={player.social.steam}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-gray-500/30 bg-gradient-to-br from-gray-600/20 to-gray-800/30 backdrop-blur-sm transition-all duration-300 hover:border-gray-400/60 hover:shadow-lg hover:shadow-gray-500/30"
                        title="Steam"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-500/0 to-gray-600/20" />
                        <img
                          src="/icons/social/steam.svg"
                          alt="Steam"
                          className="relative z-10 h-5 w-5"
                          style={{
                            filter:
                              'brightness(0) saturate(100%) invert(75%) sepia(0%) saturate(1969%) hue-rotate(344deg) brightness(103%) contrast(101%)',
                          }}
                        />
                      </Link>
                    </motion.div>
                  )}
                </div>
              </div>
            )}
        </motion.div>
      </div>
    </motion.div>
  );
};

// Main component with enhanced parallax
export default function PlayersSection({
  title = 'Oyuncularımız',
  subtitle = 'Profesyonel takımımızın yetenekli oyuncularıyla tanışın',
  selectedPlayers = [],
  showFeaturedOnly = false,
  background,
  showViewAllButton = true,
  viewAllButtonText = 'Tüm Oyuncularımız',
  viewAllButtonLink = '/oyuncular',
  socialMediaText = 'Sosyal Medya',
}: PlayersSection) {
  const router = useRouter();
  const { resolvedPlayers, loading, error } = usePlayerData(selectedPlayers);

  // Optimized parallax layers for better performance
  const parallaxLayers = useMemo(
    () => [
      { speed: 0.3, direction: 'up' as const, easing: 'ease-out' as const }, // Background
      { speed: 0.6, direction: 'up' as const, easing: 'ease-out' as const }, // Pattern
      { speed: 0.4, direction: 'down' as const, easing: 'linear' as const }, // Floating elements
      { speed: 0.5, direction: 'up' as const, easing: 'ease-out' as const }, // Additional layer
    ],
    []
  );

  const { ref: parallaxRef, offsets } = useMultiLayerParallax(parallaxLayers);
  const { ref: titleRef, offset: titleOffset } = useTextParallax(0.4);
  const { ref: contentRef, offset: contentOffset } = useAdvancedParallax({
    speed: 0.5,
    direction: 'up',
    easing: 'ease-out',
  });

  // Process players
  let playersToShow: Player[] = [];
  if (!loading && !error) {
    if (showFeaturedOnly) {
      playersToShow = resolvedPlayers
        .map((rp: ResolvedPlayer) => rp.player)
        .filter((player: Player) => player.featured);
    } else {
      playersToShow =
        resolvedPlayers.length > 0
          ? resolvedPlayers.map((rp: ResolvedPlayer) => rp.player)
          : [];
    }
  }

  return (
    <section
      className="relative overflow-hidden bg-black py-20 lg:py-32"
      ref={parallaxRef}
    >
      {/* Enhanced multi-layer background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black"
          style={{
            transform: `translate3d(0, ${(offsets[0] || 0) * 0.5}px, 0)`,
          }}
        />

        {/* Animated gradient overlay */}
        <div className="absolute inset-0">
          <div className="animate-gradient absolute inset-0 bg-gradient-to-br from-red-900/20 via-red-950/10 to-black" />
        </div>

        {/* Background image with enhanced parallax */}
        {background?.image && (
          <div
            className="absolute inset-0 transform-gpu bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${background.image})`,
              transform: `translate3d(0, ${(offsets[0] || 0) * 1.5}px, 0) scale(1.1)`,
              filter: 'brightness(0.3) contrast(1.2)',
            }}
          />
        )}

        {/* Dynamic overlay */}
        {background?.overlay && (
          <div
            className="absolute inset-0 z-10"
            style={{
              backgroundColor: background.overlay.color || 'rgba(0, 0, 0, 0.8)',
              opacity: background.overlay.opacity || 0.8,
              backdropFilter: 'blur(2px)',
            }}
          />
        )}

        {/* Animated pattern overlay */}
        <div
          className="absolute inset-0 transform-gpu opacity-5"
          style={{
            transform: `translate3d(0, ${(offsets[1] || 0) * 2}px, 0)`,
            zIndex: 5,
          }}
        >
          <div className="animate-slide absolute inset-0 bg-[url('/assets/hero-pattern.svg')] bg-repeat" />
        </div>

        {/* Enhanced floating elements */}
        <div
          className="absolute inset-0 transform-gpu"
          style={{
            transform: `translate3d(0, ${(offsets[2] || 0) * 1.8}px, 0)`,
          }}
        >
          <motion.div
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute right-20 top-20 h-96 w-96 rounded-full bg-gradient-to-br from-red-500/10 to-red-700/10 blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -30, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute bottom-40 left-20 h-80 w-80 rounded-full bg-gradient-to-tl from-red-600/10 to-red-800/10 blur-3xl"
          />
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-red-900/5 via-transparent to-red-900/5 blur-2xl"
          />
        </div>

        {/* Geometric shapes */}
        <div
          className="absolute inset-0 transform-gpu"
          style={{
            transform: `translate3d(0, ${(offsets[3] || 0) * 1.5}px, 0)`,
          }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-white/5"
              style={{
                width: `${100 + i * 50}px`,
                height: `${100 + i * 50}px`,
                top: `${20 + i * 10}%`,
                left: `${10 + i * 15}%`,
              }}
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 30 + i * 5,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      </div>

      <div className="container relative z-20 mx-auto px-4" ref={contentRef}>
        {/* Enhanced section header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="mb-20 transform-gpu text-center"
          style={{
            transform: `translate3d(0, ${contentOffset.y * 0.8}px, 0)`,
          }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 inline-block"
          >
            <div className="flex items-center justify-center space-x-2">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-red-500" />
              <Trophy className="h-6 w-6 text-red-500" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-red-500" />
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.215, 0.61, 0.355, 1],
            }}
            className="text-responsive-3xl mb-4 font-gaming font-black text-white lg:mb-6"
          >
            <span className="text-gaming-gradient">{title}</span>
          </motion.h2>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
              className="text-responsive-lg gaming-text-shadow mx-auto max-w-4xl px-4 leading-relaxed text-gray-200"
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>

        {/* Players Grid */}
        {loading ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="py-20 text-center"
          >
            <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
              <Loader2 className="mx-auto mb-6 h-20 w-20 animate-spin text-red-400" />
              <p className="font-display text-xl text-gray-300">
                Oyuncular yükleniyor...
              </p>
            </div>
          </motion.div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="py-20 text-center"
          >
            <div className="mx-auto max-w-md rounded-3xl border border-red-500/30 bg-red-500/5 p-10 backdrop-blur-xl">
              <Users className="mx-auto mb-6 h-20 w-20 text-red-400" />
              <p className="mb-3 font-display text-xl text-gray-300">
                Oyuncular yüklenirken hata oluştu
              </p>
              <p className="text-sm text-gray-400">{error}</p>
            </div>
          </motion.div>
        ) : playersToShow.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            style={{
              transform: `translate3d(0, ${contentOffset.y * 0.5}px, 0)`,
            }}
          >
            {playersToShow.map((player, index) => (
              <div
                key={index}
                className="cursor-pointer"
                onClick={() => {
                  router.push(
                    `/players/${player.nickname?.toLowerCase() || 'player'}`
                  );
                }}
              >
                <PlayerCard
                  player={player}
                  isDetailed={true}
                  index={index}
                  socialMediaText={socialMediaText}
                />
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="py-20 text-center"
          >
            <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
              <Users className="mx-auto mb-6 h-20 w-20 text-gray-400" />
              <p className="font-display text-xl text-gray-300">
                Henüz oyuncu bulunmuyor.
              </p>
            </div>
          </motion.div>
        )}

        {/* Enhanced View All Button */}
        {showViewAllButton && playersToShow.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: 'easeOut' }}
            className="transform-gpu text-center"
            style={{
              transform: `translate3d(0, ${contentOffset.y * 0.3}px, 0)`,
            }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={viewAllButtonLink}
                className="btn-gaming-primary inline-flex items-center gap-3"
              >
                <Users className="h-5 w-5" />
                <span>{viewAllButtonText}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.3;
          }
        }
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(100px);
          }
        }
        .animate-gradient {
          animation: gradient 8s ease-in-out infinite;
        }
        .animate-slide {
          animation: slide 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
