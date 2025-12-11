import { PartialType } from '@nestjs/mapped-types';
import { CreateBannerDto } from './create-banner.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateBannerDto extends PartialType(CreateBannerDto) {
  @ApiPropertyOptional({ example: "Updated banner title" })
  title?: string;

  @ApiPropertyOptional({ example: "Updated description" })
  description?: string;

  @ApiPropertyOptional({ example: "https://example.com/new-image.jpg" })
  image?: string;

  @ApiPropertyOptional({ example: "https://example.com/new-link" })
  link?: string;
}
