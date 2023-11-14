// catch it

async function handler(req, res) {
    const { access_token } = req.query.code

    console.log('access_token', access_token)

    return access_token
    const clientID = process.env.ETSY_API_KEY
    // An Etsy access token includes your shop/user ID
    // as a token prefix, so we can extract that too
    const user_id = access_token.split('.')[0]

    const requestOptions = {
        headers: {
            'x-api-key': clientID,
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
        res.status(200).json({
            first_name: userData.first_name,
        })
    } else {
        res.status(500).json({ message: 'Error RETRIEVING token data' })
    }
}

export default handler
