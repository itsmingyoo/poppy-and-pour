export async function fetchDBToken() {
    // !! ! !!!!!!!!!!!!!!!!!!!!!!!!!!!! THIS URL NEEDS TO BE CHANGED FOR PRODUCTION
    const res = await fetch('http://localhost:3000/api/oauth/fetchToken')
    const data = await res.json()
    return data
}

async function handler(req, res) {

    const token = await fetchDBToken()
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

        // can only get this to refresh at home page currently...
        res.status(200).json(userData)
    } else {
        res.status(500).json({ message: 'COULD NOT RETRIEVE USER DATA' })
    }
}
export default handler
