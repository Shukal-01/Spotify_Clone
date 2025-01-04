import React, { useEffect, useState } from 'react';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { PlaylistCard } from '../components/playlists/PlaylistCard';
import { CreatePlaylistModal } from '../components/playlists/CreatePlaylistModal';
import { useAuthStore } from '../store/useAuthStore';
import { supabase } from '../lib/supabase';
import type { Playlist } from '../types';
import { PlusCircle } from 'lucide-react';

export const Profile = () => {
  const { user } = useAuthStore();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);

  useEffect(() => {
    if (user) {
      loadPlaylists();
    }
  }, [user]);

  const loadPlaylists = async () => {
    try {
      const { data, error } = await supabase
        .from('playlists')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPlaylists(data || []);
    } catch (error) {
      console.error('Error loading playlists:', error);
    }
  };

  const handleAvatarChange = async () => {
    // Implement avatar upload logic
  };

  if (!user) return null;

  return (
    <div className="pb-24">
      <ProfileHeader user={user} onAvatarChange={handleAvatarChange} />
      
      <div className="mt-24 px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-2xl font-bold">Your Playlists</h2>
          <button
            onClick={() => setShowCreatePlaylist(true)}
            className="flex items-center space-x-2 text-white bg-green-500 px-4 py-2 rounded-full hover:bg-green-600 transition"
          >
            <PlusCircle size={20} />
            <span>Create Playlist</span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {playlists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              onPlay={() => {/* Implement play logic */}}
            />
          ))}
        </div>
      </div>

      {showCreatePlaylist && (
        <CreatePlaylistModal
          onClose={() => setShowCreatePlaylist(false)}
          onSuccess={loadPlaylists}
        />
      )}
    </div>
  );
};