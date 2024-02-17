import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { User } from "../../models/User";
import bcrypt from "bcrypt"

export async function POST(req) {
  const body = await req.json();
  mongoose.connect(process.env.MONGO_URL)
  const pass = body.password
  if (!pass?.length || pass.length < 5) {
    new Error('Password Is Too Weak')
  }
  const myPlaintextPassword = pass;
  const salt = bcrypt.genSaltSync(10);
  body.password = bcrypt.hashSync(myPlaintextPassword, salt);

  const cuser = await User.create(body)
  return NextResponse.json(cuser);
}