import { NextResponse, NextRequest } from 'next/server';

const CLIENT_ID = process.env.NEXT_PUBLIC_SALLA_CLIENT_ID;
const CLIENT_SECRET = process.env.SALLA_CLIENT_SECRET;
const REDIRECT_URI = process.env.NEXT_PUBLIC_SALLA_REDIRECT_URI;

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  const state = request.nextUrl.searchParams.get('state');
  if (!code) {
    return new NextResponse('Missing authorization code.', { status: 400 });
  }

  try {
    const tokenResponse = await fetch('https://accounts.salla.sa/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI,
        code: code,
      }),
    });
    const data = await tokenResponse.json();
    if (data.error) {
      console.error('Salla Token Exchange Error:', data);
      return new NextResponse(`Token exchange failed: ${data.error_description || data.error}`, { status: 500 });
    }
    const { access_token, refresh_token, expires_in } = data;
    const htmlContent = `
      <html>
        <body>
          <script>
            window.opener.postMessage({ 
              type: 'salla_auth_success', 
              token: '${access_token}',
              refreshToken: '${refresh_token}'
            }, '*');
            window.close();
          </script>
        </body>
      </html>
    `;

    return new NextResponse(htmlContent, {
      headers: { 'Content-Type': 'text/html' },
      status: 200
    });

  } catch (error) {
    console.error('An unexpected error occurred during token exchange:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}