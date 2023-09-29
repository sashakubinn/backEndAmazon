import { Prisma } from '@prisma/client';
import { EnumProductSort, GetAllProductDto } from './dto/get-all-product.dto';
import { PrismaService } from './../prisma.service';
import { generateSlug } from './../utils/generate-slug';
import {
  productReturnObject,
  productReturnObjectFullest,
} from './return-product.object';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductDto } from './product.dto';
import { PaginationService } from 'src/pagination/pagination.service';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService,
  ) {}

  async getAll(dto: GetAllProductDto = {}) {
    const { sort, searchTerm } = dto;

    const prismaSort: Prisma.ProductOrderByWithRelationInput[] = [];

    if (sort === EnumProductSort.LOW_PRICE) prismaSort.push({ price: 'asc' });
    else if (sort === EnumProductSort.HIGH_PRICE)
      prismaSort.push({ price: 'desc' });
    else if (sort === EnumProductSort.OLDEST)
      prismaSort.push({ createdAt: 'asc' });
    else prismaSort.push({ createdAt: 'desc' });

    const prismaSearchTermFilter: Prisma.ProductWhereInput = searchTerm
      ? {
          OR: [
            {
              category: {
                name: {
                  contains: searchTerm,
                  mode: 'insensitive',
                },
              },
            },
            {
              name: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          ],
        }
      : {};

    const { perPage, skip } = this.paginationService.getPagination(dto);
    const products = await this.prisma.product.findMany({
      where: prismaSearchTermFilter,
      orderBy: prismaSort,
      skip,
      take: perPage,
      select: productReturnObject,
    });
    return {
      products,
      length: await this.prisma.product.count({
        where: prismaSearchTermFilter,
      }),
    };
  }

  async byId(id: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
      select: productReturnObjectFullest,
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
  async create() {
    const product = await this.prisma.product.create({
      data: {
        description: '',
        name: '',
        price: 0,
        slug: '',
      },
    });
    return product.id;
  }

  async update(id: number, dto: ProductDto) {
    const { categoryId, description, images, name, price } = dto;
    return this.prisma.product.update({
      where: {
        id,
      },
      data: {
        description,
        images,
        price,
        name,
        slug: generateSlug(name),
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });
  }
  async delete(id: number) {
    return this.prisma.product.delete({
      where: {
        id,
      },
    });
  }

  async getByCategory(categorySlug: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        slug: categorySlug,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const products = await this.prisma.product.findMany({
      where: {
        category: {
          slug: categorySlug,
        },
      },
    });

    return products;
  }

  async bySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        slug,
      },
      select: productReturnObjectFullest,
    });
    if (!product) {
      throw new NotFoundException('Category not found');
    }
    return product;
  }
  async getSimilar(id: number) {
    const currentProduct = await this.byId(id);
    if (!currentProduct) {
      throw new NotFoundException('Current product not found');
    }
    const products = await this.prisma.product.findMany({
      where: {
        category: {
          name: currentProduct.category.name,
        },
        NOT: {
          id: currentProduct.id,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: productReturnObject,
    });
    return products;
  }
}
