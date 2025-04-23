import {dbConnect} from "@/utils/mongoose";
import Product from "@/models/Product";
import {NextResponse} from "next/server";
import {put} from "@vercel/blob";
import sharp from "sharp";

interface Product {
    title: string
    price: number
    image: string
}

export async function GET() {
    await dbConnect();
    const products = await Product.find();
    return NextResponse.json(products);
}

export async function POST(req: Request) {
    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
        return new Response("Archivo no proporcionado", {status: 400});
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const optimizedImage = await sharp(buffer)
        .resize({width: 1024})
        .webp({quality: 80})
        .toBuffer();

    const blob = await put(`${file.name.split('.')[0]}.webp`, optimizedImage, {
        access: "public",
        contentType: "image/webp",
    });

    const productData = {
        title: formData.get("title")?.toString() || "",
        price: parseFloat(formData.get("price")?.toString() || "0"),
        stock: parseFloat(formData.get("stock")?.toString() || "0"),
        image: blob.url,
    };

    await dbConnect();
    const product = await Product.create(productData);

    return NextResponse.json(product);
}
