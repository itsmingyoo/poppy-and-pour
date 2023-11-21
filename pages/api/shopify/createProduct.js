
// https://poppy-and-pour.myshopify.com/admin/api/2023-10/graphql.json
// const {getAllProducts2} = require('../../../lib/shopify)
import { getAllProducts2 } from "@/lib/shopify";

async function handler (req, res) {


        const response = await getAllProducts2()
        if(response.ok) {
            const data = await response.json()
            return res.status(201).json(data)
        } else {
            console.log(response)
            return res.status(500).json(response)
        }



}



export default handler;
