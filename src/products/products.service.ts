import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Category } from '../categories/entities/category.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  
  async create(dto: CreateProductDto) {
    const category = await this.categoryRepo.findOne({
      where: { name: dto.categoryId }, 
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const product = this.productRepo.create({
      title: dto.title,
      description: dto.description,
      price: dto.price,
      image: dto.image,
      tags: dto.tags,
      category,
    });

    return this.productRepo.save(product);
  }

  
  findAll() {
    return this.productRepo.find({ relations: ['category'] });
  }

  
async findOne(id: string) {
  const product = await this.productRepo.findOne({
    where: { id },
    relations: ['category', 'details'],
  });

  if (!product) throw new NotFoundException('Product not found');
  return product;
}



 
  async update(id: string, dto: UpdateProductDto) {
    const product = await this.findOne(id);

    if (dto.categoryId) {
      const category = await this.categoryRepo.findOne({
        where: { name: dto.categoryId }, 
      });

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      product.category = category;
    }

    Object.assign(product, dto);
    return this.productRepo.save(product);
  }


  async remove(id: string) {
    const product = await this.findOne(id);
    return this.productRepo.remove(product);
  }

  
}
