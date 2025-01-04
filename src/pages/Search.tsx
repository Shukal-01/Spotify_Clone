import React, { useState, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { jamendoApi, Track } from '../lib/jamendoApi';
import { usePlayerStore } from '../store/usePlayerStore';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { SearchResults } from '../components/search/SearchResults';
import { GenreSelector } from '../components/search/GenreSelector';
import { RecommendedTracks } from '../components/search/RecommendedTracks';

export const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  useEffect(() => {
    const searchTracks = async () => {
      if (query.trim()) {
        setLoading(true);
        try {
          const tracks = await jamendoApi.searchTracks(query);
          setResults(tracks);
        } catch (error) {
          console.error('Search error:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
      }
    };

    const debounce = setTimeout(searchTracks, 500);
    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <div className="text-white pb-24">
      <div className="sticky top-0 bg-zinc-900/95 backdrop-blur-sm pt-4 pb-6 z-10">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for songs, artists, or albums..."
            className="w-full pl-12 pr-4 py-4 bg-zinc-800 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
          />
        </div>
      </div>

      <GenreSelector
        selectedGenre={selectedGenre}
        onGenreSelect={setSelectedGenre}
      />

      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      ) : query ? (
        <SearchResults results={results} />
      ) : (
        <RecommendedTracks genre={selectedGenre} />
      )}
    </div>
  );
};