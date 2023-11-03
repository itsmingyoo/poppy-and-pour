import { prisma } from "../../../server/db/client";

async function handler(req, res) {
  console.log("aaaaaaaaaaaaaaaaa", req.method === 'GET');
  const products = await getCategoryProducts(req.query.category);

  if (!products) {
    return res
      .status(500)
      .json({ message: "No products in this category were found" });
  }

  // console.log("this is products in the backend handler", products);

  res.status(200).json(products);
}

export async function getCategoryProducts(category) {
  try {
    const products = await prisma.product.findMany({
      where: {
        category: category,
      },
    });
    // console.log("this is products in be", products);
    return products;
  } catch (e) {
    console.error(e);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

export default handler;
