import type * as LadesaTypings from "@ladesa-ro/especificacao";
import { IBaseAuthzCheck, IBaseAuthzFilter } from "./IBaseAuthz";

// ===================================================================================

export type IAuthzStatementEnderecoFind = IBaseAuthzFilter<"endereco:find">;

// =====================

export type IAuthzStatementEstadoFind = IBaseAuthzFilter<"estado:find">;
export type IAuthzStatementCidadeFind = IBaseAuthzFilter<"cidade:find">;

// =====================

export type IAuthzStatementCampusCreate = IBaseAuthzCheck<"campus:create", { dto: LadesaTypings.CampusCreateCombinedInput }>;
export type IAuthzStatementCampusFind = IBaseAuthzFilter<"campus:find">;
export type IAuthzStatementCampusUpdate = IBaseAuthzFilter<"campus:update", { dto: LadesaTypings.CampusUpdateByIDCombinedInput }>;
export type IAuthzStatementCampusDelete = IBaseAuthzFilter<"campus:delete", { dto: LadesaTypings.CampusFindOneInput }>;

// =====================

export type IAuthzStatementBlocoCreate = IBaseAuthzCheck<"bloco:create", { dto: LadesaTypings.BlocoCreateCombinedInput }>;
export type IAuthzStatementBlocoFind = IBaseAuthzFilter<"bloco:find">;
export type IAuthzStatementBlocoUpdate = IBaseAuthzFilter<"bloco:update", { dto: LadesaTypings.BlocoUpdateByIDCombinedInput }>;
export type IAuthzStatementBlocoDelete = IBaseAuthzFilter<"bloco:delete", { dto: LadesaTypings.BlocoFindOneInput }>;

// =====================

export type IAuthzStatementAmbienteCreate = IBaseAuthzCheck<"ambiente:create", { dto: LadesaTypings.AmbienteCreateCombinedInput }>;
export type IAuthzStatementAmbienteFind = IBaseAuthzFilter<"ambiente:find">;
export type IAuthzStatementAmbienteUpdate = IBaseAuthzFilter<"ambiente:update", { dto: LadesaTypings.AmbienteUpdateByIDCombinedInput }>;
export type IAuthzStatementAmbienteDelete = IBaseAuthzFilter<"ambiente:delete", { dto: LadesaTypings.AmbienteFindOneInput }>;

// =====================

export type IAuthzStatementUsuarioCreate = IBaseAuthzCheck<"usuario:create", { dto: LadesaTypings.UsuarioCreateCombinedInput }>;
export type IAuthzStatementUsuarioFind = IBaseAuthzFilter<"usuario:find">;
export type IAuthzStatementUsuarioUpdate = IBaseAuthzFilter<"usuario:update", { dto: LadesaTypings.UsuarioUpdateByIDCombinedInput }>;
export type IAuthzStatementUsuarioDelete = IBaseAuthzFilter<"usuario:delete", { dto: LadesaTypings.UsuarioFindOneInput }>;

// =====================

export type IAuthzStatementModalidadeCreate = IBaseAuthzCheck<"modalidade:create", { dto: LadesaTypings.ModalidadeCreateCombinedInput }>;
export type IAuthzStatementModalidadeFind = IBaseAuthzFilter<"modalidade:find">;
export type IAuthzStatementModalidadeUpdate = IBaseAuthzFilter<"modalidade:update", { dto: LadesaTypings.ModalidadeUpdateByIDCombinedInput }>;
export type IAuthzStatementModalidadeDelete = IBaseAuthzFilter<"modalidade:delete", { dto: LadesaTypings.ModalidadeFindOneInput }>;

// =====================

export type IAuthzStatementVinculoFind = IBaseAuthzFilter<"vinculo:find">;

// =====================

export type IAuthzStatementCursoCreate = IBaseAuthzCheck<"curso:create", { dto: LadesaTypings.CursoCreateCombinedInput }>;
export type IAuthzStatementCursoUpdate = IBaseAuthzFilter<"curso:update", { dto: LadesaTypings.CursoUpdateByIDCombinedInput }>;
export type IAuthzStatementCursoDelete = IBaseAuthzFilter<"curso:delete", { dto: LadesaTypings.CursoFindOneInput }>;
export type IAuthzStatementCursoFind = IBaseAuthzFilter<"curso:find">;

// =====================

