// Etsy API
const ETSY_API_BASE_URL = 'https://api.etsy.com/v3'

export const fetchEtsyData = async (endpoint, params) => {
    const url = new URL(`${ETSY_API_BASE_URL}/${endpoint}`)
    url.searchParams.append('api_key', process.env.ETSY_API_KEY)

    // Append additional params to the URL
    Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
    )

    try {
        const response = await fetch(url.toString())

        if (!response.ok) {
            throw new Error(
                `Error: ${response.status} - ${response.statusText}`
            )
        }

        return await response.json()
    } catch (error) {
        console.error('Error fetching Etsy data:', error)
        throw error
    }
}
