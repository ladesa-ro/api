import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Curso')
@Controller('/cursos')
export class CursoController {
  constructor() {}
}
