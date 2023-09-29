import { UserService } from './../user/user.service';
import { PrismaService } from 'src/prisma.service';
import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';

@Module({
  controllers: [StatisticsController],
  providers: [StatisticsService, PrismaService, UserService],
})
export class StatisticsModule {}
