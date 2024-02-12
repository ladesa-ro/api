import { Module } from '@nestjs/common';
import { AmbientesModule } from './ambientes/ambientes.module';

@Module({
  imports: [
    //
    AmbientesModule,
  ],
})
export class CoreBusinessModule {}
