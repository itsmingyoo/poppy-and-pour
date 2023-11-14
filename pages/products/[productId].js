import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getProductDetails } from '../api/products/[productId]'
import { getReviewsForSingleProduct } from '../../pages/api/reviews/[productId]'
import { getAllProducts } from '../api/products'
import SingleProductReviews from '@/components/reviews/singleProductReviews'
import NewReview from '@/components/reviews/NewReview'
import { useSession } from 'next-auth/react'
import { render } from 'react-dom'
import EditProductForm from '@/components/products/EditProductForm'
import { BasicRatingReadOnly } from '@/components/rating/rating'

import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import VerticalButtons from '@/components/ui/VerticalButtons'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import EtsyReviewStack from '@/components/ui/EtsyReviewStack'


function ProductDetails(props) {
    const { productDetails } = props
    const initialReviews = props.reviews
    const [reviews, setReviews] = useState(initialReviews)
    const [loading, setLoading] = useState(true)

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const { data: session } = useSession()

    const updateReviews = (newReview) => {
        setReviews([...reviews, newReview])
    }

    const handleImageChange = (index) => {
        setCurrentImageIndex(index);
    };

    // if you want to avoid adding '?'s in the jsx return
    useEffect(() => {
        if (productDetails && initialReviews) {
            setLoading(false)
        }
    }, [productDetails, initialReviews])

    if (loading) return <p>Loading...</p>

    return (
        <div>
            <div className="flex w-full h-full mt-5">
                <div className="flex w-1/2">
                    <Container maxWidth="false">
                        <div className='max-h-96 min-h-96 max-h-96 flex-1 flex'>
                            <VerticalButtons currentImageIndex={currentImageIndex} onChange={handleImageChange} productDetails={productDetails} />
                            <img src={productDetails.photos[currentImageIndex].url} className='w-full h-full max-w-lg max-h-80 object-fill border border-black border-1' />
                        </div>
                        <Stack maxWidth="sm" spacing={2} direction="column" sx={{ marginTop: "12px", minWidth: '384px'}}>
                            <Button variant="contained" sx={{ border: '1px solid black'}}>Materials</Button>
                            <Button variant="contained" sx={{ border: '1px solid black'}}>Dimensions</Button>
                            <Button variant="contained" sx={{ border: '1px solid black'}}>Care Information</Button>
                        </Stack>
                    </Container>
                </div>
                <div class="flex w-1/2 justify-center">
                    <div className='flex flex-col items-center flex-1 h-full justify-between'>
                        <h2 className="text-3xl">{productDetails.productName}</h2>
                        <h2 className="text-3xl">${productDetails.price}</h2>
                        <h2 className="text-3xl">Rating</h2>
                        <h2 className="text-3xl">{productDetails.description}</h2>
                        <h2 className="text-3xl">{productDetails.color}</h2>
                        <h2 className="text-3xl">Quantity</h2>
                        <Button variant="contained" sx={{height: "8%", width: '40%', border: '1px solid black'}}>Add To Cart</Button>
                    </div>
                </div>
            </div>

            {/* Reviews Heading */}
            <div className='flex items-center mt-12 mb-6'>
                <h2 className='text-center text-4xl mr-5'>Reviews</h2>
                <BasicRatingReadOnly />
            </div>

            {/* Review Mapping */}
            <div className='flex w-full h-full'>
                <div className='flex flex-col flex-1'>
                    {productDetails && reviews && (
                        <SingleProductReviews reviews={initialReviews} />
                    )}
                </div>
                <div className='flex flex-1 h-full justify-center'>
                    <EtsyReviewStack />
                </div>
            </div>

            {/* <img src={productDetails.photos[0].url}></img>
            {productDetails && reviews && (
                <SingleProductReviews reviews={initialReviews} />
            )}
            {session && <NewReview updateReviews={updateReviews} />}
            {session && (
                <EditProductForm
                    productId={productDetails.id}
                    currentProductDetails={productDetails}
                />
            )}
            <BasicRating /> */}
        </div>
    )
}

// This is to use updateReviews props for <NewReview /> component
// export async function getServerSideProps(context) {
//   const productId = context.params.productId;
//   const product = await getProductDetails(productId);
//   const reviews = await getReviewsForSingleProduct(productId);
//   return {
//     props: {
//       productDetails: product,
//       reviews,
//     },
//   };
// }

export async function getStaticProps(context) {
    const productId = context.params.productId
    const product = await getProductDetails(productId)
    const allReviews = await getReviewsForSingleProduct(productId)
    console.log('GRABBING LATEST DATA FROM BACKEND...')
    // find user here to pass into component as props to recognize whether review belongs to user

    return {
        props: {
            productDetails: product,
            reviews: allReviews,
        },
        revalidate: 1,
    }
}
// product id is rendering old information until refresh within the props due to get static props
// to update this, we can use server side or have a usestate to update the reviews value everytime we post a new review

export async function getStaticPaths(context) {
    const allProducts = await getAllProducts()

    const paths = allProducts.map((product) => ({
        params: { productId: product.id.toString() },
    }))

    return {
        paths: paths,
        fallback: true,
    }
}

export default ProductDetails
