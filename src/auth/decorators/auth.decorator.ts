import { OnlyAdminGuard } from './../guards/admin.guard';
import { JwtAuthGuard } from './../guards/jwt.guard';
import { TypeRole } from './../auth.interface';
import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export const Auth = (role: TypeRole = 'user') =>
  applyDecorators(
    role === 'admin'
      ? UseGuards(JwtAuthGuard, OnlyAdminGuard)
      : UseGuards(JwtAuthGuard),
  );
