async function handler(req, res) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'x-api-key': process.env.ETSY_API_KEY,
        },
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }

    const response = await fetch(
        'https://api.etsy.com/v3/application/openapi-ping',
        requestOptions
    )

    if (response.ok) {
        const data = await response.json()
        console.log("DATA IN BACKEND FOR ETSY API PING --> ", data)
        return res.status(200).json(data)
    } else {
        return res.status(500).json({ message: 'Error pinging Etsy' })
    }
}

export default handler
