import UserReview from "./userReview";
import Button from "../button/button";

function SingleProductReviews({ reviews }) {
  return (
    <>
      <h2>REVIEWS</h2>
      {reviews.map((review) => (
        <UserReview {...{ review }} />
      ))}
    </>
  );
}

export default SingleProductReviews;
