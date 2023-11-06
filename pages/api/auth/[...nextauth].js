// the filename for this NextAuth configuriation should always be [...nextauth].js
// !!! This file configures authentication with NextAuth.js using CredentialsProvider for email/password login. !!!
// when signIn() function is called in the signup form, a request is made to '/api/auth/signin' due to the way we configured the object in this file

// these are the new imports for next-auth @v4
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { prisma } from "../../../server/db/client";
const { verifyPassword } = require("../../../lib/auth");

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
        console.log("LOGGED IN USER IN AUTH", user);
        await prisma.$disconnect();

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      console.log("TOKEN IN THE NEXTAUTH", token);
      // attach accesstoken to session
      session.accessToken = token.accessToken;
      session.user.userId = Number(token.sub);

      return session;
    },
    async jwt(params) {
      console.log("THIS IS JWT PARAMS", params);
      if (params.user) {
        params.token.firstName = params.user.firstName;
      }
      console.log("THIS IS THE SMUGGLED TOKEN", params.token);
      return params.token;
    },
  },

  // callbacks: {
  //   async session({ session, token }) {
  //     // Store the user object in the session for later access
  //     session.user = token.user;
  //     session.accessToken = token.accessToken;
  //     return session;
  //   },
  // async jwt({ token, user }) {
  //   if (user) {
  //     token.user = user;
  //   }
  //   return token;
  // },
  // },
});
