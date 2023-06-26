-- CreateTable
CREATE TABLE "OrderItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "brand" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "numReviews" INTEGER NOT NULL,
    "countInStock" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "quantify" INTEGER NOT NULL,
    "orderId" INTEGER,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
