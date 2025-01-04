export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover_url: string;
  song_url: string;
  created_at: string;
  user_id: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  cover_url: string;
  user_id: string;
  created_at: string;
}