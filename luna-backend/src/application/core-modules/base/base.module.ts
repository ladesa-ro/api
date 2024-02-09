import { Module } from '@nestjs/common';
import { CidadeModule } from './cidade/cidade.module';
import { EstadoModule } from './estado/estado.module';

@Module({
  imports: [
    //
    EstadoModule,
    CidadeModule,
  ],
})
export class BaseModule {}
