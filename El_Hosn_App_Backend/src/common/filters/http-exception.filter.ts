import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseUtil } from '../utils/response.util';
import { I18nService, I18nContext } from 'nestjs-i18n';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly i18n: I18nService) { }

  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<any>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const lang = I18nContext.current()?.lang || request.headers['accept-language']?.split(',')[0]?.split('-')[0] || 'ar';

    console.log(`[HttpExceptionFilter] Detected lang: ${lang}, Header: ${request.headers['accept-language']}`);

    let message = await this.i18n.translate('common.AN_ERROR_OCCURRED', {
      lang,
    });
    let code = 'UNKNOWN_ERROR';
    let details: any = null;

    if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    } else if (typeof exceptionResponse === 'object') {
      const responseObj = exceptionResponse as any;
      message = responseObj.message || message;
      code = responseObj.error || this.getErrorCode(status);
      details = responseObj.details || null;

      if (Array.isArray(message)) {
        details = message;
        const validationFailed = await this.i18n.translate('common.VALIDATION_FAILED', {
          lang: request['i18nLang'] || 'ar',
        });
        message = `${validationFailed}: ${message[0]}`;
        code = 'VALIDATION_ERROR';
      }
    }

    const errorResponse = ResponseUtil.error(
      status === HttpStatus.INTERNAL_SERVER_ERROR
        ? await this.i18n.translate('common.INTERNAL_ERROR', {
          lang,
        })
        : message,
      code,
      status,
      details,
    );

    response.status(HttpStatus.OK).json(errorResponse);
  }

  private getErrorCode(status: number): string {
    switch (status) {
      case HttpStatus.BAD_REQUEST:
        return 'BAD_REQUEST';
      case HttpStatus.UNAUTHORIZED:
        return 'UNAUTHORIZED';
      case HttpStatus.FORBIDDEN:
        return 'FORBIDDEN';
      case HttpStatus.NOT_FOUND:
        return 'NOT_FOUND';
      case HttpStatus.CONFLICT:
        return 'CONFLICT';
      case HttpStatus.INTERNAL_SERVER_ERROR:
        return 'INTERNAL_SERVER_ERROR';
      default:
        return 'UNKNOWN_ERROR';
    }
  }
}
