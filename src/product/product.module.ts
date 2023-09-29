import { PaginationService } from './../pagination/pagination.service';
import { PrismaService } from 'src/prisma.service';
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService, PaginationService],
})
export class ProductModule {}
