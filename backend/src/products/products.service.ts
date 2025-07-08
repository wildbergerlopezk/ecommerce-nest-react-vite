import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import slugify from 'slugify';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProductDto) {
    const name = dto.name.trim();

    if (!name) {
      throw new BadRequestException('El nombre no puede estar vacío');
    }

    let subcategoryId = dto.subcategoryId?.trim();

    if (!subcategoryId && dto.subcategorySlug?.trim()) {
      const subcategory = await this.prisma.subcategory.findUnique({
        where: { slug: dto.subcategorySlug.trim() },
      });

      if (!subcategory) {
        throw new BadRequestException('Subcategoría con ese slug no encontrada');
      }

      subcategoryId = subcategory.id;
    }

    if (!subcategoryId) {
      throw new BadRequestException('Debés proporcionar subcategoryId o subcategorySlug');
    }

    const slug = slugify(name, { lower: true, strict: true });

    const existing = await this.prisma.product.findUnique({ where: { slug } });
    if (existing) {
      throw new BadRequestException('Ya existe un producto con ese nombre');
    }

    return this.prisma.product.create({
      data: {
        subcategoryId,
        name,
        slug,
        description: dto.description?.trim() || null,
        brand: dto.brand.trim(),
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
        productImages: true,
        productVariants: true,
      },
    });
  }

  async findAll() {
    return this.prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        subcategory: true,
        productImages: true,
        productVariants: true,
      },
    });
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        subcategory: true,
        productImages: true,
        productVariants: true,
      },
    });
    if (!product) throw new NotFoundException('Producto no encontrado');
    return product;
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        subcategory: true,
        productImages: true,
        productVariants: true,
      },
    });
    if (!product) throw new NotFoundException('Producto no encontrado');
    return product;
  }

  async update(id: string, dto: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Producto no encontrado');

    const { name, description, brand } = dto;

    const isSameName = !name || name.trim() === product.name;
    const isSameDescription = !description || description.trim() === product.description;
    const isSameBrand = !brand || brand.trim() === product.brand;
    const isSameSubcategoryId = !dto.subcategoryId;
    const isSameSubcategorySlug = !dto.subcategorySlug;

    if (
      isSameName &&
      isSameDescription &&
      isSameBrand &&
      isSameSubcategoryId &&
      isSameSubcategorySlug
    ) {
      return product;
    }

    let newSlug: string | undefined;
    if (name?.trim()) {
      newSlug = slugify(name, { lower: true, strict: true });
      const existing = await this.prisma.product.findUnique({ where: { slug: newSlug } });
      if (existing && existing.id !== id) {
        throw new BadRequestException('Otro producto ya tiene ese nombre');
      }
    }

    let subcategoryId: string | undefined;
    if (dto.subcategorySlug?.trim()) {
      const subcategory = await this.prisma.subcategory.findUnique({
        where: { slug: dto.subcategorySlug },
      });
      if (!subcategory) throw new BadRequestException('Subcategoría no encontrada');
      subcategoryId = subcategory.id;
    } else if (dto.subcategoryId?.trim()) {
      const subcategory = await this.prisma.subcategory.findUnique({
        where: { id: dto.subcategoryId },
      });
      if (!subcategory) throw new BadRequestException('Subcategoría no encontrada');
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
      },
      include: {
        subcategory: true,
        productImages: true,
        productVariants: true,
      },
    });
  }

  async updateBySlug(slug: string, dto: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({ where: { slug } });
    if (!product) throw new NotFoundException('Producto no encontrado');
    return this.update(product.id, dto);
  }

  async remove(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Producto no encontrado');

    return this.prisma.product.delete({ where: { id } });
  }

  async removeBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({ where: { slug } });
    if (!product) throw new NotFoundException('Producto no encontrado');

    return this.prisma.product.delete({ where: { slug } });
  }
}
