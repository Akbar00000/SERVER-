import { Controller, Get, Query } from '@nestjs/common';
import { FilterService } from './filters.service';
import { FilterProductsDto } from './dto/filter-products.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags("Filters")
@Controller('filter')
export class FilterController {
  constructor(private readonly filterService: FilterService) {}

  @Get('products')
  @ApiOperation({ summary: "Filter products by multiple parameters" })
  @ApiResponse({ status: 200, description: "Filtered product list" })
  filterProducts(@Query() dto: FilterProductsDto) {
    return this.filterService.filter(dto);
  }
}
