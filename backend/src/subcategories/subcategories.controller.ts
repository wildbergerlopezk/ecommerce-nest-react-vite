import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';

@Controller('subcategories')
export class SubcategoriesController {
  constructor(private readonly subcategoriesService: SubcategoriesService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() dto: CreateSubcategoryDto) {
    return this.subcategoriesService.create(dto);
  }

  @Get()
  findAll() {
    return this.subcategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subcategoriesService.findOne(id);
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.subcategoriesService.findBySlug(slug);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  update(@Param('id') id: string, @Body() dto: UpdateSubcategoryDto) {
    return this.subcategoriesService.update(id, dto);
  }

  @Patch('slug/:slug')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  updateBySlug(@Param('slug') slug: string, @Body() dto: UpdateSubcategoryDto) {
    return this.subcategoriesService.updateBySlug(slug, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subcategoriesService.remove(id);
  }

  @Delete('slug/:slug')
  removeBySlug(@Param('slug') slug: string) {
    return this.subcategoriesService.removeBySlug(slug);
  }
}
