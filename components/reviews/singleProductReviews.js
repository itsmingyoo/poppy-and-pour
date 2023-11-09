import { useSession } from "next-auth/react";
import Button from "../button/button";

function SingleProductReviews({ reviews }) {
  // console.log("DOES THIS WORK????", reviews)
  const { data: session } = useSession();
  console.log("singleproductreview session", session);

  return (
    <>
      <h2> REVIEWS </h2>
      {reviews.map((review) => {
        return (
          <div key={review.id}>
            <p>{review.review}</p>
            <p>RATING: {review.rating}</p>
            {session && (
              <Button onClick={"deleteHandler"} delete={"Delete Review"} />
            )}
          </div>
        );
      })}
    </>
  );
}

export default SingleProductReviews;
