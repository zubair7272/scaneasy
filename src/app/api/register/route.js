import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { user } from "../../models/User";

export async function POST(req) {
  const body = await req.json();
  mongoose.connect('process.env.MONGO_URL');
  const Cuser = await user.create()
    return NextResponse.json({Cuser});
  }