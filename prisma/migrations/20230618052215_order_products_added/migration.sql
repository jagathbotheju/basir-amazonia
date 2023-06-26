/*
  Warnings:

  - You are about to drop the column `orderId` on the `ShippingAddress` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[shippingId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[orderId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shippingId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ShippingAddress" DROP CONSTRAINT "ShippingAddress_orderId_fkey";

-- DropIndex
DROP INDEX "ShippingAddress_orderId_key";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "shippingId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "orderId" INTEGER;

-- AlterTable
ALTER TABLE "ShippingAddress" DROP COLUMN "orderId";

-- CreateIndex
CREATE UNIQUE INDEX "Order_shippingId_key" ON "Order"("shippingId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_orderId_key" ON "Product"("orderId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_shippingId_fkey" FOREIGN KEY ("shippingId") REFERENCES "ShippingAddress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
