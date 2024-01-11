import { UserModule } from './../user/user.module';
import { UserController } from './../user/user.controller';
import { UserService } from './../user/user.service';
import { getJwtConfig } from './../config/jwt.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from './../prisma.service';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController, UserController],
  providers: [AuthService, JwtStrategy, PrismaService, UserService],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    UserModule,
  ],
})
export class AuthModule {}
