import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { BannerService } from './banners.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags("Banners")
@Controller('banners')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Post()
  @ApiOperation({ summary: "Create new banner" })
  @ApiResponse({ status: 201, description: "Banner successfully created" })
  create(@Body() dto: CreateBannerDto) {
    return this.bannerService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all banners" })
  @ApiResponse({ status: 200 })
  findAll() {
    return this.bannerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Get banner by ID" })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: "Banner not found" })
  findOne(@Param('id') id: string) {
    return this.bannerService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: "Update banner" })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404 })
  update(@Param('id') id: string, @Body() dto: UpdateBannerDto) {
    return this.bannerService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Delete banner" })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404 })
  remove(@Param('id') id: string) {
    return this.bannerService.remove(id);
  }
}
