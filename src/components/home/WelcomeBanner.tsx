import React from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { Music2 } from 'lucide-react';

export const WelcomeBanner = () => {
  const { user } = useAuthStore();

  return (
    <div className="relative mb-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-8 overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <Music2 size={40} className="text-white" />
          <h1 className="text-4xl font-bold text-white">
            Welcome to Spotify Clone
          </h1>
        </div>
        <p className="text-xl text-white/90">
          {user ? `Welcome back, ${user.email}` : 'Discover millions of tracks'}
        </p>
      </div>
    </div>
  );
};