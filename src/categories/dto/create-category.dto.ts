import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: "Electronics", description: "Name of category" })
  @IsString()
  name: string;

  @ApiProperty({ example: "Devices such as phones, laptops, etc.", required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: "https://example.com/cat-image.jpg", required: false })
  @IsOptional()
  @IsString()
  image?: string;
}
