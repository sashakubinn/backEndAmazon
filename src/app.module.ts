import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { getJwtConfig } from './config/jwt.config';
import { PrismaService } from './prisma.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { StatisticsModule } from './statistics/statistics.module';
import { PaginationModule } from './pagination/pagination.module';

@Module({
  imports: [AuthModule, UserModule, JwtModule, ConfigModule, ProductModule, ReviewModule, CategoryModule, OrderModule, StatisticsModule, PaginationModule],
  controllers: [AppController, UserController],
  providers: [AppService, PrismaService, UserService, ConfigService],
})
export class AppModule {}
