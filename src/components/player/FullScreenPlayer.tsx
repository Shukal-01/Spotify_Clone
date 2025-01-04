import React from 'react';
import { X, ChevronRight } from 'lucide-react';
import { Track } from '../../lib/jamendoApi';
import { ProgressBar } from './ProgressBar';
import { PlayerControls } from './PlayerControls';
import { VolumeControl } from './VolumeControl';
import { usePlayerStore } from '../../store/usePlayerStore';

interface FullScreenPlayerProps {
  track: Track;
  onClose: () => void;
  recommendations: Track[];
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

export const FullScreenPlayer = ({
  track,
  onClose,
  recommendations,
  currentTime,
  duration,
  onSeek,
}: FullScreenPlayerProps) => {
  const { setTrack } = usePlayerStore();

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-zinc-900/95 to-zinc-900 backdrop-blur-lg z-50 animate-fadeIn">
      <div className="absolute top-6 right-6">
        <button
          onClick={onClose}
          className="p-3 rounded-full bg-black/40 hover:bg-black/60 text-white transition-all duration-200 transform hover:scale-105"
          title="Close Full Screen"
        >
          <X size={24} className="text-white" />
        </button>
      </div>

      <div className="h-full flex">
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="w-[600px] max-w-full aspect-square rounded-lg overflow-hidden shadow-2xl mb-8 transition-transform duration-300 hover:scale-105">
            <img
              src={track.image || 'https://images.unsplash.com/photo-1611339555312-e607c8352fd7'}
              alt={track.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-[600px] max-w-full text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">{track.name}</h2>
            <p className="text-xl text-gray-400">{track.artist_name}</p>
          </div>

          <div className="w-[600px] max-w-full">
            <ProgressBar
              currentTime={currentTime}
              duration={duration}
              onSeek={onSeek}
              expanded
            />
            <div className="flex items-center justify-between mt-8">
              <VolumeControl />
              <PlayerControls expanded />
              <div className="w-32" />
            </div>
          </div>
        </div>

        <div className="w-96 bg-black/30 p-6 overflow-y-auto">
          <h3 className="text-white font-bold mb-4">Up Next</h3>
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <button
                key={rec.id}
                onClick={() => setTrack(rec)}
                className="flex items-center gap-4 w-full p-2 rounded-lg hover:bg-white/10 transition-all duration-200 group"
              >
                <img
                  src={rec.image || 'https://images.unsplash.com/photo-1611339555312-e607c8352fd7'}
                  alt={rec.name}
                  className="w-16 h-16 rounded object-cover group-hover:shadow-lg transition-shadow duration-200"
                />
                <div className="flex-1 text-left">
                  <h4 className="text-white font-medium truncate">{rec.name}</h4>
                  <p className="text-sm text-gray-400 truncate">{rec.artist_name}</p>
                </div>
                <ChevronRight
                  size={20}
                  className="text-white opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-1"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};