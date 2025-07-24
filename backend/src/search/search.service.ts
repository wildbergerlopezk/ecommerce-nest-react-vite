import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { searchModelMap } from './search-models.config';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async searchByName(model: string, name: string) {
    if (!name.trim()) {
      throw new BadRequestException('El término de búsqueda no puede estar vacío');
    }

    const handler = searchModelMap[model];
    if (!handler) {
      throw new BadRequestException('Modelo no soportado');
    }

    return handler(this.prisma, name);
  }
}
