import { PrismaService } from './../prisma.service';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StatisticsService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async getMain(userId: number) {
    const user = await this.userService.byId(userId, {
      orders: {
        select: {
          items: true,
        },
      },
      reviews: true,
    });

    // for (let order of user.orders) {
    // 	let total = 0
    //   for (let vote of order.) {
    //     vote_sum += vote.value;
    //   }
    // 		:(question as any).vote_sum = vote_sum
    // }
    return user.orders;
    return [
      {
        name: 'Orders',
        value: user.orders.length,
      },
      {
        name: 'Reviews',
        value: user.reviews.length,
      },
      {
        name: 'Favorites',
        value: user.favorites.length,
      },
      {
        name: 'Total amount',
        value: 1000,
      },
    ];
  }
}
