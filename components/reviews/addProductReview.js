import { useState } from "react";
import { useRouter } from 'next/router';

async function createReview(props) {
    const res = await fetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify( {review, rating, userId, productId} ),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await res.json()
    if(!res.ok) {
        throw new Error(data.message || 'Something went wrong attempting to register user!')
    }
}