export type IAuthzStatementDisciplinaCreate = IBaseAuthzCheck<"disciplina:create", { dto: LadesaTypings.DisciplinaCreateCombinedInput }>;
export type IAuthzStatementDisciplinaUpdate = IBaseAuthzFilter<"disciplina:update", { dto: LadesaTypings.DisciplinaUpdateByIDCombinedInput }>;
export type IAuthzStatementDisciplinaDelete = IBaseAuthzFilter<"disciplina:delete", { dto: LadesaTypings.DisciplinaFindOneInput }>;
export type IAuthzStatementDisciplinaFind = IBaseAuthzFilter<"disciplina:find">;

// =====================

export type IAuthzStatementTurmaCreate = IBaseAuthzCheck<"turma:create", { dto: LadesaTypings.TurmaCreateCombinedInput }>;
export type IAuthzStatementTurmaUpdate = IBaseAuthzFilter<"turma:update", { dto: LadesaTypings.TurmaUpdateByIDCombinedInput }>;
export type IAuthzStatementTurmaDelete = IBaseAuthzFilter<"turma:delete", { dto: LadesaTypings.TurmaFindOneInput }>;
export type IAuthzStatementTurmaFind = IBaseAuthzFilter<"turma:find">;

// =====================

export type IAuthzStatementDiarioCreate = IBaseAuthzCheck<"diario:create", { dto: LadesaTypings.DiarioCreateCombinedInput }>;
export type IAuthzStatementDiarioUpdate = IBaseAuthzFilter<"diario:update", { dto: LadesaTypings.DiarioUpdateByIDCombinedInput }>;
export type IAuthzStatementDiarioDelete = IBaseAuthzFilter<"diario:delete", { dto: LadesaTypings.DiarioFindOneInput }>;
export type IAuthzStatementDiarioFind = IBaseAuthzFilter<"diario:find">;

// =====================

export type IAuthzStatementReservaCreate = IBaseAuthzCheck<"reserva:create", { dto: LadesaTypings.ReservaCreateCombinedInput }>;
export type IAuthzStatementReservaUpdate = IBaseAuthzFilter<"reserva:update", { dto: LadesaTypings.ReservaUpdateByIDCombinedInput }>;
export type IAuthzStatementReservaDelete = IBaseAuthzFilter<"reserva:delete", { dto: LadesaTypings.ReservaFindOneInput }>;
export type IAuthzStatementReservaFind = IBaseAuthzFilter<"reserva:find">;

// =====================

export type IAuthzStatementCalendarioLetivoCreate = IBaseAuthzCheck<"calendario_letivo:create", { dto: LadesaTypings.CalendarioLetivoCreateCombinedInput }>;
export type IAuthzStatementCalendarioLetivoUpdate = IBaseAuthzFilter<"calendario_letivo:update", { dto: LadesaTypings.CalendarioLetivoUpdateByIDCombinedInput }>;
export type IAuthzStatementCalendarioLetivoDelete = IBaseAuthzFilter<"calendario_letivo:delete", { dto: LadesaTypings.CalendarioLetivoFindOneInput }>;
export type IAuthzStatementCalendarioLetivoFind = IBaseAuthzFilter<"calendario_letivo:find">;

// =====================

export type IAuthzStatementDiarioProfessorCreate = IBaseAuthzCheck<"diario_professor:create", { dto: LadesaTypings.DiarioProfessorCreateCombinedInput }>;

export type IAuthzStatementDiarioProfessorUpdate = IBaseAuthzFilter<"diario_professor:update", { dto: LadesaTypings.DiarioProfessorUpdateByIDCombinedInput }>;

export type IAuthzStatementDiarioProfessorDelete = IBaseAuthzFilter<"diario_professor:delete", { dto: LadesaTypings.DiarioProfessorFindOneInput }>;

export type IAuthzStatementDiarioProfessorFilter = IBaseAuthzFilter<"diario_professor:find">;

// =====================

export type IAuthzStatementEventoCreate = IBaseAuthzCheck<"evento:create", { dto: LadesaTypings.EventoCreateCombinedInput }>;
export type IAuthzStatementEventoUpdate = IBaseAuthzFilter<"evento:update", { dto: LadesaTypings.EventoUpdateByIDCombinedInput }>;
export type IAuthzStatementEventoDelete = IBaseAuthzFilter<"evento:delete", { dto: LadesaTypings.EventoFindOneInput }>;
export type IAuthzStatementEventoFind = IBaseAuthzFilter<"evento:find">;

// =====================

