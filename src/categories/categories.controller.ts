import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CategoryService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags("Categories")
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: "Create a new category" })
  @ApiResponse({ status: 201, description: "Category successfully created" })
  create(@Body() dto: CreateCategoryDto) {
    return this.categoryService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all categories" })
  @ApiResponse({ status: 200 })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Get category by ID" })
  @ApiParam({ name: "id", example: "b21586aa-799f-41bd-9ba3-23f1be64d1a2" })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: "Category not found" })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: "Update a category" })
  @ApiParam({ name: "id", example: "b21586aa-799f-41bd-9ba3-23f1be64d1a2" })
  @ApiResponse({ status: 200 })
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.categoryService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Delete a category" })
  @ApiParam({ name: "id", example: "b21586aa-799f-41bd-9ba3-23f1be64d1a2" })
  @ApiResponse({ status: 200 })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
