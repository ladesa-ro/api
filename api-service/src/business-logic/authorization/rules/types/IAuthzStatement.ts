import * as PocTypings from "@ladesa-ro/especificacao";
import { IBaseAuthzCheck, IBaseAuthzFilter } from "./IBaseAuthz";

// ===================================================================================

export type IAuthzStatementEnderecoFind = IBaseAuthzFilter<"endereco:find">;

// =====================

export type IAuthzStatementEstadoFind = IBaseAuthzFilter<"estado:find">;
export type IAuthzStatementCidadeFind = IBaseAuthzFilter<"cidade:find">;

// =====================

export type IAuthzStatementCampusCreate = IBaseAuthzCheck<"campus:create", { dto: PocTypings.CampusCreateOperationInput }>;
export type IAuthzStatementCampusFind = IBaseAuthzFilter<"campus:find">;
export type IAuthzStatementCampusUpdate = IBaseAuthzFilter<"campus:update", { dto: PocTypings.CampusUpdateOperationInput }>;
export type IAuthzStatementCampusDelete = IBaseAuthzFilter<"campus:delete", { dto: PocTypings.CampusFindOneInputView }>;

// =====================

export type IAuthzStatementBlocoCreate = IBaseAuthzCheck<"bloco:create", { dto: PocTypings.BlocoCreateOperationInput }>;
export type IAuthzStatementBlocoFind = IBaseAuthzFilter<"bloco:find">;
export type IAuthzStatementBlocoUpdate = IBaseAuthzFilter<"bloco:update", { dto: PocTypings.BlocoUpdateByIdOperationInput }>;
export type IAuthzStatementBlocoDelete = IBaseAuthzFilter<"bloco:delete", { dto: PocTypings.BlocoFindOneInputView }>;

// =====================

export type IAuthzStatementAmbienteCreate = IBaseAuthzCheck<"ambiente:create", { dto: PocTypings.AmbienteCreateOperationInput }>;
export type IAuthzStatementAmbienteFind = IBaseAuthzFilter<"ambiente:find">;
export type IAuthzStatementAmbienteUpdate = IBaseAuthzFilter<"ambiente:update", { dto: PocTypings.AmbienteUpdateByIdOperationInput }>;
export type IAuthzStatementAmbienteDelete = IBaseAuthzFilter<"ambiente:delete", { dto: PocTypings.AmbienteFindOneInputView }>;

// =====================

export type IAuthzStatementUsuarioCreate = IBaseAuthzCheck<"usuario:create", { dto: PocTypings.UsuarioCreateOperationInput }>;
export type IAuthzStatementUsuarioFind = IBaseAuthzFilter<"usuario:find">;
export type IAuthzStatementUsuarioUpdate = IBaseAuthzFilter<"usuario:update", { dto: PocTypings.UsuarioUpdateByIdOperationInput }>;
export type IAuthzStatementUsuarioDelete = IBaseAuthzFilter<"usuario:delete", { dto: PocTypings.UsuarioFindOneInputView }>;

// =====================

export type IAuthzStatementModalidadeCreate = IBaseAuthzCheck<"modalidade:create", { dto: PocTypings.ModalidadeCreateOperationInput }>;
export type IAuthzStatementModalidadeFind = IBaseAuthzFilter<"modalidade:find">;
export type IAuthzStatementModalidadeUpdate = IBaseAuthzFilter<"modalidade:update", { dto: PocTypings.ModalidadeUpdateByIdOperationInput }>;
export type IAuthzStatementModalidadeDelete = IBaseAuthzFilter<"modalidade:delete", { dto: PocTypings.ModalidadeFindOneInputView }>;

// =====================

export type IAuthzStatementVinculoFind = IBaseAuthzFilter<"vinculo:find">;

// =====================

export type IAuthzStatementCursoCreate = IBaseAuthzCheck<"curso:create", { dto: PocTypings.CursoCreateOperationInput }>;
export type IAuthzStatementCursoUpdate = IBaseAuthzFilter<"curso:update", { dto: PocTypings.CursoUpdateByIdOperationInput }>;
export type IAuthzStatementCursoDelete = IBaseAuthzFilter<"curso:delete", { dto: PocTypings.CursoFindOneInputView }>;
export type IAuthzStatementCursoFind = IBaseAuthzFilter<"curso:find">;

// =====================

