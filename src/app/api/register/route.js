import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { User } from "../../models/User";

export async function POST(req) {
  const body = await req.json();
  mongoose.connect(process.env.MONGO_URL,
    (err) => {
    if(err) console.log(err) 
    else console.log("mongdb is connected");});
  const cuser = await User.create(body)
    return NextResponse.json(cuser);
  }