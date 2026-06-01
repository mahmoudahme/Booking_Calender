import { Module, OnModuleInit, Logger } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { getDatabaseConfig } from '../config/database.config';
import { DashboardModule } from './dashboard/dashboard.module';
import { I18nModule, AcceptLanguageResolver, QueryResolver, HeaderResolver } from 'nestjs-i18n';
import * as path from 'path';
import * as fs from 'fs';

// production: __dirname = dist/src/ → go up 2 levels to reach project root
// development (ts-node): __dirname = src/ → go up 1 level
const envFilePath = [
  path.resolve(__dirname, '../../.env'),
  path.resolve(__dirname, '../.env'),
  '.env',
];

function getI18nPath(): string {
  // development: __dirname = src/, i18n at src/i18n
  const devPath = path.resolve(__dirname, 'i18n');
  // production: __dirname = dist/src/, i18n compiled at dist/i18n
  const prodPath = path.resolve(__dirname, '..', 'i18n');

  if (fs.existsSync(devPath)) {
    return devPath;
  }
  return prodPath;
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
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

    DashboardModule,
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
