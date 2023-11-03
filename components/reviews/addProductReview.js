import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

async function createReview(props) {
    const { review, rating } = props;

    const { data: session } = useSession();
    console.log("hello", session);
    // session = {user: {email: email}}
    // query for session email for user
    // grab user id

    //   const userId = await

    const res = await fetch("/api/reviews", {
      method: "POST",
      body: JSON.stringify({ review, rating, userId, productId }),
      headers: {
        "Content-Type": "application/json",
      },
    });


    const data = await res.json();
    if (!res.ok) {
      throw new Error(
        data.message || "Something went wrong attempting to register user!"
      );
    }
    return data;
  }

function NewReviewForm() {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({});

  async function submitHandler(e) {
    e.preventDefault();

    // const errorObj = {};
    // if (!review) errorObj.review = "Review needs text";
    // if (!review.length > 100)
    //   errorObj.review = "Review must be less than 100 characters long";
    // if (rating === 0) errorObj.rating = "Rating must be between 1 and 5";

    // if (Object.keys(errorObj).length > 0) {
    //   setErrors(errorObj);
    //   return;
    // }

    const res = await createReview(review, rating);
    console.log("yoyo", res);
  }

  return (
    <>
      <div>
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="review">Review</label>

            <textarea
              id="review"
              type="text"
              name="review"
              rows="5"
              cols="25"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review here"
            ></textarea>

            <label htmlFor="rating" for="rating">
              Rating
            </label>

            <input
              id="rating"
              type="number"
              name="rating"
              min="0"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            ></input>
            <div>
              <button type="submit">Submit Review</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewReviewForm;
