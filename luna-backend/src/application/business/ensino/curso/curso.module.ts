import { Module } from '@nestjs/common';
import { CursoController } from './curso.controller';
import { CursoResolver } from './curso.resolver';
import { CursoService } from './curso.service';

@Module({
  imports: [],
  controllers: [CursoController],
  providers: [CursoService, CursoResolver],
  exports: [CursoService],
})
export class CursoModule {}
