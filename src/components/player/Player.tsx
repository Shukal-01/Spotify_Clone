import React, { useEffect, useRef, useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { usePlayerStore } from '../../store/usePlayerStore';
import { PlayerControls } from './PlayerControls';
import { VolumeControl } from './VolumeControl';
import { ProgressBar } from './ProgressBar';
import { FullScreenPlayer } from './FullScreenPlayer';

export const Player = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { 
    currentTrack, 
    isPlaying,
    queue,
    volume,
    setPlaying
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

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  if (!currentTrack) return null;

  const recommendations = queue.filter(track => track.id !== currentTrack.id).slice(0, 10);

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black to-zinc-900 backdrop-blur-lg border-t border-white/5 p-4">
        <audio
          ref={audioRef}
          src={currentTrack.audio}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => usePlayerStore.getState().nextTrack()}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        
        <div className="max-w-screen-xl mx-auto flex items-center gap-4">
          <div className="flex items-center gap-4 w-[30%]">
            <img
              src={currentTrack.image}
              alt={currentTrack.name}
              className="w-14 h-14 rounded-md"
            />
            <div className="min-w-0">
              <h3 className="text-white font-medium truncate">{currentTrack.name}</h3>
              <p className="text-sm text-gray-400 truncate">{currentTrack.artist_name}</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center">
            <PlayerControls />
            <ProgressBar
              currentTime={currentTime}
              duration={duration}
              onSeek={handleSeek}
            />
          </div>

          <div className="flex items-center gap-4 w-[30%] justify-end">
            <VolumeControl />
            <button
              onClick={() => setIsFullScreen(true)}
              className="p-2 rounded-full hover:bg-white/10 text-white transition-all duration-200 transform hover:scale-105"
              title="Full Screen"
            >
              <Maximize2 size={20} />
            </button>
          </div>
        </div>
      </div>

      {isFullScreen && (
        <FullScreenPlayer
          track={currentTrack}
          onClose={() => setIsFullScreen(false)}
          recommendations={recommendations}
          currentTime={currentTime}
          duration={duration}
          onSeek={handleSeek}
        />
      )}
    </>
  );
};