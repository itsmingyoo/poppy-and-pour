import { NextResponse } from 'next/server'

// fetch function for querying token data from the database
async function fetchToken() {
    // !! ! !!!!!!!!!!!!!!!!!!!!!!!!!!!! THIS URL NEEDS TO BE CHANGED FOR PRODUCTION
    const res = await fetch('http://localhost:3000/api/oauth/fetchToken')
    const data = await res.json()
    return data
}


// this is a function to update a token in the database if the accessToken has expired
async function updateToken(newTokenDataObj) {
    const response = await fetch(
        'http://localhost:3000/api/oauth/updateToken',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTokenDataObj),
        }
    )
    if (response.ok) {
        const data = await response.json()
        console.log('TOKEN UPDATED ---> ', data)
    } else {
        console.log('TOKEN DID NOT UPDATE')
    }
}


// this middleware function runs for every request specified in the match export configuration object
export async function middleware(req) {
    console.log('req.url-------------', req.url)

    // this grabs the token data from the database
    const token = await fetchToken()
    console.log(' --- TOKEN DATA RETREIVED FROM DATABASE --> ', token)

    // check if the access token needs to be updated
    if (token.expiresIn === 3600) {
        const dateOfAccessToken = new Date(token.createdAt)
        const currentDate = new Date()

        // Calculate the difference in milliseconds
        const timeDifference = currentDate - dateOfAccessToken

        // Define the duration of 24 hours in milliseconds
        const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000

        // Check if 24 hours have elapsed
        if (timeDifference >= twentyFourHoursInMilliseconds) {
            console.log('24 hours have elapsed')

            // generate a new access token
            const url = 'https://api.etsy.com/v3/public/oauth/token'
            const clientId = process.env.ETSY_API_KEY
            const refreshToken = token.refreshToken
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `grant_type=refresh_token&client_id=${clientId}&refresh_token=${refreshToken}`,
            })

            const updatedData = await response.json()

            // update the token in the database
            await fetch(updateToken(updatedData))
        } else {
            console.log('access token valid, no need to refresh it...')
        }
    }
}

export const config = {
    matcher: '/api/oauth/welcome',
}

// Single or Multi Paths
// export const config = {
//     matcher: ['/about/:path*', '/dashboard/:path*'],
//   }
