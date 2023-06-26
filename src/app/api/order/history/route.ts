import prisma from "@/app/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const records = await prisma.order.findMany();
    if (!records) return NextResponse.json({ error: "No Orders Found" });

    return NextResponse.json(records);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
