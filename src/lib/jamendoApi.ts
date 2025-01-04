import axios from 'axios';

const API_BASE_URL = 'https://api.jamendo.com/v3.0';
const CLIENT_ID = '06e29ebf';

export interface Track {
  id: string;
  name: string;
  artist_name: string;
  album_name: string;
  image: string;
  audio: string;
  duration: number;
}

export const jamendoApi = {
  async searchTracks(query: string): Promise<Track[]> {
    const response = await axios.get(`${API_BASE_URL}/tracks/`, {
      params: {
        client_id: CLIENT_ID,
        format: 'json',
        limit: 20,
        search: query,
      },
    });
    return response.data.results;
  },

  async getFeaturedTracks(): Promise<Track[]> {
    const response = await axios.get(`${API_BASE_URL}/tracks/`, {
      params: {
        client_id: CLIENT_ID,
        format: 'json',
        limit: 12,
        featured: true,
      },
    });
    return response.data.results;
  },

  async getTracksByGenre(genre: string): Promise<Track[]> {
    const response = await axios.get(`${API_BASE_URL}/tracks/`, {
      params: {
        client_id: CLIENT_ID,
        format: 'json',
        limit: 20,
        tags: genre,
      },
    });
    return response.data.results;
  },
};