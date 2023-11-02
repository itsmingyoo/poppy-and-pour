import { useRouter } from "next/router";
import { getProductDetails } from "../api/products/[productId]";
import { getAllProducts } from "../api/products";

function ProductDetails(props) {
  // const router = useRouter();
  // const productId = router.query.productId;
  // fetch(`/api/products/${productId}`)
  //   .then((res) => res.json)
  //   .then((data) => console.log("This is the product details", data));

  const { productDetails } = props;
  console.log(productDetails);
  return (
    <>
      <h2>PRODUCT DETAILS</h2>
    </>
  );
}

export async function getStaticProps(context) {
  // const router = useRouter();
  // const productId = router.query.productId;
  const productId = context.params.productId;
  const product = await getProductDetails(productId);
  return {
    props: { productDetails: product },
  };
}

export async function getStaticPaths(context) {
  const allProducts = await getAllProducts();

  const paths = allProducts.map((product) => ({
    params: { productId: product.id.toString() },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}

export default ProductDetails;
