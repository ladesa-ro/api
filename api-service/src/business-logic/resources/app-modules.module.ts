import { Module } from "@nestjs/common";
import { AmbientesModule } from "./ambientes/ambientes.module";
import { AutenticacaoModule } from "./autenticacao/autenticacao.module";
import { BaseModule } from "./base/base.module";
import { CalendarioModule } from "./calendario/calendario.module";
import { EnsinoModule } from "./ensino/ensino.module";
import { DiarioPreferenciaAgrupamentoModule } from "./horario-academico/diario-preferencia-agrupamento/diario-preferencia-agrupamento.module";
import { DisponibilidadeProfessorDiaModule } from "./horario-academico/disponibilidade-professor-dia/disponibilidade-professor-dia.module";
import { DisponibilidadeProfessorModule } from "./horario-academico/disponibilidade-professor/disponibilidade-professor.module";
import { HorarioAcademicoModule } from "./horario-academico/horario-academico.module";
//import { GerarHorarioModule } from './gerar-horario/gerar-horario.module';

@Module({
  imports: [
    //
    BaseModule,
    AutenticacaoModule,
    AmbientesModule,
    EnsinoModule,
    CalendarioModule,
    HorarioAcademicoModule,
    /*GerarHorarioModule*/
  ],
})
export class AppModulesModule {}
