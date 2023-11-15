async function handler(req, res) {
    const { access_token } = req.query
    console.log('we hit it')

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
