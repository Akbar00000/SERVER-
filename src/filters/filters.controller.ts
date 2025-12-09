import { Controller, Get, Query } from '@nestjs/common';
import { FilterService } from './filters.service';
import { FilterProductsDto } from './dto/filter-products.dto';

@Controller('filter')
export class FilterController {
  constructor(private readonly filterService: FilterService) {}  

  @Get('products')
  filterProducts(@Query() dto: FilterProductsDto) {
    return this.filterService.filter(dto);
  }
}
