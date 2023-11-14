// These variables contain your API Key, the state sent
// in the initial authorization request, and the client verifier compliment
// to the code_challenge sent with the initial authorization request

const clientID = process.env.ETSY_API_KEY
// const clientVerifier = 'm6L-429KzxMb7eJ-j55389wFNCELwJ0MNzWfB6M-_-4'
// const redirectUri = 'https://www.etsy.com/oauth/connect?response_type=code&redirect_uri=http://localhost:3000/oauth/redirect&scope=email_r&client_id=1aa2bb33c44d55eeeeee6fff&state=naofo6&code_challenge=6VYHYyQUZg81Bo5ZTjqi4iWYRigSrLOHwlcv3unJAMk&code_challenge_method=S256'
import { generateRedirectURI } from "@/lib/PKCE"
// The req.query object has the query params that Etsy authentication sends
// to this route. The authorization code is in the `code` param
async function handler(req, res) {

    const {redirect_uri, clientVerifier} = generateRedirectURI()
    console.log("URI ---> ", uri)
    console.log("CLIENT VER ---> ", clientVerifier)

    const tokenUrl = 'https://api.etsy.com/v3/public/oauth/token'
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
            grant_type: 'authorization_code',
            client_id: clientID,
            redirect_uri,
            code: authCode,
            code_verifier: clientVerifier,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    }

    const response = await fetch(tokenUrl, requestOptions)

    const authCode = req.query.code   // QUERY
    console.log("AUTH CODE ----------------> ", authCode)

    // Extract the access token from the response access_token data field
    if (response.ok) {
        const tokenData = await response.json()
        console.log("TOKEN ---> ", tokenData)
        res.status(201).json(tokenData)
    } else {
        res.status(500).json({message: 'Error generating token data'})
    }
}

export default handler
