import { useSession } from "next-auth/react";

function SingleProductReviews({ reviews }) {
  // console.log("DOES THIS WORK????", reviews)
  const { data: session, status } = useSession();
  const loading = status === "loading";
  console.log(session);

  return (
    <>
      <h2> REVIEWS </h2>
      {reviews.map((review) => {
        return (
          <div key={review.id}>
            <p>{review.review}</p>
            <p>RATING: {review.rating}</p>
          </div>
        );
      })}
    </>
  );
}

export default SingleProductReviews;
