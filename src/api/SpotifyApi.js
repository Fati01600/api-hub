import axios from 'axios';
import queryString from 'query-string';
import SpotifyWebApi from 'spotify-web-api-node';

const CLIENT_ID = 'D4f74f18a2cc41ccb94eb5d3c6780a88';
const CLIENT_SECRET = '1fbbb02c0f20422099a9c4d338e95e24';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

const spotifyApi = new SpotifyWebApi({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: 'http://www.example.com/callback',
});


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

spotifyApi.setAccessToken(await getAccessToken());r
export default spotifyApi;

//get album
export const getAlbum = async (albumId) => {
  try {
    const response = await spotifyApi.getAlbum(albumId);
    return response.body;
  } catch (error) {
    console.error("Error fetching album information:", error);
    throw error;
  }
};


// Fetcher artist albums
export const getArtistAlbums = async (artistId) => {
  try {
    const response = await spotifyApi.getArtistAlbums(artistId);
    return response.body.items;
  } catch (error) {
    console.error('Error fetching artist albums:', error);
    return [];
  }
};

// FDerefter fetchtes artist top tracks
export const getArtistTopTracks = async (artistId, market = 'US') => {
  try {
    const response = await spotifyApi.getArtistTopTracks(artistId, market);
    return response.body.tracks;
  } catch (error) {
    console.error('Error fetching top tracks:', error);
    return [];
  }
};

// Search for tracks, artists, or albums
export const searchSpotify = async (query, type = 'track', limit = 10) => {
  try {
    const response = await spotifyApi.search(query, [type], { limit });
    return response.body[`${type}s`].items;
  } catch (error) {
    console.error(`Error searching for ${type}:`, error);
    return [];
  }
};

// Fetch user playlists
export const getUserPlaylists = async () => {
  try {
    const response = await spotifyApi.getUserPlaylists();
    return response.body.items;
  } catch (error) {
    console.error('Error fetching user playlists:', error);
    return [];
  }
};

// Add track to playback queue
export const addToQueue = async (trackUri) => {
  try {
    await spotifyApi.addToQueue(trackUri);
  } catch (error) {
    console.error('Error adding track to queue:', error);
  }
};

// Fetch audio features for a track
export const getAudioFeaturesForTrack = async (trackId) => {
  try {
    const response = await spotifyApi.getAudioFeaturesForTrack(trackId);
    return response.body;
  } catch (error) {
    console.error('Error fetching audio features:', error);
    return null;
  }
};

// Fetch audio analysis for a track
export const getAudioAnalysisForTrack = async (trackId) => {
  try {
    const response = await spotifyApi.getAudioAnalysisForTrack(trackId);
    return response.body;
  } catch (error) {
    console.error('Error fetching audio analysis:', error);
    return null;
  }
};

// Fetch new releases
export const getNewReleases = async (limit = 10) => {
  try {
    const response = await spotifyApi.getNewReleases({ limit });
    return response.body.albums.items;
  } catch (error) {
    console.error('Error fetching new releases:', error);
    return [];
  }
};

// Fetch featured playlists
export const getFeaturedPlaylists = async () => {
  try {
    const response = await spotifyApi.getFeaturedPlaylists();
    return response.body.playlists.items;
  } catch (error) {
    console.error('Error fetching featured playlists:', error);
    return [];
  }
};

// Fetch a specific playlist
export const getPlaylist = async (playlistId) => {
  try {
    const response = await spotifyApi.getPlaylist(playlistId);
    return response.body;
  } catch (error) {
    console.error('Error fetching playlist:', error);
    return null;
  }
};

// Add tracks to a playlist
export const addTracksToPlaylist = async (playlistId, trackUris) => {
  try {
    await spotifyApi.addTracksToPlaylist(playlistId, trackUris);
  } catch (error) {
    console.error('Error adding tracks to playlist:', error);
  }
};

// Remove tracks from a playlist
export const removeTracksFromPlaylist = async (playlistId, trackUris) => {
  try {
    await spotifyApi.removeTracksFromPlaylist(playlistId, trackUris);
  } catch (error) {
    console.error('Error removing tracks from playlist:', error);
  }
};
