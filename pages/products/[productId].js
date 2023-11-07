import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getProductDetails } from "../api/products/[productId]";
import { getReviewsForSingleProduct } from "../../pages/api/reviews/[productId]";
import { getAllProducts } from "../api/products";
import SingleProductReviews from "@/components/reviews/singleProductReviews";
import NewReview from "@/components/reviews/NewReview";
import { useSession } from "next-auth/react";
import { render } from "react-dom";

function ProductDetails(props) {
  const { productDetails } = props;
  const initialReviews = props.reviews;
  const [reviews, setReviews] = useState(initialReviews);

  const { data: session } = useSession();

  const updateReviews = (newReview) => {
    setReviews([...reviews, newReview]);
  };

  // useEffect(() => {
  //   if (reviews) {
  //     updateReviews(productDetails);
  //   }
  // }, [reviews]);

  // async function updateReviews(productDetails) {
  //   const productId = productDetails.id;
  //   const updatedReviews = await getReviewsForSingleProduct(productId);
  //   // Set the updated reviews to trigger a re-render
  //   setRenderUpdatedReviews(updatedReviews);
  // }

  return (
    <>
      <div>product details</div>
      {/* <h2>PRODUCT DETAILS FOR {productDetails.productName} </h2> */}
      {/* only render review component when prop data has been fully pre-rendered */}
      {productDetails && reviews && (
        <SingleProductReviews reviews={initialReviews} />
      )}
      {session && <NewReview updateReviews={updateReviews} />}
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
