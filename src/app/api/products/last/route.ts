import {NextResponse} from "next/server";
import Product from "@/models/Product";
import {dbConnect} from "@/utils/mongoose";

export async function GET() {
    await dbConnect();
    const products = await Product.find().sort({createdAt: -1}).limit(3);
    return NextResponse.json(products);
}
