import { ProductDto } from './product.dto';
import { GetAllProductDto } from './dto/get-all-product.dto';
import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getAll(queryDto: GetAllProductDto): Promise<{
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
    getSimilar(id: string): Promise<{
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
    getProductById(id: string): Promise<{
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
    getProductBySlug(slug: string): Promise<{
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
    createProduct(): Promise<number>;
    updateProduct(id: string, dto: ProductDto): Promise<{
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
    deleteProduct(id: string): Promise<{
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
}
