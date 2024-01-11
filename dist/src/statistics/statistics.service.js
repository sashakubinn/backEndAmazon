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
exports.StatisticsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./../prisma.service");
const user_service_1 = require("./../user/user.service");
let StatisticsService = class StatisticsService {
    constructor(prisma, userService) {
        this.prisma = prisma;
        this.userService = userService;
    }
    async getMain() {
        const ordersCount = await this.prisma.order.count();
        const reviewCount = await this.prisma.review.count();
        const usersCount = await this.prisma.user.count();
        const totalAmount = await this.prisma.order.aggregate({
            _sum: {
                total: true,
            },
        });
        return [
            {
                name: 'Orders',
                value: ordersCount,
            },
            {
                name: 'Reviews',
                value: reviewCount,
            },
            {
                name: 'Favorites',
                value: usersCount,
            },
            {
                name: 'Total amount',
                value: totalAmount._sum.total || 0,
            },
        ];
    }
};
exports.StatisticsService = StatisticsService;
exports.StatisticsService = StatisticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_service_1.UserService])
], StatisticsService);
//# sourceMappingURL=statistics.service.js.map