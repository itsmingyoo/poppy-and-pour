const endpoint = process.env.SHOPIFY_STORE_DOMAIN;
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

// !! METHOD 2 shopifyFetch
async function shopifyFetch({ query }) {
  // options object
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

  // fetch
  try {
    const data = await fetch(endpoint, options).then((response) => {
      return response.json();
    });

    return data;
  } catch (error) {
    throw new Error("Products not fetched");
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
      }`,
  });
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