export type IAuthzStatementDiaCalendarioCreate = IBaseAuthzCheck<"dia_calendario:create", { dto: LadesaTypings.DiaCalendarioCreateCombinedInput }>;
export type IAuthzStatementDiaCalendarioUpdate = IBaseAuthzFilter<"dia_calendario:update", { dto: LadesaTypings.DiaCalendarioUpdateByIDCombinedInput }>;
export type IAuthzStatementDiaCalendarioDelete = IBaseAuthzFilter<"dia_calendario:delete", { dto: LadesaTypings.DiaCalendarioFindOneInput }>;
export type IAuthzStatementDiaCalendarioFind = IBaseAuthzFilter<"dia_calendario:find">;

// =====================

export type IAuthzStatementEtapaCreate = IBaseAuthzCheck<"etapa:create", { dto: LadesaTypings.EtapaCreateCombinedInput }>;
export type IAuthzStatementEtapaUpdate = IBaseAuthzFilter<"etapa:update", { dto: LadesaTypings.EtapaUpdateByIDCombinedInput }>;
export type IAuthzStatementEtapaDelete = IBaseAuthzFilter<"etapa:delete", { dto: LadesaTypings.EtapaFindOneInput }>;
export type IAuthzStatementEtapaFind = IBaseAuthzFilter<"etapa:find">;

// =====================

export type IAuthzStatementTurmaDisponibilidadeCreate = IBaseAuthzCheck<"turma_disponibilidade:create", { dto: LadesaTypings.TurmaDisponibilidadeCreateCombinedInput }>;
export type IAuthzStatementTurmaDisponibilidadeUpdate = IBaseAuthzFilter<"turma_disponibilidade:update", { dto: LadesaTypings.TurmaDisponibilidadeUpdateByIDCombinedInput }>;
export type IAuthzStatementTurmaDisponibilidadeDelete = IBaseAuthzFilter<"turma_disponibilidade:delete", { dto: LadesaTypings.TurmaDisponibilidadeFindOneInput }>;
export type IAuthzStatementTurmaDisponibilidadeFind = IBaseAuthzFilter<"turma_disponibilidade:find">;

// =====================

export type IAuthzStatementTurmaDisponibilidadeDiaCreate = IBaseAuthzCheck<"turma_disponibilidade_dia:create", { dto: LadesaTypings.TurmaDisponibilidadeDiaCreateCombinedInput }>;
export type IAuthzStatementTurmaDisponibilidadeDiaUpdate = IBaseAuthzFilter<"turma_disponibilidade_dia:update", { dto: LadesaTypings.TurmaDisponibilidadeDiaUpdateByIDCombinedInput }>;
export type IAuthzStatementTurmaDisponibilidadeDiaDelete = IBaseAuthzFilter<"turma_disponibilidade_dia:delete", { dto: LadesaTypings.TurmaDisponibilidadeDiaFindOneInput }>;
export type IAuthzStatementTurmaDisponibilidadeDiaFind = IBaseAuthzFilter<"turma_disponibilidade_dia:find">;

// =====================

export type IAuthzStatementAulaCreate = IBaseAuthzCheck<"aula:create", { dto: LadesaTypings.AulaCreateCombinedInput }>;
export type IAuthzStatementAulaUpdate = IBaseAuthzFilter<"aula:update", { dto: LadesaTypings.AulaUpdateByIDCombinedInput }>;
export type IAuthzStatementAulaDelete = IBaseAuthzFilter<"aula:delete", { dto: LadesaTypings.AulaFindOneInput }>;
export type IAuthzStatementAulaFind = IBaseAuthzFilter<"aula:find">;

// =====================

export type IAuthzStatementDisponibilidadeProfessorCreate = IBaseAuthzCheck<"disponibilidade_professor:create", { dto: LadesaTypings.DisponibilidadeProfessorCreateCombinedInput }>;
export type IAuthzStatementDisponibilidadeProfessorUpdate = IBaseAuthzFilter<"disponibilidade_professor:update", { dto: LadesaTypings.DisponibilidadeProfessorUpdateByIDCombinedInput }>;
export type IAuthzStatementDisponibilidadeProfessorDelete = IBaseAuthzFilter<"disponibilidade_professor:delete", { dto: LadesaTypings.DisponibilidadeProfessorFindOneInput }>;
export type IAuthzStatementDisponibilidadeProfessorFind = IBaseAuthzFilter<"disponibilidade_professor:find">;

