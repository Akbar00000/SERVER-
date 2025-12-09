import { IsOptional, IsString, IsNumber, IsArray, IsIn } from 'class-validator';

export class FilterProductsDto {
  @IsOptional()
  @IsString()
  search?: string;               

  @IsOptional()
  @IsNumber()
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  maxPrice?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];               

  @IsOptional()
  @IsString()
  categoryName?: string;         

  
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  colors?: string[];             

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  storageOptions?: string[];     

  @IsOptional()
  @IsString()
  specsKey?: string;             

  @IsOptional()
  @IsString()
  specsValue?: string;           
}
