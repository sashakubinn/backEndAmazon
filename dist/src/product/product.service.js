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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const category_service_1 = require("../category/category.service");
const pagination_service_1 = require("../pagination/pagination.service");
const prisma_service_1 = require("./../prisma.service");
const generate_slug_1 = require("./../utils/generate-slug");
const get_all_product_dto_1 = require("./dto/get-all-product.dto");
const return_product_object_1 = require("./return-product.object");
let ProductService = class ProductService {
    constructor(prisma, paginationService, categoryService) {
        this.prisma = prisma;
        this.paginationService = paginationService;
        this.categoryService = categoryService;
    }
    async getAll(dto = {}) {
        const { perPage, skip } = this.paginationService.getPagination(dto);
        const filters = this.createFilter(dto);
        const products = await this.prisma.product.findMany({
            where: filters,
            orderBy: this.getSortOption(dto.sort),
            skip,
            take: perPage,
            select: return_product_object_1.productReturnObject,
        });
        return {
            products,
            length: await this.prisma.product.count({
                where: filters,
            }),
        };
    }
    createFilter(dto) {
        const filters = [];
        if (dto.searchTerm)
            filters.push(this.getSearchFilter(dto.searchTerm));
        if (dto.ratings)
            filters.push(this.getRatingFilter(dto.ratings.split('|').map((rating) => +rating)));
        if (dto.minPrice || dto.maxPrice)
            filters.push(this.getPriceFilter(Number(dto.minPrice), Number(dto.maxPrice)));
        if (dto.categoryId)
            filters.push(this.getCategoryFilter(+dto.categoryId));
        return filters.length ? { AND: filters } : {};
    }
    getSortOption(sort) {
        switch (sort) {
            case get_all_product_dto_1.EnumProductSort.LOW_PRICE:
                return [{ price: 'asc' }];
            case get_all_product_dto_1.EnumProductSort.HIGH_PRICE:
                return [{ price: 'desc' }];
            case get_all_product_dto_1.EnumProductSort.OLDEST:
                return [{ createdAt: 'asc' }];
            case get_all_product_dto_1.EnumProductSort.NEWEST:
                return [{ createdAt: 'desc' }];
        }
    }
    getCategoryFilter(categoryId) {
        return {
            categoryId,
        };
    }
    getPriceFilter(minPrice, maxPrice) {
        let priceFilter = undefined;
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
    getRatingFilter(ratings) {
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
    getSearchFilter(searchTerm) {
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
    async byId(id) {
        const product = await this.prisma.product.findUnique({
            where: {
                id,
            },
            select: return_product_object_1.productReturnObjectFullest,
        });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
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
    async update(id, dto) {
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
                slug: (0, generate_slug_1.generateSlug)(name),
                category: {
                    connect: {
                        id: categoryId,
                    },
                },
            },
        });
    }
    async delete(id) {
        return this.prisma.product.delete({
            where: {
                id,
            },
        });
    }
    async getByCategory(categorySlug) {
        const category = await this.prisma.category.findUnique({
            where: {
                slug: categorySlug,
            },
        });
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
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
    async bySlug(slug) {
        const product = await this.prisma.product.findUnique({
            where: {
                slug,
            },
            select: return_product_object_1.productReturnObjectFullest,
        });
        if (!product) {
            throw new common_1.NotFoundException('Category not found');
        }
        return product;
    }
    async getSimilar(id) {
        const currentProduct = await this.byId(id);
        if (!currentProduct) {
            throw new common_1.NotFoundException('Current product not found');
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
            select: return_product_object_1.productReturnObject,
        });
        return products;
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        pagination_service_1.PaginationService,
        category_service_1.CategoryService])
], ProductService);
//# sourceMappingURL=product.service.js.map