// =====================

export type IAuthzStatementDisponibilidadeProfessorDiaCreate = IBaseAuthzCheck<"disponibilidade_professor_dia:create", { dto: LadesaTypings.DisponibilidadeProfessorDiaCreateCombinedInput }>;
export type IAuthzStatementDisponibilidadeProfessorDiaUpdate = IBaseAuthzFilter<"disponibilidade_professor_dia:update", { dto: LadesaTypings.DisponibilidadeProfessorDiaUpdateByIDCombinedInput }>;
export type IAuthzStatementDisponibilidadeProfessorDiaDelete = IBaseAuthzFilter<"disponibilidade_professor_dia:delete", { dto: LadesaTypings.DisponibilidadeProfessorDiaFindOneInput }>;
export type IAuthzStatementDisponibilidadeProfessorDiaFind = IBaseAuthzFilter<"disponibilidade_professor_dia:find">;

// =====================

export type IAuthzStatementDiarioPreferenciaAgrupamentoCreate = IBaseAuthzCheck<"diario_preferencia_agrupamento:create", { dto: LadesaTypings.DiarioPreferenciaAgrupamentoCreateCombinedInput }>;
export type IAuthzStatementDiarioPreferenciaAgrupamentoUpdate = IBaseAuthzFilter<"diario_preferencia_agrupamento:update", { dto: LadesaTypings.DiarioPreferenciaAgrupamentoUpdateByIDCombinedInput }>;
export type IAuthzStatementDiarioPreferenciaAgrupamentoDelete = IBaseAuthzFilter<"diario_preferencia_agrupamento:delete", { dto: LadesaTypings.DiarioPreferenciaAgrupamentoFindOneInput }>;
export type IAuthzStatementDiarioPreferenciaAgrupamentoFind = IBaseAuthzFilter<"diario_preferencia_agrupamento:find">;

// =====================

export type IAuthzStatementHorarioGeradoCreate = IBaseAuthzCheck<"horario_gerado:create", { dto: LadesaTypings.HorarioGeradoCreateCombinedInput }>;
export type IAuthzStatementHorarioGeradoUpdate = IBaseAuthzFilter<"horario_gerado:update", { dto: LadesaTypings.HorarioGeradoUpdateByIDCombinedInput }>;
export type IAuthzStatementHorarioGeradoDelete = IBaseAuthzFilter<"horario_gerado:delete", { dto: LadesaTypings.HorarioGeradoFindOneInput }>;
export type IAuthzStatementHorarioGeradoFind = IBaseAuthzFilter<"horario_gerado:find">;

// =====================

export type IAuthzStatementHorarioGeradoAulaCreate = IBaseAuthzCheck<"horario_gerado_aula:create", { dto: LadesaTypings.HorarioGeradoAulaCreateCombinedInput }>;
export type IAuthzStatementHorarioGeradoAulaUpdate = IBaseAuthzFilter<"horario_gerado_aula:update", { dto: LadesaTypings.HorarioGeradoAulaUpdateByIDCombinedInput }>;
export type IAuthzStatementHorarioGeradoAulaDelete = IBaseAuthzFilter<"horario_gerado_aula:delete", { dto: LadesaTypings.HorarioGeradoAulaFindOneInput }>;
export type IAuthzStatementHorarioGeradoAulaFind = IBaseAuthzFilter<"horario_gerado_aula:find">;

// ===================================================================================

export type IAuthzStatementCheck =
  | IAuthzStatementCampusCreate
  | IAuthzStatementBlocoCreate
  | IAuthzStatementAmbienteCreate
  | IAuthzStatementUsuarioCreate
  | IAuthzStatementModalidadeCreate
  | IAuthzStatementCursoCreate
  | IAuthzStatementDisciplinaCreate
  | IAuthzStatementTurmaCreate
  | IAuthzStatementCalendarioLetivoCreate
  | IAuthzStatementDiarioCreate
  | IAuthzStatementReservaCreate
  | IAuthzStatementDiarioProfessorCreate
  | IAuthzStatementEventoCreate
  | IAuthzStatementDiaCalendarioCreate
  | IAuthzStatementEtapaCreate
  | IAuthzStatementTurmaDisponibilidadeCreate
  | IAuthzStatementAulaCreate
  | IAuthzStatementTurmaDisponibilidadeDiaCreate
  | IAuthzStatementDisponibilidadeProfessorCreate
  | IAuthzStatementDisponibilidadeProfessorDiaCreate
  | IAuthzStatementDiarioPreferenciaAgrupamentoCreate
  | IAuthzStatementHorarioGeradoCreate
  | IAuthzStatementHorarioGeradoAulaCreate;

