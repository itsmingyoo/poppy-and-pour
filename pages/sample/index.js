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



  async function createProduct() {
    const response = await fetch('/api/shopify/createProduct')

    const data = await response.json()

    console.log("SHOPIFY return!!!!!!!!!!!!!!!!!!!", data)
  }





  return  (
  <>

  <button onClick={createProduct}>create product</button>
  <GetShopifyProducts products={products} />;
  </>

  )
}

export async function getServerSideProps(context) {
  const response= await getAllProducts();
  const  allProducts = await response.json()
  console.log("REGENERATING PAGE...");

  return {
    props: {
      products: allProducts,
    },
  };
}

export default ShopifyProducts;
