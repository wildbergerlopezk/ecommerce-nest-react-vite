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
exports.SubcategoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const slugify_1 = require("slugify");
let SubcategoriesService = class SubcategoriesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        if (dto.categorySlug !== undefined && dto.categorySlug.trim() === '') {
            throw new common_1.BadRequestException('categorySlug no puede estar vacío');
        }
        const name = dto.name.trim();
        if (!name) {
            throw new common_1.BadRequestException('El nombre no puede estar vacío');
        }
        let category;
        if (dto.categoryId?.trim()) {
            category = await this.prisma.category.findUnique({ where: { id: dto.categoryId } });
        }
        else if (dto.categorySlug?.trim()) {
            category = await this.prisma.category.findUnique({ where: { slug: dto.categorySlug } });
        }
        if (!category) {
            throw new common_1.BadRequestException('Categoría padre no encontrada');
        }
        const slug = (0, slugify_1.default)(name, { lower: true, strict: true });
        const existing = await this.prisma.subcategory.findUnique({ where: { slug } });
        if (existing) {
            throw new common_1.BadRequestException('Ya existe una subcategoría con ese nombre');
        }
        return this.prisma.subcategory.create({
            data: {
                name,
                description: dto.description?.trim() || null,
                slug,
                categoryId: category.id,
            },
            include: { category: true, products: true },
        });
    }
    async findAll() {
        return this.prisma.subcategory.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                category: true,
                products: true,
            },
        });
    }
    async findOne(id) {
        const subcategory = await this.prisma.subcategory.findUnique({
            where: { id },
            include: {
                category: true,
                products: true,
            },
        });
        if (!subcategory)
            throw new common_1.NotFoundException('Subcategoría no encontrada');
        return subcategory;
    }
    async findBySlug(slug) {
        const subcategory = await this.prisma.subcategory.findUnique({
            where: { slug },
            include: {
                category: true,
                products: true,
            },
        });
        if (!subcategory)
            throw new common_1.NotFoundException('Subcategoría no encontrada');
        return subcategory;
    }
    async update(id, dto) {
        if (dto.categorySlug !== undefined && dto.categorySlug.trim() === '') {
            throw new common_1.BadRequestException('categorySlug no puede estar vacío');
        }
        const subcategory = await this.prisma.subcategory.findUnique({ where: { id } });
        if (!subcategory)
            throw new common_1.NotFoundException('Subcategoría no encontrada');
        const { name, description } = dto;
        const isSameName = !name || name.trim() === subcategory.name;
        const isSameDescription = !description || description.trim() === subcategory.description;
        const isSameCategorySlug = !dto.categorySlug;
        const isSameCategoryId = !dto.categoryId;
        if (isSameName && isSameDescription && isSameCategorySlug && isSameCategoryId) {
            return subcategory;
        }
        let newSlug;
        if (name?.trim()) {
            newSlug = (0, slugify_1.default)(name, { lower: true, strict: true });
            const existing = await this.prisma.subcategory.findUnique({ where: { slug: newSlug } });
            if (existing && existing.id !== id) {
                throw new common_1.BadRequestException('Otra subcategoría ya tiene ese nombre');
            }
        }
        let categoryId;
        if (dto.categorySlug?.trim()) {
            const category = await this.prisma.category.findUnique({ where: { slug: dto.categorySlug } });
            if (!category)
                throw new common_1.BadRequestException('Categoría padre no encontrada');
            categoryId = category.id;
        }
        else if (dto.categoryId?.trim()) {
            const category = await this.prisma.category.findUnique({ where: { id: dto.categoryId } });
            if (!category)
                throw new common_1.BadRequestException('Categoría padre no encontrada');
            categoryId = category.id;
        }
        return this.prisma.subcategory.update({
            where: { id },
            data: {
                ...(name?.trim() && { name }),
                ...(description?.trim() && { description }),
                ...(newSlug && { slug: newSlug }),
                ...(categoryId && { category: { connect: { id: categoryId } } }),
            },
            include: {
                category: true,
                products: true,
            },
        });
    }
    async updateBySlug(slug, dto) {
        if (dto.categorySlug !== undefined && dto.categorySlug.trim() === '') {
            throw new common_1.BadRequestException('categorySlug no puede estar vacío');
        }
        const subcategory = await this.prisma.subcategory.findUnique({ where: { slug } });
        if (!subcategory)
            throw new common_1.NotFoundException('Subcategoría no encontrada');
        const { name, description } = dto;
        const isSameName = !name || name.trim() === subcategory.name;
        const isSameDescription = !description || description.trim() === subcategory.description;
        const isSameCategorySlug = !dto.categorySlug;
        const isSameCategoryId = !dto.categoryId;
        if (isSameName && isSameDescription && isSameCategorySlug && isSameCategoryId) {
            return subcategory;
        }
        let newSlug;
        if (name?.trim()) {
            newSlug = (0, slugify_1.default)(name, { lower: true, strict: true });
            const existing = await this.prisma.subcategory.findUnique({ where: { slug: newSlug } });
            if (existing && existing.id !== subcategory.id) {
                throw new common_1.BadRequestException('Otra subcategoría ya tiene ese nombre');
            }
        }
        let categoryId;
        if (dto.categorySlug?.trim()) {
            const category = await this.prisma.category.findUnique({ where: { slug: dto.categorySlug } });
            if (!category)
                throw new common_1.BadRequestException('Categoría padre no encontrada');
            categoryId = category.id;
        }
        else if (dto.categoryId?.trim()) {
            const category = await this.prisma.category.findUnique({ where: { id: dto.categoryId } });
            if (!category)
                throw new common_1.BadRequestException('Categoría padre no encontrada');
            categoryId = category.id;
        }
        return this.prisma.subcategory.update({
            where: { slug },
            data: {
                ...(name?.trim() && { name }),
                ...(description?.trim() && { description }),
                ...(newSlug && { slug: newSlug }),
                ...(categoryId && { category: { connect: { id: categoryId } } }),
            },
            include: {
                category: true,
                products: true,
            },
        });
    }
    async remove(id) {
        const subcategory = await this.prisma.subcategory.findUnique({ where: { id } });
        if (!subcategory)
            throw new common_1.NotFoundException('Subcategoría no encontrada');
        return this.prisma.subcategory.delete({ where: { id } });
    }
    async removeBySlug(slug) {
        const subcategory = await this.prisma.subcategory.findUnique({ where: { slug } });
        if (!subcategory)
            throw new common_1.NotFoundException('Subcategoría no encontrada');
        return this.prisma.subcategory.delete({ where: { slug } });
    }
};
exports.SubcategoriesService = SubcategoriesService;
exports.SubcategoriesService = SubcategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SubcategoriesService);
//# sourceMappingURL=subcategories.service.js.map