import { useSession, signOut } from 'next-auth/react'
import { getUserSession } from '@/lib/auth'
import Link from 'next/link'
import { useEffect } from 'react'

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
            <Link href="/api/auth/signin"> SIGNIN WITH GOOGLE </Link>
            <br />
        </div>
    )
}

export default HomePage
