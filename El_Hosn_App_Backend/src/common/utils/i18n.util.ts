import { I18nService } from 'nestjs-i18n';
import { ApiResponse } from '../interfaces/api-response.interface';

export class I18nUtil {
  static success<T>(
    i18n: I18nService,
    lang: string,
    key: string,
    namespace: string = 'common',
    data: T | null = null,
    statusCode: number = 200,
    args?: Record<string, any>,
  ): ApiResponse<T> {
    const message = i18n.translate(`${namespace}.${key}`, {
      lang,
      args,
    });

    return {
      success: true,
      statusCode,
      message,
      data,
      error: null,
      timestamp: new Date().toISOString(),
    };
  }

  static error(
    i18n: I18nService,
    lang: string,
    key: string,
    namespace: string = 'common',
    code: string = 'ERROR',
    statusCode: number = 400,
    details: any = null,
    args?: Record<string, any>,
  ): ApiResponse<null> {
    const message = i18n.translate(`${namespace}.${key}`, {
      lang,
      args,
    });

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

