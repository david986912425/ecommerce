import { dbConnect } from "@/utils/mongoose";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect();
    const products = await Product.find();
    return NextResponse.json(products);
}

export async function POST(req: Request) {
    const data = await req.json();
    await dbConnect();
    const product = await Product.create(data);
    return NextResponse.json(product);
}
