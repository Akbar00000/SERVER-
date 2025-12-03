import { IsString, IsOptional } from 'class-validator';

export class CreateBannerDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  link?: string;
}