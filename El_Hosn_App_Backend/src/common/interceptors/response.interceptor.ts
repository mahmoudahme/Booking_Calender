import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { I18nUtil } from '../utils/i18n.util';
import { I18nService, I18nContext } from 'nestjs-i18n';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly i18n: I18nService) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse();
        response.status(HttpStatus.OK);

        // Fast path: if data is already in ApiResponse format, return immediately
        if (data && typeof data === 'object' && 'success' in data) {
          return data;
        }

        // Fast path: if data is null/undefined, return early
        if (data == null) {
          const lang = I18nContext.current()?.lang || 'ar';
          return I18nUtil.success(
            this.i18n,
            lang,
            'OPERATION_SUCCESSFUL',
            'common',
            null,
          );
        }

        // Handle legacy message format
        if (
          typeof data === 'object' &&
          'message' in data &&
          !('success' in data)
        ) {
          const { message, ...rest } = data;
          return I18nUtil.success(
            this.i18n,
            "ar",
            'OPERATION_SUCCESSFUL',
            'common',
            Object.keys(rest).length > 0 ? rest : undefined,
          );
        }

        // Default success response
        const lang = I18nContext.current()?.lang || 'ar';
        return I18nUtil.success(
          this.i18n,
          lang,
          'OPERATION_SUCCESSFUL',
          'common',
          data,
        );
      }),
    );
  }
}
