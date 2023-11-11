// this authorize function gets used in nextAuth.js to authenticate user's who use the credentials provider
import { prisma } from '../server/db/client'
import { verifyPassword } from './auth'

export default async function authorize(credentials) {
    // search for user email in the DB
    const user = await prisma.user.findUnique({
        where: { email: credentials.email },
    })

    if (!user) {
        await prisma.$disconnect()
        throw new Error('No user found!')
    }

    // Verify the provided password matches the stored hashed password
    const isValid = await verifyPassword(
        credentials.password,
        user.hashedPassword
    )
    if (!isValid) {
        await prisma.$disconnect()
        throw new Error('Could not log you in!')
    }

    console.log('LOGGED IN USER IN AUTH', user)

    await prisma.$disconnect()

    return user
}
