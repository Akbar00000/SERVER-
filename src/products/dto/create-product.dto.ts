
import { IsString, IsNumber, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class ProductDetailsDto {
  @ApiPropertyOptional({ example: ['black', 'white'], description: 'Available colors' })
  @IsArray()
  @IsOptional()
  colors?: string[];

  @ApiPropertyOptional({ example: ['64GB', '128GB'], description: 'Available storage options' })
  @IsArray()
  @IsOptional()
  storageOptions?: string[];

  @ApiPropertyOptional({ example: { screen: '6.1 inch', battery: '3000mAh' }, description: 'Product specifications' })
  @IsOptional()
  specs?: Record<string, any>;

  @ApiPropertyOptional({ example: 'High quality smartphone', description: 'Detailed description' })
  @IsOptional()
  @IsString()
  description?: string;
}

export class CreateProductDto {
  @ApiProperty({ example: 'iPhone 15', description: 'Product title' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'Latest Apple smartphone', description: 'Short description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 999.99, description: 'Product price' })
  @IsNumber()
  price: number;

  @ApiPropertyOptional({ example: 'iphone15.png', description: 'Product image URL' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({ example: ['smartphone', 'apple'], description: 'Product tags' })
  @IsOptional()
  @IsArray()
  tags?: string[];

  @ApiProperty({ example: 'Electronics', description: 'Category name' })
  @IsString()
  categoryName: string;

  @ApiPropertyOptional({ type: ProductDetailsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProductDetailsDto)
  details?: ProductDetailsDto;
}
