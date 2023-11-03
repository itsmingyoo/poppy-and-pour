import Link from 'next/link';
import classes from './header.module.css';
import { useSession, signOut } from "next-auth/react"

function Header() {
    // useSession hook used to return an array, but in v4, it now returns an object
    // the data key holds the active session data (there will be session data only if login has been successful), if no authenticated user, the key's value will be null
    // the staus key is a e-num-like value that shows if the request to log in has been finished
    // its 3 values are --->   1.) "loading"       2.) "unathenticated"     3.) "authenticated"
    const { data: session, status } = useSession()
    const loading = status === "loading"

    // console.log(session)  //<------- holds data for the active session (null if no authenticated user)
    // console.log(status)   //<------- tells us explicity whether we are authenticated, not authenticated, or in the request process to be authenticated

    function logoutHandler() {
        signOut()
    }

    return (
        <header className={classes.header}>
            <Link href="/">
                <div className={classes.logo}>"Poppy, Not Bitchy: Sippin' Style, Not Sass."</div>
            </Link>
            <nav>
                <ul>
                    {/* IF WE DONT HAVE AN ACTIVE SESSION (no authenticated user)... WE RENDER A LINK TO SIGN-IN/SIGN-UP FORM! */}
                    {!session && status === "unauthenticated" && (
                        <li>
                            <Link href="/auth">Login</Link>
                        </li>
                    )}
                    {/* ONLY IF WE HAVE AN ACTIVE SESSION... WE RENDER A LINK TO THE USER'S PROFILE PAGE! */}
                    {session && (
                        <li>
                            <Link href="/profile">Profile</Link>
                        </li> )}
                        {/* ONLY IF WE HAVE AN ACTIVE SESSION... WE RENDER A LOG OUT BUTTON! */}
                    {session && (
                    <li>
                        <button onClick={logoutHandler}>Logout</button>
                    </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;
