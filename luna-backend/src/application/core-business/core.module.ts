import { Module } from '@nestjs/common';
import { AmbientesModule } from './ambientes/ambientes.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, AmbientesModule],
})
export class CoreBusinessModule {}
