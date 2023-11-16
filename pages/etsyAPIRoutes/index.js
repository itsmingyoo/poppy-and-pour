import Link from "next/link";

// all these variables are needed for the initial sign in auth to get the token in our database, if you move the sign up link, move these along with it
// const clientId = process.env.ETSY_API_KEY;
const redirectUri = 'http://localhost:3000/api/oauth/redirect';
const scope = 'email_r';
const codeChallengeMethod = 'S256';
const url = `https://www.etsy.com/oauth/connect?response_type=code&client_id=${process.env.ETSY_API_KEY}&redirect_uri=${redirectUri}&scope=${scope}&state=${process.env.STATE}&code_challenge=${process.env.CODE_CHALLENGE}&code_challenge_method=${codeChallengeMethod}`;


function EtsyApiRoutes() {
    async function handleEtsyPing() {
        const response = await fetch('/api/oauth/ping')
        if (!response.ok) {
            console.log('ERROR WHILE PINGING ETSY API')
            return
        }
        const data = await response.json()
        console.log('RESPONSE DATA ---> ', data)
    }

    async function handleMinhUserData() {
        const response = await fetch('/api/oauth/welcome')
        if (!response.ok) {
            console.log('ERROR RETREIVING MINH USER DATA')
            return
        }
        const data = await response.json()
        console.log('MINHS USER DATA ---> ', data)
    }

    return (
        <div>
            <p>Check Browser and Terminal For Feedback...</p>
            <br />
            <button><Link style={{color: 'maroon', fontWeight: 'bold'}}
                href={`https://www.etsy.com/oauth/connect?response_type=code&client_id=${process.env.ETSY_API_KEY}&redirect_uri=${redirectUri}&scope=${scope}&state=${process.env.STATE}&code_challenge=${process.env.CODE_CHALLENGE}&code_challenge_method=${codeChallengeMethod}`}
            >
                ----- CLICK THIS BUTTON EXACTLY ONCE TO INITIALLY SET TOKEN IN OUR DATABASE ----
            </Link></button>
            <br /> <br />
            <button onClick={handleEtsyPing}>Ping Etsy</button>
            <br /> <br />
            <button onClick={handleMinhUserData}>GET MINH USER DATA</button>
        </div>
    )
}

export default EtsyApiRoutes
