import { NextRequest, NextResponse } from 'next/server'

// GET /api/auth/callback - Handle OAuth callback
export async function GET(request: NextRequest) {
  try {
    // TODO: Extract code from query params
    // TODO: Exchange code for session with Supabase
    // TODO: Set session cookie
    // TODO: Create user profile if first login
    // TODO: Redirect to dashboard

    return NextResponse.redirect(new URL('/dashboard', request.url))
  } catch (error) {
    console.error('Auth callback error:', error)
    return NextResponse.redirect(new URL('/login?error=auth', request.url))
  }
}

