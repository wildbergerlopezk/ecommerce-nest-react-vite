import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import slugify from 'slugify';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCategoryDto) {
    const slug = slugify(dto.name, { lower: true, strict: true });

    const existingByName = await this.prisma.category.findUnique({
      where: { slug },
    });

    if (existingByName) {
      throw new BadRequestException('Ya existe una categoría con ese nombre');
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

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundException('Categoría no encontrada');
    return category;
  }

  async findBySlug(slug: string) {
  const category = await this.prisma.category.findUnique({
    where: { slug },
  });

  if (!category) throw new NotFoundException('Categoría no encontrada');

  return category;  
  } 

  async update(id: string, dto: UpdateCategoryDto) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundException('Categoría no encontrada');

    let slug: string | undefined;
    if (dto.name) {
      slug = slugify(dto.name, { lower: true, strict: true });

      // Verificar que el slug nuevo no choque con otro registro distinto
      const existing = await this.prisma.category.findUnique({
        where: { slug },
      });

      if (existing && existing.id !== id) {
        throw new BadRequestException('Otra categoría ya tiene ese nombre');
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

  async updateBySlug(slug: string, dto: UpdateCategoryDto) {
  const category = await this.prisma.category.findUnique({ where: { slug } });
  if (!category) throw new NotFoundException('Categoría no encontrada');

  let newSlug: string | undefined;
  if (dto.name) {
    newSlug = slugify(dto.name, { lower: true, strict: true });

    const existing = await this.prisma.category.findUnique({ where: { slug: newSlug } });
    if (existing && existing.id !== category.id) {
      throw new BadRequestException('Otra categoría ya tiene ese nombre');
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

  async remove(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundException('Categoría no encontrada');

    return this.prisma.category.delete({ where: { id } });
  }

  async removeBySlug(slug: string) {
  const category = await this.prisma.category.findUnique({ where: { slug } });
  if (!category) throw new NotFoundException('Categoría no encontrada');

  return this.prisma.category.delete({ where: { slug } });
  }

}
