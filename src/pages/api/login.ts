import type { NextApiRequest, NextApiResponse } from "next";
import { spotifyApi } from "utils/spotifyApi";
import { generateRandomString } from "utils/string";

const scopes = [
  "user-library-modify",
  "user-library-read",
  "playlist-modify-private",
  "playlist-read-collaborative",
  "playlist-read-private",
  "user-top-read",
  "playlist-modify-public",
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const state = generateRandomString(16);
  const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
  res.redirect(authorizeURL);
}
