import { UserDto } from './user.dto';
import { Controller, Get, Param, Patch, Put } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { UserService } from './user.service';
import { Body, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  async getProfile(@CurrentUser('id') id: number) {
    return this.userService.byId(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('update-profile')
  async updateProfile(@CurrentUser('id') id: number, @Body() dto: UserDto) {
    return this.userService.updateProfile(id, dto);
  }

  @HttpCode(200)
  @Patch('profile/favorites/:productId')
  async toggleFavorite(
    @CurrentUser('id') id: number,
    @Param('productId') productId: string,
  ) {
    return this.userService.toggleFavorite(id, +productId);
  }
}