export type IAuthzStatementDisciplinaCreate = IBaseAuthzCheck<"disciplina:create", { dto: PocTypings.DisciplinaCreateOperationInput }>;
export type IAuthzStatementDisciplinaUpdate = IBaseAuthzFilter<"disciplina:update", { dto: PocTypings.DisciplinaUpdateByIdOperationInput }>;
export type IAuthzStatementDisciplinaDelete = IBaseAuthzFilter<"disciplina:delete", { dto: PocTypings.DisciplinaFindOneInputView }>;
export type IAuthzStatementDisciplinaFind = IBaseAuthzFilter<"disciplina:find">;

// =====================

export type IAuthzStatementTurmaCreate = IBaseAuthzCheck<"turma:create", { dto: PocTypings.TurmaCreateOperationInput }>;
export type IAuthzStatementTurmaUpdate = IBaseAuthzFilter<"turma:update", { dto: PocTypings.TurmaUpdateByIdOperationInput }>;
export type IAuthzStatementTurmaDelete = IBaseAuthzFilter<"turma:delete", { dto: PocTypings.TurmaFindOneInputView }>;
export type IAuthzStatementTurmaFind = IBaseAuthzFilter<"turma:find">;

// =====================

export type IAuthzStatementDiarioCreate = IBaseAuthzCheck<"diario:create", { dto: PocTypings.DiarioCreateOperationInput }>;
export type IAuthzStatementDiarioUpdate = IBaseAuthzFilter<"diario:update", { dto: PocTypings.DiarioUpdateByIdOperationInput }>;
export type IAuthzStatementDiarioDelete = IBaseAuthzFilter<"diario:delete", { dto: PocTypings.DiarioFindOneInputView }>;
export type IAuthzStatementDiarioFind = IBaseAuthzFilter<"diario:find">;

// =====================

export type IAuthzStatementReservaCreate = IBaseAuthzCheck<"reserva:create", { dto: PocTypings.ReservaCreateOperationInput }>;
export type IAuthzStatementReservaUpdate = IBaseAuthzFilter<"reserva:update", { dto: PocTypings.ReservaUpdateByIdOperationInput }>;
export type IAuthzStatementReservaDelete = IBaseAuthzFilter<"reserva:delete", { dto: PocTypings.ReservaFindOneInputView }>;
export type IAuthzStatementReservaFind = IBaseAuthzFilter<"reserva:find">;

// =====================

export type IAuthzStatementCalendarioLetivoCreate = IBaseAuthzCheck<"calendario_letivo:create", { dto: PocTypings.CalendarioLetivoCreateOperationInput }>;
export type IAuthzStatementCalendarioLetivoUpdate = IBaseAuthzFilter<"calendario_letivo:update", { dto: PocTypings.CalendarioLetivoUpdateByIdOperationInput }>;
export type IAuthzStatementCalendarioLetivoDelete = IBaseAuthzFilter<"calendario_letivo:delete", { dto: PocTypings.CalendarioLetivoFindOneInputView }>;
export type IAuthzStatementCalendarioLetivoFind = IBaseAuthzFilter<"calendario_letivo:find">;

// =====================

export type IAuthzStatementDiarioProfessorCreate = IBaseAuthzCheck<"diario_professor:create", { dto: PocTypings.DiarioProfessorCreateOperationInput }>;

export type IAuthzStatementDiarioProfessorUpdate = IBaseAuthzFilter<"diario_professor:update", { dto: PocTypings.DiarioProfessorUpdateByIdOperationInput }>;

export type IAuthzStatementDiarioProfessorDelete = IBaseAuthzFilter<"diario_professor:delete", { dto: PocTypings.DiarioProfessorFindOneInputView }>;

export type IAuthzStatementDiarioProfessorFilter = IBaseAuthzFilter<"diario_professor:find">;

// =====================

export type IAuthzStatementEventoCreate = IBaseAuthzCheck<"evento:create", { dto: PocTypings.EventoCreateOperationInput }>;
export type IAuthzStatementEventoUpdate = IBaseAuthzFilter<"evento:update", { dto: PocTypings.EventoUpdateByIdOperationInput }>;
export type IAuthzStatementEventoDelete = IBaseAuthzFilter<"evento:delete", { dto: PocTypings.EventoFindOneInputView }>;
export type IAuthzStatementEventoFind = IBaseAuthzFilter<"evento:find">;

