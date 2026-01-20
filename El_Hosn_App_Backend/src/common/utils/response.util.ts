import { ApiResponse } from '../interfaces/api-response.interface';

export class ResponseUtil {
  static success<T>(message: string, data: T | null = null, statusCode: number = 200): ApiResponse<T> {
    return {
      success: true,
      statusCode,
      message,
      data,
      error: null,
      timestamp: new Date().toISOString(),
    };
  }

  static error(message: string, code: string, statusCode: number = 400, details: any = null): ApiResponse<null> {
    return {
      success: false,
      statusCode,
      message,
      data: null,
      error: {
        code,
        details: details ?? null,
      },
      timestamp: new Date().toISOString(),
    };
  }
}

// Helper function to get language from request
export function getLanguageFromRequest(request: any): string {
  return request['i18nLang'] || request['language'] || 'ar';
}