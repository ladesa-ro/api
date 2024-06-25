import { Module } from '@nestjs/common';
import { AdaptersModule } from './adapters';
import { AppConfigModule } from './app-config';
import { AppModulesModule } from './app-modules/app-modules.module';
import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication';

@Module({
  imports: [
    //
    AppConfigModule,
    AdaptersModule,
    AuthenticationModule,
    AdaptersModule,
    AppModulesModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
