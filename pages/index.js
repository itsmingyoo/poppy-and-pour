import { useSession, signOut } from "next-auth/react"
import Link from "next/link";

function HomePage() {

  return (
    <div>
      <h1>THE HOME PAGE</h1>

      <Link href='/products'> OUR PRODUCTS (Leads to reviews) </Link>
      <br />
      <Link href='/categories'> OUR CATEGORIES </Link>
      <br />
    </div>
  );
}

export default HomePage;
