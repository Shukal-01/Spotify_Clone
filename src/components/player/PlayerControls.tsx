import React from 'react';
import { Shuffle, SkipBack, Play, Pause, SkipForward, Repeat } from 'lucide-react';
import { usePlayerStore } from '../../store/usePlayerStore';

export const PlayerControls = () => {
  const { 
    isPlaying, 
    isShuffled,
    repeatMode,
    setPlaying,
    toggleShuffle,
    toggleRepeat,
    previousTrack,
    nextTrack
  } = usePlayerStore();

  return (
    <div className="flex items-center justify-center space-x-4">
      <button 
        onClick={toggleShuffle}
        className={`text-sm ${isShuffled ? 'text-green-500' : 'text-gray-400'} hover:text-white`}
      >
        <Shuffle size={20} />
      </button>
      
      <button 
        onClick={previousTrack}
        className="text-gray-400 hover:text-white"
      >
        <SkipBack size={24} />
      </button>
      
      <button
        onClick={() => setPlaying(!isPlaying)}
        className="bg-white rounded-full p-2 hover:scale-105 transition"
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>
      
      <button 
        onClick={nextTrack}
        className="text-gray-400 hover:text-white"
      >
        <SkipForward size={24} />
      </button>
      
      <button 
        onClick={toggleRepeat}
        className={`text-sm ${repeatMode !== 'off' ? 'text-green-500' : 'text-gray-400'} hover:text-white`}
      >
        <Repeat size={20} />
      </button>
    </div>
  );
};