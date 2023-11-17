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

    console.log("ACCESS TOKEN RECEIVED --------> ", access_token)

    const headers = new Headers()
    headers.append('x-api-key', process.env.ETSY_API_KEY)
    headers.append('Authorization', `Bearer ${access_token}`)

    const requestOptions = {
        method: 'GET',
        headers: headers
    }

    try {
        const response = await fetch(
            //!!!!!!!!!!! !!!!!!!!!! !!!!!!!!!!!!!!! !!!!!!!!!!!!!!! !!!!!!!!!!!!!!
            //!!!!!!!!!!! !!!!!!!!!! !!!!!!!!!!!!!!! !!!!!!!!!!!!!!! !!!!!!!!!!!!!!
            //!!!!!!!!!!! !!!!!!!!!! !!!!!!!!!!!!!!! !!!!!!!!!!!!!!! !!!!!!!!!!!!!!
            // !! ! MINH CHECK THIS OUT ------------> https://i.gyazo.com/44ee9684685cbe07357461397165a92d.png
            //!!!!!!!!!!! !!!!!!!!!! !!!!!!!!!!!!!!! !!!!!!!!!!!!!!! !!!!!!!!!!!!!!
            `https://openapi.etsy.com/v3/application/shops/1213166269553/listings`,
            // `https://openapi.etsy.com/v3/application/shops/${process.env.SHOP_ID}/listings/active`,
            // working fetch link
            // 'https://openapi.etsy.com/v3/application/listings/active',
            requestOptions
        )
        console.log('RESPONSE', response.status, response.statusText)

        if (response.ok) {
            console.log('SUCCESS - LISTINGS HERE')
            const listings = await response.json()
            console.log(listings)
            res.status(200).json(listings)
        } else {
            res.status(500).json('FAILED')
        }
    } catch (e) {
        console.log(e)
    }
}

export default handler
