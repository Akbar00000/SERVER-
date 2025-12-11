import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PayOrderDto {
  @ApiPropertyOptional({ example: "card", description: "Payment method" })
  @IsOptional()
  @IsString()
  method?: string;
}
