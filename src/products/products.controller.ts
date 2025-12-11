import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProductService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags("Products")
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: "Create a new product" })
  @ApiResponse({ status: 201, description: "Product created successfully" })
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all products" })
  @ApiResponse({ status: 200, description: "List of products" })
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Get product by ID" })
  @ApiParam({ name: 'id', example: 'b21586aa-799f-41bd-9ba3-23f1be64d1a2' })
  @ApiResponse({ status: 200, description: "Product details" })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: "Update product by ID" })
  @ApiParam({ name: 'id', example: 'b21586aa-799f-41bd-9ba3-23f1be64d1a2' })
  @ApiResponse({ status: 200, description: "Product updated successfully" })
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Delete product by ID" })
  @ApiParam({ name: 'id', example: 'b21586aa-799f-41bd-9ba3-23f1be64d1a2' })
  @ApiResponse({ status: 200, description: "Product deleted successfully" })
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
