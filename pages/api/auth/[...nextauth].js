// the filename for this NextAuth configuriation should always be [...nextauth].js
// !!! This file configures authentication with NextAuth.js using CredentialsProvider for email/password login. !!!
// when signIn() function is called in the signup form, a request is made to '/api/auth/signin' due to the way we configured the object in this file

// these are the new imports for next-auth @v4
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import authorize from '@/lib/authorize'
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
            authorize
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
        async signIn({ account, profile, credentials }) {
            if( account.provider === 'google' ) {
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
                            // hashedPassword: await hashPassword('shut the fuck up'),
                            hashedPassword: account.id_token,
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
            } else {
                return await authorize(credentials)
            }
        },
    },
})
