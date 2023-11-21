const shopifyAPI = require('shopify-node-api')
require('dotenv').config()
const shopURL = 'poppy-and-pour.myshopify.com'
const scopes =
    'read_all_orders%20read_assigned_fulfillment_orders%20write_assigned_fulfillment_orders%20read_cart_transforms%20write_cart_transforms%20read_checkouts%20write_checkouts%20read_checkout_branding_settings%20write_checkout_branding_settings%20read_content%20write_content%20read_customer_merge%20write_customer_merge%20read_customers%20write_customers%20read_customer_payment_methods%20read_discounts%20write_discounts%20read_draft_orders%20write_draft_orders%20read_files%20write_files%20read_fulfillments%20write_fulfillments%20read_gift_cards%20write_gift_cards%20read_inventory%20write_inventory%20read_legal_policies%20read_locales%20write_locales%20read_locations%20read_markets%20write_markets%20read_metaobject_definitions%20write_metaobject_definitions%20read_metaobjects%20write_metaobjects%20read_marketing_events%20write_marketing_events%20read_merchant_approval_signals%20read_merchant_managed_fulfillment_orders%20write_merchant_managed_fulfillment_orders%20read_orders%20write_orders%20read_payment_mandate%20write_payment_mandate%20read_payment_terms%20write_payment_terms%20read_price_rules%20write_price_rules%20read_products%20write_products%20read_product_listings%20read_publications%20write_publications%20read_purchase_options%20write_purchase_options%20read_reports%20write_reports%20read_resource_feedbacks%20write_resource_feedbacks%20read_script_tags%20write_script_tags%20read_shipping%20write_shipping%20read_shopify_payments_disputes%20read_shopify_payments_payouts%20read_own_subscription_contracts%20write_own_subscription_contracts%20read_returns,%20write_returns%20read_themes%20write_themes%20read_translations%20write_translations%20read_third_party_fulfillment_orders%20write_third_party_fulfillment_orders%20read_users%20read_order_edits%20write_order_edits%20write_payment_gateways%20write_payment_sessions%20write_pixels%20read_customer_events%20'

// PUBLIC
const shopify = new shopifyAPI({
    shop: shopURL, // MYSHOP.myshopify.com
    shopify_api_key: process.env.SHOPIFY_API_KEY, // Your API key
    client_id: process.env.SHOPIFY_API_KEY, // Your API key
    shopify_shared_secret: process.env.SHOPIFY_API_SECRET_KEY, // Your Shared Secret
    shopify_scope: 'write_products',
    redirect_uri: 'http://localhost:3000/api/shopify/redirect',
    nonce: process.env.NONCE, // you must provide a randomly selected value unique for each authorization request
})
// console.log(
//     process.env.SHOPIFY_API_KEY,
//     process.env.SHOPIFY_API_SECRET_KEY,
//     process.env.NONCE
// )
// console.log('\nshopify', shopify)
const auth_url = shopify.buildAuthURL()
console.log(auth_url)
