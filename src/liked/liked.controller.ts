import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { LikedService } from './liked.service';
import { AddToLikedDto } from './dto/add-to-liked.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags("Liked Products")
@Controller('liked')
export class LikedController {
  constructor(private likedService: LikedService) {}

  @Post()
  @ApiOperation({ summary: "Add product to liked list" })
  @ApiResponse({ status: 201, description: "Product added to liked" })
  addToLiked(@Body() dto: AddToLikedDto) {
    return this.likedService.addToLiked(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all liked products" })
  @ApiResponse({ status: 200, description: "List of liked products" })
  getLiked() {
    return this.likedService.getLiked();
  }

  @Delete(':productId')
  @ApiOperation({ summary: "Remove product from liked list" })
  @ApiParam({
    name: "productId",
    example: "d3b73e5f-3b2f-4d4c-acde-5a234f71ac01",
    description: "UUID of the product",
  })
  @ApiResponse({ status: 200, description: "Product removed from liked" })
  removeFromLiked(@Param('productId') productId: string) {
    return this.likedService.removeFromLiked(productId);
  }
}
