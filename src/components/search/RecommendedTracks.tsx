import React, { useEffect, useState } from 'react';
import { jamendoApi, Track } from '../../lib/jamendoApi';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { FeaturedSection } from '../home/FeaturedSection';

interface RecommendedTracksProps {
  genre: string | null;
}

export const RecommendedTracks = ({ genre }: RecommendedTracksProps) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTracks = async () => {
      setLoading(true);
      try {
        const results = genre
          ? await jamendoApi.getTracksByGenre(genre)
          : await jamendoApi.getFeaturedTracks();
        setTracks(results);
      } catch (error) {
        console.error('Error loading recommended tracks:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTracks();
  }, [genre]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <FeaturedSection
        title={genre ? `${genre.charAt(0).toUpperCase() + genre.slice(1)} Tracks` : 'Recommended Tracks'}
        tracks={tracks}
      />
    </div>
  );
};