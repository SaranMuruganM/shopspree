import { NextResponse } from "next/server";
import Product from "@/lib/models/productSchema";
import dbConnect from "@/lib/dbConnect";
import { jwtVerify } from "jose"; 

export async function POST(request) {
  try {
    await dbConnect();
    const token = request.cookies.get("auth-token");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { payload } = await jwtVerify(
      token.value,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    let data = await request.json();

    data = { ...data, createdBy: payload.userId };

    const product = new Product(data);
    await product.save();

    return NextResponse.json(
      { message: "Product created", product },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({});
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
