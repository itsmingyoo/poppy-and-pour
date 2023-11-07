import { getSession } from 'next-auth/react'
import { getAllOrders } from '../api/orders/index'

function Orders({orders}) {

    if(orders.length === 0) return <h2 style={{textAlign: 'center'}}>This User Has No Active Orders</h2>

    return (
        <>
            <h1>USER ORDERS</h1>
            {orders && orders.map((order) => {
                return <div key={order.id}>
                    <p>ORDER STATUS: {order.status}</p>
                    <p>TRACKING NUMBER: {order.trackingNumber}</p>
                    <p>ORDER DATE: {order.orderDate}</p>
                    <p>BATCH ID: {order.batchId}</p>
                    <p>TOTAL: {order.total}</p>
                </div>
            })}
        </>
    )
}

// we use getServerSideProps() here since display Orders is a protected component
export async function getServerSideProps(context) {
    console.log("GRABBING LATEST DATA FROM BACKEND...")
    const session = await getSession({req: context.req})

    if(!session) {
        console.log("THERE IS NO SESSION")
        return {
            redirect: {
                destination: '/auth',
                permanent: false
            }
        }
    }

    const userId = session.user.userId
    const allOrders = await getAllOrders(userId)

    return {
        props: {
            orders: allOrders,
            session
        }
    }
}



export default Orders
