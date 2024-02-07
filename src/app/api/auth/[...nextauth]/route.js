import mongoose from "mongoose"
import NextAuth from "next-auth"
import { User } from "../../../models/User";
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    secret: process.env.SECRET,
    providers: [
        CredentialsProvider({
          name: 'Credentials',
          id : 'Credentials',
          credentials: {
            username: { label: "Email", type: "text", placeholder: "username@xyz.com" },
            password: { label: "Password", type: "password" },
          },
          async authorize(credentials, req) {
            const email = credentials?.email;
            const password = credentials?.password;
            mongoose.connect(process.env.MONGO_URL);
            const user = await User.findOne({email});
            const passvalid = user && bcrypt.compareSync(password,user.password);

            console.log({password})

            if(passvalid){
              return user;
            }
            return null
          }
        })
      ],
})

export { handler as GET, handler as POST }