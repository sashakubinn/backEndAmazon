import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Get()
  getAll(@CurrentUser('id') userId: number) {
    return this.orderService.getAll(userId);
  }
}
