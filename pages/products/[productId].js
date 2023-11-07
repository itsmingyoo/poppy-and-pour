import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getProductDetails } from "../api/products/[productId]";
import { getReviewsForSingleProduct } from "../../pages/api/reviews/[productId]";
import { getAllProducts } from "../api/products";
import SingleProductReviews from "@/components/reviews/singleProductReviews";
import NewReview from "@/components/reviews/NewReview";
import { useSession } from "next-auth/react";
import { render } from "react-dom";
import EditProductForm from "@/components/products/EditProductForm";

function ProductDetails(props) {
  const { productDetails } = props;
  const initialReviews = props.reviews;
  const [reviews, setReviews] = useState(initialReviews);
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();

  const updateReviews = (newReview) => {
    setReviews([...reviews, newReview]);
  };


  // if you want to avoid adding '?'s in the jsx return
  useEffect(() => {
    if (productDetails && initialReviews) {
      setLoading(false);
    }
  }, [productDetails, initialReviews]);

  if(loading) return <p>Loading...</p>

  return (
    <>
      <div>product details</div>
      <p>{productDetails.productName}</p>
      <p>{productDetails.price}</p>
      <p>{productDetails.description}</p>
      <p>{productDetails.color}</p>
      <img src={productDetails.photos[0].url}></img>
      {productDetails && reviews && (
        <SingleProductReviews reviews={initialReviews} />
      )}
      {session && <NewReview updateReviews={updateReviews} />}
      {session && <EditProductForm productId={productDetails.id} currentProductDetails={productDetails}  />}
    </>
  );
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
  const productId = context.params.productId;
  const product = await getProductDetails(productId);
  const allReviews = await getReviewsForSingleProduct(productId);
  console.log("GRABBING LATEST DATA FROM BACKEND...");
  // find user here to pass into component as props to recognize whether review belongs to user

  return {
    props: {
      productDetails: product,
      reviews: allReviews,
    },
    revalidate: 1,
  };
}
// product id is rendering old information until refresh within the props due to get static props
// to update this, we can use server side or have a usestate to update the reviews value everytime we post a new review

export async function getStaticPaths(context) {
  const allProducts = await getAllProducts();

  const paths = allProducts.map((product) => ({
    params: { productId: product.id.toString() },
  }));

  return {
    paths: paths,
    fallback: true,
  };
}

export default ProductDetails;
