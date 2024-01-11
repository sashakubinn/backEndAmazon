import { UserDto } from './user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getProfile(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        reviews: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            rating: number;
            text: string;
            userId: number;
            productId: number;
        }[];
        _count: {
            orders: number;
            reviews: number;
            favorites: number;
        };
        email: string;
        password: string;
        isAdmin: boolean;
        avatarPath: string;
        phone: string;
        orders: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.EnumOrderStatus;
            total: number;
            userId: number;
        }[];
        favorites: {
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
        }[];
    }>;
    updateProfile(id: number, dto: UserDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        isAdmin: boolean;
        name: string;
        avatarPath: string;
        phone: string;
    }>;
    toggleFavorite(id: number, productId: string): Promise<string>;
}
