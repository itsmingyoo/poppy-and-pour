import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getProductDetails } from "../api/products/[productId]";
import { getReviewsForSingleProduct } from "../../pages/api/reviews/[productId]";
import { getAllProducts } from "../api/products";
import SingleProductReviews from "@/components/reviews/singleProductReviews";
import NewReviewForm from "@/components/reviews/NewReview";

function ProductDetails(props) {
  const { productDetails, reviews } = props;
  console.log(reviews, "lwakjefljawlkjefklawje");
  const [renderUpdatedReviews, setRenderUpdatedReviews] = useState(reviews);

  useEffect(() => {
    const updateReviews = async (productDetails) => {
      const productId = productDetails.id;
      const updatedReviews = await getReviewsForSingleProduct(productId);
      setRenderUpdatedReviews(updatedReviews);
    };

    // Call the function to execute it
    updateReviews(productDetails);

    // Log any data or information you need after the function call
    console.log("Updated Reviews after UE", renderUpdatedReviews);
  }, [reviews]);

  return (
    <>
      <h2>PRODUCT DETAILS FOR {productDetails.productName} </h2>
      {/* only render review component when prop data has been fully pre-rendered */}
      {productDetails && reviews && (
        <SingleProductReviews reviews={renderUpdatedReviews} />
      )}
      <NewReviewForm />
    </>
  );
}

export async function getStaticProps(context) {
  const productId = context.params.productId;
  const product = await getProductDetails(productId);
  const allReviews = await getReviewsForSingleProduct(productId);

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
