import { Module } from '@nestjs/common';
import { IntegracaoIdentidadeEAcessoModule } from '../../integracao-identidade-e-acesso';
import { RequestActorService } from './request-actor.service';

@Module({
  imports: [IntegracaoIdentidadeEAcessoModule],
  providers: [RequestActorService],
  exports: [RequestActorService],
})
export class RequestActorModule {}
