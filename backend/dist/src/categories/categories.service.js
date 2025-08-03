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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const slugify_1 = require("slugify");
const prisma_service_1 = require("../../prisma/prisma.service");
let CategoriesService = class CategoriesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const slug = (0, slugify_1.default)(dto.name, { lower: true, strict: true });
        const existingByName = await this.prisma.category.findUnique({
            where: { slug },
        });
        if (existingByName) {
            throw new common_1.BadRequestException('Ya existe una categoría con ese nombre');
        }
        return this.prisma.category.create({
            data: {
                ...dto,
                slug,
            },
        });
    }
    async findAll() {
        return this.prisma.category.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const category = await this.prisma.category.findUnique({ where: { id } });
        if (!category)
            throw new common_1.NotFoundException('Categoría no encontrada');
        return category;
    }
    async findBySlug(slug) {
        const category = await this.prisma.category.findUnique({
            where: { slug },
            include: {
                subcategories: {
                    include: {
                        products: true,
                    },
                },
            },
        });
        if (!category)
            throw new common_1.NotFoundException('Categoría no encontrada');
        return category;
    }
    async update(id, dto) {
        const category = await this.prisma.category.findUnique({ where: { id } });
        if (!category)
            throw new common_1.NotFoundException('Categoría no encontrada');
        let slug;
        if (dto.name) {
            slug = (0, slugify_1.default)(dto.name, { lower: true, strict: true });
            const existing = await this.prisma.category.findUnique({
                where: { slug },
            });
            if (existing && existing.id !== id) {
                throw new common_1.BadRequestException('Otra categoría ya tiene ese nombre');
            }
        }
        return this.prisma.category.update({
            where: { id },
            data: {
                ...dto,
                ...(slug && { slug }),
            },
        });
    }
    async updateBySlug(slug, dto) {
        const category = await this.prisma.category.findUnique({ where: { slug } });
        if (!category)
            throw new common_1.NotFoundException('Categoría no encontrada');
        let newSlug;
        if (dto.name) {
            newSlug = (0, slugify_1.default)(dto.name, { lower: true, strict: true });
            const existing = await this.prisma.category.findUnique({ where: { slug: newSlug } });
            if (existing && existing.id !== category.id) {
                throw new common_1.BadRequestException('Otra categoría ya tiene ese nombre');
            }
        }
        return this.prisma.category.update({
            where: { slug },
            data: {
                ...dto,
                ...(newSlug && { slug: newSlug }),
            },
        });
    }
    async remove(id) {
        const category = await this.prisma.category.findUnique({ where: { id } });
        if (!category)
            throw new common_1.NotFoundException('Categoría no encontrada');
        return this.prisma.category.delete({ where: { id } });
    }
    async removeBySlug(slug) {
        const category = await this.prisma.category.findUnique({ where: { slug } });
        if (!category)
            throw new common_1.NotFoundException('Categoría no encontrada');
        return this.prisma.category.delete({ where: { slug } });
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map