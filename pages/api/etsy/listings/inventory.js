// !! THIS ROUTE IS 'USELESS'

import { fetchDBToken } from '../../oauth/welcome'

async function handler(req, res) {
    const token = await fetchDBToken()
    const access_token = token.accessToken

    const requestOptions = {
        method: 'GET',
        headers: {
            'x-api-key': process.env.ETSY_API_KEY,
            // !!! Scoped endpoints require a bearer token !!!
            Authorization: `Bearer ${access_token}`,
        },
    }

    // INVENTORY API ROUTE
    const getInventory =
        'https://openapi.etsy.com/v3/application/listings/1610960877/inventory'

    // OTHER TEST ROUTES
    const PID = 18774652071
    const getProductInfo = `https://openapi.etsy.com/v3/application/listings/1610960877/inventory/products/18774652071`
    const getListingImage = `https://openapi.etsy.com/v3/application/listings/1610960877/images`
    /**
     * listing_image_id // returns image id
     * url_fullxfull // returns image link
     */

    const resp = await fetch(getInventory, requestOptions)

    if (!resp.ok) {
        const stream = resp.body
        const reader = stream.getReader()
        const chunks = []
        while (true) {
            const { done, value } = await reader.read()
            if (done) {
                break
            }
            chunks.push(value)
        }
        const jsonString = chunks.join('')
        // Convert the comma-separated integers to an array of numbers
        const numbers = jsonString.split(',').map(Number)
        // Convert the array of numbers to a string
        const jsonStringFromNumbers = String.fromCharCode(...numbers)
        // Parse the string as JSON
        const jsonResponse = JSON.parse(jsonStringFromNumbers)

        console.log('\nWE FAILED BECAUSE... ', jsonResponse.error)
        console.log(
            '---------------------------------------------------------------------------'
        )
        console.log(
            'Failed to find test-item-1',
            resp.status,
            resp.statusText,
            resp.body
        )
        console.log(
            '---------------------------------------------------------------------------'
        )
        res.status(500).json('Failed to find test-item-1')
    } else {
        const inventory = await resp.json()
        console.log('INVENTORY', inventory)
        res.status(200).json(inventory)
    }
}

export default handler
