import { NextResponse, NextRequest } from 'next/server';

const CLIENT_ID = process.env.NEXT_PUBLIC_SALLA_CLIENT_ID;
const CLIENT_SECRET = process.env.SALLA_CLIENT_SECRET;
const REDIRECT_URI = process.env.NEXT_PUBLIC_SALLA_REDIRECT_URI;

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');

  if (!code) {
    return new NextResponse('Missing authorization code.', { status: 400 });
  }

  try {
    const body = new URLSearchParams({
      client_id: CLIENT_ID || '',
      client_secret: CLIENT_SECRET || '',
      grant_type: 'authorization_code',
      redirect_uri: REDIRECT_URI || '',
      code: code,
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
      console.error('Salla Token Exchange Error:', data);
      return new NextResponse(
        `Token exchange failed: ${data.error_description || data.error}`,
        { status: 500 }
      );
    }

    const { access_token, refresh_token, expires_in } = data;

    // Calculate expiry timestamp
    const expiresAt = new Date(Date.now() + expires_in * 1000).toISOString();

    // Build the HTML page that sets cookies and notifies the opener
    const htmlContent = `
      <html>
        <body>
          <p>Authenticating... This window will close automatically.</p>
          <script>
            window.opener.postMessage({ 
              type: 'salla_auth_success', 
              token: '${access_token}',
              refreshToken: '${refresh_token}',
              expiresAt: '${expiresAt}'
            }, '*');
            window.close();
          </script>
        </body>
      </html>
    `;

    // Create response with HttpOnly cookies
    const response = new NextResponse(htmlContent, {
      headers: { 'Content-Type': 'text/html' },
      status: 200,
    });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
    };

    response.cookies.set('salla_access_token', access_token, {
      ...cookieOptions,
      maxAge: expires_in, // seconds
    });

    response.cookies.set('salla_refresh_token', refresh_token, {
      ...cookieOptions,
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    response.cookies.set('salla_token_expiry', expiresAt, {
      ...cookieOptions,
      httpOnly: false, // Allow client-side access to check expiry
      maxAge: expires_in,
    });

    return response;
  } catch (error) {
    console.error('An unexpected error occurred during token exchange:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
