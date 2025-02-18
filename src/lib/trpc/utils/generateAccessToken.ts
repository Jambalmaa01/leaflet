import { TRPCError } from '@trpc/server';
import { AccessTokenPayload } from './verifyAccessToken';
import { SignJWT } from 'jose';

export async function generateAccessToken(payload: AccessTokenPayload) {
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

  if (!accessTokenSecret) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'ACCESS_TOKEN_SECRET not found',
    });
  }

  const encodedAccessTokenSecret = new TextEncoder().encode(accessTokenSecret);

  const accessToken = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedAccessTokenSecret);

  return accessToken;
}
