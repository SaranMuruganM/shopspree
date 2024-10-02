import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/userSchema";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await dbConnect();
    let body = await request.json();
    body = { ...body, role: "user" };
    const response = await new User(body);
    await response.save();
    return NextResponse.json({ msg: "Created Successfully", data: response });
  } catch (error) {
    return NextResponse.json({ error: error.msg });
  }
}
