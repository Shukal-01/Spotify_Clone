import React from 'react';
import { GenreCard } from './GenreCard';

const genres = [
  { id: 'rock', name: 'Rock', color: '#E13300', imageUrl: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400&h=400&fit=crop' },
  { id: 'jazz', name: 'Jazz', color: '#BC5900', imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&h=400&fit=crop' },
  { id: 'classical', name: 'Classical', color: '#7D4B32', imageUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&h=400&fit=crop' },
  { id: 'electronic', name: 'Electronic', color: '#509BF5', imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop' },
];

interface GenreListProps {
  onGenreSelect: (genreId: string) => void;
}

export const GenreList = ({ onGenreSelect }: GenreListProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {genres.map((genre) => (
        <GenreCard
          key={genre.id}
          name={genre.name}
          color={genre.color}
          imageUrl={genre.imageUrl}
          onSelect={() => onGenreSelect(genre.id)}
        />
      ))}
    </div>
  );
};