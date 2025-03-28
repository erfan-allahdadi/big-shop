import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SmsService {
  // we should use  sms service
  private readonly logger = new Logger(SmsService.name);

  async sendOtp(phoneNumber: string, otp: string) {
    this.logger.log(`OTP sent to ${phoneNumber}: ${otp}`);
    return { success: true, message: `OTP sent to ${phoneNumber}` };
  }
}
