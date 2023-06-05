import prisma from "@/app/lib/prismadb";
import { NextResponse } from "next/server";

interface Props {
  params: {
    id: number;
  };
}

export async function GET(request: Request, { params }: Props) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: +params.id,
      },
    });
    if (!product) return null;
    return NextResponse.json(product);
  } catch (error) {
    console.log(error);
    return null;
  }
}
