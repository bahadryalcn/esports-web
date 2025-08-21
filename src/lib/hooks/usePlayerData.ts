'use client';

import { useState, useEffect } from 'react';

interface PlayerReference {
  player: string; // file path like "content/players/xantares.mdx"
}

interface PlayerData {
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
  games: any[];
  stats?: {
    career: any[];
  };
  social?: {
    twitch?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
    discord?: string;
    steam?: string;
    tiktok?: string;
    kick?: string;
  };
}

interface ResolvedPlayer {
  player: PlayerData;
}

export function usePlayerData(selectedPlayers: PlayerReference[]) {
  const [resolvedPlayers, setResolvedPlayers] = useState<ResolvedPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlayerData() {
      try {
        setLoading(true);
        setError(null);

        if (!selectedPlayers || selectedPlayers.length === 0) {
          console.log('usePlayerData: No selected players provided');
          setResolvedPlayers([]);
          setLoading(false);
          return;
        }

        console.log('usePlayerData: Processing players:', selectedPlayers);

        const resolved: ResolvedPlayer[] = [];

        // Filter out empty player references
        const validPlayerRefs = selectedPlayers.filter(
          (ref) => ref.player && ref.player.trim() !== ''
        );
        console.log('usePlayerData: Valid player refs:', validPlayerRefs);

        for (const playerRef of validPlayerRefs) {
          if (playerRef.player) {
            try {
              // Call API to get player data
              const response = await fetch(
                `/api/players/resolve?path=${encodeURIComponent(playerRef.player)}`
              );

              if (response.ok) {
                const playerData = await response.json();
                if (playerData) {
                  resolved.push({ player: playerData });
                }
              } else {
                console.error(
                  `Failed to fetch player data for ${playerRef.player}`
                );
              }
            } catch (fetchError) {
              console.error(
                `Error fetching player ${playerRef.player}:`,
                fetchError
              );
            }
          }
        }

        setResolvedPlayers(resolved);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch player data'
        );
        console.error('Error in usePlayerData:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPlayerData();
  }, [selectedPlayers]);

  return { resolvedPlayers, loading, error };
}
