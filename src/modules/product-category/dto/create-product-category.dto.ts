import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateProductCategoryDto {
  @ApiProperty({ example: 'Electronics', description: 'نام دسته بندی' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'electronics', description: 'نام کوتاه دسته بندی' })
  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  parentId?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
