import { getProductDetails } from "../api/products/[productId]";
import { getReviewsForSingleProduct } from '../../pages/api/reviews/[productId]'
import { getAllProducts } from "../api/products";
import SingleProductReviews from "@/components/reviews/singleProductReviews";

function ProductDetails(props) {

  const { productDetails, reviews } = props;
  console.log('Prod Dets',productDetails)
  return (
    <>
      <h2>PRODUCT DETAILS FOR {productDetails.productName} </h2>
      {/* only render review component when prop data has been fully pre-rendered */}
      <img src={productDetails.photos[0].url}></img>
      {productDetails && reviews && (
        <SingleProductReviews reviews={reviews} />
      )}
    </>
  );
}

export async function getStaticProps(context) {
  const productId = context.params.productId
  const product = await getProductDetails(productId);
  const allReviews = await getReviewsForSingleProduct(productId)

  return {
    props: {
      productDetails: product,
      reviews: allReviews,
    },
    revalidate:5
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
