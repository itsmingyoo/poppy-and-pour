// pages/api/shopify-proxy.js
import axios from "axios";

export default async (req, res) => {
  try {
    const shopifyResponse = await axios.get(
      "https://poppy-and-pour.myshopify.com"
    );

    // Send the Shopify API response as is to the client
    res.status(200).json(shopifyResponse.data);
  } catch (error) {
    console.error("Shopify API request failed:", error);
    res.status(500).json({ error: "Shopify API request failed" });
  }
};
