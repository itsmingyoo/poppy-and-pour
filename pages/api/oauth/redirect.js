// These variables contain your API Key, the state sent
// in the initial authorization request, and the client verifier compliment
// to the code_challenge sent with the initial authorization request
import { prisma } from '../../../server/db/client'
import { validateTokenWithDB } from '../../../lib/tokenValidator'

const clientID = process.env.ETSY_API_KEY
const clientVerifier = 'WQdq_ovy9sRWEQenfUdBOxS9PUiTSUR-SnubAaqX0z4'
const redirectUri = 'http://localhost:3000/api/oauth/redirect'

async function handler(req, res) {
    // The req.query object has the query params that Etsy authentication sends
    // to this route. The authorization code is in the `code` param
    console.log('REDIRECTED!!!!!!!!!!!!!')
    const authCode = req.query.code
    const tokenUrl = 'https://api.etsy.com/v3/public/oauth/token'
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
            grant_type: 'authorization_code',
            client_id: clientID,
            redirect_uri: redirectUri,
            code: authCode,
            code_verifier: clientVerifier,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    }

    const response = await fetch(tokenUrl, requestOptions)

    // Extract the access token from the response access_token data field
    if (response.ok) {
        const tokenData = await response.json()
        console.log('SUCCESS')

        // Handle Token
        try {
            const validatedToken = await validateTokenWithDB(tokenData)
            console.log('Validated Token: ', validatedToken)
            res.redirect(`http://localhost:3000/api/oauth/welcome`)
        } catch (e) {
            console.log('we failed to upsert token', e)
            res.status(500).json({ error: 'failed to query for token' })
        }
    } else {
        console.log('FAIL')
        res.status(500).json({ message: 'Could Not Generate Token Data' })
    }
}

export default handler
