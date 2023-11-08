import { useEffect, useState } from "react"; // Import React hooks
import { getAllProducts } from "../../pages/api/shopify/index";

function GetShopifyProducts({ products }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log("this is products result", products);

  // useEffect(() => {
  //   if (products) {
  //     setLoading(false);
  //   }
  // }, [products]);

  // if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Shopify Products</h2>
      {error && <p>Error: {error}</p>}
      <ul>
        {products &&
          products.map((product) => (
            <li key={product.node.id}>
              <h3>{product.node.title}</h3>
              <p>{product.node.description}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}

export async function getStaticProps(context) {
  const allProducts = await getAllProducts();
  console.log("REGENERATING PAGE...");

  return {
    props: {
      products: allProducts,
    },
    revalidate: 1,
  };
}

export default GetShopifyProducts;
