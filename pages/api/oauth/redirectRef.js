import { validateTokenWithDB } from '../../../lib/tokenValidator'

const clientID = process.env.ETSY_API_KEY
const clientVerifier = 'WQdq_ovy9sRWEQenfUdBOxS9PUiTSUR-SnubAaqX0z4'
const redirectUri = 'http://localhost:3000/api/oauth/redirect'
const codeChallenge = '8OFFvT8zjL0zoUxZg3M7crd0h-7WScXNd8mFakma7Fw'
const authUrl = `https://www.etsy.com/oauth/connect?response_type=code&redirect_uri=${redirectUri}&scope=email_r&client_id=${process.env.ETSY_API_KEY}&state=77pwaj&code_challenge=${codeChallenge}&code_challenge_method=S256`

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            res.redirect(authUrl)
        } catch (error) {
            console.error('Failed to initiate Etsy authentication:', error)
            res.status(500).json({ error: 'Failed to initiate authentication' })
        }
    } else if (req.method === 'POST') {
        try {
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

            if (response.ok) {
                const tokenData = await response.json()
                const validatedToken = await validateTokenWithDB(tokenData)

                console.log('Validated Token:', validatedToken)
                res.redirect(`http://localhost:3000/api/oauth/welcome`)
            } else {
                console.error('Failed to fetch token data')
                res.status(500).json({
                    message: 'Could not generate token data',
                })
            }
        } catch (error) {
            console.error('Error handling Etsy redirect:', error)
            res.status(500).json({ error: 'Error handling Etsy redirect' })
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' })
    }
}
