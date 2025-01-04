import React from 'react';
import { Play } from 'lucide-react';
import { usePlayerStore } from '../../store/usePlayerStore';
import type { Playlist } from '../../types';

interface PlaylistCardProps {
  playlist: Playlist;
  onPlay: () => void;
}

export const PlaylistCard = ({ playlist, onPlay }: PlaylistCardProps) => {
  return (
    <div className="group relative bg-zinc-800 p-4 rounded-lg hover:bg-zinc-700 transition-colors">
      <div className="relative aspect-square mb-4">
        <img
          src={playlist.cover_url || 'https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=300&h=300&fit=crop'}
          alt={playlist.name}
          className="w-full h-full object-cover rounded-md"
        />
        <button
          onClick={onPlay}
          className="absolute bottom-2 right-2 bg-green-500 rounded-full p-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200"
        >
          <Play fill="white" size={20} className="text-white" />
        </button>
      </div>
      <h3 className="font-bold text-white">{playlist.name}</h3>
      <p className="text-sm text-gray-400 line-clamp-2">{playlist.description}</p>
    </div>
  );
};