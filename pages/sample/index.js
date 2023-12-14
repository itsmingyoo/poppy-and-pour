import GetShopifyProducts from '../../components/shopify'
import { getAllProducts } from '../../lib/shopify'
import { useEffect, useState } from 'react' // Import React hooks
import Link from 'next/link'

function ShopifyProducts({ products }) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (products) {
            setLoading(false)
        }
    }, [products])

    if (loading) return <p>Loading...</p>

    async function createProduct() {
        const response = await fetch('/api/shopify/createProduct')

        const data = await response.json()

        console.log('SHOPIFY return!!!!!!!!!!!!!!!!!!!', data)
    }

    return (
        <>
            <button onClick={createProduct}>create product</button>
            <Link
                href={`https://poppy-and-pour.myshopify.com/admin/oauth/authorize?client_id=${process.env.SHOPIFY_CLIENT_ID}&scope=write_products&redirect_uri=http://localhost:3000/api/shopify/redirect&state=${process.env.NONCE}`}
            >
                LINK REDIRECT
            </Link>
            <GetShopifyProducts products={products} />;
        </>
    )
}

export async function getServerSideProps(context) {
    const response = await getAllProducts()
    const allProducts = await response.json()
    console.log('REGENERATING SHOPIFY PRODUCTS...')

    return {
        props: {
            products: allProducts,
        },
    }
}

export default ShopifyProducts
