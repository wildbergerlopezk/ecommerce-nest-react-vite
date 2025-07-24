/*
  Warnings:

  - You are about to drop the column `productVariantId` on the `cart_items` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,productId]` on the table `cart_items` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "cart_items_userId_productId_productVariantId_key";

-- AlterTable
ALTER TABLE "cart_items" DROP COLUMN "productVariantId";

-- CreateIndex
CREATE UNIQUE INDEX "cart_items_userId_productId_key" ON "cart_items"("userId", "productId");
