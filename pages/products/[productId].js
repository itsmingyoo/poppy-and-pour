import { getProductDetails } from "../api/products/[productId]";
import { getReviewsForSingleProduct } from "../../pages/api/reviews/[productId]";
import { getAllProducts } from "../api/products";
import SingleProductReviews from "@/components/reviews/singleProductReviews";
import NewReviewForm from "@/components/reviews/NewReview";

function ProductDetails(props) {
  const { productDetails, reviews } = props;

  return (
    <>
      <h2>PRODUCT DETAILS FOR {productDetails.productName} </h2>
      {/* only render review component when prop data has been fully pre-rendered */}
      {productDetails && reviews && <SingleProductReviews reviews={reviews} />}
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