// =====================

export type IAuthzStatementDiaCalendarioCreate = IBaseAuthzCheck<"dia_calendario:create", { dto: PocTypings.DiaCalendarioCreateOperationInput }>;
export type IAuthzStatementDiaCalendarioUpdate = IBaseAuthzFilter<"dia_calendario:update", { dto: PocTypings.DiaCalendarioUpdateByIdOperationInput }>;
export type IAuthzStatementDiaCalendarioDelete = IBaseAuthzFilter<"dia_calendario:delete", { dto: PocTypings.DiaCalendarioFindOneInputView }>;
export type IAuthzStatementDiaCalendarioFind = IBaseAuthzFilter<"dia_calendario:find">;

// =====================

export type IAuthzStatementEtapaCreate = IBaseAuthzCheck<"etapa:create", { dto: PocTypings.EtapaCreateOperationInput }>;
export type IAuthzStatementEtapaUpdate = IBaseAuthzFilter<"etapa:update", { dto: PocTypings.EtapaUpdateByIdOperationInput }>;
export type IAuthzStatementEtapaDelete = IBaseAuthzFilter<"etapa:delete", { dto: PocTypings.EtapaFindOneInputView }>;
export type IAuthzStatementEtapaFind = IBaseAuthzFilter<"etapa:find">;

// =====================

export type IAuthzStatementAulaCreate = IBaseAuthzCheck<"aula:create", { dto: PocTypings.AulaCreateOperationInput }>;
export type IAuthzStatementAulaUpdate = IBaseAuthzFilter<"aula:update", { dto: PocTypings.AulaUpdateByIdOperationInput }>;
export type IAuthzStatementAulaDelete = IBaseAuthzFilter<"aula:delete", { dto: PocTypings.AulaFindOneInputView }>;
export type IAuthzStatementAulaFind = IBaseAuthzFilter<"aula:find">;

// =====================

export type IAuthzStatementDiarioPreferenciaAgrupamentoCreate = IBaseAuthzCheck<"diario_preferencia_agrupamento:create", { dto: PocTypings.DiarioPreferenciaAgrupamentoCreateOperationInput }>;
export type IAuthzStatementDiarioPreferenciaAgrupamentoUpdate = IBaseAuthzFilter<"diario_preferencia_agrupamento:update", { dto: PocTypings.DiarioPreferenciaAgrupamentoUpdateByIdOperationInput }>;
export type IAuthzStatementDiarioPreferenciaAgrupamentoDelete = IBaseAuthzFilter<"diario_preferencia_agrupamento:delete", { dto: PocTypings.DiarioPreferenciaAgrupamentoFindOneInputView }>;
export type IAuthzStatementDiarioPreferenciaAgrupamentoFind = IBaseAuthzFilter<"diario_preferencia_agrupamento:find">;

// =====================

export type IAuthzStatementHorarioGeradoCreate = IBaseAuthzCheck<"horario_gerado:create", { dto: PocTypings.HorarioGeradoCreateOperationInput }>;
export type IAuthzStatementHorarioGeradoUpdate = IBaseAuthzFilter<"horario_gerado:update", { dto: PocTypings.HorarioGeradoUpdateByIdOperationInput }>;
export type IAuthzStatementHorarioGeradoDelete = IBaseAuthzFilter<"horario_gerado:delete", { dto: PocTypings.HorarioGeradoFindOneInputView }>;
export type IAuthzStatementHorarioGeradoFind = IBaseAuthzFilter<"horario_gerado:find">;

// =====================

export type IAuthzStatementHorarioGeradoAulaCreate = IBaseAuthzCheck<"horario_gerado_aula:create", { dto: PocTypings.HorarioGeradoAulaCreateOperationInput }>;
export type IAuthzStatementHorarioGeradoAulaUpdate = IBaseAuthzFilter<"horario_gerado_aula:update", { dto: PocTypings.HorarioGeradoAulaUpdateByIdOperationInput }>;
export type IAuthzStatementHorarioGeradoAulaDelete = IBaseAuthzFilter<"horario_gerado_aula:delete", { dto: PocTypings.HorarioGeradoAulaFindOneInputView }>;
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
  | IAuthzStatementAulaCreate
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
  | IAuthzStatementAulaUpdate
  | IAuthzStatementAulaDelete
  | IAuthzStatementAulaFind
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
