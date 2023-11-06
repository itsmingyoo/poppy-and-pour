import { prisma } from "../../../server/db/client";
import { findUserByEmail } from "../auth/findUser";

async function handler(req, res) {
  switch (req.method) {
    case "POST":
      const body = req.body;

      const newReview = await createReview(body);

      if (!newReview)
        return res.status(500).json({ message: "Error creating review" });

      res.status(200).json(newReview);

      break;
    case "PUT":
      const adsfaa = await deleteReview(reviewId);
      console.log("is this the same thing", reviewId);

      if (deletedReview !== null) {
        console.log("Successfully deleted review!");
        res.status(200).json({ message: "Review deleted successfully" });
      } else {
        console.log("Error deleting review");
        res.status(500).json({ message: "Error deleting review" });
      }

      break;
    case "DELETE":
      // const userId = req.body.userId;
      // const productId = req.body.productId;
      const reviewId = req.body.reviewId;
      console.log("this is the real reviewid for delete", reviewId);
      const deletedReview = await deleteReview(reviewId);

      if (deletedReview !== null) {
        console.log("Successfully deleted review!");
        res.status(200).json({ message: "Review deleted successfully" });
      } else {
        console.log("Error deleting review");
        res.status(500).json({ message: "Error deleting review" });
      }
      break;

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

export async function deleteReview(reviewId) {
  try {
    console.log("this is the reviewid", reviewId);
    const review = await prisma.review.delete({
      where: {
        id: reviewId,
      },
    });
    console.log("delete successful", review);
    return "Review deleted successfully";
  } catch (e) {
    console.error(e);
    return "Error deleting review";
  } finally {
    await prisma.$disconnect();
  }
}

export default handler;
