import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, Library, PlusSquare, LogOut, User } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const SpotifyLogo = () => (
  <svg width="28" height="28" viewBox="0 0 2931 2931" fill="#1DB954">
    <path d="M1465.5 0C656.1 0 0 656.1 0 1465.5S656.1 2931 1465.5 2931 2931 2274.9 2931 1465.5C2931 656.2 2274.9.1 1465.5 0zm672.1 2113.6c-26.3 43.2-82.6 56.7-125.6 30.4-344.1-210.3-777.3-257.8-1287.4-141.3-49.2 11.3-98.2-19.5-109.4-68.7-11.3-49.2 19.4-98.2 68.7-109.4C1242.1 1697.1 1721 1752 2107.3 1987c43 26.5 56.7 82.6 30.3 126.6zm179.3-398.9c-33.1 53.8-103.5 70.6-157.2 37.6-393.8-242.1-994.4-312.2-1460.3-170.8-60.4 18.3-124.2-15.8-142.6-76.1-18.2-60.4 15.9-124.1 76.2-142.5 532.2-161.5 1193.9-83.3 1646.8 194.7 53.8 33.1 70.8 103.4 37.1 157.1zm15.4-415.6c-472.4-280.5-1251.6-306.3-1702.6-169.5-72.4 22-149-18.9-170.9-91.3-21.9-72.4 18.9-149 91.4-171 517.7-157.1 1378.2-126.8 1922 196 65.1 38.7 86.5 122.8 47.9 187.8-38.5 65.2-122.8 86.7-187.8 48z"/>
  </svg>
);

export const Sidebar = () => {
  const { user, signOut } = useAuthStore();

  return (
    <div className="w-64 bg-black h-full p-6 flex flex-col">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-8">
          <SpotifyLogo />
          <h1 className="text-2xl font-bold text-white">Spotify Clone</h1>
        </div>
        
        <nav className="space-y-4">
          <Link to="/" className="flex items-center space-x-4 text-gray-400 hover:text-white transition-colors">
            <Home size={24} />
            <span>Home</span>
          </Link>
          <Link to="/search" className="flex items-center space-x-4 text-gray-400 hover:text-white transition-colors">
            <Search size={24} />
            <span>Search</span>
          </Link>
          <Link to="/library" className="flex items-center space-x-4 text-gray-400 hover:text-white transition-colors">
            <Library size={24} />
            <span>Your Library</span>
          </Link>
          {user && (
            <Link to="/profile" className="flex items-center space-x-4 text-gray-400 hover:text-white transition-colors">
              <User size={24} />
              <span>Profile</span>
            </Link>
          )}
        </nav>

        <div className="mt-8 pt-8 border-t border-zinc-800">
          <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors w-full">
            <PlusSquare size={24} />
            <span>Create Playlist</span>
          </button>
        </div>
      </div>
      
      {user && (
        <button
          onClick={() => signOut()}
          className="flex items-center space-x-2 text-gray-400 hover:text-red-500 transition-colors mt-auto"
        >
          <LogOut size={24} />
          <span>Logout</span>
        </button>
      )}
    </div>
  );
};