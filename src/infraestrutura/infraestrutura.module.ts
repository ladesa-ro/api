import { Module } from '@nestjs/common';
import { AutenticacaoModule } from '../autenticacao';
import { IntegrationsModule } from './integrations/integrations.module';

@Module({
  imports: [AutenticacaoModule, IntegrationsModule],
  controllers: [],
  exports: [],
  providers: [],
})
export class InfraestruturaModule {}
