// These variables contain your API Key, the state sent
// in the initial authorization request, and the client verifier compliment
// to the code_challenge sent with the initial authorization request
import { generateRedirectURI } from '@/lib/PKCE'
// The req.query object has the query params that Etsy authentication sends
// to this route. The authorization code is in the `code` param
async function handler(req, res) {
    // Generate PKCE and URL - Includes uri (url) and clientVerifier (codeVerifier)
    const { redirect_uri, code_verifier, codeChallenge, client_id } =
        await generateRedirectURI()

    const authCode = req.query.code

    console.log('THIS IS req.query', req.query) // should be undefined until returned from fetch

    const tokenUrl = 'https://api.etsy.com/v3/public/oauth/token'
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
            grant_type: 'authorization_code',
            client_id,
            redirect_uri,
            code: authCode,
            code_verifier,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    }

    const response = await fetch(tokenUrl, requestOptions)

    console.log('AUTH CODE ----------------> ', authCode)
    console.log('response', response)

    // Extract the access token from the response access_token data field
    if (response.ok) {
        const token = await response.json()
        console.log('TOKEN ---> ', token)
        res.status(201).json(token)
    } else {
        res.status(500).json({ message: 'Error GENERATING token data' })
    }
}

export default handler
