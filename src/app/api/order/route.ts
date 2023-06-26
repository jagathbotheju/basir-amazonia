import prisma from "@/app/lib/prismadb";
import { connect } from "http2";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { payment, shippingAddress, productIds, userId, cart } = body;
    console.log(`cart data ${JSON.stringify(cart)}`);
    const createdOrder = await prisma.order.create({
      data: {
        paymentMethod: payment.paymentMethod,
        itemsPrice: payment.itemsPrice,
        shippingPrice: payment.shippingPrice,
        taxPrice: payment.taxPrice,
        totalPrice: payment.totalPrice,
        user: {
          connect: {
            id: userId,
          },
        },
        orderItems: {
          createMany: {
            data: cart,
          },
        },
        // products: {
        //   connect: productIds.map((productId: number) => ({
        //     id: productId,
        //   })),
        // },
        shippingAddress: {
          create: {
            fullName: shippingAddress.fullName,
            address: shippingAddress.address,
            city: shippingAddress.city,
            postalCode: shippingAddress.postalCode,
            country: shippingAddress.country,
          },
        },
      },
    });
    return NextResponse.json(createdOrder);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
