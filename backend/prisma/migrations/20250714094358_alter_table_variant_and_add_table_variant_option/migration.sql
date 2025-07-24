-- CreateTable
CREATE TABLE "VariantOption" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VariantOption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VariantOption_variantId_idx" ON "VariantOption"("variantId");

-- CreateIndex
CREATE UNIQUE INDEX "VariantOption_variantId_name_key" ON "VariantOption"("variantId", "name");

-- AddForeignKey
ALTER TABLE "VariantOption" ADD CONSTRAINT "VariantOption_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "Variant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
