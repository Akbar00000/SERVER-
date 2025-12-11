import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new review for a product' })
  @ApiResponse({ status: 201, description: 'Review created successfully' })
  create(@Body() dto: CreateReviewDto) {
    return this.reviewsService.create(dto);
  }

  @Get('product/:id')
  @ApiOperation({ summary: 'Get all reviews for a specific product' })
  @ApiParam({ name: 'id', example: 'b21586aa-799f-41bd-9ba3-23f1be64d1a2' })
  @ApiResponse({ status: 200, description: 'List of reviews for the product' })
  getByProduct(@Param('id') id: string) {
    return this.reviewsService.findByProduct(id);
  }
}
