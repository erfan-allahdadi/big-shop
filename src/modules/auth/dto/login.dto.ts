import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: '09123456789', description: 'شماره موبایل' })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ example: 'mypassword', description: 'رمز عبور' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
