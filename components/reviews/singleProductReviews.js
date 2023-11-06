import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";
import Button from "../button/button";

function SingleProductReviews({ reviews }) {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user.userId;

  async function deleteHandler(reviewId) {
    // e.preventDefault();
    // getSession requires async/await
    const session = await getSession();
    const productId = Number(router.query.productId);
    const userId = session?.user.userId;

    let res = await fetch("/api/reviews", {
      method: "DELETE",
      body: JSON.stringify({ reviewId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("res fetch results", res);

    let deletedReview = await res.json();

    console.log("res.json()", deletedReview);

    if (!res.ok) {
      throw new Error("Something went wrong attempting to delete a review!");
    }

    router.push(`/products/${productId}`);
  }

  return (
    <>
      <h2>REVIEWS</h2>
      {reviews.map((review) => (
        <div key={review.id}>
          <p>{review.review}</p>
          <p>RATING: {review.rating}</p>
          {session && review.userId === userId && (
            <button
              // delete={"Delete Review"}
              // type="submit"
              onClick={() => deleteHandler(review.id)}
            >
              Delete Review
            </button>
          )}
        </div>
      ))}
    </>
  );
}

export default SingleProductReviews;
