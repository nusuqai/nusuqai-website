import { NextResponse, NextRequest } from 'next/server';

const CLIENT_ID = process.env.NEXT_PUBLIC_SALLA_CLIENT_ID;
const CLIENT_SECRET = process.env.SALLA_CLIENT_SECRET;

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get('salla_refresh_token')?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { success: false, error: 'No refresh token found' },
      { status: 401 }
    );
  }

  try {
    const body = new URLSearchParams({
      client_id: CLIENT_ID || '',
      client_secret: CLIENT_SECRET || '',
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      scope: 'offline_access',
    });

    const tokenResponse = await fetch('https://accounts.salla.sa/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: body.toString(),
    });

    const data = await tokenResponse.json();

    if (data.error) {
      console.error('Salla Token Refresh Error:', data);

      // Clear invalid cookies
      const errorResponse = NextResponse.json(
        { success: false, error: data.error_description || data.error },
        { status: 401 }
      );
      errorResponse.cookies.delete('salla_access_token');
      errorResponse.cookies.delete('salla_refresh_token');
      errorResponse.cookies.delete('salla_token_expiry');
      return errorResponse;
    }

    const { access_token, refresh_token: new_refresh_token, expires_in } = data;
    const expiresAt = new Date(Date.now() + expires_in * 1000).toISOString();

    const response = NextResponse.json({
      success: true,
      expiresAt,
    });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
    };

    response.cookies.set('salla_access_token', access_token, {
      ...cookieOptions,
      maxAge: expires_in,
    });

    // Update refresh token if a new one was provided
    if (new_refresh_token) {
      response.cookies.set('salla_refresh_token', new_refresh_token, {
        ...cookieOptions,
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    response.cookies.set('salla_token_expiry', expiresAt, {
      ...cookieOptions,
      httpOnly: false,
      maxAge: expires_in,
    });

    return response;
  } catch (error) {
    console.error('Token refresh error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to refresh token' },
      { status: 500 }
    );
  }
}
