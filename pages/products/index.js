import { useState } from "react"
import { getAllProducts } from "../api/products"
import { useRouter } from 'next/router'
import { Typography, CardActionArea } from "@mui/material"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid'
import Item from '@mui/material/Grid'

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
    //     console.log("PRODUCTS RECEIVED ON FRONTEND ", produ-cts)
    // }

    async function handleSubmit(e) {
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

        if (productData.id) router.push(`/products/${productData.id}`)

    }

    async function handleDelete(id) {

        const deleteRes = await fetch(
            "/api/products", {
            method: "DELETE",
            body: JSON.stringify({ id: id }),
            headers: { 'Content-Type': 'application/json' }
        })

        const deleteMessage = await deleteRes.json()
        console.log(deleteMessage.message)
        if (deleteMessage.message === "product was deleted") router.push('/products')
        else alert("There was an error deleting this product, please try again later :(")
    }


    //     <div key={product.id}>

    //     <Typography variant="h3">
    //     {product.productName}
    //     </Typography>
    //     <Typography>
    //     {product.price}
    //     </Typography>

    //     <button onClick={() => router.push(`/products/${product.id}`)}>CLICK FOR DETAILS</button>

    //     <button onClick={() =>{handleDelete(product.id)}}> delete</button>
    // </div>




    return (
        <>
            <Typography variant="h1" component="p" color="primary">PRODUCTS PAGE</Typography>
            <div class="p-10">


            <Grid container
  spacing={10}

  alignItems="center"
  justify="center"
  >
                {products.map((product) => {
                    return (



                        <Grid  item xs={12} sm={6} md={4}  >


                            <Item  >



                                <Card key={product.id} >
                                    <CardActionArea onClick={() => router.push(`/products/${product.id}`)}>

                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image="https://images.saymedia-content.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTk2NzY3MjA5ODc0MjY5ODI2/top-10-cutest-cat-photos-of-all-time.jpg"
                                            // {product.url}
                                            alt="green iguana"
                                        />
                                        <CardContent >
                                            <Typography gutterBottom variant="h5" component="div">
                                                {product.productName}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                ${product.price}.00
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>

                            </Item>
                        </Grid>




















                    )
                })}
            </Grid>
            </div>
            {/* <button onClick={getAllProducts}>GET ALL PRODUCTS</button> */}
            <button onClick={() => { setFormVis(!formVis) }}>{!formVis ? 'NEW PRODUCT' : 'CANCEL'}</button>
            {formVis && <form onSubmit={handleSubmit}>
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
        revalidate: 5
        // if a minute has passed and a new request came in, regenerate this page to get the latest data
    }
}

// export async function getServerSideProps(context) {
//     const allProducts = await getAllProducts()
//     console.log("GRABBING LATEST DATA FROM BACKEND...")

//     return {
//                 props: {
//                     products: allProducts
//                 }
//             }

// }




export default Products
