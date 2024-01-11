import { PrismaService } from 'src/prisma.service';
import { StatisticsService } from './statistics.service';
import { UserService } from 'src/user/user.service';
export declare class StatisticsController {
    private readonly statisticsService;
    private prisma;
    private userService;
    constructor(statisticsService: StatisticsService, prisma: PrismaService, userService: UserService);
    getMainStatics(): Promise<{
        name: string;
        value: number;
    }[]>;
}
