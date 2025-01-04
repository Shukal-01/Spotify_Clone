import React from 'react';
import { Play } from 'lucide-react';

interface GenreCardProps {
  name: string;
  color: string;
  imageUrl: string;
  onSelect: () => void;
}

export const GenreCard = ({ name, color, imageUrl, onSelect }: GenreCardProps) => {
  return (
    <div
      onClick={onSelect}
      className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square"
      style={{ backgroundColor: color }}
    >
      <img
        src={imageUrl}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-black bg-opacity-20" />
      <div className="absolute bottom-4 left-4">
        <h3 className="text-white text-2xl font-bold">{name}</h3>
      </div>
    </div>
  );
};