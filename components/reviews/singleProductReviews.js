import getReviewsForSingleProduct from '../../pages/api/reviews/[productId]'

function SingleProductReviews({reviews}) {

    console.log("DOES THIS WORK????", reviews)

    return (
        <>
            <h2> REVIEWS </h2>
            {reviews.map((review) => {
                return (
                    <div key={review.id}>
                        <p>{review.review}</p>
                        <p>RATING: {review.rating}</p>
                    </div>
                )
            })}
        </>
    )
}

export default SingleProductReviews
