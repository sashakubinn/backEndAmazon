import { CategoryService } from 'src/category/category.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { PrismaService } from './../prisma.service';
import { GetAllProductDto } from './dto/get-all-product.dto';
import { ProductDto } from './product.dto';
export declare class ProductService {
    private prisma;
    private paginationService;
    private categoryService;
    constructor(prisma: PrismaService, paginationService: PaginationService, categoryService: CategoryService);
    getAll(dto?: GetAllProductDto): Promise<{
        products: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            slug: string;
            description: string;
            price: number;
            images: string[];
            categoryId: number;
            userId: number;
            orderItems: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                quantity: number;
                price: number;
                productId: number;
                orderId: number;
            }[];
            reviews: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                rating: number;
                text: string;
                userId: number;
                productId: number;
            }[];
            category: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                slug: string;
            };
            user: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                email: string;
                password: string;
                isAdmin: boolean;
                name: string;
                avatarPath: string;
                phone: string;
            };
            _count: {
                orderItems: number;
                reviews: number;
                category: number;
                user: number;
            };
        }[];
        length: number;
    }>;
    private createFilter;
    private getSortOption;
    private getCategoryFilter;
    private getPriceFilter;
    private getRatingFilter;
    private getSearchFilter;
    byId(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        description: string;
        price: number;
        images: string[];
        categoryId: number;
        userId: number;
        orderItems: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            quantity: number;
            price: number;
            productId: number;
            orderId: number;
        }[];
        reviews: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            rating: number;
            text: string;
            userId: number;
            productId: number;
        }[];
        category: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            slug: string;
        };
        user: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            password: string;
            isAdmin: boolean;
            name: string;
            avatarPath: string;
            phone: string;
        };
        _count: {
            orderItems: number;
            reviews: number;
            category: number;
            user: number;
        };
    }>;
    create(): Promise<number>;
    update(id: number, dto: ProductDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        description: string;
        price: number;
        images: string[];
        categoryId: number;
        userId: number;
    }>;
    delete(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        description: string;
        price: number;
        images: string[];
        categoryId: number;
        userId: number;
    }>;
    getByCategory(categorySlug: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        description: string;
        price: number;
        images: string[];
        categoryId: number;
        userId: number;
    }[]>;
    bySlug(slug: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        description: string;
        price: number;
        images: string[];
        categoryId: number;
        userId: number;
        orderItems: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            quantity: number;
            price: number;
            productId: number;
            orderId: number;
        }[];
        reviews: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            rating: number;
            text: string;
            userId: number;
            productId: number;
        }[];
        category: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            slug: string;
        };
        user: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            password: string;
            isAdmin: boolean;
            name: string;
            avatarPath: string;
            phone: string;
        };
        _count: {
            orderItems: number;
            reviews: number;
            category: number;
            user: number;
        };
    }>;
    getSimilar(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        description: string;
        price: number;
        images: string[];
        categoryId: number;
        userId: number;
        orderItems: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            quantity: number;
            price: number;
            productId: number;
            orderId: number;
        }[];
        reviews: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            rating: number;
            text: string;
            userId: number;
            productId: number;
        }[];
        category: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            slug: string;
        };
        user: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            password: string;
            isAdmin: boolean;
            name: string;
            avatarPath: string;
            phone: string;
        };
        _count: {
            orderItems: number;
            reviews: number;
            category: number;
            user: number;
        };
    }[]>;
}
