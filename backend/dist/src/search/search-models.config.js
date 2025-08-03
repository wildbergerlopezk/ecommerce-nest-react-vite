"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchModelMap = void 0;
exports.searchModelMap = {
    product: (prisma, name) => prisma.product.findMany({
        where: { name: { contains: name, mode: 'insensitive' } },
    }),
    subcategory: (prisma, name) => prisma.subcategory.findMany({
        where: { name: { contains: name, mode: 'insensitive' } },
        include: { category: true, products: true },
    }),
    category: (prisma, name) => prisma.category.findMany({
        where: { name: { contains: name, mode: 'insensitive' } },
        include: { subcategories: true },
    }),
};
//# sourceMappingURL=search-models.config.js.map