import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { DataSourceOptions } from 'typeorm';
import { IConfig } from '../../domain';

@Injectable()
export class EnvironmentConfigService implements IConfig {
  constructor(
    // ...
    private nestConfigService: ConfigService,
  ) {}

  getRuntimePort(): number {
    const configPort =
      this.nestConfigService.get<number | string>('PORT') ?? null;

    if (configPort !== null) {
      const configPortAsNumber = parseInt(String(configPort));

      if (!Number.isNaN(configPortAsNumber)) {
        return configPortAsNumber;
      }
    }

    return 3471;
  }

  getRuntimeNodeEnv(): string {
    const runtimeNodeEnv = (
      this.nestConfigService.get<string>('NODE_ENV') ?? 'production'
    )
      .trim()
      .toLocaleLowerCase();

    return runtimeNodeEnv;
  }

  getRuntimeIsProduction(): boolean {
    return this.getRuntimeNodeEnv() === 'production';
  }

  getRuntimeIsDevelopment(): boolean {
    return !this.getRuntimeIsProduction();
  }

  getTypeOrmBasePath(): string {
    return join(__dirname, '..', 'database');
  }

  getTypeOrmPathEntities(): string {
    return join(this.getTypeOrmBasePath(), 'entities');
  }

  getTypeOrmPathMigrations(): string {
    return join(this.getTypeOrmBasePath(), 'migrations');
  }

  getTypeOrmPathSeeds(): string {
    return join(this.getTypeOrmBasePath(), 'seeds');
  }

  getTypeOrmPathSubscribers(): string {
    return join(this.getTypeOrmBasePath(), 'subscribers');
  }

  // ...

  getDbDatabase(): string | undefined {
    return this.nestConfigService.get<string>('DB_DATABASE');
  }

  getDbHost(): string | undefined {
    return this.nestConfigService.get<string>('DB_HOST');
  }

  getDbPassword(): string | undefined {
    return this.nestConfigService.get<string>('DB_PASSWORD');
  }

  getDbPort(): string | undefined {
    return this.nestConfigService.get<string>('DB_PORT');
  }

  getDbSchema(): string | undefined {
    return this.nestConfigService.get<string>('DB_SCHEMA');
  }

  getDbUsername(): string | undefined {
    return this.nestConfigService.get<string>('DB_USERNAME');
  }

  getDbConnection(): string | undefined {
    return this.nestConfigService.get<string>('DB_CONNECTION');
  }

  getDbUrl(): string | undefined {
    return this.nestConfigService.get<string>('DATABASE_URL');
  }

  getDbUseSSL(): string | undefined {
    return this.nestConfigService.get<string>('DATABASE_USE_SSL');
  }

  getTypeOrmLogging(): string | undefined {
    return this.nestConfigService.get<string>('TYPEORM_LOGGING');
  }

  getTypeOrmSharedDataSourceOptions(): Partial<DataSourceOptions> {
    const sharedEnvConfig = {};

    const DB_CONNECTION = this.getDbConnection();

    if (DB_CONNECTION !== undefined) {
      const DB_HOST = this.getDbHost();
      const DB_PORT = this.getDbPort();
      const DB_USERNAME = this.getDbUsername();
      const DB_PASSWORD = this.getDbPassword();
      const DB_DATABASE = this.getDbDatabase();
      const DB_SCHEMA = this.getDbSchema();

      const TYPEORM_LOGGING = this.getTypeOrmLogging();

      const DATABASE_URL = this.getDbUrl();
      const DATABASE_USE_SSL = this.getDbUseSSL();

      Object.assign(sharedEnvConfig, {
        type: DB_CONNECTION,

        host: DB_HOST,
        port: DB_PORT && parseInt(DB_PORT),

        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        schema: DB_SCHEMA,

        synchronize: false,

        logging: TYPEORM_LOGGING,
      } as Partial<DataSourceOptions>);

      if (DATABASE_URL) {
        Object.assign(sharedEnvConfig, {
          url: DATABASE_URL,
        });
      }

      if (DATABASE_USE_SSL !== 'false') {
        Object.assign(sharedEnvConfig, {
          options: {
            validateConnection: false,
            trustServerCertificate: true,
          },

          extra: {
            ssl: {
              rejectUnauthorized: false,
            },
          },
        });
      }
    }

    return {
      ...sharedEnvConfig,
    };
  }

  getTypeOrmAppDataSourceOptions(): DataSourceOptions {
    const options = {
      ...this.getTypeOrmSharedDataSourceOptions(),
      entities: [`${this.getTypeOrmPathEntities()}/**/*{.ts,.js}`],
      subscribers: [`${this.getTypeOrmPathSubscribers()}/**/*{.ts,.js}`],
    };

    return options as DataSourceOptions;
  }

  getTypeOrmMigrationDataSourceOptions(): DataSourceOptions {
    const options = {
      ...this.getTypeOrmSharedDataSourceOptions(),
      migrations: [`${this.getTypeOrmPathMigrations()}/**/*{.ts,.js}`],
      migrationsTableName: 'app_migration_db',
    };

    return options as DataSourceOptions;
  }

  getTypeOrmSeedDataSourceOptions(): DataSourceOptions {
    const options = {
      ...this.getTypeOrmSharedDataSourceOptions(),
      entities: [`${this.getTypeOrmPathEntities()}/**/*{.ts,.js}`],
      migrations: [`${this.getTypeOrmPathSeeds()}/**/*{.ts,.js}`],
      migrationsTableName: 'app_migration_seed',
    };

    return options as DataSourceOptions;
  }
}
