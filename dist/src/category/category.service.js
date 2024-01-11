"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const generate_slug_1 = require("./../utils/generate-slug");
const return_category_object_1 = require("./return-category.object");
const prisma_service_1 = require("../prisma.service");
const common_1 = require("@nestjs/common");
let CategoryService = class CategoryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async byId(id) {
        const category = await this.prisma.category.findUnique({
            where: {
                id,
            },
            select: return_category_object_1.returnCategoryObject,
        });
        if (!category) {
            throw new Error('Category not found');
        }
        return category;
    }
    async create(dto) {
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
            slug: (0, generate_slug_1.generateSlug)(dto.name),
        };
        return this.prisma.category.create({
            data: newCategory,
        });
    }
    async update(id, dto) {
        return this.prisma.category.update({
            where: {
                id,
            },
            data: {
                name: dto.name,
                slug: (0, generate_slug_1.generateSlug)(dto.name),
            },
        });
    }
    async delete(id) {
        return this.prisma.category.delete({
            where: {
                id,
            },
        });
    }
    async getAll() {
        return this.prisma.category.findMany({
            select: return_category_object_1.returnCategoryObject,
        });
    }
    async bySlug(slug) {
        const category = await this.prisma.category.findUnique({
            where: {
                slug,
            },
            select: return_category_object_1.returnCategoryObject,
        });
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        return category;
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoryService);
//# sourceMappingURL=category.service.js.map