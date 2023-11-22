const shopifyAPI = require('shopify-node-api')
import { config } from '../../../lib/shopifyConfig'

async function handler(req, res) {
    const shopify = new shopifyAPI(config)
    // variants: inventory_management: 'shopify' <--- this value is only 'shopify' or null : if null, item is untracked and you can't use a 'get' route on it.
    var post_data = {
        product: {
            title: 'test product supersize',
            body_html: '<strong>Amazing Product</strong>',
            vendor: 'Poppy and Pour',
            product_type: 'Coaster',
            variants: [
                {
                    option1: 'smol',
                    price: '10.00',
                    sku: 123,
                    inventory_management: 'shopify',
                },
                {
                    option1: 'big',
                    price: '20.00',
                    sku: '123',
                },
            ],
        },
    }

    shopify.post(
        '/admin/products.json',
        post_data,
        function (err, data, headers) {
            if (err) {
                console.log('error message ', err)
            } else {
                console.log('data message', data)
                console.log('data[variants object]', data.product.variants)
            }
        }
    )

    return res.status(200).json(null)
}

export default handler
