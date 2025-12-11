import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags("Orders")
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('')
  @ApiOperation({ summary: "Create a new order" })
  @ApiResponse({ status: 201, description: "Order created successfully" })
  create(@Body() dto: CreateOrderDto) {
    return this.orderService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: "Get a specific order by ID" })
  @ApiParam({ name: 'id', example: 'b21586aa-799f-41bd-9ba3-23f1be64d1a2' })
  @ApiResponse({ status: 200, description: "Order details" })
  getOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: "Get all orders" })
  @ApiResponse({ status: 200, description: "List of all orders" })
  getAll() {
    return this.orderService.findAll();
  }
}
