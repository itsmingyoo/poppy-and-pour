import { fetchDBToken } from "../../oauth/welcome"

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

    // // use the userId to get the shopId  <-------- !! ! USE FOR EXPLAINING PURPOSES
    // const fetchStoreId = await fetch(
    //     `https://openapi.etsy.com/v3/application/users/815744532/shops`,
    //     requestOptions
    // )
    // const storeId = await fetchStoreId.json()
    // console.log("STORE OBJECT (INCLUDES STOREID) -----> ", storeId)

    const response = await fetch(
        `https://openapi.etsy.com/v3/application/shops/45618436/listings`,
        requestOptions
    )

        // ADDITIONAL INFO ON WHY THE FETCH FAILED
        //////////////////////////////////////////////////////////////////////////
        if (!response.ok) {
            const stream = response.body;
            const reader = stream.getReader();
            const chunks = [];
            while (true) {
                const { done, value } = await reader.read();
            if (done) {
                break;
            }
            chunks.push(value);
            }
            const jsonString = chunks.join('');
            // Convert the comma-separated integers to an array of numbers
            const numbers = jsonString.split(',').map(Number);
            // Convert the array of numbers to a string
            const jsonStringFromNumbers = String.fromCharCode(...numbers);
            // Parse the string as JSON
            const jsonResponse = JSON.parse(jsonStringFromNumbers);

            console.log("\nWE FAILED BECAUSE... ", jsonResponse.error)
            console.log("---------------------------------------------------------------------------")
            console.log('RESPONSE STATUS CODE', response.status, response.statusText)
            console.log("---------------------------------------------------------------------------")
            res.status(500).json('FAILED')
            //////////////////////////////////////////////////////////////////////////
        } else {
            console.log('RESPONSE', response.status, response.statusText)
            const listings = await response.json()
            console.log('ALL LISTINGS --- ', listings)
            res.status(200).json(listings)
        }
}

export default handler
