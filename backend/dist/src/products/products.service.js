"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const slugify_1 = require("slugify");
let ProductsService = class ProductsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const name = dto.name.trim();
        if (!name) {
            throw new common_1.BadRequestException('El nombre no puede estar vacío');
        }
        let subcategoryId = dto.subcategoryId?.trim();
        if (!subcategoryId && dto.subcategorySlug?.trim()) {
            const subcategory = await this.prisma.subcategory.findUnique({
                where: { slug: dto.subcategorySlug.trim() },
            });
            if (!subcategory) {
                throw new common_1.BadRequestException('Subcategoría con ese slug no encontrada');
            }
            subcategoryId = subcategory.id;
        }
        if (!subcategoryId) {
            throw new common_1.BadRequestException('Debés proporcionar subcategoryId o subcategorySlug');
        }
        const slug = (0, slugify_1.default)(name, { lower: true, strict: true });
        const existing = await this.prisma.product.findUnique({ where: { slug } });
        if (existing) {
            throw new common_1.BadRequestException('Ya existe un producto con ese nombre');
        }
        return this.prisma.product.create({
            data: {
                subcategoryId,
                name,
                slug,
                description: dto.description?.trim() || null,
                brand: dto.brand.trim(),
                imageUrl: dto.imageUrl?.trim() ?? null,
                weight: dto.weight,
                height: dto.height,
                width: dto.width,
                depth: dto.depth,
                price: dto.price,
                currency: dto.currency,
                stock: dto.stock ?? 0,
                isActive: dto.isActive ?? true,
            },
            include: {
                subcategory: true,
            },
        });
    }
    async findAll() {
        return this.prisma.product.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                subcategory: true,
            },
        });
    }
    async findOne(id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: {
                subcategory: true,
            },
        });
        if (!product)
            throw new common_1.NotFoundException('Producto no encontrado');
        return product;
    }
    async findBySlug(slug) {
        const product = await this.prisma.product.findUnique({
            where: { slug },
            include: {
                subcategory: true,
            },
        });
        if (!product)
            throw new common_1.NotFoundException('Producto no encontrado');
        return product;
    }
    async update(id, dto) {
        const product = await this.prisma.product.findUnique({ where: { id } });
        if (!product)
            throw new common_1.NotFoundException('Producto no encontrado');
        const { name, description, brand } = dto;
        const isSameName = !name || name.trim() === product.name;
        const isSameDescription = !description || description.trim() === product.description;
        const isSameBrand = !brand || brand.trim() === product.brand;
        const isSameSubcategoryId = !dto.subcategoryId;
        const isSameSubcategorySlug = !dto.subcategorySlug;
        const isSameImageUrl = !dto.imageUrl || dto.imageUrl.trim() === product.imageUrl;
        if (isSameName &&
            isSameDescription &&
            isSameBrand &&
            isSameSubcategoryId &&
            isSameSubcategorySlug &&
            isSameImageUrl &&
            dto.weight === undefined &&
            dto.height === undefined &&
            dto.width === undefined &&
            dto.depth === undefined &&
            dto.price === undefined &&
            dto.currency === undefined &&
            dto.stock === undefined &&
            dto.isActive === undefined) {
            return product;
        }
        let newSlug;
        if (name?.trim()) {
            newSlug = (0, slugify_1.default)(name, { lower: true, strict: true });
            const existing = await this.prisma.product.findUnique({ where: { slug: newSlug } });
            if (existing && existing.id !== id) {
                throw new common_1.BadRequestException('Otro producto ya tiene ese nombre');
            }
        }
        let subcategoryId;
        if (dto.subcategorySlug?.trim()) {
            const subcategory = await this.prisma.subcategory.findUnique({
                where: { slug: dto.subcategorySlug.trim() },
            });
            if (!subcategory)
                throw new common_1.BadRequestException('Subcategoría no encontrada');
            subcategoryId = subcategory.id;
        }
        else if (dto.subcategoryId?.trim()) {
            const subcategory = await this.prisma.subcategory.findUnique({
                where: { id: dto.subcategoryId },
            });
            if (!subcategory)
                throw new common_1.BadRequestException('Subcategoría no encontrada');
            subcategoryId = subcategory.id;
        }
        return this.prisma.product.update({
            where: { id },
            data: {
                ...(name?.trim() && { name }),
                ...(newSlug && { slug: newSlug }),
                ...(description?.trim() && { description }),
                ...(brand?.trim() && { brand }),
                ...(subcategoryId && { subcategoryId }),
                ...(dto.weight !== undefined && { weight: dto.weight }),
                ...(dto.height !== undefined && { height: dto.height }),
                ...(dto.width !== undefined && { width: dto.width }),
                ...(dto.depth !== undefined && { depth: dto.depth }),
                ...(dto.price !== undefined && { price: dto.price }),
                ...(dto.currency && { currency: dto.currency }),
                ...(dto.stock !== undefined && { stock: dto.stock }),
                ...(dto.isActive !== undefined && { isActive: dto.isActive }),
                ...(dto.imageUrl !== undefined && { imageUrl: dto.imageUrl.trim() }),
            },
            include: {
                subcategory: true,
            },
        });
    }
    async updateBySlug(slug, dto) {
        const product = await this.prisma.product.findUnique({ where: { slug } });
        if (!product)
            throw new common_1.NotFoundException('Producto no encontrado');
        return this.update(product.id, dto);
    }
    async remove(id) {
        const product = await this.prisma.product.findUnique({ where: { id } });
        if (!product)
            throw new common_1.NotFoundException('Producto no encontrado');
        return this.prisma.product.delete({ where: { id } });
    }
    async removeBySlug(slug) {
        const product = await this.prisma.product.findUnique({ where: { slug } });
        if (!product)
            throw new common_1.NotFoundException('Producto no encontrado');
        return this.prisma.product.delete({ where: { slug } });
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map