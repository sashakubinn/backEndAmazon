import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CategoryService } from 'src/category/category.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { convertToNumber } from 'src/utils/convert-to-number';
import { PrismaService } from './../prisma.service';
import { generateSlug } from './../utils/generate-slug';
import { EnumProductSort, GetAllProductDto } from './dto/get-all-product.dto';
import { ProductDto } from './product.dto';
import {
  productReturnObject,
  productReturnObjectFullest,
} from './return-product.object';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService,
    private categoryService: CategoryService,
  ) {}

  async getAll(dto: GetAllProductDto = {}) {
    const { perPage, skip } = this.paginationService.getPagination(dto);
    const filters = this.createFilter(dto);
    const products = await this.prisma.product.findMany({
      where: filters,
      orderBy: this.getSortOption(dto.sort),
      skip,
      take: perPage,
      select: productReturnObject,
    });
    return {
      products,
      length: await this.prisma.product.count({
        where: filters,
      }),
    };
  }

  private createFilter(dto: GetAllProductDto): Prisma.ProductWhereInput {
    const filters: Prisma.ProductWhereInput[] = [];

    if (dto.searchTerm) filters.push(this.getSearchFilter(dto.searchTerm));

    if (dto.ratings)
      filters.push(
        this.getRatingFilter(dto.ratings.split('|').map((rating) => +rating)),
      );

    if (dto.minPrice || dto.maxPrice)
      filters.push(
        this.getPriceFilter(Number(dto.minPrice), Number(dto.maxPrice)),
      );
    if (dto.categoryId) filters.push(this.getCategoryFilter(+dto.categoryId));
    return filters.length ? { AND: filters } : {};
  }

  private getSortOption(
    sort: EnumProductSort,
  ): Prisma.ProductOrderByWithRelationInput[] {
    switch (sort) {
      case EnumProductSort.LOW_PRICE:
        return [{ price: 'asc' }];
      case EnumProductSort.HIGH_PRICE:
        return [{ price: 'desc' }];
      case EnumProductSort.OLDEST:
        return [{ createdAt: 'asc' }];
      case EnumProductSort.NEWEST:
        return [{ createdAt: 'desc' }];
    }
  }

  private getCategoryFilter(categoryId: number): Prisma.ProductWhereInput {
    return {
      categoryId,
    };
  }

  private getPriceFilter(
    minPrice?: number,
    maxPrice?: number,
  ): Prisma.ProductWhereInput {
    let priceFilter: Prisma.IntFilter | undefined = undefined;
    if (minPrice) {
      priceFilter = {
        ...priceFilter,
        gte: minPrice,
      };
    }
    if (maxPrice) {
      priceFilter = {
        ...priceFilter,
        lte: maxPrice,
      };
    }
    return {
      price: priceFilter,
    };
  }

  private getRatingFilter(ratings: number[]): Prisma.ProductWhereInput {
    return {
      reviews: {
        some: {
          rating: {
            in: ratings,
          },
        },
      },
    };
  }

  private getSearchFilter(searchTerm: string): Prisma.ProductWhereInput {
    return {
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
