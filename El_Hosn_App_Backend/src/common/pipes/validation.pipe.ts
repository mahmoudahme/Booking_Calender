import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { I18nService, I18nContext } from 'nestjs-i18n';

@Injectable()
export class I18nValidationPipe implements PipeTransform<any> {
  private readonly logger = new Logger(I18nValidationPipe.name);

  constructor(private readonly i18n: I18nService) {}

  async transform(value: any, { metatype, type }: ArgumentMetadata) {
    // Skip validation if no metatype or if it's a primitive type
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    // For GET requests or when body is empty, skip validation if value is empty
    if (type === 'query' || !value || (typeof value === 'object' && Object.keys(value).length === 0 && value.constructor === Object)) {
      // Only throw error if it's a body parameter (POST, PUT, PATCH) and value is required
      if (type === 'body' && (!value || (typeof value === 'object' && Object.keys(value).length === 0))) {
        const lang = I18nContext.current()?.lang || 'ar';
        throw new BadRequestException({
          message: this.i18n.translate('validation.REQUIRED', { lang }) || 'Validation failed: value is required',
          error: 'Validation failed',
          statusCode: 400,
        });
      }
      return value;
    }

    try {
      const object = plainToInstance(metatype, value, {
        enableImplicitConversion: true,
        excludeExtraneousValues: false,
      });
      
      // Check if object is valid
      if (!object) {
        const lang = I18nContext.current()?.lang || 'ar';
        throw new BadRequestException({
          message: this.i18n.translate('validation.INVALID_FORMAT', { lang }) || 'Validation failed: invalid format',
          error: 'Validation failed',
          statusCode: 400,
        });
      }

      // Ensure object is actually an object instance
      if (typeof object !== 'object' || Array.isArray(object)) {
        const lang = I18nContext.current()?.lang || 'ar';
        throw new BadRequestException({
          message: this.i18n.translate('validation.INVALID_FORMAT', { lang }) || 'Validation failed: invalid format',
          error: 'Validation failed',
          statusCode: 400,
        });
      }

      // Validate the object - skip undefined properties to avoid the error
      // Note: skipUndefinedProperties: true will skip validation for undefined values
      const errors = await validate(object, {
        skipMissingProperties: false,
        skipUndefinedProperties: true,
        skipNullProperties: false,
        whitelist: true,
        forbidNonWhitelisted: false,
        forbidUnknownValues: false,
        validationError: {
          target: false,
          value: false,
        },
      });

      if (errors.length > 0) {
        const lang = I18nContext.current()?.lang || 'ar';
        const messages = this.flattenValidationErrors(errors, lang);
        throw new BadRequestException({
          message: messages,
          error: 'Validation failed',
          statusCode: 400,
        });
      }

      return object;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      const lang = I18nContext.current()?.lang || 'ar';
      this.logger.error(`Validation pipe error: ${error.message}`, error.stack);
      
      // Check if it's the specific "unknown value" error
      if (error.message && error.message.includes('an unknown value was passed to the validate function')) {
        throw new BadRequestException({
          message: this.i18n.translate('validation.INVALID_FORMAT', { lang }) || 'Validation failed: invalid data format',
          error: 'Validation failed',
          statusCode: 400,
        });
      }
      
      throw new BadRequestException({
        message: this.i18n.translate('validation.INVALID_FORMAT', { lang }) || 'Validation failed: invalid format',
        error: 'Validation failed',
        statusCode: 400,
      });
    }
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private flattenValidationErrors(errors: any[], lang: string): string[] {
    const messages: string[] = [];

    for (const error of errors) {
      if (error.constraints) {
        for (const key in error.constraints) {
          const constraint = error.constraints[key];
          const translatedMessage = this.translateValidationMessage(constraint, lang);
          const propertyName = error.property || 'unknown';
          messages.push(`${propertyName}: ${translatedMessage}`);
        }
      }

      if (error.children && error.children.length > 0) {
        const childMessages = this.flattenValidationErrors(error.children, lang);
        messages.push(...childMessages);
      }
    }

    return messages;
  }

  private translateValidationMessage(message: string, lang: string): string {
    // Try to extract the validation key from the message
    // Example: "must be longer than or equal to 10 characters" -> "MIN_LENGTH"
    const validationKey = this.extractValidationKey(message);
    
    if (validationKey) {
      try {
        return this.i18n.translate(`validation.${validationKey}`, {
          lang,
          args: this.extractArgs(message),
        });
      } catch (e) {
        // If translation fails, return original message
        return message;
      }
    }

    return message;
  }

  private extractValidationKey(message: string): string | null {
    // Map common validation messages to keys
    if (message.includes('should not be empty') || message.includes('must not be empty')) {
      return 'IS_NOT_EMPTY';
    }
    if (message.includes('must be a string')) {
      return 'IS_STRING';
    }
    if (message.includes('must be a number')) {
      return 'IS_NUMBER';
    }
    if (message.includes('must be an integer') || message.includes('must be an int')) {
      return 'IS_NUMBER';
    }
    if (message.includes('must be an email')) {
      return 'IS_EMAIL';
    }
    if (message.includes('must be longer than') || message.includes('must be shorter than')) {
      if (message.includes('longer')) {
        return 'MIN_LENGTH';
      }
      return 'MAX_LENGTH';
    }
    if (message.includes('must be a valid date')) {
      return 'IS_DATE';
    }
    if (message.includes('must be one of')) {
      return 'IS_ENUM';
    }
    if (message.includes('must be an array')) {
      return 'IS_ARRAY';
    }

    return null;
  }

  private extractArgs(message: string): Record<string, any> {
    const args: Record<string, any> = {};
    
    // Extract numbers from message (e.g., "10 characters" -> {0: 10})
    const numberMatch = message.match(/\d+/);
    if (numberMatch) {
      args['0'] = numberMatch[0];
    }

    return args;
  }
}

