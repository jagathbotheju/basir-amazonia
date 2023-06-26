import prisma from "@/app/lib/prismadb";
import { NextResponse } from "next/server";

interface Props {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Props) {
  try {
    const record = await prisma.order.findUnique({
      where: {
        id: +params.id,
      },
      include: {
        shippingAddress: true,
        orderItems: true,
      },
    });

    if (!record)
      return NextResponse.json({ error: "Record Not Found" }, { status: 500 });
    return NextResponse.json(record);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
