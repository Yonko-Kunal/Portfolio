import querystring from "querystring";
import { NextResponse } from "next/server";

// 1. Interfaces
interface SpotifyArtist {
  name: string;
}
interface SpotifyImage {
  url: string;
}
interface SpotifyAlbum {
  name: string;
  images: SpotifyImage[];
}
interface SpotifyItem {
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  external_urls: { spotify: string };
  preview_url: string | null;
}
interface SpotifyNowPlayingResponse {
  is_playing: boolean;
  item: SpotifyItem | null;
}
interface AccessTokenResponse {
  access_token: string;
}

// 2. Env Variables
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

// 3. Helper: Get Spotify Token
const getAccessToken = async (): Promise<AccessTokenResponse> => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });
  return response.json();
};

// 4. iTunes Search API (Works in India)
const getItunesPreview = async (trackName: string, artistName: string) => {
  try {
    console.log(`[iTunes] Searching for: ${trackName} by ${artistName}`);

    // Clean up the title (remove "feat", "Remastered", etc)
    const cleanTrack = trackName.replace(/[\(\[].*?[\)\]]/g, "").trim();

    // Construct search query
    const query = `${cleanTrack} ${artistName}`;
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=1`;

    // console.log(`[iTunes] Fetching: ${url}`);

    // Fetch from iTunes
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();

    if (data.results && data.results.length > 0) {
      // console.log(`[iTunes] SUCCESS! Found: ${data.results[0].trackName}`);
      return data.results[0].previewUrl; // Returns an .m4a file (browsers play this fine)
    }

    // console.log("[iTunes] No results found.");
    return null;
  } catch (error) {
    console.error("[iTunes] Error:", error);
    return null;
  }
};

// 5. Main Handler
export async function GET() {
  if (!client_id || !client_secret || !refresh_token) {
    return NextResponse.json(
      { error: "Missing environment variables" },
      { status: 500 },
    );
  }

  // A. Get Token
  const { access_token } = await getAccessToken();

  // B. Get Song from Spotify
  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: { Authorization: `Bearer ${access_token}` },
    cache: "no-store", // Ensure fresh data
  });

  if (response.status === 204 || response.status > 400) {
    return NextResponse.json({ isPlaying: false });
  }

  const song = (await response.json()) as SpotifyNowPlayingResponse;

  if (song.item === null) {
    return NextResponse.json({ isPlaying: false });
  }

  const isPlaying = song.is_playing;
  const title = song.item.name;
  const artist = song.item.artists.map((_artist) => _artist.name).join(", ");
  const album = song.item.album.name;
  const albumImageUrl = song.item.album.images[0].url;
  const songUrl = song.item.external_urls.spotify;

  // C. CHECK PREVIEW
  let previewUrl = song.item.preview_url;

  if (!previewUrl) {
    console.log(`Spotify preview missing for "${title}". Trying iTunes...`);
    previewUrl = await getItunesPreview(title, artist);
  }

  return NextResponse.json({
    album,
    albumImageUrl,
    artist,
    isPlaying,
    songUrl,
    title,
    previewUrl,
  });
}