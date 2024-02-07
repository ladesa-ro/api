import { Module } from '@nestjs/common';
import { EstadoModule } from './estado/estado.module';

@Module({
  imports: [EstadoModule],
})
export class BaseModule {}
