export const ErrorMessages = {
  en: {
    USER_ALREADY_EXISTS: {
      code: 'AUTH_001',
      message: 'A user with this phone number already exists.',
    },
    INVALID_CREDENTIALS: {
      code: 'AUTH_002',
      message: 'Invalid phone number or password.',
    },
    OTP_CODE_INVALID: {
      code: 'AUTH_003',
      message: 'Invalid OTP code.',
    },
    OTP_CODE_EXPIRED: {
      code: 'AUTH_004',
      message: 'OTP code expired.',
    },
    USER_NOT_FOUND: {
      code: 'AUTH_005',
      message: 'User not found.',
    },
    PHONENUMBER_INVALID: {
      code: 'AUTH_006',
      message: 'Phone number is invalid',
    },
  },
  fa: {
    USER_ALREADY_EXISTS: {
      code: 'AUTH_001',
      message: 'یک کاربر با این شماره تلفن قبلاً ثبت شده است.',
    },
    INVALID_CREDENTIALS: {
      code: 'AUTH_002',
      message: 'شماره تلفن یا رمز عبور نامعتبر است.',
    },
    OTP_CODE_INVALID: {
      code: 'AUTH_003',
      message: 'رمز یکبار مصرف اشتباه است.',
    },
    OTP_CODE_EXPIRED: {
      code: 'AUTH_004',
      message: 'رمز یکبار مصرف منقضی شده است.',
    },
    USER_NOT_FOUND: {
      code: 'AUTH_005',
      message: 'کاربری با این شناسه یافت نشد.',
    },
    PHONENUMBER_INVALID: {
      code: 'AUTH_006',
      message: 'شماره تلفن اشتباه هست.',
    },
  },
};

export const SuccessMessages = {
  en: {
    USER_CREATED_SUCCESS: {
      code: 'AUTH_100',
      message: 'User registered successfully.',
    },
    LOGIN_SUCCESS: { code: 'AUTH_101', message: 'Login successful.' },
    OTP_SENT: { code: 'AUTH_102', message: 'OTP sent successfully.' },
  },
  fa: {
    USER_CREATED_SUCCESS: {
      code: 'AUTH_100',
      message: 'ثبت‌نام کاربر با موفقیت انجام شد.',
    },
    LOGIN_SUCCESS: { code: 'AUTH_101', message: 'ورود موفقیت‌آمیز بود.' },
    OTP_SENT: {
      code: 'AUTH_102',
      message: 'رمز یکبار مصرف با موفقیت ارسال شد.',
    },
  },
};
