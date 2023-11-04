import { useSession } from "next-auth/react"

function Orders() {
    const { data: session, status } = useSession()
    const loading = status === "loading"

    if(session) {
        console.log(session)  //<------- holds data for the active session (null if no authenticated user)
    }

    async function displayUserOrdersHandler() {
        const response = await fetch('/api/orders/', {
            method: 'POST',
            body: JSON.stringify(session),
            headers: { 'Content-Type': 'application/json' }
        })
    }

    return (
        <>
            <h1>USER ORDERS</h1>
            <p>Click the button below to display the user's orders</p>
            <button onClick={displayUserOrdersHandler}>GET ORDERS</button>
            {session && console.log("SESSION", session)}
        </>
    )
}

export default Orders
