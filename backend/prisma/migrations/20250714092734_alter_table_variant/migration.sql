/*
  Warnings:

  - You are about to drop the column `productId` on the `Variant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Variant` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Variant" DROP CONSTRAINT "Variant_productId_fkey";

-- DropIndex
DROP INDEX "Variant_productId_idx";

-- DropIndex
DROP INDEX "Variant_productId_name_key";

-- AlterTable
ALTER TABLE "Variant" DROP COLUMN "productId";

-- CreateIndex
CREATE UNIQUE INDEX "Variant_name_key" ON "Variant"("name");
