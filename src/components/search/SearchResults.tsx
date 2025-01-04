import React from 'react';
import { Track } from '../../lib/jamendoApi';
import { usePlayerStore } from '../../store/usePlayerStore';
import { Play, Plus } from 'lucide-react';

interface SearchResultsProps {
  results: Track[];
}

export const SearchResults = ({ results }: SearchResultsProps) => {
  const { setTrack, addToQueue } = usePlayerStore();

  if (results.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        No results found. Try a different search term.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {results.map((track) => (
        <div
          key={track.id}
          className="flex items-center gap-4 p-4 rounded-lg hover:bg-zinc-800/50 group transition-colors"
        >
          <img
            src={track.image || 'https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=300&h=300&fit=crop'}
            alt={track.name}
            className="w-16 h-16 rounded-md object-cover"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white truncate">{track.name}</h3>
            <p className="text-sm text-gray-400 truncate">{track.artist_name}</p>
          </div>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setTrack(track)}
              className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
            >
              <Play size={20} fill="white" />
            </button>
            <button
              onClick={() => addToQueue(track)}
              className="p-2 rounded-full bg-zinc-700 text-white hover:bg-zinc-600 transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};