import React, { useEffect, useState } from 'react';
import { FeaturedSection } from '../components/home/FeaturedSection';
import { jamendoApi, Track } from '../lib/jamendoApi';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { WelcomeBanner } from '../components/home/WelcomeBanner';

const GENRES = [
  'rock', 'jazz', 'electronic', 'classical',
  'bollywood', 'punjabi', 'pop', 'indie'
];

export const Home = () => {
  const [featuredTracks, setFeaturedTracks] = useState<Track[]>([]);
  const [genreTracks, setGenreTracks] = useState<Record<string, Track[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const [featured, ...genreResults] = await Promise.all([
          jamendoApi.getFeaturedTracks(),
          ...GENRES.map(genre => jamendoApi.getTracksByGenre(genre))
        ]);

        setFeaturedTracks(featured);
        setGenreTracks(
          GENRES.reduce((acc, genre, index) => ({
            ...acc,
            [genre]: genreResults[index]
          }), {})
        );
      } catch (error) {
        console.error('Error loading home content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="pb-24">
      <WelcomeBanner />
      
      <div className="space-y-8 overflow-hidden">
        <FeaturedSection title="Featured Tracks" tracks={featuredTracks} />
        
        {GENRES.map(genre => (
          <FeaturedSection
            key={genre}
            title={`${genre.charAt(0).toUpperCase() + genre.slice(1)} Music`}
            tracks={genreTracks[genre] || []}
          />
        ))}
      </div>
    </div>
  );
};