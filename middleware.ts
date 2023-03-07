import { withAuth } from 'next-auth/middleware'
import { NextRequest, NextResponse } from 'next/server'

export default withAuth (
  // function middleware(req: NextRequest) {
  //   return NextResponse.rewrite(new URL('/admin', req.url))
  // },
  {
    callbacks: {
      authorized({ req, token }) {
        console.log(token,'')
        
        const path = req.nextUrl.pathname;
        // `/admin` requires admin role
        if (path.startsWith('/admin')) {
          return token?.isAdmin === true;
        }

        // every other route in config only requires the user to be logged in
        return !!token;
      }
    }
  }
)

export const config = { matcher: ['/admin/:path*', '/restricted/:path*']}