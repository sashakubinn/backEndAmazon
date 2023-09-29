import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from './../config/jwt.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './../auth/auth.service';
import { JwtStrategy } from './../auth/jwt.strategy';
import { PrismaService } from './../prisma.service';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtStrategy, AuthService],
  exports: [UserService],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
})
export class UserModule {}
