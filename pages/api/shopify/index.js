// require("dotenv").config();
// console.log("dotenv loaded");
// console.log(process.env);
export async function shopifyFetch({ query }) {
  const endpoint = process.env.SHOPIFY_STORE_DOMAIN;
  const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  console.log("we are in the shopifyFetch function call");
  console.log("endpoint", endpoint);
  console.log("access token key", key);
  console.log("query", query);
  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "X-Shopify-Storefront-Access-Token": key,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: { query } && JSON.stringify({ query }),
    });

    return {
      status: result.status,
      body: await result.json(),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      status: 500,
      error: "Error receiving data",
    };
  }
}

export async function getAllProducts() {
  console.log("running getAllProducts");
  return shopifyFetch({
    query: `{
        products(sortKey: TITLE, first: 100) {
          edges{
            node {
              id
              title
              description
            }
          }
        }
      }`,
  });
}
