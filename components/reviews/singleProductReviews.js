import UserReview from "./userReview";
import Button from "../button/button";

function SingleProductReviews({ reviews }) {
  return (
    <>
      {reviews.map((review) => (
        <UserReview {...{ review }} />
      ))}
    </>
  );
}

export default SingleProductReviews;
