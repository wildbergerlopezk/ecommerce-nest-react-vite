/*
  Warnings:

  - You are about to drop the column `image` on the `subcategories` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `subcategories` table. All the data in the column will be lost.
  - You are about to drop the column `sortOrder` on the `subcategories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "subcategories" DROP COLUMN "image",
DROP COLUMN "isActive",
DROP COLUMN "sortOrder";
