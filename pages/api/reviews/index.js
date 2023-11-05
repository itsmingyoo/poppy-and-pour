import { prisma } from "../../../server/db/client";
import { findUserByEmail } from "../auth/findUser";

async function handler(req, res) {
  switch (req.method) {
    case "POST":
      const body = req.body;

      console.log("req.body in handler", body);

      const newReview = await createReview(body);

      console.log("newReview", newReview);

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
    let { review, rating, email, productId } = body;

    const user = await findUserByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    console.log("this is user in the query", user);

    const newReview = await prisma.review.create({
      data: {
        review,
        rating,
        userId: 5,
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
