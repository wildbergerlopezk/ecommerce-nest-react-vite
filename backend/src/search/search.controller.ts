import {
  Controller,
  Get,
  Query,
  BadRequestException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SearchService } from './search.service';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async search(
    @Query('model') model: string,
    @Query('q') query: string,
  ) {
    if (!model || !query || !query.trim()) {
      throw new BadRequestException('Debes proporcionar un modelo y un término de búsqueda válido');
    }

    return this.searchService.searchByName(model.toLowerCase(), query.trim());
  }
}
