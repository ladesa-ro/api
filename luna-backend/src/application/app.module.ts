import { Module } from '@nestjs/common';
import { AdaptersModule } from '../infrastructure/adapters/adapters.module';
import { AuthModule } from '../infrastructure/auth/auth.module';
import { EnvironmentConfigModule } from '../infrastructure/environment-config';
import { IntegrateDatabaseModule } from '../infrastructure/integrate-database/integrate-database.module';
import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { CoreBusinessModule } from './core-business/core.module';

@Module({
  imports: [
    //
    EnvironmentConfigModule,
    IntegrateDatabaseModule,
    AdaptersModule,
    AuthModule,
    CoreBusinessModule,
  ],
  controllers: [
    //
    AppController,
  ],
  providers: [
    //
    AppService,
    AppResolver,
  ],
})
export class AppModule {}