// =====================

export type IAuthzStatementFilter =
  //
  | IAuthzStatementEnderecoFind
  | IAuthzStatementEstadoFind
  | IAuthzStatementCidadeFind
  | IAuthzStatementCampusFind
  | IAuthzStatementCampusUpdate
  | IAuthzStatementCampusDelete
  | IAuthzStatementBlocoFind
  | IAuthzStatementBlocoUpdate
  | IAuthzStatementBlocoDelete
  | IAuthzStatementModalidadeFind
  | IAuthzStatementModalidadeUpdate
  | IAuthzStatementModalidadeDelete
  | IAuthzStatementAmbienteFind
  | IAuthzStatementAmbienteUpdate
  | IAuthzStatementAmbienteDelete
  | IAuthzStatementUsuarioFind
  | IAuthzStatementUsuarioUpdate
  | IAuthzStatementUsuarioDelete
  | IAuthzStatementVinculoFind
  | IAuthzStatementCursoDelete
  | IAuthzStatementCursoFind
  | IAuthzStatementCursoUpdate
  | IAuthzStatementDisciplinaUpdate
  | IAuthzStatementDisciplinaDelete
  | IAuthzStatementDisciplinaFind
  | IAuthzStatementTurmaUpdate
  | IAuthzStatementTurmaDelete
  | IAuthzStatementTurmaFind
  | IAuthzStatementDiarioUpdate
  | IAuthzStatementDiarioDelete
  | IAuthzStatementDiarioFind
  | IAuthzStatementReservaUpdate
  | IAuthzStatementReservaDelete
  | IAuthzStatementReservaFind
  | IAuthzStatementCalendarioLetivoDelete
  | IAuthzStatementCalendarioLetivoFind
  | IAuthzStatementCalendarioLetivoUpdate
  | IAuthzStatementDiarioProfessorUpdate
  | IAuthzStatementDiarioProfessorDelete
  | IAuthzStatementDiarioProfessorFilter
  | IAuthzStatementEventoFind
  | IAuthzStatementEventoUpdate
  | IAuthzStatementEventoDelete
  | IAuthzStatementDiaCalendarioFind
  | IAuthzStatementDiaCalendarioUpdate
  | IAuthzStatementDiaCalendarioDelete
  | IAuthzStatementEtapaUpdate
  | IAuthzStatementEtapaFind
  | IAuthzStatementEtapaDelete
  | IAuthzStatementTurmaDisponibilidadeUpdate
  | IAuthzStatementTurmaDisponibilidadeDelete
  | IAuthzStatementTurmaDisponibilidadeFind
  | IAuthzStatementAulaUpdate
  | IAuthzStatementAulaDelete
  | IAuthzStatementAulaFind
  | IAuthzStatementTurmaDisponibilidadeDiaUpdate
  | IAuthzStatementTurmaDisponibilidadeDiaDelete
  | IAuthzStatementTurmaDisponibilidadeDiaFind
  | IAuthzStatementDisponibilidadeProfessorUpdate
  | IAuthzStatementDisponibilidadeProfessorDelete
  | IAuthzStatementDisponibilidadeProfessorFind
  | IAuthzStatementDisponibilidadeProfessorDiaUpdate
  | IAuthzStatementDisponibilidadeProfessorDiaFind
  | IAuthzStatementDisponibilidadeProfessorDiaDelete
  | IAuthzStatementDiarioPreferenciaAgrupamentoUpdate
  | IAuthzStatementDiarioPreferenciaAgrupamentoFind
  | IAuthzStatementDiarioPreferenciaAgrupamentoDelete
  | IAuthzStatementHorarioGeradoUpdate
  | IAuthzStatementHorarioGeradoFind
  | IAuthzStatementHorarioGeradoDelete
  | IAuthzStatementHorarioGeradoAulaUpdate
  | IAuthzStatementHorarioGeradoAulaDelete
  | IAuthzStatementHorarioGeradoAulaFind;

// =====================

export type IAuthzStatement = IAuthzStatementFilter | IAuthzStatementCheck;

// ===================================================================================

export const createStatement = <Statement extends IAuthzStatement>(statement: Omit<Statement, "payload">) => statement as Statement;

// ===================================================================================
