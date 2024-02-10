import mongoose from "mongoose"
import NextAuth from "next-auth"
import { User } from "../../../models/User"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    secret: process.env.SECRET,
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
          name: 'credentials',
          id : 'credentials',
          credentials: {
            username: { label: "Email", type: "text", placeholder: "Email" },
            password: { label: "Password", type: "password" },
          },
          async authorize(credentials, req) {
            const email = credentials?.email;
            const password = credentials?.password;

            mongoose.connect(process.env.MONGO_URL);
            const user = await User.findOne({email});
            const passvalid = user && bcrypt.compareSync(password, user.password);

            // console.log({passvalid})
            if (passvalid) {
              return user;
            }

            return null
          }
        })
      ],
})

export { handler as GET, handler as POST }