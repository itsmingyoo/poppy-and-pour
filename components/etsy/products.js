function GetEtsyProducts({ products }) {
    const numProducts = products.count
    const allProducts = products.results
    console.log('ETSY PRODUCT COUNT --->', numProducts)
    console.log('ALL ETSY PRODUCTS ', allProducts)
    // Keys From Listings:
    // results: {
    //     listing_id
    //     title
    //     description
    //     state
    //     original_creation_timestamp
    //     updated_timestamp
    //     last_modified_timestamp
    //     url
    //     featured_rank
    //     is_customizable
    //     is_personalizable
    //     personalization_instructions
    //     listing_type
    //     tags
    //     materials
    //     who_made
    //     when_made
    //     has_variations
    //     price
    // }
    return (
        <section>
            <h1>
                --------------------------------------------------------------
            </h1>
            <h2>Etsy Products</h2>
            {/* {error && <p>Error: {error}</p>} */}
            <ul>
                {allProducts?.length > 0 ? (
                    allProducts.map((product) => (
                        <>
                            <li key={product.listing_id}>
                                <h1>Listing ID: {product.listing_id}</h1>
                                <h3>Title: {product.title}</h3>
                                <p>Description: {product.description}</p>
                                <p>
                                    Price: $
                                    {(
                                        product.price.amount /
                                        product.price.divisor
                                    ).toFixed(2)}
                                </p>
                                <p>State: {product.state}</p>
                                <p>
                                    Original Creation Timestamp:
                                    {product.original_creation_timestamp}
                                </p>
                                <p>Updated: {product.updated_timestamp}</p>
                                <p>
                                    Modified: {product.last_modified_timestamp}
                                </p>
                                <p>URL: {product.url}</p>
                                <p>Featured Rank: {product.featured_rank}</p>
                                <p>
                                    Customizable:{' '}
                                    {product.is_customizable.toString()}
                                </p>
                                <p>
                                    Personalizable:{' '}
                                    {product.is_personalizable.toString()}
                                </p>
                                <p>
                                    Personalization Instructions:{' '}
                                    {product.personalization_instructions}
                                </p>
                                <p>Listing Type: {product.listing_type}</p>
                                <p>Tags: {product.tags}</p>
                                <p>Materials: {product.materials}</p>
                                <p>Who made? {product.who_made}</p>
                                <p>When made? {product.when_made}</p>
                                <p>
                                    Variations?{' '}
                                    {product.has_variations.toString()}
                                </p>
                            </li>
                            <br />
                        </>
                    ))
                ) : (
                    <p>Unable to display product information...</p>
                )}
            </ul>
        </section>
    )
}

export default GetEtsyProducts
