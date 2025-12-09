import { Controller, Post, Param, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post(':id')
  pay(
    @Param('id') id: string,
    @Body() body: { method?: string }
  ) {
    return this.paymentService.payOrder(id, body.method);
  }
}
