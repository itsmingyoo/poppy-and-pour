import { prisma } from '../../../server/db/client'

async function handler(req, res) {
    try {
        const token = await prisma.token.findFirst({
            where: {
                id: 1,
            },
        })
        res.status(200).json(token)
    } catch (e) {
        console.log('we failed to upsert token', e)
        res.status(500).json({message: 'FAILED QUERY TO FETCH TOKEN IN DATABASE'})
    }
}

export default handler
