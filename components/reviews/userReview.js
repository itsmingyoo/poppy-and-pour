import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

function UserReview(props) {
  const { review } = props;
  const { data: session } = useSession();
  const userId = session?.user.userId;

  const router = useRouter();

  async function deleteHandler(reviewId) {
    const productId = Number(router.query.productId);

    let res = await fetch("/api/reviews", {
      method: "DELETE",
      body: JSON.stringify({ reviewId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let deletedReview = await res.json();

    if (!res.ok) {
      throw new Error("Something went wrong attempting to delete a review!");
    }

    router.push(`/products/${productId}`);
  }

  async function editHandler(reviewId) {
    const productId = Number(router.query.productId);

    let res = await fetch("/api/reviews", {
      method: "PUT",
      body: JSON.stringify({ reviewId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let editedReview = await res.json();

    if (!res.ok) {
      throw new Error("Something went wrong attempting to edit the review!");
    }

    router.push(`/products/${productId}`);
  }

  return (
    <>
      <div key={review.id}>
        <p>{review.review}</p>
        <p>RATING: {review.rating}</p>
        {session && review.userId === userId && (
          <>
            <button onClick={() => editHandler(review.id)}>Edit Review</button>
            <button onClick={() => deleteHandler(review.id)}>
              Delete Review
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default UserReview;
