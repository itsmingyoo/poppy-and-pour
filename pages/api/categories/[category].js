// /api/categories/[category]
import { prisma } from "../../../server/db/client";

async function handler(req, res) {
  const products = await getCategoryProducts(req.query.category);

  console.log("products in handler for category", products);
  if (!products) {
    return res
      .status(500)
      .json({ message: "No products in this category were found" });
  }

  console.log("this is products in the backend handler", products);

  res.status(200).json(products);
}

export async function getCategoryProducts(category) {
  try {
    const products = await prisma.product.findMany({
      where: {
        category: category,
      },
    });
    return products;
  } catch (e) {
    console.error(e);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

export default handler;
