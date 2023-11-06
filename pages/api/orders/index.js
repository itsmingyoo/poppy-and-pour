import { prisma } from '../../../server/db/client'

// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt"

async function handler(req, res) {
    // always import secret and pass it to getToken()
    const secret = process.env.NEXTAUTH_SECRET

    // If you don't have NEXTAUTH_SECRET set, you will have to pass your secret as `secret` to `getToken`
    const token = await getToken({ req, secret })
    console.log("THIS IS TOKEN", token)
    if (!token) {
        res.status(401).json({message: "Unathorized to make this request"})
    }

    const userId = Number(token.sub)
    console.log("THIS IS USERID", userId)
    // const orders = await getAllOrders()
    res.status(200).json(null)

}

async function getAllOrders() {
    try {
        const orders = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                orders: true, // Include the user's orders in the query
            },
        });
    } catch(e) {
        console.error(error);
        return null;
    } finally {
        await prisma.$disconnect();
    }
}


export default handler;
