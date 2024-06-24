import { ConfigModule } from '@/config/config.module';
import { ModulosModule } from '@/modulos/modulos.module';
import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication';
import { IntegracaoBancoDeDadosModule } from './integracao-banco-de-dados';
import { IntegracaoIdentidadeEAcessoModule } from './integracao-identidade-e-acesso';
import { AppModule } from './nest-app';

@Module({
  imports: [
    //
    AppModule,
    AuthenticationModule,
    ConfigModule,
    IntegracaoBancoDeDadosModule,
    IntegracaoIdentidadeEAcessoModule,
    ModulosModule,
    MainModule,
  ],
})
export class MainModule {}
