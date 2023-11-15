import { prisma } from '../../../server/db/client'

async function handler(req, res) {

    // // we will now query for the access token through prisma
    // const { access_token } = req.query
    // console.log('we hit it')

    async function fetchToken() {
        // !! ! !!!!!!!!!!!!!!!!!!!!!!!!!!!! THIS URL NEEDS TO BE CHANGED FOR PRODUCTION
        const res = await fetch('http://localhost:3000/api/oauth/fetchToken')
        const data = await res.json()
        return data
    }

    const token = await fetchToken()
    const access_token = token.accessToken

    // An Etsy access token includes your shop/user ID
    // as a token prefix, so we can extract that too
    const user_id = access_token.split('.')[0]

    const requestOptions = {
        headers: {
            'x-api-key': process.env.ETSY_API_KEY,
            // Scoped endpoints require a bearer token
            Authorization: `Bearer ${access_token}`,
        },
    }

    const response = await fetch(
        `https://api.etsy.com/v3/application/users/${user_id}`,
        requestOptions
    )

    if (response.ok) {
        const userData = await response.json()
        // Load the template with the first name as a template variable.
        console.log('user data', userData)
        res.status(200).send(userData)
    } else {
        res.send('oops')
    }
}
export default handler
