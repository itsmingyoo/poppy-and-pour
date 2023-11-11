import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { BasicRatingReadOnly } from "../rating/rating";

function UserReview(props) {
  const { review } = props;

  const { data: session } = useSession();
  const userId = session?.user.userId;
  const router = useRouter();

  // State to track whether the review is in edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [editedReview, setEditedReview] = useState(review.review); // Store edited review content
  const [editedRating, setEditedRating] = useState(review.rating); // Store edited rating
  //   console.log("this is review", editedReview);
  //   console.log("this is rating", editedRating);

  // button handler functions
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

  async function updateHandler(id) {
    const productId = Number(router.query.productId);

    let res = await fetch("/api/reviews", {
      method: "PUT",
      body: JSON.stringify({
        id,
        review: editedReview,
        rating: editedRating,
      }), // Send the edited review content
      headers: {
        "Content-Type": "application/json",
      },
    });

    let updatedReview = await res.json();

    if (!res.ok) {
      throw new Error("Something went wrong attempting to edit the review!");
    }

    // Exit edit mode after successfully updating the review
    setIsEditing(false);

    router.push(`/products/${productId}`);
  }

  //   async function editHandler(reviewId) {
  //     const productId = Number(router.query.productId);

  //     let res = await fetch("/api/reviews", {
  //       method: "PUT",
  //       body: JSON.stringify({ reviewId }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     let editedReview = await res.json();

  //     if (!res.ok) {
  //       throw new Error("Something went wrong attempting to edit the review!");
  //     }

  //     router.push(`/products/${productId}`);
  //   }

  return (
    <>
      <div key={review.id}>
        {isEditing ? ( // Render the edit form when isEditing is true
          <div>
            <textarea
              value={editedReview}
              onChange={(e) => setEditedReview(e.target.value)}
            />
            <input
              type="number"
              value={editedRating}
              onChange={(e) => setEditedRating(e.target.value)}
              min={0}
              max={5}
            />
            <button onClick={() => updateHandler(review.id)}>
              Save Review
            </button>
          </div>
        ) : (
          // Render review details when isEditing is false
          <>
            <BasicRatingReadOnly rating={editedRating}/>
            <p className="mb-3 mt-2">Reviewed By {review.userFirstName} {review.userLastName}</p>
            <p className="mb-3">{editedReview}</p>
          </>
        )}
        {session && review.userId === userId && (
          <>
            {isEditing ? ( // Hide the "Edit Review" button when editing
              <button onClick={() => setIsEditing(false)}>Cancel Edit</button>
            ) : (
              <button onClick={() => setIsEditing(true)}>Edit Review</button>
            )}
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
