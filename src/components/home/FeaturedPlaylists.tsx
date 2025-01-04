import React from 'react';

interface PlaylistCard {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
}

const playlists: PlaylistCard[] = [
  {
    id: '1',
    name: 'Discover Weekly',
    description: 'Your weekly mixtape of fresh music',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop'
  },
  {
    id: '2',
    name: 'Chill Vibes',
    description: 'Relaxing beats for your day',
    coverUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&h=300&fit=crop'
  },
  {
    id: '3',
    name: 'Workout Mix',
    description: 'Energy boost for your workout',
    coverUrl: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=300&h=300&fit=crop'
  }
];

export const FeaturedPlaylists = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {playlists.map((playlist) => (
        <div
          key={playlist.id}
          className="bg-zinc-800 rounded-lg p-4 hover:bg-zinc-700 transition-colors cursor-pointer"
        >
          <img
            src={playlist.coverUrl}
            alt={playlist.name}
            className="w-full aspect-square object-cover rounded-md mb-4"
          />
          <h3 className="text-white font-bold text-lg">{playlist.name}</h3>
          <p className="text-gray-400 text-sm">{playlist.description}</p>
        </div>
      ))}
    </div>
  );
};