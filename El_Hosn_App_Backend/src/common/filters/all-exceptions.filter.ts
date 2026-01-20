import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseUtil } from '../utils/response.util';
import { I18nService, I18nContext } from 'nestjs-i18n';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly i18n: I18nService) { }

  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<any>();
    const lang = I18nContext.current()?.lang || request.headers['accept-language']?.split(',')[0]?.split('-')[0] || 'ar';

    console.log(`[AllExceptionsFilter] Detected lang: ${lang}, Header: ${request.headers['accept-language']}`);

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = await this.i18n.translate('common.INTERNAL_ERROR', {
      lang: lang,
    });
    let code = 'INTERNAL_SERVER_ERROR';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object') {
        const responseObj = exceptionResponse as any;
        message = responseObj.message || message;
        code = responseObj.error || code;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      this.logger.error(
        `Unhandled exception: ${exception.message}`,
        exception.stack,
      );
    }

    // Always override message for 500 Internal Server Error
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      message = await this.i18n.translate('common.INTERNAL_ERROR', {
        lang,
      });
    }

    const errorResponse = ResponseUtil.error(message, code, status, null);

    response.status(HttpStatus.OK).json(errorResponse);
  }
}
