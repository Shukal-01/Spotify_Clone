import React from 'react';
import { User } from '../../types';
import { Camera } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface ProfileHeaderProps {
  user: User;
  onAvatarChange: () => void;
}

export const ProfileHeader = ({ user, onAvatarChange }: ProfileHeaderProps) => {
  return (
    <div className="relative mb-8">
      <div className="h-48 bg-gradient-to-b from-green-600 to-zinc-900" />
      <div className="absolute bottom-0 left-8 transform translate-y-1/2 flex items-end space-x-6">
        <div className="relative group">
          <div className="w-40 h-40 rounded-full overflow-hidden bg-zinc-800 border-4 border-zinc-900">
            <img
              src={user.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop'}
              alt={user.email}
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={onAvatarChange}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
          >
            <Camera className="text-white" size={24} />
          </button>
        </div>
        <div className="mb-4">
          <h1 className="text-white text-3xl font-bold">{user.email}</h1>
        </div>
      </div>
    </div>
  );
};