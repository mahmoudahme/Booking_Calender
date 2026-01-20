import { Module, OnModuleInit, Logger } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { getDatabaseConfig } from '../config/database.config';
import { BookingCalendarModule } from './booking-calendar/booking-calendar.module';
import { I18nModule, AcceptLanguageResolver, QueryResolver, HeaderResolver } from 'nestjs-i18n';
import * as path from 'path';
import * as fs from 'fs';

// Determine i18n path - check both src and dist
function getI18nPath(): string {
  const srcPath = path.join(process.cwd(), 'src', 'i18n');
  const distPath = path.join(process.cwd(), 'dist', 'i18n');

  // In development, use src/i18n
  if (fs.existsSync(srcPath)) {
    return srcPath;
  }

  // In production, use dist/i18n
  return distPath;
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDatabaseConfig,
      inject: [ConfigService],
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'ar',
      loaderOptions: {
        path: getI18nPath(),
        watch: process.env.NODE_ENV !== 'production', // Disable watch in production for better performance
      },
      resolvers: [
        { use: HeaderResolver, options: ['accept-language'] },
        AcceptLanguageResolver,
      ],
    }),

    BookingCalendarModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger(AppModule.name);

  constructor(private dataSource: DataSource) { }

  async onModuleInit() {
    if (this.dataSource.isInitialized) {
      this.logger.log('✅ Database connection established successfully!');
    } else {
      this.logger.error('❌ Database connection failed!');
    }
  }
}
