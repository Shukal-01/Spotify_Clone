import React, { useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/useAuthStore';

interface CreatePlaylistModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const CreatePlaylistModal = ({ onClose, onSuccess }: CreatePlaylistModalProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { user } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const { error } = await supabase
        .from('playlists')
        .insert([
          {
            name,
            description,
            user_id: user.id,
          },
        ]);

      if (error) throw error;
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 p-6 rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-xl font-bold">Create Playlist</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-200 mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 h-24"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded font-bold hover:bg-green-600 transition"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};