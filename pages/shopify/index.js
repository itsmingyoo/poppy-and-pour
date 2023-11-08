import GetShopifyProducts from "../../components/shopify";
import { getAllProducts } from "../../lib/shopify";
import { useEffect, useState } from "react"; // Import React hooks

function ShopifyProducts({ products }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products) {
      setLoading(false);
    }
  }, [products]);

  if (loading) return <p>Loading...</p>;

  return <GetShopifyProducts products={products} />;
}

export async function getServerSideProps(context) {
  const allProducts = await getAllProducts();
  console.log("REGENERATING PAGE...");

  return {
    props: {
      products: allProducts,
    },
  };
}

export default ShopifyProducts;
