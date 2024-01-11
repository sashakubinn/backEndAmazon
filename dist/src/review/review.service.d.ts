import { PrismaService } from 'src/prisma.service';
import { ReviewDto } from './review.dto';
import { ProductService } from 'src/product/product.service';
export declare class ReviewService {
    private prisma;
    private productService;
    constructor(prisma: PrismaService, productService: ProductService);
    create(userId: number, dto: ReviewDto, productId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        rating: number;
        text: string;
        userId: number;
        productId: number;
    }>;
    getAverageValueByProductId(productId: number): Promise<{
        rating: number;
    }>;
    getAll(): Promise<{
        product: {
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
        };
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
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
        rating: number;
        text: string;
        productId: number;
    }[]>;
}
