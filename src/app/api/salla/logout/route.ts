import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.delete('salla_access_token');
  response.cookies.delete('salla_refresh_token');
  response.cookies.delete('salla_token_expiry');

  return response;
}
