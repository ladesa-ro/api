import { Module } from '@nestjs/common';

import { GerarHorarioController } from './gerar-horario.controller';
import { GerarHorarioService } from './gerar-horario.service';
import { MessageBrokerModule } from '@/adapters';

@Module({
    imports: [MessageBrokerModule],
    controllers: [GerarHorarioController],
    providers: [GerarHorarioService],
    exports: [GerarHorarioService]

})
export class GerarHorarioModule { }
