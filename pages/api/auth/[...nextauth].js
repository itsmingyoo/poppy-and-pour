// the filename for this NextAuth configuriation should always be [...nextauth].js
// !!! This file configures authentication with NextAuth.js using CredentialsProvider for email/password login. !!!
// when signIn() function is called in the signup form, a request is made to '/api/auth/signin' due to the way we configured the object in this file

// these are the new imports for next-auth @v4
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from '../../../server/db/client'
const { verifyPassword, hashPassword } = require('../../../lib/auth')

// when we export NextAuth function, we also call it and configure it. By configuring this function, it sets up
// auth api routes for us to use... such as configuring our log-in
export default NextAuth({
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            // this authorize function gets automatically called when we use the signIn() function in the login/signup form
            async authorize(credentials) {
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
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            // attach accesstoken to session
            // console.log("TOKEN IN THE SESSION", token);
            session.accessToken = token.accessToken
            session.user.userId = Number(token.sub)
            session.user = token.user

            // console.log("THIS IS SESSION==========", session);

            return session
        },
        async jwt({ token, user }) {
            // console.log("THIS IS JWT USER============", user);
            // console.log("THIS IS JWT PARAMS============", token);
            if (user) {
                token.user = {
                    userId: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                }
            }
            // console.log("THIS IS THE SMUGGLED TOKEN=============", token);
            return token
        },
        async signIn({ account, profile }) {
            if (!profile?.email) throw new Error('No profile')
            console.log('account', account)
            console.log('profile', profile)

            try {
                await prisma.user.upsert({
                    where: {
                        email: profile.email,
                    },
                    create: {
                        email: profile.email,
                        firstName: profile.name,
                        hashedPassword: await hashPassword('shut the fuck up'),
                        isAdmin: false,
                        isBanned: false,
                    },
                    update: {
                        firstName: profile.name,
                    },
                })
                return true
            } catch (e) {
                console.log(e)
            }
        },
    },
})
