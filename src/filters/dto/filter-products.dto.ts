import { IsOptional, IsString, IsArray } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterProductsDto {
  @ApiPropertyOptional({
    example: "black",
    description: "Filter by available colors",
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  colors?: string[];

  @ApiPropertyOptional({
    example: ["64GB", "128GB"],
    description: "Filter by storage options",
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  storageOptions?: string[];

  @ApiPropertyOptional({
    example: "",
    description: "Filter by specific specification key"
  })
  @IsOptional()
  @IsString()
  specsKey?: string;

  @ApiPropertyOptional({
    example: "",
    description: "Filter by specific specification value"
  })
  @IsOptional()
  @IsString()
  specsValue?: string;
}
