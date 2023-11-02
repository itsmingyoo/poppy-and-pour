import { useSession, signOut } from "next-auth/react"
import Link from "next/link";

function HomePage() {

  function logoutHandler() {
    signOut()
  }



  return (

    
    <div>
      <h1>THE HOME PAGE</h1>

      <Link href='/auth'>login/signup form YO</Link>
      <br />
      <Link href='/products'> OUR PRODUCTS (Leads to reviews) </Link>
      <br />
      <Link href='/categories'> OUR CATEGORIES </Link>
      <br />
      <button onClick={logoutHandler}> !!!! CLICK TO LOGOUT USER !!!! </button>
    </div>
  );
}

export default HomePage;
