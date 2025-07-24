import slugify from 'slugify';

interface VariantOptionInput {
  variantName: string;
  optionName: string;
}

export function buildSku(productName: string, options: VariantOptionInput[]): string {
  const productSlug = slugify(productName, { lower: true, strict: true });

  const normalizedOptions = options
    .sort((a, b) => a.variantName.localeCompare(b.variantName))
    .map(({ optionName }) => slugify(optionName, { lower: true, strict: true }));

  return [productSlug, ...normalizedOptions].join('-');
}
