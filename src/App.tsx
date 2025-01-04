import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Player } from './components/Player';
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { Profile } from './pages/Profile';
import { Genres } from './pages/Genres';
import { AuthModal } from './components/auth/AuthModal';
import { useAuthStore } from './store/useAuthStore';
import { supabase } from './lib/supabase';
import { LoadingSpinner } from './components/common/LoadingSpinner';

export function App() {
  const [showAuth, setShowAuth] = useState(false);
  const { user, loading } = useAuthStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      useAuthStore.setState({ 
        user: session?.user ?? null,
        loading: false 
      });
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      useAuthStore.setState({ user: session?.user ?? null });
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <div className="flex h-screen bg-zinc-900">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8">
          {user ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/genres" element={<Genres />} />
              <Route path="/library" element={<div className="text-white">Library Page</div>} />
            </Routes>
          ) : (
            <div className="flex h-full items-center justify-center">
              <button
                onClick={() => setShowAuth(true)}
                className="bg-green-500 text-white px-8 py-3 rounded-full font-bold hover:bg-green-600"
              >
                Sign In to Listen
              </button>
            </div>
          )}
        </main>
        <Player />
        {showAuth && !user && <AuthModal />}
      </div>
    </Router>
  );
}