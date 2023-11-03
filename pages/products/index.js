import { getAllProducts } from "../api/products"
import { useRouter } from 'next/router'

function Products(props) {
    const {products} = props
    const router = useRouter()

    // async function getAllProducts() {
    //     const response = await fetch('/api/products/')
    //     const products = await response.json()
    //     console.log("PRODUCTS RECEIVED ON FRONTEND ", products)
    // }

    return (
        <>
            <h1>PRODUCTS PAGE</h1>
            {products.map((product) => {
                return (
                <div key={product.id}>
                    <h3>{product.productName}</h3>
                    <p>{product.price}</p>
                    <button onClick={() => router.push(`/products/${product.id}`)}>CLICK FOR DETAILS</button>
                </div>
                )
            })}
            {/* <button onClick={getAllProducts}>GET ALL PRODUCTS</button> */}
        </>
    )
}


export async function getStaticProps(context) {
    const allProducts = await getAllProducts()

    return {
        props: {
            products: allProducts
        },
        revalidate: 60
        // if a minute has passed and a new request came in, regenerate this page to get the latest data
    }
}




export default Products
