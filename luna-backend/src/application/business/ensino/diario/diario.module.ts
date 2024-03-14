import { DiarioResolver } from './diario.resolver';
import { DiarioService } from './diario.service';
import { DiarioController } from './diario.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [DiarioController],
  providers: [DiarioService, DiarioResolver],
  exports: [DiarioService],
})
export class DiarioModule {}
