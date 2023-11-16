import { prisma } from '@/server/db/client'

// check db if token exists
export async function validateTokenWithDB(token) {
    console.log('VALIDATING TOKEN RETRIEVED...', token)
    const existingToken = await prisma.token.findFirst({
        where: {
            id: 1,
        },
    })

    if (!existingToken) {
        console.log('NO EXISTING TOKEN')
        const newToken = await prisma.token.create({
            data: {
                accessToken: token.access_token,
                refreshToken: token.refresh_token,
                expiresIn: token.expires_in,
                createdAt: new Date(), // create date here in the frontend to synchronize its calculation of whether its expired.
            },
        })
        console.log('NEW TOKEN CREATED --->', newToken)
        return newToken
    }

    if (existingToken) {
        console.log('EXISTING DB TOKEN --->', existingToken)

        const expirationTime = 60 * 60 * 1000 // One hour in milliseconds
        const prevDate = new Date(existingToken.createdAt)
        const currDate = new Date()
        const timeDifference = currDate - prevDate
        const isExpired = timeDifference > expirationTime
        const isDifferent = existingToken.accessToken !== token.access_token
        console.log('IS IT EXPIRED? ', isExpired)
        console.log('IT IT DIFFERENT?', isDifferent)

        if (isExpired || isDifferent) {
            const updatedToken = await prisma.token.update({
                where: {
                    id: 1,
                },
                data: {
                    accessToken: token.access_token,
                    refreshToken: token.refresh_token,
                    expiresIn: token.expires_in,
                    createdAt: new Date(),
                },
            })
            console.log(
                'TOKEN UPDATED BC IT WAS DIFFERENT OR EXPIRED',
                updatedToken
            )
            return updatedToken
        }

        console.log(
            'Token not expired, no update needed--existingToken',
            existingToken
        )
        return existingToken
    }
}
