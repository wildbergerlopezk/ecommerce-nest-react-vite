import { PrismaService } from 'prisma/prisma.service';

export type SearchHandler = (prisma: PrismaService, query: string) => Promise<any>;

export const searchModelMap: Record<string, SearchHandler> = {
  product: (prisma, name) =>
    prisma.product.findMany({
      where: { name: { contains: name, mode: 'insensitive' } },
    }),

  subcategory: (prisma, name) =>
    prisma.subcategory.findMany({
      where: { name: { contains: name, mode: 'insensitive' } },
      include: { category: true ,products: true },
    }),

  category: (prisma, name) =>
    prisma.category.findMany({
      where: { name: { contains: name, mode: 'insensitive' } },
      include: { subcategories: true },
    }),
};
