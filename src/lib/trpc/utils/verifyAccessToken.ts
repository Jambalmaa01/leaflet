import { jwtVerify } from 'jose';

export type AccessTokenPayload = {
  userId: string;
};

export async function verifyAccessToken(
  accessToken: string
): Promise<AccessTokenPayload | null> {
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

  if (!accessTokenSecret) {
    console.error('ACCESS_TOKEN_SECRET not found');
    return null;
  }

  const encodedAccessTokenSecret = new TextEncoder().encode(accessTokenSecret);

  try {
    const { payload } = await jwtVerify(accessToken, encodedAccessTokenSecret, {
      algorithms: ['HS256'],
    });

    if (!payload) {
      console.error('payload is empty');
      return null;
    }

    if (typeof payload === 'string') {
      console.error('payload is not string');
      return null;
    }

    if (!payload.userId) {
      console.error('payload sub is undefined');
      return null;
    }

    return {
      userId: payload.userId as string,
    };
  } catch (err) {
    console.error('verify throws error', err);
    return null;
  }
}
