/*
  # Initial Schema for Spotify Clone

  1. New Tables
    - `profiles`
      - Extends auth.users with additional user information
    - `songs`
      - Stores music tracks information
    - `playlists`
      - Stores playlist information
    - `playlist_songs`
      - Junction table for playlist-song relationships

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create songs table
CREATE TABLE songs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  artist text NOT NULL,
  album text,
  cover_url text,
  song_url text NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- Create playlists table
CREATE TABLE playlists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  cover_url text,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create playlist_songs junction table
CREATE TABLE playlist_songs (
  playlist_id uuid REFERENCES playlists(id) ON DELETE CASCADE,
  song_id uuid REFERENCES songs(id) ON DELETE CASCADE,
  added_at timestamptz DEFAULT now(),
  PRIMARY KEY (playlist_id, song_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE songs ENABLE ROW LEVEL SECURITY;
ALTER TABLE playlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE playlist_songs ENABLE ROW LEVEL SECURITY;

-- Create security policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles
  FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Songs are viewable by everyone"
  ON songs
  FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own songs"
  ON songs
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own songs"
  ON songs
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Playlists are viewable by everyone"
  ON playlists
  FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own playlists"
  ON playlists
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own playlists"
  ON playlists
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Playlist songs are viewable by everyone"
  ON playlist_songs
  FOR SELECT
  USING (true);

CREATE POLICY "Users can manage songs in own playlists"
  ON playlist_songs
  FOR ALL
  USING (
    auth.uid() IN (
      SELECT user_id FROM playlists WHERE id = playlist_id
    )
  );