import { useState } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";

function NewReview(props) {
  const { updateReviews } = props;

  const router = useRouter();

  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({});

  // this method works only in the component
  const { data: session } = useSession();
  // console.log("session11111111111", session);
  // const email = session?.user.email;

  async function submitHandler(e) {
    e.preventDefault();
    // getSession requires async/await
    const session = await getSession();
    const email = await session?.user.email;
    const productId = Number(router.query.productId);

    /*
    // const errorObj = {};
    // if (!review) errorObj.review = "Review needs text";
    // if (!review.length > 100)
    //   errorObj.review = "Review must be less than 100 characters long";
    // if (rating === 0) errorObj.rating = "Rating must be between 1 and 5";

    // if (Object.keys(errorObj).length > 0) {
    //   setErrors(errorObj);
    //   return;
    // }
    */

    let res = await fetch("/api/reviews", {
      method: "POST",
      body: JSON.stringify({ review, rating, email, productId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let newReview = await res.json();

    if (!res.ok) {
      throw new Error(
        "Something went wrong attempting to create a new review!"
      );
    }
    updateReviews(newReview);
    setReview("");
    setRating(0);
    // router.reload();
    // router.push('/products/${productId}) -- seb's method of my re-rendering
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

            <label htmlFor="rating">Rating</label>

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

export default NewReview;
