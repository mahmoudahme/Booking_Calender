export const ResponseMessages = {
  AUTH: {
    SIGNUP_SUCCESS: 'User registered successfully. Please check your email to verify your account.',
    LOGIN_SUCCESS: 'Login successful',
    EMAIL_VERIFIED: 'Email verified successfully. You can now log in.',
    EMAIL_ALREADY_VERIFIED: 'Email is already verified',
    VERIFICATION_EMAIL_SENT: 'Verification email sent successfully. Please check your inbox.',
    PASSWORD_RESET_EMAIL_SENT: 'If the email exists, a password reset code has been sent to your inbox.',
    PASSWORD_RESET_SUCCESS: 'Password reset successfully. You can now log in with your new password.',
    PASSWORD_CHANGED: 'Password changed successfully',
    
    INVALID_CREDENTIALS: 'Invalid email or password',
    EMAIL_NOT_VERIFIED: 'Please verify your email before logging in',
    ACCOUNT_DEACTIVATED: 'Your account has been deactivated. Please contact support.',
    EMAIL_EXISTS: 'Email already exists',
    INVALID_VERIFICATION_CODE: 'Invalid verification code',
    VERIFICATION_CODE_EXPIRED: 'Verification code has expired. Please request a new code.',
    VERIFICATION_CODE_NOT_FOUND: 'Verification code not found. Please request a new code.',
    INVALID_RESET_CODE: 'Invalid email or reset code',
    RESET_CODE_EXPIRED: 'Reset code has expired. Please request a new password reset.',
    RESET_CODE_NOT_FOUND: 'Reset code not found. Please request a new password reset.',
    USER_NOT_FOUND: 'User not found with this email address',
    INCORRECT_PASSWORD: 'Current password is incorrect. Please try again.',
    SAME_PASSWORD: 'New password must be different from current password',
  },
  
  GENERAL: {
    OPERATION_SUCCESSFUL: 'Operation successful',
    VALIDATION_FAILED: 'Validation failed',
    INTERNAL_ERROR: 'An internal error occurred. Please try again later.',
  },
};
