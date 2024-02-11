import { get } from "http";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "../../models/User";
// import { Session } from "inspector";
export async function PUT(req){
    mongoose.connect(process.env.MONGO_URL)
    const data = await req.json(); 
    const session = await getServerSession(authOptions);
    // console.log(session)
    const email = session.user.email;
    // const user = await findOne({email})
    if('name' in data){
        await User.updateOne({email},{name:data.name});
        // const user = User.findOne({email})
        // user.name = data.name
        // await user.save()

    }
    // console.log(session)
    return Response.json(true)
    
}