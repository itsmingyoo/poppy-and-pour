
const shopifyAPI = require('shopify-node-api')
import {config} from "../../../lib/shopifyConfig"

async function handler(req, res) {

    const shopify = new shopifyAPI(config)

    var post_data = {
        "product": {
          "title": "test product 1",
          "body_html": "<strong>Good snowboard!</strong>",
          "vendor": "Poppy and Pour",
          "product_type": "Snowboard",
          "variants": [
            {
              "option1": "First",
              "price": "10.00",
              "sku": 123
            },
            {
              "option1": "Second",
              "price": "20.00",
              "sku": "123"
            }
          ]
        }
      }



          shopify.post('/admin/products.json', post_data, function(err, data, headers) {
            if(err){

                console.log("error message ", err)
            } else {

                console.log("data message", data)
            }
          });



 return res.status(200).json(null)
}

export default handler
