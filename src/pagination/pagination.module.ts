import { PrismaService } from 'src/prisma.service';
import { Module } from '@nestjs/common';
import { PaginationService } from './pagination.service';
import { PaginationController } from './pagination.controller';

@Module({
  controllers: [PaginationController],
  providers: [PaginationService, PrismaService],
  exports: [PaginationService],
})
export class PaginationModule {}
