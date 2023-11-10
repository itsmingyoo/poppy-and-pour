import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { getAllProducts } from './api/products'
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import Link from 'next/link'
import { getUserSession } from '@/lib/auth'
import { useEffect } from 'react'

function HomePage(props) {
    const { products } = props
    const router = useRouter()
    function handleCategory(category) {
        router.push(`/categories/${category}`)
    }
    // console.log(products);
    return (
        <div className="container mx-auto">
            <h1 className="text-4xl mb-4 text-center">THE HOME PAGE</h1>
            <Link href="/shopify"> SAMPLE PRODUCTS </Link>
            <br />
            <Link href="/api/auth/signin"> SIGNIN WITH GOOGLE </Link>
            <br />

            <div className="mx-auto w-3/5">
                <Carousel autoPlay={true} animation="slide">
                    {products.map((product) => (
                        <Item key={product.id} product={product} />
                    ))}
                </Carousel>
            </div>

            <div className="flex flex-col mt-8">
                <div className=" flex justify-between items-center justify-center">
                    <img
                        src="https://i.imgur.com/sPlvrEo.png"
                        alt="Cups"
                        onClick={() => handleCategory('Cups')}
                        className="h-96 w-3/5"
                    />
                    <h2 className="text-2xl">Cups</h2>
                </div>

                <div className=" flex justify-between items-center justify-center">
                    <h2 className="text-2xl">Plates</h2>
                    <img
                        src="https://i.imgur.com/sk8geRz.png"
                        alt="Plates"
                        onClick={() => handleCategory('Plates')}
                        className="h-96 w-3/5"
                    />
                </div>

                <div className=" flex justify-between items-center justify-center">
                    <img
                        src="https://i.imgur.com/7LkNLex.png"
                        alt="Mugs"
                        onClick={() => handleCategory('Mugs')}
                        className="h-96 w-3/5"
                    />
                    <h2 className="text-2xl">Mugs</h2>
                </div>

                <div className=" flex justify-between items-center justify-center">
                    <h2 className="text-2xl">Bowls</h2>
                    <img
                        src="https://i.imgur.com/h84lOXL.png"
                        alt="Bowls"
                        onClick={() => handleCategory('Bowls')}
                        className="h-96 w-3/5"
                    />
                </div>
            </div>
        </div>
    )
}

function Item({ product }) {
    // console.log("product", product.photos[0].url);
    return (
        <Paper>
            <img src="#" alt={product.name} className="h-96 w-full" />
            <h2>{product.name}</h2>
        </Paper>
    )
}

export async function getStaticProps(context) {
    const allProducts = await getAllProducts()

    return {
        props: {
            products: allProducts,
        },
        revalidate: 5,
    }
}

export default HomePage
