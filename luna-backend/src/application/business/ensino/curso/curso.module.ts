import {CursoResolver} from './curso.resolver';
import {CursoService} from './curso.service';
import {CursoController} from './curso.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [CursoController],
  providers: [CursoService, CursoResolver],
  exports: [CursoService],
})
export class CursoModule {}