import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductCategoryDto, UpdateProductCategoryDto } from './dto';

@Injectable()
export class ProductCategoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProductCategoryDto) {
    return this.prisma.productCategory.create({ data });
  }

  async findAll() {
    return this.prisma.productCategory.findMany({
      where: { isActive: true },
      include: { children: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.productCategory.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateProductCategoryDto) {
    return this.prisma.productCategory.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.productCategory.delete({ where: { id } });
  }
}
