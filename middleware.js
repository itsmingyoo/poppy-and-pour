import { NextResponse } from 'next/server'


async function fetchToken() {
    const res = await fetch('/api/oauth/fetchToken')

}

var TokenProvider = require('refresh-token')

var tokenProvider = new TokenProvider(
    'https://api.etsy.com/v3/public/oauth/token',
    {
        refresh_token: 'refresh token',
        client_id: process.env.ETSY_API_KEY,
        // client_secret: 'client secret',
        /* you can pass an access token optionally
    access_token:  'fdlaksd',
    expires_in:    2133
    */
    }
)

// This function can be marked `async` if using `await` inside
export function middleware(req) {
    console.log('req.url-------------', req.url)
    tokenProvider.getToken(function (err, token) {
        //token will be a valid access token.
    })

    // don't need to return/redirect
    // return NextResponse.redirect(new URL(req.url))
}

export const config = {
    matcher: '/api/oauth/welcome',
}

// Single or Multi Paths
// export const config = {
//     matcher: ['/about/:path*', '/dashboard/:path*'],
//   }
