import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

function HomePage() {
    return (
        <div>
            <h1>THE HOME PAGE</h1>

            <Link href="/products"> PRODUCTS (Leads to reviews) </Link>
            <br />
            <Link href="/categories"> CATEGORIES </Link>
            <br />
            <Link href="/shopify"> SHOPIFY PRODUCTS </Link>
            <br />
            <Link href="/etsy"> ETSY PRODUCTS </Link>
            <br />
        </div>
    )
}

export default HomePage
