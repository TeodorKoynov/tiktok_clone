import NextAuth, {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// import {compare} from "bcryptjs";
// import {PrismaAdapter} from "@next-auth/prisma-adapter";
// import CredentialsProvider from "next-auth/providers/credentials";

// import prisma from "../../../lib/prisma";

export const authOptions: NextAuthOptions = {
    // adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    // pages: {
    //     signIn: '/signin',
    // },
    providers: [
        GoogleProvider({
            // @ts-ignore
            clientId: process.env.GOOGLE_CLIENT_ID,
            // @ts-ignore
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    // events: {
    //     async signIn(message) {
    //         console.log("Sign in Event", "message")
    //     },
    //     async signOut(message) {
    //         console.log("Sign out Event", "message")
    //     },
    //     async createUser(message) {
    //         console.log("Create User Event", "message")
    //     },
    //     async updateUser(message) {
    //         console.log("Update User Event", "message")
    //     },
    //     async session(message) {
    //         console.log("Active Session Event", "message")
    //     }
    // }
};

export default NextAuth(authOptions);