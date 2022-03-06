import type { NextApiRequest, NextApiResponse } from 'next';
import { spotifyApi } from 'utils/spotifyApi';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const code = req.query?.code as string;
  const data = await spotifyApi.authorizationCodeGrant(code);
  console.log(`The token expires in ${data.body?.expires_in}`);
  console.log(`The access token is ${data.body?.access_token}`);
  console.log(`The refresh token is ${data.body?.refresh_token}`);

  // TODO: Store in localStorage instead
  res.setHeader('Set-Cookie', `spotifyAuth=${data.body?.access_token}`);
  spotifyApi.setAccessToken(data.body?.access_token);
  spotifyApi.setRefreshToken(data.body?.refresh_token);

  res.redirect('/api/liked-songs');
}
