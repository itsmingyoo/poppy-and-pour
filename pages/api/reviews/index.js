import { prisma } from "../../../server/db/client";

async function handler(req, res) {
  switch (req.method) {
    case "POST":
      const body = req.body;
      const newReview = await createReview(body);

      if (!newReview)
        return res.status(500).json({ message: "Error creating review" });
      console.log("Success");
      res.status(200).json(newReview);

      break;

    default:
      break;
  }
}

export async function createReview(body) {
  try {
    let { review, rating, productId } = body;
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    const newReview = await prisma.review.create({
      data: {
        review,
        rating,
        userId: user.id,
        productId,
      },
    });
    return newReview;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

export default handler;
