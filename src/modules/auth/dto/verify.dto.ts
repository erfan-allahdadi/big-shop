import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class VerifyOtpDto {
  @ApiProperty({ example: '123456', description: 'شناسه کاربری' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: '09123456789', description: 'شماره موبایل' })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ example: '123456', description: 'کد OTP' })
  @IsString()
  @IsNotEmpty()
  otp: string;

  @ApiProperty({
    example: 'fa',
    enum: ['fa', 'en'],
    description: 'زبان (اختیاری)',
  })
  @IsString()
  @IsOptional()
  lang?: 'fa' | 'en';
}
