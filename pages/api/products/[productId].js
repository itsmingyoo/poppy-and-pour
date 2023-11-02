import { prisma } from "../../../server/db/client";

async function handler(req, res) {
  const productId = req.query.productId;
  const product = await getProductDetails(productId);

  if (!product)
    return res.status(500).json({ message: "Error retrieving product" });

  console.log("this is product in the backend handler", product);

  res.status(200).json(product); // this returns the product and status
}

export async function getProductDetails(productId) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(productId),
      },
    });
    console.log("this is the product in the helper fn", product);
    return product;
  } catch (e) {
    console.error(e);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

export default handler;
