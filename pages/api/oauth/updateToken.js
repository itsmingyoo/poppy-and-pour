import { prisma } from '../../../server/db/client'

async function handler(req, res) {
    const {access_token, token_type, expires_in, refresh_token} = req.body

    try {
        const newToken = await prisma.token.update({
            where: {id: 1},
            data: {
                accessToken: access_token,
                refreshToken: refresh_token,
                expiresIn: expires_in,
                createdAt: new Date()
            },
        })
        res.status(200).json(newToken)
    } catch(e) {
        console.log(e)
        res.status(500).json({message: 'Failed to Update Information On Token In Database'})
    }
}

export default handler
