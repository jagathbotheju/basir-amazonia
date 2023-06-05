import { NextResponse } from "next/server";
import prisma from "../lib/prismadb";

export async function getProducts() {
  try {
    const products = await prisma.product.findMany();
    if (!products) return null;
    return products;
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error");
  }
}
