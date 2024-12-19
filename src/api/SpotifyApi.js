import axios from 'axios';
import queryString from 'query-string';

const CLIENT_ID = 'D4f74f18a2cc41ccb94eb5d3c6780a88';
const CLIENT_SECRET = '1fbbb02c0f20422099a9c4d338e95e24';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

// Here hantes der access token fra Spotify API
export const getAccessToken = async () => {
  try {
    const authHeader = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
    const params = queryString.stringify({ grant_type: 'client_credentials' });

    const response = await axios.post(TOKEN_ENDPOINT, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${authHeader}`,
      },
    });

    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw error;
  }
};


export const searchSpotify = async (query) => {
  try {
    const accessToken = await getAccessToken();
    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: { q: query, type: 'track', limit: 10 },
    });

    return response.data.tracks.items; 
  } catch (error) {
    console.error('Error fetching songs:', error);
    return [];
  }
};
