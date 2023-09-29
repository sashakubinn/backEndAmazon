import { generateSlug } from './../utils/generate-slug';
import { returnCategoryObject } from './return-category.object';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async byId(id: number) {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
      select: returnCategoryObject,
    });
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  }
  async create(dto: CategoryDto) {
    const existingCategory = await this.prisma.category.findUnique({
      where: {
        name: dto.name,
      },
    });

    if (existingCategory) {
      throw new Error('Category with the same name already exists');
    }

    const newCategory = {
      name: dto.name,
      slug: generateSlug(dto.name),
    };

    return this.prisma.category.create({
      data: newCategory,
    });
  }

  async update(id: number, dto: CategoryDto) {
    return this.prisma.category.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
        slug: generateSlug(dto.name),
      },
    });
  }
  async delete(id: number) {
    return this.prisma.category.delete({
      where: {
        id,
      },
    });
  }
  async getAll() {
    return this.prisma.category.findMany({
      select: returnCategoryObject,
    });
  }
  async bySlug(slug: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        slug,
      },
      select: returnCategoryObject,
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }
}
