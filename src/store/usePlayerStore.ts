import { create } from 'zustand';
import type { Track } from '../lib/jamendoApi';

type RepeatMode = 'off' | 'track' | 'queue';

interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  queue: Track[];
  originalQueue: Track[];
  volume: number;
  isShuffled: boolean;
  repeatMode: RepeatMode;
  
  setTrack: (track: Track) => void;
  setPlaying: (playing: boolean) => void;
  setQueue: (tracks: Track[]) => void;
  addToQueue: (track: Track) => void;
  removeFromQueue: (trackId: string) => void;
  setVolume: (volume: number) => void;
  nextTrack: () => void;
  previousTrack: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  queue: [],
  originalQueue: [],
  volume: 1,
  isShuffled: false,
  repeatMode: 'off',
  
  setTrack: (track) => set({ currentTrack: track, isPlaying: true }),
  
  setPlaying: (playing) => set({ isPlaying: playing }),
  
  setQueue: (tracks) => {
    set({ 
      queue: tracks,
      originalQueue: tracks,
      currentTrack: tracks[0] || null
    });
  },
  
  addToQueue: (track) => {
    set(state => ({
      queue: [...state.queue, track],
      originalQueue: [...state.originalQueue, track]
    }));
  },
  
  removeFromQueue: (trackId) => {
    set(state => ({
      queue: state.queue.filter(track => track.id !== trackId),
      originalQueue: state.originalQueue.filter(track => track.id !== trackId)
    }));
  },
  
  setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),
  
  toggleShuffle: () => {
    const { isShuffled, queue, originalQueue } = get();
    if (isShuffled) {
      set({ queue: [...originalQueue], isShuffled: false });
    } else {
      const shuffled = [...queue].sort(() => Math.random() - 0.5);
      set({ queue: shuffled, isShuffled: true });
    }
  },
  
  toggleRepeat: () => {
    const { repeatMode } = get();
    const modes: RepeatMode[] = ['off', 'track', 'queue'];
    const currentIndex = modes.indexOf(repeatMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    set({ repeatMode: nextMode });
  },
  
  nextTrack: () => {
    const { queue, currentTrack, repeatMode } = get();
    if (!currentTrack) return;
    
    const currentIndex = queue.findIndex(track => track.id === currentTrack.id);
    
    if (repeatMode === 'track') {
      set({ isPlaying: true });
      return;
    }
    
    const nextTrack = queue[currentIndex + 1];
    if (nextTrack) {
      set({ currentTrack: nextTrack });
    } else if (repeatMode === 'queue') {
      set({ currentTrack: queue[0] });
    }
  },
  
  previousTrack: () => {
    const { queue, currentTrack } = get();
    if (!currentTrack) return;
    
    const currentIndex = queue.findIndex(track => track.id === currentTrack.id);
    const previousTrack = queue[currentIndex - 1];
    if (previousTrack) {
      set({ currentTrack: previousTrack });
    }
  },
}));