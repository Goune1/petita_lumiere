import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Product from "@/models/products";

export async function GET() {
  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 });
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  await connectDB();
  const { name, description, image, price } = await req.json();

  if (!name || !description || !image || !price) {
    return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 });
  }

  const newProduct = new Product({ name, description, image, price });
  await newProduct.save();
  return NextResponse.json(newProduct, { status: 201 });
}
