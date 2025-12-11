import { Controller, Post, Param, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PayOrderDto } from './dto/pay-order.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Payments')
@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post(':id')
  @ApiOperation({ summary: 'Pay an order by ID' })
  @ApiParam({ name: 'id', example: 'b21586aa-799f-41bd-9ba3-23f1be64d1a2' })
  @ApiResponse({ status: 200, description: 'Payment successful' })
  pay(
    @Param('id') id: string,
    @Body() body: PayOrderDto
  ) {
    return this.paymentService.payOrder(id, body.method);
  }
}
