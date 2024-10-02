import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/userSchema";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    await dbConnect();

    const { email, password } = await request.json();

    const user = await User.findOne({ email });

    if (user && user.password === password) {
      const token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
          role: user.role,
          name: user.name,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
  );

  
      const response = NextResponse.json({ msg: "Login successful" });

      // Set the JWT as a cookie
      response.cookies.set({
        name: "auth-token",
        value: token,
        path: "/", 
    
        httpOnly: true, // Makes the cookie inaccessible to client-side JavaScript
        maxAge: 60 * 60 * 24 * 7, // 7 days
        secure: process.env.NODE_ENV === "production", // Only use secure cookies in production
      });
      return response;
    } else {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
