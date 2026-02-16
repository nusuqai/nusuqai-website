import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get('salla_access_token')?.value;
  const refreshToken = request.cookies.get('salla_refresh_token')?.value;
  const tokenExpiry = request.cookies.get('salla_token_expiry')?.value;

  if (!accessToken) {
    return NextResponse.json({
      authenticated: false,
      hasRefreshToken: !!refreshToken,
    });
  }

  const expiresAt = tokenExpiry ? new Date(tokenExpiry) : null;
  const isExpired = expiresAt ? expiresAt.getTime() < Date.now() : false;

  return NextResponse.json({
    authenticated: !isExpired,
    isExpired,
    expiresAt: tokenExpiry || null,
    hasRefreshToken: !!refreshToken,
  });
}
