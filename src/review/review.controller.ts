import { ReviewDto } from './review.dto';
import {
  Controller,
  UsePipes,
  ValidationPipe,
  Post,
  Get,
  Param,
  Patch,
  Put,
  Delete,
  HttpCode,
  Body,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { brotliDecompressSync } from 'zlib';
import { ReviewService } from './review.service';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  async getAll() {
    return this.reviewService.getAll();
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('leave/:productId')
  async leaveReview(
    @CurrentUser('id') id: number,
    @Body() dto: ReviewDto,
    @Param('productId') productId: string,
  ) {
    try {
      return this.reviewService.create(id, dto, +productId);
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get('average-by-product/:productId')
  async getAvarageByProduct(@Param('productId') productId: string) {
    return this.reviewService.getAverageValueByProductId(+productId);
  }
}
