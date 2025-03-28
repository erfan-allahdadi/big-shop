import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'ثبت‌نام و ارسال کد OTP' })
  @ApiResponse({ status: 201, description: 'OTP ارسال شد' })
  @ApiResponse({ status: 400, description: 'شماره موبایل مورد نیاز است' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(
      registerDto.phoneNumber,
      registerDto.lang || 'fa',
    );
  }

  @Post('login')
  @ApiOperation({ summary: 'ورود کاربر با شماره موبایل و رمز عبور' })
  @ApiResponse({ status: 200, description: 'OTP ارسال شد' })
  @ApiResponse({
    status: 400,
    description: 'شماره موبایل و رمز عبور مورد نیاز است',
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(
      loginDto.phoneNumber,
      loginDto.password,
      loginDto.lang || 'fa',
    );
  }
}
