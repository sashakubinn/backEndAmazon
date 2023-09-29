import { CategoryDto } from './category.dto';
import { CategoryService } from './category.service';
import { Controller, Get, Param, Patch, Put, Delete } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Body, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAll() {
    return this.categoryService.getAll();
  }

  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.categoryService.bySlug(slug);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.categoryService.byId(+id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  async update(@Param('id') categoryId: string, @Body() dto: CategoryDto) {
    return this.categoryService.update(+categoryId, dto);
  }

  @HttpCode(200)
  @Post()
  async create(@Body() dto: CategoryDto) {
    return this.categoryService.create(dto);
  }

  @HttpCode(200)
  @Delete(':id')
  async delete(@Param('id') categoryId: string) {
    return this.categoryService.delete(+categoryId);
  }
}
