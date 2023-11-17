async function handler(req, res) {
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

    const requestOptions = {
        headers: {
            'x-api-key': process.env.ETSY_API_KEY,
            // Scoped endpoints require a bearer token
            Authorization: `Bearer ${access_token}`,
        },
    }
    console.log('seb is gay', access_token)
    try {
        const response = await fetch(
            `https://openapi.etsy.com/v3/application/shops/${process.env.SHOP_ID}/listings/active`,
            // working fetch link
            // 'https://openapi.etsy.com/v3/application/listings/active',
            requestOptions
        )
        console.log('RESPONSE', response)

        if (response.ok) {
            console.log('SUCCESS - LISTINGS HERE')
            const listings = await response.json()
            console.log(listings)
            res.status(200).json(listings)
        }
        res.status(500).json('FAILED')
    } catch (e) {
        console.log(e)
    }
}

export default handler
