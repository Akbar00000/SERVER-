
import { Controller, Get, Param } from '@nestjs/common';
import { DetailsService } from './details.service';

@Controller('products/details')
export class DetailsController {
  constructor(private detailsService: DetailsService) {}

 @Get(':id')
getDetails(@Param('id') id: string) {
  return this.detailsService.getByProductId(id);
}

}
