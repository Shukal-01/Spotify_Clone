import React from 'react';
import { Track } from '../../lib/jamendoApi';
import { usePlayerStore } from '../../store/usePlayerStore';
import { Play } from 'lucide-react';

interface FeaturedSectionProps {
  title: string;
  tracks: Track[];
}

export const FeaturedSection = ({ title, tracks }: FeaturedSectionProps) => {
  const { setTrack } = usePlayerStore();

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {tracks.map((track) => (
          <div
            key={track.id}
            className="group relative bg-zinc-800/50 rounded-lg p-4 hover:bg-zinc-800 transition-colors"
          >
            <div className="relative aspect-square mb-4">
              <img
                src={track.image || 'https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=300&h=300&fit=crop'}
                alt={track.name}
                className="w-full h-full object-cover rounded-md"
              />
              <button
                onClick={() => setTrack(track)}
                className="absolute bottom-2 right-2 bg-green-500 rounded-full p-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200"
              >
                <Play fill="white" size={20} className="text-white" />
              </button>
            </div>
            <h3 className="font-bold text-white truncate">{track.name}</h3>
            <p className="text-sm text-gray-400 truncate">{track.artist_name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};