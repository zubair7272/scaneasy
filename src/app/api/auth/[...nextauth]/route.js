// /* eslint-disable */
import mongoose from "mongoose"
import NextAuth from "next-auth"
import { User } from "../../../models/User"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../libs/mongoConnect"
// import { NextAuthOptions } from "next-auth";


export const  authOptions  = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
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
}

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return false;
  }
  const userInfo = await UserInfo.findOne({email:userEmail});
  if (!userInfo) {
    return false;
  }
  return userInfo.admin;
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }