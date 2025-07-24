/*
  Warnings:

  - The `currency` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `currency` column on the `payments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `inventory_transactions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_variant_images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_variants` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "VariantOption" DROP CONSTRAINT "VariantOption_variantId_fkey";

-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_productVariantId_fkey";

-- DropForeignKey
ALTER TABLE "inventory_transactions" DROP CONSTRAINT "inventory_transactions_productVariantId_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_productId_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_productVariantId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_billingAddressId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_shippingAddressId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_userId_fkey";

-- DropForeignKey
ALTER TABLE "product_variant_images" DROP CONSTRAINT "product_variant_images_productVariantId_fkey";

-- DropForeignKey
ALTER TABLE "product_variants" DROP CONSTRAINT "product_variants_productId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_subcategoryId_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "currency",
ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'USD';

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "currency",
ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'USD';

-- DropTable
DROP TABLE "inventory_transactions";

-- DropTable
DROP TABLE "product_variant_images";

-- DropTable
DROP TABLE "product_variants";

-- CreateTable
CREATE TABLE "ProductVariantCombination" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "price" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductVariantCombination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductVariantCombinationOption" (
    "id" TEXT NOT NULL,
    "combinationId" TEXT NOT NULL,
    "variantOptionId" TEXT NOT NULL,

    CONSTRAINT "ProductVariantCombinationOption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariantCombination_sku_key" ON "ProductVariantCombination"("sku");

-- CreateIndex
CREATE INDEX "ProductVariantCombination_productId_idx" ON "ProductVariantCombination"("productId");

-- CreateIndex
CREATE INDEX "ProductVariantCombinationOption_variantOptionId_idx" ON "ProductVariantCombinationOption"("variantOptionId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariantCombinationOption_combinationId_variantOption_key" ON "ProductVariantCombinationOption"("combinationId", "variantOptionId");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "subcategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantOption" ADD CONSTRAINT "VariantOption_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "Variant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariantCombination" ADD CONSTRAINT "ProductVariantCombination_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariantCombinationOption" ADD CONSTRAINT "ProductVariantCombinationOption_combinationId_fkey" FOREIGN KEY ("combinationId") REFERENCES "ProductVariantCombination"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariantCombinationOption" ADD CONSTRAINT "ProductVariantCombinationOption_variantOptionId_fkey" FOREIGN KEY ("variantOptionId") REFERENCES "VariantOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "ProductVariantCombination"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_shippingAddressId_fkey" FOREIGN KEY ("shippingAddressId") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_billingAddressId_fkey" FOREIGN KEY ("billingAddressId") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "ProductVariantCombination"("id") ON DELETE CASCADE ON UPDATE CASCADE;
