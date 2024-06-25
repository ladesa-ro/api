import { Module } from '@nestjs/common';
import { AdaptersModule } from './adapters';
import { AppConfigModule } from './app-config';
import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication';
import { ModulosModule } from './modulos/modulos.module';

@Module({
  imports: [
    //
    AppConfigModule,
    AdaptersModule,
    AuthenticationModule,
    AdaptersModule,
    ModulosModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
