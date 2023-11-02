import { prisma } from '../../../server/db/client'

async function handler(req, res) {
    const products = await getAllProducts()
    console.log("PRODUCTS ----> ", products)
    res.status(200).json(products)
}



export async function getAllProducts() {

    try {
        const products = await prisma.product.findMany();
        return products
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something Went Wrong Retreiving Products' });
        return null
    } finally {
        await prisma.$disconnect();
    }

}


export default handler
