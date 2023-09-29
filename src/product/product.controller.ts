import { ProductDto } from './product.dto';
import { GetAllProductDto } from './dto/get-all-product.dto';
import {
  Controller,
  UsePipes,
  ValidationPipe,
  Get,
  Query,
  Param,
  HttpCode,
  Post,
  Put,
  Body,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  async getAll(@Query() queryDto: GetAllProductDto) {
    return this.productService.getAll(queryDto);
  }

  @Get('similar/:id')
  async getSimilar(@Param('id') id: string) {
    return this.productService.getSimilar(+id);
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return this.productService.byId(+id);
  }

  @Get('by-slug/:slug')
  async getProductBySlug(@Param('slug') slug: string) {
    return this.productService.bySlug(slug);
  }

  @Get('by-category/:categorySlug')
  async getByCategory(@Param('categorySlug') categorySlug: string) {
    return this.productService.getByCategory(categorySlug);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  async createProduct() {
    return this.productService.create();
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() dto: ProductDto) {
    return this.productService.update(+id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.productService.delete(+id);
  }
}
