import {
  Injectable,
  BadRequestException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { PrismaService } from 'src/prisma/prisma.service';

import { generateOTP } from 'src/helper/otp-generator.helper';
import { ResponseGeneratorHelper } from 'src/helper/response-generator.helper';

import {
  ErrorMessages,
  SuccessMessages,
} from 'src/constant/messages.constants';

import { SmsService } from 'src/modules/sms/sms.service';
import { RoleEnum } from '@prisma/client';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private smsService: SmsService,
  ) {}

  async register(phoneNumber: string, lang: 'fa' | 'en' = 'fa') {
    const errors = ErrorMessages[lang] || ErrorMessages.fa;
    const success = SuccessMessages[lang] || SuccessMessages.fa;

    const existingUser = await this.prisma.user.findUnique({
      where: { phoneNumber },
      select: { id: true, phoneNumber: true, role: true, isVerified: true },
    });

    if (existingUser?.isVerified) {
      throw new BadRequestException({
        code: errors.USER_ALREADY_EXISTS.code,
        message: errors.USER_ALREADY_EXISTS.message,
      });
    }

    const { otp, otpExpires } = generateOTP();

    const user = existingUser
      ? await this.prisma.user.update({
          where: { id: existingUser.id },
          data: { otpCode: otp, otpExpires },
        })
      : await this.prisma.user.create({
          data: {
            name: '',
            password: '',
            phoneNumber,
            role: 'USER',
            otpCode: otp,
            otpExpires,
          },
        });

    // send OTP via SMS
    await this.smsService.sendOtp(phoneNumber, otp);

    this.logger.log(`Generated OTP for ${phoneNumber}: ${otp}`);

    return ResponseGeneratorHelper.SuccessResponse({
      code: success.OTP_SENT.code,
      message: success.OTP_SENT.message,
      data: {
        userId: user.id,
        phoneNumber,
        otp, // we should remove this field from response
      },
    });
  }

  async verifyOtp(
    userId: string,
    phoneNumber: string,
    otp: string,
    lang: 'fa' | 'en' = 'fa',
  ) {
    const errors = ErrorMessages[lang] || ErrorMessages.fa;
    const success = SuccessMessages[lang] || SuccessMessages.fa;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        role: true,
        phoneNumber: true,
        otpCode: true,
        otpExpires: true,
      },
    });

    this.validateOtpRequest(user, phoneNumber, otp, errors);

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        otpCode: null,
        otpExpires: null,
        isVerified: true,
      },
    });

    const token = this.jwtService.sign({ id: userId, role: user.role });

    return ResponseGeneratorHelper.SuccessResponse({
      code: success.LOGIN_SUCCESS.code,
      message: success.LOGIN_SUCCESS.message,
      data: {
        token,
      },
    });
  }

  async login(phoneNumber: string, password: string, lang: 'en' | 'fa' = 'fa') {
    const errors = ErrorMessages[lang] || ErrorMessages.fa;
    const success = SuccessMessages[lang] || SuccessMessages.fa;

    const user = await this.prisma.user.findUnique({
      where: { phoneNumber },
      select: {
        id: true,
        name: true,
        role: true,
        password: true,
        phoneNumber: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException({
        code: errors.USER_NOT_FOUND.code,
        message: errors.USER_NOT_FOUND.message,
      });
    }

    this.validateLoginRequest(user, password, errors);

    const { otp, otpExpires } = generateOTP();

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        otpCode: otp,
        otpExpires,
      },
    });

    // send OTP via SMS
    await this.smsService.sendOtp(user.phoneNumber, otp);

    console.log(`OTP sent to ${user.phoneNumber}: ${otp}`);

    return ResponseGeneratorHelper.SuccessResponse({
      code: success.OTP_SENT.code,
      message: success.OTP_SENT.message,
      data: {
        userId: user.id,
      },
    });
  }

  private validateOtpRequest(user, phoneNumber: string, otp: string, errors) {
    if (!user) {
      throw new UnauthorizedException({
        code: errors.USER_NOT_FOUND.code,
        message: errors.USER_NOT_FOUND.message,
      });
    }

    if (!phoneNumber || user.phoneNumber !== phoneNumber) {
      throw new BadRequestException({
        code: errors.PHONENUMBER_INVALID.code,
        message: errors.PHONENUMBER_INVALID.message,
      });
    }

    if (!otp || user.otpCode !== otp) {
      throw new BadRequestException({
        code: errors.OTP_CODE_INVALID.code,
        message: errors.OTP_CODE_INVALID.message,
      });
    }

    if (user.otpExpires < new Date()) {
      throw new BadRequestException({
        code: errors.OTP_CODE_EXPIRED.code,
        message: errors.OTP_CODE_EXPIRED.message,
      });
    }
  }

  private async validateLoginRequest(user, password: string, errors) {
    if (!user) {
      throw new UnauthorizedException({
        code: errors.USER_NOT_FOUND.code,
        message: errors.USER_NOT_FOUND.message,
      });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException({
        code: errors.INVALID_CREDENTIALS.code,
        message: errors.INVALID_CREDENTIALS.message,
      });
    }
  }
}
