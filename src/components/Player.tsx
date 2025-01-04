import React, { useEffect, useRef } from 'react';
import { Volume2 } from 'lucide-react';
import { usePlayerStore } from '../store/usePlayerStore';
import { PlayerControls } from './player/PlayerControls';

export const Player = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { 
    currentTrack, 
    isPlaying, 
    volume,
    setPlaying,
    setVolume 
  } = usePlayerStore();

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black p-4">
      <audio
        ref={audioRef}
        src={currentTrack.audio}
        onEnded={() => usePlayerStore.getState().nextTrack()}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        <div className="flex items-center space-x-4">
          <img
            src={currentTrack.image}
            alt={currentTrack.name}
            className="w-12 h-12 rounded"
          />
          <div className="text-white">
            <h3 className="font-medium">{currentTrack.name}</h3>
            <p className="text-sm text-gray-400">{currentTrack.artist_name}</p>
          </div>
        </div>
        
        <PlayerControls />
        
        <div className="flex items-center space-x-2">
          <Volume2 className="text-white" size={20} />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
};