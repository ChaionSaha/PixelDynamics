import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import {getDatabase} from "@/db/mongoConnection";
import {comparePassword} from "@/db/auth";

export const authOptions = {
    session: {
        jwt: true,
        maxAge: 6 * 60 * 60,
    },
    secret: process.env.AUTH_SECRET,
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const db = await getDatabase();
                const usersCollection = await db.collection("users");
                const {email, password} = credentials;
                const user = await usersCollection.findOne({email});
                if (!user) {
                    throw new Error(`User not found!`);
                }
                const isValid = await comparePassword(password, user.password);
                if (!isValid) {
                    throw new Error(`Invalid password!`);
                }
                return {email: user.email}
            }
        })
    ],
}

export default NextAuth(authOptions)