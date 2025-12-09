import { IsString, IsOptional } from 'class-validator';

export class PayOrderDto {
  @IsOptional()
  @IsString()
  method?: string;  
}
