// the filename for this NextAuth configuriation should always be [...nextauth].js
// !!! This file configures authentication with NextAuth.js using CredentialsProvider for email/password login. !!!
// when signIn() function is called in the signup form, a request is made to '/api/auth/signin' due to the way we configured the object in this file

// these are the new imports for next-auth @v4
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

<<<<<<< HEAD
import { prisma } from '../../../server/db/client'

const { verifyPassword } = require('../../../lib/auth')
=======
import { prisma } from "../../../server/db/client";
>>>>>>> reviews-edit

import { hashPassword, verifyPassword } from "../../../lib/auth";

// when we export NextAuth function, we also call it and configure it. By configuring this function, it sets up
// auth api routes for us to use... such as configuring our log-in
export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      // this authorize function gets automatically called when we use the signIn() function in the login/signup form
      async authorize(credentials) {
        // search for user email in the DB
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          await prisma.$disconnect();
          throw new Error("No user found!");
        }

        // Verify the provided password matches the stored hashed password
        const isValid = await verifyPassword(
          credentials.password,
          user.hashedPassword
        );
        if (!isValid) {
          await prisma.$disconnect();
          throw new Error("Could not log you in!");
        }

        await prisma.$disconnect();
        // request for login was successful, token will be generated for this session user (can be seen in the cookies)
        // this object is being stored as a key in the session object for us to use later (for example, changing a user's password)
        console.log(user);
        return { email: user.email };
      },
    }),
  ],
});
