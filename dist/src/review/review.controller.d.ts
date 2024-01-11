import { ReviewDto } from './review.dto';
import { ReviewService } from './review.service';
export declare class ReviewController {
    private reviewService;
    constructor(reviewService: ReviewService);
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
    leaveReview(id: number, dto: ReviewDto, productId: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        rating: number;
        text: string;
        userId: number;
        productId: number;
    } | {
        error: any;
    }>;
    getAvarageByProduct(productId: string): Promise<{
        rating: number;
    }>;
}
