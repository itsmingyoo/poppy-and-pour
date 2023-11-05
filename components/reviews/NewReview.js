import { useState } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";
import Button from "../button/button";
import { findUserByEmail } from "@/pages/api/auth/findUser";

function NewReview(props) {
  const { updateReviews } = props;
  const router = useRouter();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({});

  // this method works only in the component
  const { data: session } = useSession();
  console.log("useSession", session);
  console.log("props.session", props.session);

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
    // Minh's method of re-rendering content using helper function to update state of reviews -- uses getServerSideProps
    // if you want to use this method -- make sure you change the props you're passing into the [productId].js <singleProductReviews/> props to the state reviews
    // updateReviews(newReview);
    setReview("");
    setRating(0);
    // router.reload();

    // seb's method of my re-rendering -- this getStaticProps and getStaticPaths -- this is faster than getServerSideProps
    router.push(`/products/${productId}`);
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
              <Button type={"submit"} post={"Submit Review"} />
              {session && (
                <Button onClick={"deleteHandler"} delete={"Delete Review"} />
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewReview;
