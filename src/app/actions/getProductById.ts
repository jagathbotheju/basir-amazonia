import prisma from "../lib/prismadb";

export const getProductById = async (id: number) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });
    if (!product) return null;
    return product;
  } catch (error) {
    console.log(error);
    return null;
  }
};
