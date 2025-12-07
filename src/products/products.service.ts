import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductDetails } from './entities/product-details.entity';
import { Category } from '../categories/entities/category.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,

    @InjectRepository(ProductDetails)
    private detailsRepo: Repository<ProductDetails>,

    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  async create(dto: CreateProductDto) {
    const category = await this.categoryRepo.findOne({ where: { name: dto.categoryName } });
    if (!category) throw new NotFoundException('Category not found');

    const product = this.productRepo.create({
      title: dto.title,
      description: dto.description,
      price: dto.price,
      image: dto.image,
      tags: dto.tags || [],
      category,
    });

    if (dto.details) {
      const details = this.detailsRepo.create({
        colors: dto.details.colors || [],
        storageOptions: dto.details.storageOptions || [],
        specs: dto.details.specs || {},
        description: dto.details.description || '',
      });
      // связываем details с продуктом
      product.details = details;
    }

    // сохраняем сначала details, если есть
    if (product.details) {
      await this.detailsRepo.save(product.details);
    }

    return this.productRepo.save(product);
  }

  async findAll() {
    const products = await this.productRepo.find({ relations: ['category'] });
    return products.map((p) => ({
      id: p.id,
      title: p.title,
      price: p.price,
      description: p.description,
      image: p.image,
      tags: p.tags,
      categoryName: p.category?.name,
    }));
  }

  async findOne(id: string) {
    const product = await this.productRepo.findOne({ where: { id }, relations: ['category', 'details'] });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: string, dto: UpdateProductDto) {
    const product = await this.findOne(id);

    // CATEGORY
    if (dto.categoryName) {
      const category = await this.categoryRepo.findOne({ where: { name: dto.categoryName } });
      if (!category) throw new NotFoundException('Category not found');
      product.category = category;
    }

    // BASE FIELDS
    if (dto.title !== undefined) product.title = dto.title;
    if (dto.description !== undefined) product.description = dto.description;
    if (dto.price !== undefined) product.price = dto.price;
    if (dto.image !== undefined) product.image = dto.image;
    if (dto.tags !== undefined) product.tags = dto.tags;

    // DETAILS
    if (dto.details) {
      if (!product.details) {
        const newDetails = this.detailsRepo.create({
          colors: dto.details.colors || [],
          storageOptions: dto.details.storageOptions || [],
          specs: dto.details.specs || {},
          description: dto.details.description || '',
        });
        product.details = newDetails;
        await this.detailsRepo.save(newDetails);
      } else {
        // обновляем существующие details
        if (dto.details.colors !== undefined) product.details.colors = dto.details.colors;
        if (dto.details.storageOptions !== undefined) product.details.storageOptions = dto.details.storageOptions;
        if (dto.details.specs !== undefined) product.details.specs = dto.details.specs;
        if (dto.details.description !== undefined) product.details.description = dto.details.description;
        await this.detailsRepo.save(product.details);
      }
    }

    return this.productRepo.save(product);
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    if (!product) throw new NotFoundException('Product not found');

    if (product.details) {
      await this.detailsRepo.remove(product.details);
    }

    return this.productRepo.remove(product);
  }
}
