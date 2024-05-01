import { Module } from '@nestjs/common';
import { AutenticacaoModule } from '../autenticacao';
import { ConfigModule } from '../config/config.module';
import { InfraestruturaModule } from '../infraestrutura';
import { ModulosModule } from '../modulos/modulos.module';
import { AdaptersModule } from './adapters';
import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule, AdaptersModule, AutenticacaoModule, InfraestruturaModule, ModulosModule],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
