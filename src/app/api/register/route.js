import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { User } from "../../models/User";

export async function POST(req) {
  const body = await req.json();
  mongoose.connect(process.env.MONGO_URL).then(()=> console.log('connected Succesfully'))
  .catch((err)=>{ console.log(err)});
  const cuser = await User.create(body)
    return NextResponse.json(cuser);
  }