// USE THIS IF YOU NEED TO LOOK AT CLASS METHOD DEFINITIONS:   console.log( shopifyAPI.prototype.is_valid_signature.toString() )
import { prisma } from '../../../server/db/client'
const shopifyAPI = require('shopify-node-api')

async function handler(req, res) {

    // config object for the Shopify class thats needed to grab the initial access token
    const config = {
        shop: 'poppy-and-pour.myshopify.com',
        shopify_api_key: process.env.SHOPIFY_CLIENT_ID,
        shopify_shared_secret: process.env.SHOPIFY_API_SECRET_KEY,
        shopify_scope: 'write_products',
        redirect_uri: 'http://localhost:3000/api/shopify/redirect',
        nonce: process.env.NONCE,
        verbose: false,
    }

    // make the initial Shopify class so that we can generate our perm access token (this class will need to be re-written when sending further requests)
    let shopify = new shopifyAPI(config), // pass in your config object
        // pass in the query used at login
        query_params = req.query


    // if our request Signature is valid, this method should return the access_token (wrote this way to avoid loosing context)
    async function exchangeTemporaryToken(query_params) {
        return new Promise((resolve, reject) => {
            shopify.exchange_temporary_token(
                query_params,
                function (err, data) {
                    if (err) {
                        console.error('Error exchanging temporary token:', err)
                        reject(err)
                    } else {
                        const accessToken = data['access_token']
                        resolve(accessToken)
                    }
                }
            )
        })
    }

    const accessToken = await exchangeTemporaryToken(query_params)
    console.log('Access Token: ', accessToken)

    // store the access_token in the DB so that we can use it for authenticated requests to the Admin API
    try {
        const token = await prisma.shopifyToken.upsert({
            where: {
                id: 1,
            },
            create: {
                accessToken: accessToken,
            },
            update: {
                accessToken: accessToken,
            },
        })
        console.log('THIS IS THE PERM SHOPIFY ACCESS TOKEN --->', token)
        res.status(200).json(token)
    } catch (e) {
        console.log('we failed to generate token', e)
        res.status(500).send('query to generate token failed')
    }
}

export default handler
