import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import slugify from 'slugify';

@Injectable()
export class SubcategoriesService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateSubcategoryDto) {
    if (dto.categorySlug !== undefined && dto.categorySlug.trim() === '') {
      throw new BadRequestException('categorySlug no puede estar vacío');
    }

    const name = dto.name.trim();

    if (!name) {
      throw new BadRequestException('El nombre no puede estar vacío');
    }

    let category;

    if (dto.categoryId?.trim()) {
      category = await this.prisma.category.findUnique({ where: { id: dto.categoryId } });
    } else if (dto.categorySlug?.trim()) {
      category = await this.prisma.category.findUnique({ where: { slug: dto.categorySlug } });
    }

    if (!category) {
      throw new BadRequestException('Categoría padre no encontrada');
    }

    const slug = slugify(name, { lower: true, strict: true });

    const existing = await this.prisma.subcategory.findUnique({ where: { slug } });
    if (existing) {
      throw new BadRequestException('Ya existe una subcategoría con ese nombre');
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

  async findOne(id: string) {
    const subcategory = await this.prisma.subcategory.findUnique({
      where: { id },
      include: {
        category: true,
        products: true,
      },
    });
    if (!subcategory) throw new NotFoundException('Subcategoría no encontrada');
    return subcategory;
  }

  async findBySlug(slug: string) {
    const subcategory = await this.prisma.subcategory.findUnique({
      where: { slug },
      include: {
        category: true,
        products: true,
      },
    });
    if (!subcategory) throw new NotFoundException('Subcategoría no encontrada');
    return subcategory;
  }

  async update(id: string, dto: UpdateSubcategoryDto) {
    if (dto.categorySlug !== undefined && dto.categorySlug.trim() === '') {
      throw new BadRequestException('categorySlug no puede estar vacío');
    }

    const subcategory = await this.prisma.subcategory.findUnique({ where: { id } });
    if (!subcategory) throw new NotFoundException('Subcategoría no encontrada');

    const { name, description } = dto;

    const isSameName = !name || name.trim() === subcategory.name;
    const isSameDescription = !description || description.trim() === subcategory.description;
    const isSameCategorySlug = !dto.categorySlug;
    const isSameCategoryId = !dto.categoryId;

    if (isSameName && isSameDescription && isSameCategorySlug && isSameCategoryId) {
      return subcategory;
    }

    let newSlug: string | undefined;
    if (name?.trim()) {
      newSlug = slugify(name, { lower: true, strict: true });
      const existing = await this.prisma.subcategory.findUnique({ where: { slug: newSlug } });
      if (existing && existing.id !== id) {
        throw new BadRequestException('Otra subcategoría ya tiene ese nombre');
      }
    }

    let categoryId: string | undefined;
    if (dto.categorySlug?.trim()) {
      const category = await this.prisma.category.findUnique({ where: { slug: dto.categorySlug } });
      if (!category) throw new BadRequestException('Categoría padre no encontrada');
      categoryId = category.id;
    } else if (dto.categoryId?.trim()) {
      const category = await this.prisma.category.findUnique({ where: { id: dto.categoryId } });
      if (!category) throw new BadRequestException('Categoría padre no encontrada');
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

  async updateBySlug(slug: string, dto: UpdateSubcategoryDto) {
    if (dto.categorySlug !== undefined && dto.categorySlug.trim() === '') {
      throw new BadRequestException('categorySlug no puede estar vacío');
    }

    const subcategory = await this.prisma.subcategory.findUnique({ where: { slug } });
    if (!subcategory) throw new NotFoundException('Subcategoría no encontrada');

    const { name, description } = dto;

    const isSameName = !name || name.trim() === subcategory.name;
    const isSameDescription = !description || description.trim() === subcategory.description;
    const isSameCategorySlug = !dto.categorySlug;
    const isSameCategoryId = !dto.categoryId;

    if (isSameName && isSameDescription && isSameCategorySlug && isSameCategoryId) {
      return subcategory;
    }

    let newSlug: string | undefined;
    if (name?.trim()) {
      newSlug = slugify(name, { lower: true, strict: true });
      const existing = await this.prisma.subcategory.findUnique({ where: { slug: newSlug } });
      if (existing && existing.id !== subcategory.id) {
        throw new BadRequestException('Otra subcategoría ya tiene ese nombre');
      }
    }

    let categoryId: string | undefined;
    if (dto.categorySlug?.trim()) {
      const category = await this.prisma.category.findUnique({ where: { slug: dto.categorySlug } });
      if (!category) throw new BadRequestException('Categoría padre no encontrada');
      categoryId = category.id;
    } else if (dto.categoryId?.trim()) {
      const category = await this.prisma.category.findUnique({ where: { id: dto.categoryId } });
      if (!category) throw new BadRequestException('Categoría padre no encontrada');
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

  async remove(id: string) {
    const subcategory = await this.prisma.subcategory.findUnique({ where: { id } });
    if (!subcategory) throw new NotFoundException('Subcategoría no encontrada');

    return this.prisma.subcategory.delete({ where: { id } });
  }

  async removeBySlug(slug: string) {
    const subcategory = await this.prisma.subcategory.findUnique({ where: { slug } });
    if (!subcategory) throw new NotFoundException('Subcategoría no encontrada');

    return this.prisma.subcategory.delete({ where: { slug } });
  }
}
