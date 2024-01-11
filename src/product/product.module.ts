import { CategoryService } from 'src/category/category.service';
import { PaginationService } from './../pagination/pagination.service';
import { PrismaService } from 'src/prisma.service';
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CategoryModule } from 'src/category/category.module';

@Module({
  controllers: [ProductController],
  imports: [CategoryModule],
  providers: [
    ProductService,
    PrismaService,
    PaginationService,
    CategoryService,
  ],
})
export class ProductModule {}
