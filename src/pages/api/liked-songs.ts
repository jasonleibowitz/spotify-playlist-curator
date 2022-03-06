import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { TrackDetailResponse } from "types/lastfm/track";
import { Song } from "types/song";
import { spotifyApi } from "utils/spotifyApi";

const fetchTrackDetails = async (song: Song): Promise<any> => {
  const response = await axios.get<TrackDetailResponse>(
    `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${process.env.LAST_FM_API_KEY}&artist=${encodeURI(
      song.artists
    )}&track=${encodeURI(song.name)}&format=json`
  );
  const hasTags = response.data.track?.toptags?.tag.length;
  if (hasTags) {
    console.log(JSON.stringify(response.data.track.toptags));
    const genres = response.data.track?.toptags.tag.map((tag) => tag.name);
    const summary = response.data.track?.wiki?.summary;
    return { ...song, genres, summary };
  }
  return {
    ...song,
    genres: [],
    summary: null,
  };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const authToken = req.cookies?.spotifyAuth;
  spotifyApi.setAccessToken(authToken);

  const data = await spotifyApi.getMySavedTracks({ offset: 0, market: "US" });

  const likedSongs = data.body.items.map((likedTrack) => ({
    dateAdded: likedTrack.added_at,
    id: likedTrack.track.id,
    name: likedTrack.track.name,
    artists: likedTrack.track.artists[0].name,
    album: likedTrack.track.album.name,
    thumbnails: likedTrack.track.album.images,
    releaseDate: likedTrack.track.album.release_date,
    preview_url: likedTrack.track.preview_url,
  }));

  const promises = likedSongs.map((song) => fetchTrackDetails(song));
  const result = await Promise.all(promises);

  res.status(200).send({ data: result });
}
