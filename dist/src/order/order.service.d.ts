import { PrismaService } from './../prisma.service';
export declare class OrderService {
    private prisma;
    constructor(prisma: PrismaService);
    getAll(userId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.EnumOrderStatus;
        total: number;
        userId: number;
    }[]>;
}
