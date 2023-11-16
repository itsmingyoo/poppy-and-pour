// route for middleware
import { prisma } from '../../../server/db/client'

async function handler(req, res) {
    try {
        const token = await prisma.token.findFirst({
            where: {
                id: 1,
            },
        })

        // if token already in database, simply return token
        console.log('fetchToken - Existing Token in DB', token)
        res.status(200).json(token)
    } catch (e) {
        console.log('we failed to upsert token', e)
        res.status(200).json(null)
    }
}

export default handler
