// /api/reviews/[productId]
import { prisma } from "../../../server/db/client";

async function handler(req, res) {
  const productId = req.query.productId;
  const reviews = await getReviewsForSingleProduct(productId);

  if (reviews === null)
    return res
      .status(500)
      .json({ message: "Error While Retreving Review Data" });
  console.log("REVIEW DATA ----> ", reviews);
  return res.status(200).json(reviews);
}

export async function getReviewsForSingleProduct(productId) {
  try {
    const reviews = await prisma.review.findMany({
      where: { productId: Number(productId) },
    });
    const userWhoReviewed = await prisma.user.findFirst({
      where: {id: reviews.userId}
    })

    reviews.forEach((review) => {
      review.userFirstName = userWhoReviewed.firstName
      review.userLastName = userWhoReviewed.lastName
    })
    return reviews;
  } catch (e) {
    console.error(e);
    throw e; // Re-throw the error to handle it in the calling code
  } finally {
    await prisma.$disconnect();
  }
}

export default handler;
