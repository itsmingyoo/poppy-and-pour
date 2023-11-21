// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        isrMemoryCacheSize: 0, // cache size in bytes
    },
    env: {
        SHOPIFY_STOREFRONT_ACCESS_TOKEN:
            process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        SHOPIFY_ADMIN_ACCESS_TOKEN: process.env.SHOPIFY_ADMIN_ACCESS_TOKEN,
        SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
        SHOPIFY_API_SECRET_KEY: process.env.SHOPIFY_API_SECRET_KEY,
        NONCE: process.env.NONCE,
        SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN,
        ETSY_API_KEY: process.env.ETSY_API_KEY,
        CODE_CHALLENGE: process.env.CODE_CHALLENGE,
        STATE: process.env.STATE,
        SHOP_ID: process.env.SHOP_ID,
    },
}

module.exports = nextConfig
