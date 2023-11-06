import { prisma } from "../../../server/db/client";
import { findUserByEmail } from "../auth/findUser";

async function handler(req, res) {
  switch (req.method) {
    case "POST":
      const body = req.body;
      console.log("this is req", req);
      console.log("this is req.body", req.body);

      const newReview = await createReview(body);

      if (!newReview)
        return res.status(500).json({ message: "Error creating review" });

      res.status(200).json(newReview);

      break;
    case "DELETE":
      console.log("delete review route");

    // await deleteReview(userId)

    default:
      break;
  }
}

export async function createReview(body) {
  try {
    let { review, rating, userId, productId } = body;

    // const user = await findUserByEmail(email); // dont need this anymore because we now have userid from the session object
    // if (!user) {
    //   throw new Error("User not found");
    // }
    // console.log("this is user in the query", user);

    const newReview = await prisma.review.create({
      data: {
        review,
        rating,
        userId,
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

export async function deleteReview(userId) {
  try {
    const review = await prisma.review.delete({
      where: {
        userId,
      },
    });
    console.log("delete successful", review);
    return null;
  } catch (e) {
    console.error(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

export default handler;
