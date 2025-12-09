import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { LikedService } from './liked.service';
import { AddToLikedDto } from './dto/add-to-liked.dto';

@Controller('liked')
export class LikedController {
  constructor(private likedService: LikedService) {}

  @Post()
  addToLiked(@Body() dto: AddToLikedDto) {
    return this.likedService.addToLiked(dto);
  }

  @Get()
  getLiked() {
    return this.likedService.getLiked();
  }

  @Delete(':productId')
  removeFromLiked(@Param('productId') productId: string) {
    return this.likedService.removeFromLiked(productId);
  }
}
