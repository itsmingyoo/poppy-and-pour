import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { getAllProducts } from './api/products'
import Carousel from 'react-material-ui-carousel'
import { Paper, Button, Typography } from '@mui/material'
import Link from 'next/link'
import { getUserSession } from '@/lib/auth'
import { useEffect } from 'react'


function HomePage(props) {
    const { products } = props
    const router = useRouter()

    function handleCategory(category) {
        router.push(`/categories/${category}`)
    }

    return (
        <div className="container mx-auto">
            <Typography variant='h1' className="text-4xl mb-4 text-center">THE HOME PAGE</Typography>

            <Link href="/sample"> SAMPLE PRODUCTS </Link>
            <br />
            <Link href="/api/auth/signin"> SIGNIN WITH GOOGLE </Link>
            <br />
            <Link href="/etsy-admin"> ETSY ADMIN </Link>

            <div className="mx-auto hompage-slider">
                <Carousel autoPlay={true} animation="slide" >
                    {products.map((product) => (
                        <Item className='homepage-slider-images' key={product.id} product={product} />
                    ))}
                </Carousel>
            </div>

            <div className="flex flex-col mt-8 ">
                <div className=" flex justify-between items-center justify-center text-center mt-16">
                    <img
                        src="https://i.imgur.com/sPlvrEo.png"
                        alt="Cups"
                        onClick={() => handleCategory('Cups')}
                        className="catagory-image w-3/5"
                    />
                    <Typography variant='h3' component="h2" >Cups</Typography>

                    <div></div>
                </div>

                <div className=" flex justify-between items-center justify-center mt-16">
                    <div></div>
                    <Typography variant='h3' component="h2" >Plates</Typography>

                    <img
                        src="https://i.imgur.com/sk8geRz.png"
                        alt="Plates"
                        onClick={() => handleCategory('Plates')}
                        className="catagory-image w-3/5"
                    />
                </div>

                <div className=" flex justify-between items-center justify-center mt-16">
                    <img
                        src="https://i.imgur.com/7LkNLex.png"
                        alt="Mugs"
                        onClick={() => handleCategory('Mugs')}
                        className="catagory-image w-3/5"
                    />
                    <Typography variant='h3' component="h2" >Mugs</Typography>

                    <div></div>
                </div>

                <div className=" flex justify-between items-center justify-center   mt-16">
                    <div></div>
                    <Typography variant='h3' component="h2" >Bowls</Typography>
                   
                    <img
                        src="https://i.imgur.com/h84lOXL.png"
                        alt="Bowls"
                        onClick={() => handleCategory('Bowls')}
                        className="catagory-image w-3/5"
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
