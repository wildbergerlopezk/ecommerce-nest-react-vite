/*
  Warnings:

  - You are about to drop the column `createdAt` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `productVariantId` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `billingAddressId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `discountAmount` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `orderNumber` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `paymentStatus` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `shippingAddressId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `shippingAmount` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `subtotal` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `taxAmount` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `providerResponse` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the `addresses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `wishlist_items` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_userId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_billingAddressId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_shippingAddressId_fkey";

-- DropForeignKey
ALTER TABLE "wishlist_items" DROP CONSTRAINT "wishlist_items_productId_fkey";

-- DropForeignKey
ALTER TABLE "wishlist_items" DROP CONSTRAINT "wishlist_items_userId_fkey";

-- DropIndex
DROP INDEX "orders_orderNumber_key";

-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "createdAt",
DROP COLUMN "productVariantId",
DROP COLUMN "totalPrice",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "billingAddressId",
DROP COLUMN "discountAmount",
DROP COLUMN "notes",
DROP COLUMN "orderNumber",
DROP COLUMN "paymentStatus",
DROP COLUMN "shippingAddressId",
DROP COLUMN "shippingAmount",
DROP COLUMN "subtotal",
DROP COLUMN "taxAmount";

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "createdAt",
DROP COLUMN "currency",
DROP COLUMN "providerResponse",
DROP COLUMN "transactionId",
DROP COLUMN "updatedAt";

-- DropTable
DROP TABLE "addresses";

-- DropTable
DROP TABLE "wishlist_items";

-- DropEnum
DROP TYPE "InventoryTransactionType";
