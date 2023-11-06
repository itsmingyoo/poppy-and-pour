import { useState } from "react"
import { getAllProducts } from "../api/products"
import { useRouter } from 'next/router'

function Products(props) {
    const { products } = props
    const router = useRouter()
    const [url, setUrl] = useState();
    const [color, setColor] = useState();
    const [price, setPrice] = useState();
    const [category, setCategory] = useState();
    const [formVis, setFormVis] = useState(false);
    const [description, setDescription] = useState();
    const [productName, setProductName] = useState();

    // async function getAllProducts() {
    //     const response = await fetch('/api/products/')
    //     const products = await response.json()
    //     console.log("PRODUCTS RECEIVED ON FRONTEND ", products)
    // }

    async function handleSumbit(e) {
        e.preventDefault();


        const newProductObj = {
            productName,
            category,
            price: Number(price),
            color,
            description,
            url
        }

        const response = await fetch(
            "/api/products", {
            method: "POST",
            body: JSON.stringify(
                newProductObj,
            ),
            headers: { 'Content-Type': 'application/json' }
        })

        const productData = await response.json()

        if(productData.id)router.push(`/products/${productData.id}`)

    }

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
            <button onClick={() => { setFormVis(!formVis) }}>{!formVis ? 'NEW PRODUCT' : 'CANCEL'}</button>
            {formVis && <form onSubmit={handleSumbit}>
                <input type='string' placeholder='Product Name' value={productName} onChange={(e) => setProductName(e.target.value)} />
                <select value={category} onChange={(e) => setCategory(e.target.value === 'Category' ? null : e.target.value)}>
                    <option value={null}>Category</option>
                    <option value={'Mugs'}>Mugs</option>
                    <option value={'Cups'}>Cups</option>
                    <option value={'Plates'}>Plates</option>
                    <option value={'Bowls'}>Bowls</option>
                </select>
                <span>$</span><input type='number' value={price} onChange={(e) => setPrice(e.target.value)} />
                <select value={color} onChange={(e) => setColor(e.target.value === 'Color' ? null : e.target.value)}>
                    <option value={null}>Color</option>
                    <option value={'Red'}>Red</option>
                    <option value={'Silver'}>Silver</option>
                    <option value={'Blue'}>Blue</option>
                    <option value={'White'}>White</option>
                </select>
                <textarea placeholder='Add description...' value={description} onChange={(e) => setDescription(e.target.value ? e.target.value : null)} />
                <input type='string' placeholder='Add image url....' value={url} onChange={(e) => setUrl(e.target.value)} />
                <button type="submit">Submit</button>
            </form>}
        </>
    )
}


export async function getStaticProps(context) {
    const allProducts = await getAllProducts()
    console.log("GRABBING LATEST DATA FROM BACKEND...")

    return {
        props: {
            products: allProducts
        },
        revalidate: 1
        // if a minute has passed and a new request came in, regenerate this page to get the latest data
    }
}




export default Products
