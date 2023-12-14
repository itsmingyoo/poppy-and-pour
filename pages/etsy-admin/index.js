import Link from 'next/link'
import GetEtsyProducts from '@/components/etsy/products'

// all these variables are needed for the initial sign in auth to get the token in our database, if you move the sign up link, move these along with it
const redirectUri = 'http://localhost:3000/api/oauth/redirect'
const scope =
    'address_r%20address_w%20billing_r%20cart_r%20cart_w%20email_r%20favorites_r%20favorites_w%20feedback_r%20listings_d%20listings_r%20listings_w%20profile_r%20profile_w%20recommend_r%20recommend_w%20shops_r%20shops_w%20transactions_r%20transactions_w'
const codeChallengeMethod = 'S256'

function EtsyAdmin({ products }) {
    async function handleEtsyPing() {
        const response = await fetch('/api/oauth/ping')
        if (!response.ok) {
            console.log('ERROR WHILE PINGING ETSY API')
            return
        }
        const data = await response.json()
        console.log('RESPONSE DATA ---> ', data)
    }

    async function handleAdminData() {
        const response = await fetch('/api/oauth/welcome')
        if (!response.ok) {
            console.log('ERROR RETRIEVING ADMIN USER DATA')
            return
        }
        const data = await response.json()
        console.log('ADMIN USER DATA ---> ', data)
    }

    async function handleListings() {
        const response = await fetch('/api/etsy/listings')

        if (!response.ok) {
            console.log('ERROR RETRIEVING LISTINGS')
            return
        }
        const listings = await response.json()
        console.log('THESE ARE THE LISTINGS', listings)
        return
    }
    async function handleProductInfo() {
        const response = await fetch('/api/etsy/listings/inventory')

        if (!response.ok) {
            console.log('ERROR RETRIEVING PRODUCT INFO')
            return
        }
        const inventory = await response.json()
        console.log('inventory ===> ', inventory)
        // console.log('inventory.products ===> ', inventory.products)
        return
    }

    return (
        <div>
            <p>Check Browser and Terminal For Feedback...</p>
            <br />
            <button>
                <Link
                    style={{ color: 'maroon', fontWeight: 'bold' }}
                    href={`https://www.etsy.com/oauth/connect?response_type=code&client_id=${process.env.ETSY_API_KEY}&redirect_uri=${redirectUri}&scope=${scope}&state=${process.env.STATE}&code_challenge=${process.env.CODE_CHALLENGE}&code_challenge_method=${codeChallengeMethod}`}
                >
                    ----- CLICK THIS BUTTON EXACTLY ONCE TO INITIALLY SET TOKEN
                    IN OUR DATABASE ----
                </Link>
            </button>
            <br /> <br />
            <button onClick={handleEtsyPing}>Ping Etsy</button>
            <br /> <br />
            <button onClick={handleAdminData}>GET ADMIN DATA</button>
            <br /> <br />
            <button onClick={handleListings}>GET ALL LISTINGS</button>
            <br /> <br />
            <button onClick={handleProductInfo}>GET INVENTORY WITH PIDs</button>
            <GetEtsyProducts products={products} />
        </div>
    )
}

export async function getServerSideProps(context) {
    try {
        const response = await fetch('http://localhost:3000/api/etsy/listings')

        console.log('etsy inventory fetch', response)

        if (!response.ok) {
            console.log('ERROR RETRIEVING PRODUCT INFO')
            return {
                props: {
                    products: null, // or any default value indicating error
                },
            }
        }
        const etsyProducts = await response.json()

        console.log('etsy inventory regenerating ===>', etsyProducts)

        console.log('REGENERATING ETSY INVENTORY...')

        return {
            props: { products: etsyProducts },
        }
    } catch (error) {
        console.error('Error fetching data:', error)
        return {
            props: {
                products: null, // or any default value indicating error
            },
        }
    }
}

export default EtsyAdmin
