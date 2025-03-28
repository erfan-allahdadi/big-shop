import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: '09123456789', description: 'شماره موبایل' })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    example: 'fa',
    enum: ['fa', 'en'],
    description: 'زبان (اختیاری)',
  })
  @IsString()
  @IsOptional()
  lang?: 'fa' | 'en';
}
