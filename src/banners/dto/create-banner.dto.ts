import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBannerDto {
  @ApiProperty({ example: "Summer Sale", description: "Banner title" })
  @IsString()
  title: string;

  @ApiProperty({ example: "Up to 50% off", required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: "https://example.com/image.jpg" })
  @IsString()
  image: string;

  @ApiProperty({ example: "https://example.com", required: false })
  @IsOptional()
  @IsString()
  link?: string;
}
