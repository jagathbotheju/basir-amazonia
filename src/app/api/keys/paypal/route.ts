import { NextResponse } from "next/server";

export async function GET() {
  try {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    if (!clientId)
      return NextResponse.json({ error: "id not found" }, { status: 500 });
    return NextResponse.json(clientId);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
