import { Module } from '@nestjs/common';

import { GerarHorarioController } from './gerar-horario.controller';

@Module({
    imports: [],
    controllers: [GerarHorarioController],

})
export class GerarHorarioModule { }
