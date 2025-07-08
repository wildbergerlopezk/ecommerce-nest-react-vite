/*
  Warnings:

  - You are about to drop the column `categoryId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `dimensions` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `isFeatured` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `metaDescription` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `metaTitle` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `shortDescription` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `product_details` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `price` to the `products` table without a default value. This is not possible if the table is not empty.
  - Made the column `subcategoryId` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `brand` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('PYG', 'USD', 'BRL', 'EUR', 'ARS');

-- DropForeignKey
ALTER TABLE "product_details" DROP CONSTRAINT "product_details_productId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_subcategoryId_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "categoryId",
DROP COLUMN "dimensions",
DROP COLUMN "isFeatured",
DROP COLUMN "metaDescription",
DROP COLUMN "metaTitle",
DROP COLUMN "shortDescription",
DROP COLUMN "status",
DROP COLUMN "tags",
ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'PYG',
ADD COLUMN     "depth" DOUBLE PRECISION,
ADD COLUMN     "height" DOUBLE PRECISION,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "width" DOUBLE PRECISION,
ALTER COLUMN "subcategoryId" SET NOT NULL,
ALTER COLUMN "brand" SET NOT NULL;

-- DropTable
DROP TABLE "product_details";

-- DropEnum
DROP TYPE "ProductStatus";

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "subcategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
