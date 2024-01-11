import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { PaginationModule } from './pagination/pagination.module';
import { PrismaService } from './prisma.service';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { StatisticsModule } from './statistics/statistics.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: '/uploads',
    }),
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    JwtModule,
    ConfigModule,
    ProductModule,
    ReviewModule,
    CategoryModule,
    OrderModule,
    StatisticsModule,
    PaginationModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, PrismaService, UserService, ConfigService],
})
export class AppModule {}
