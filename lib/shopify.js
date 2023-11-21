const endpoint = process.env.SHOPIFY_STORE_DOMAIN;
// const apiKey = process.env.
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const adminKey = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

// !! METHOD 2 shopifyFetch
async function shopifyFetch({ query, options }) {

  // fetch
  try {
    const data = await fetch(endpoint, options)

    return data;
  } catch (error) {
    throw new Error("uh oh");
  }
}

export async function getAllProducts() {
  console.log("running getAllProducts");
  // options object
  const query = `{
    products(sortKey: TITLE, first: 100) {
      edges{
        node {
          id
          title
          description
          handle
          variants(first: 1) {
            edges {
              node {
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }`
  const options = {
    endpoint,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": key,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };




  return shopifyFetch({
   query, options
  });
}

// https://poppy-and-pour.myshopify.com/admin/api/2023-10/graphql.json

export async function getAllProducts2() {
  console.log("running getAllProducts");


    const query = `{
      shop {
        name
        primaryDomain {
          url
          host
        }
      }
    }`
  const options = {
    endpoint: "https://poppy-and-pour.myshopify.com/admin/api/2023-10/graphql.json",
    method: "POST",
    headers: {
      "X-Shopify-Access-Token": adminKey,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };

 return shopifyFetch ({
  query, options
 })


}






// !! METHOD 1 shopifyFetch
// ** THIS FETCH RETURNS A BODY KEY WHICH IS ANOTHER KEY YOU HAVE TO KEY INTO
// export async function shopifyFetch({ query }) {
//   try {
//     const result = await fetch(endpoint, {
//       method: "POST",
//       headers: {
//         "X-Shopify-Storefront-Access-Token": key,
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: { query } && JSON.stringify({ query }),
//     });

//     return {
//       status: result.status,
//       body: await result.json(),
//     };
//   } catch (error) {
//     console.error("Error:", error);
//     return {
//       status: 500,
//       error: "Error receiving data",
//     };
//   }
// }
