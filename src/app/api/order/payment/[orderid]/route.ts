import prisma from "@/app/lib/prismadb";
import { NextResponse } from "next/server";

interface Props {
  params: {
    orderid: string;
  };
}

export async function PUT(request: Request, { params }: Props) {
  try {
    const body = await request.json();
    const { details } = body;
    const order = await prisma.order.findUnique({
      where: {
        id: +params.orderid,
      },
    });
    if (!order)
      return NextResponse.json({ error: "No order found for payment" });
    if (order.isPaid)
      return NextResponse.json({ error: "This order already Paid" });

    const updatedOrder = await prisma.order.update({
      where: {
        id: +params.orderid,
      },
      data: {
        isPaid: true,
        paidAt: new Date().toISOString(),
      },
    });
    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
