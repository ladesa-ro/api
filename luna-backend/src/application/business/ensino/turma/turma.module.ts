import { TurmaResolver } from './turma.resolver';
import { TurmaService } from './turma.service';
import { TurmaController } from './turma.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [TurmaController],
  providers: [TurmaService, TurmaResolver],
  exports: [TurmaService],
})
export class TurmaModule {}
