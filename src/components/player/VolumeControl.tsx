import React from 'react';
import { Volume2, VolumeX, Volume1 } from 'lucide-react';
import { usePlayerStore } from '../../store/usePlayerStore';

export const VolumeControl = () => {
  const { volume, setVolume } = usePlayerStore();

  const VolumeIcon = volume === 0 
    ? VolumeX 
    : volume < 0.5 
    ? Volume1 
    : Volume2;

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setVolume(volume === 0 ? 1 : 0)}
        className="text-gray-400 hover:text-white transition-colors"
      >
        <VolumeIcon size={20} />
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        className="w-24 accent-green-500"
      />
    </div>
  );
};