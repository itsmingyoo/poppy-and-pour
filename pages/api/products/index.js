// /api/products
import { prisma } from "../../../server/db/client";

async function handler(req, res) {
  const products = await getAllProducts();

  if (!products)
    return res.status(500).json({ message: "Error retrieving products" });

  console.log("PRODUCTS ----> ", products);

  res.status(200).json(products);
}

export async function getAllProducts() {
  try {
    const products = await prisma.product.findMany();
    return products;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

export default handler;
