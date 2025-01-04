import React from 'react';
import { GenreList } from '../components/genres/GenreList';
import { jamendoApi } from '../lib/jamendoApi';
import { usePlayerStore } from '../store/usePlayerStore';

export const Genres = () => {
  const { setQueue } = usePlayerStore();

  const handleGenreSelect = async (genreId: string) => {
    try {
      const tracks = await jamendoApi.getTracksByGenre(genreId);
      setQueue(tracks);
    } catch (error) {
      console.error('Error loading genre tracks:', error);
    }
  };

  return (
    <div className="pb-24">
      <h1 className="text-white text-3xl font-bold mb-6">Browse by Genre</h1>
      <GenreList onGenreSelect={handleGenreSelect} />
    </div>
  );
};