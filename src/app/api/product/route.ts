import prisma from "@/app/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    if (!products) throw new Error("No products found");
    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error");
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      slug,
      category,
      image,
      price,
      brand,
      rating,
      numReviews,
      countInStock,
      description,
    } = body;

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        category,
        image,
        price,
        brand,
        rating,
        numReviews,
        countInStock,
        description,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log(error);
    return new NextResponse(`Internal Server Error ${error}`, { status: 500 });
  }
}
