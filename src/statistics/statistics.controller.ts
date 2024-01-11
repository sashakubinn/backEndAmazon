import { PrismaService } from 'src/prisma.service';
import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { StatisticsService } from './statistics.service';
import { UserService } from 'src/user/user.service';

@Controller('statistics')
export class StatisticsController {
  constructor(
    private readonly statisticsService: StatisticsService,
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  @Get('main')
  getMainStatics() {
    return this.statisticsService.getMain();
  }
}
