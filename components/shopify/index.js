import { useState } from "react"; // Import React hooks

function GetShopifyProducts({ products }) {
  console.log("PRODUCTS RESULT FROM GRAPHQL QUERY --->", products);
  const allProducts = products.data.products.edges;

  return (
    <div>
      <h2>Shopify Products</h2>
      {/* {error && <p>Error: {error}</p>} */}
      <ul>
        {allProducts?.length > 0 ? (
          allProducts.map((product) => (
            <li key={product.node.id}>
              <h3>Title: {product.node.title}</h3>
              <p>Description: {product.node.description}</p>
              <p>Price: {product.node.variants.edges[0].node.price.amount}</p>
            </li>
          ))
        ) : (
          <p>Unable to display product information...</p>
        )}
      </ul>
    </div>
  );
}

export default GetShopifyProducts;
