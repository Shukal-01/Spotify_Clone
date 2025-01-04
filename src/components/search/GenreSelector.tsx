import React from 'react';

const GENRES = [
  { id: 'rock', name: 'Rock', color: '#E13300' },
  { id: 'jazz', name: 'Jazz', color: '#BC5900' },
  { id: 'classical', name: 'Classical', color: '#7D4B32' },
  { id: 'electronic', name: 'Electronic', color: '#509BF5' },
  { id: 'bollywood', name: 'Bollywood', color: '#E91E63' },
  { id: 'punjabi', name: 'Punjabi', color: '#FF9800' },
  { id: 'pop', name: 'Pop', color: '#8E24AA' },
  { id: 'indie', name: 'Indie', color: '#1E88E5' },
];

interface GenreSelectorProps {
  selectedGenre: string | null;
  onGenreSelect: (genre: string | null) => void;
}

export const GenreSelector = ({ selectedGenre, onGenreSelect }: GenreSelectorProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
      {GENRES.map((genre) => (
        <button
          key={genre.id}
          onClick={() => onGenreSelect(selectedGenre === genre.id ? null : genre.id)}
          className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
            selectedGenre === genre.id
              ? 'bg-green-500 text-white'
              : 'bg-zinc-800 text-white hover:bg-zinc-700'
          }`}
          style={{ backgroundColor: selectedGenre === genre.id ? genre.color : undefined }}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};