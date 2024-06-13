import type * as LadesaTypings from '@ladesa-ro/especificacao';
import * as Spec from '@sisgea/spec';
import { IBaseAuthzCheck, IBaseAuthzFilter } from './IBaseAuthz';

// ===================================================================================

export type IAuthzStatementEnderecoFind = IBaseAuthzFilter<'endereco:find'>;

// =====================

export type IAuthzStatementEstadoFind = IBaseAuthzFilter<'estado:find'>;
export type IAuthzStatementCidadeFind = IBaseAuthzFilter<'cidade:find'>;

// =====================

export type IAuthzStatementCampusCreate = IBaseAuthzCheck<'campus:create', { dto: LadesaTypings.CampusCreateCombinedInput }>;
export type IAuthzStatementCampusFind = IBaseAuthzFilter<'campus:find'>;
export type IAuthzStatementCampusUpdate = IBaseAuthzFilter<'campus:update', { dto: LadesaTypings.CampusUpdateByIDCombinedInput }>;
export type IAuthzStatementCampusDelete = IBaseAuthzFilter<'campus:delete', { dto: LadesaTypings.CampusFindOneInput }>;

// =====================

export type IAuthzStatementBlocoCreate = IBaseAuthzCheck<'bloco:create', { dto: LadesaTypings.BlocoCreateCombinedInput }>;
export type IAuthzStatementBlocoFind = IBaseAuthzFilter<'bloco:find'>;
export type IAuthzStatementBlocoUpdate = IBaseAuthzFilter<'bloco:update', { dto: LadesaTypings.BlocoUpdateByIDCombinedInput }>;
export type IAuthzStatementBlocoDelete = IBaseAuthzFilter<'bloco:delete', { dto: LadesaTypings.BlocoFindOneInput }>;

// =====================

export type IAuthzStatementAmbienteCreate = IBaseAuthzCheck<'ambiente:create', { dto: LadesaTypings.AmbienteCreateCombinedInput }>;
export type IAuthzStatementAmbienteFind = IBaseAuthzFilter<'ambiente:find'>;
export type IAuthzStatementAmbienteUpdate = IBaseAuthzFilter<'ambiente:update', { dto: LadesaTypings.AmbienteUpdateByIDCombinedInput }>;
export type IAuthzStatementAmbienteDelete = IBaseAuthzFilter<
  'ambiente:delete',
  {
    dto: Spec.IAmbienteDeleteOneByIdInputDto;
  }
>;

// =====================

export type IAuthzStatementUsuarioCreate = IBaseAuthzCheck<'usuario:create', { dto: LadesaTypings.UsuarioCreateCombinedInput }>;
export type IAuthzStatementUsuarioFind = IBaseAuthzFilter<'usuario:find'>;
export type IAuthzStatementUsuarioUpdate = IBaseAuthzFilter<'usuario:update', { dto: LadesaTypings.UsuarioUpdateByIDCombinedInput }>;
export type IAuthzStatementUsuarioDelete = IBaseAuthzFilter<'usuario:delete', { dto: LadesaTypings.UsuarioFindOneInput }>;

// =====================

export type IAuthzStatementModalidadeCreate = IBaseAuthzCheck<'modalidade:create', { dto: Spec.IModalidadeCreateDto }>;
export type IAuthzStatementModalidadeFind = IBaseAuthzFilter<'modalidade:find'>;
export type IAuthzStatementModalidadeUpdate = IBaseAuthzFilter<'modalidade:update', { dto: Spec.IModalidadeUpdateDto }>;
export type IAuthzStatementModalidadeDelete = IBaseAuthzFilter<
  'modalidade:delete',
  {
    dto: Spec.IModalidadeDeleteOneByIdInputDto;
  }
>;

// =====================

export type IAuthzStatementVinculoFind = IBaseAuthzFilter<'vinculo:find'>;

// =====================

export type IAuthzStatementCursoCreate = IBaseAuthzCheck<'curso:create', { dto: Spec.ICursoInputDto }>;
export type IAuthzStatementCursoUpdate = IBaseAuthzFilter<'curso:update', { dto: Spec.ICursoUpdateDto }>;
export type IAuthzStatementCursoDelete = IBaseAuthzFilter<'curso:delete', { dto: Spec.ICursoDeleteOneByIdInputDto }>;
export type IAuthzStatementCursoFind = IBaseAuthzFilter<'curso:find'>;

// =====================

export type IAuthzStatementDisciplinaCreate = IBaseAuthzCheck<'disciplina:create', { dto: Spec.IDisciplinaInputDto }>;
export type IAuthzStatementDisciplinaUpdate = IBaseAuthzFilter<'disciplina:update', { dto: Spec.IDisciplinaUpdateDto }>;
export type IAuthzStatementDisciplinaDelete = IBaseAuthzFilter<
  'disciplina:delete',
  {
    dto: Spec.IDisciplinaDeleteOneByIdInputDto;
  }
>;
export type IAuthzStatementDisciplinaFind = IBaseAuthzFilter<'disciplina:find'>;

// =====================

export type IAuthzStatementTurmaCreate = IBaseAuthzCheck<'turma:create', { dto: Spec.ITurmaInputDto }>;
export type IAuthzStatementTurmaUpdate = IBaseAuthzFilter<'turma:update', { dto: Spec.ITurmaUpdateDto }>;
export type IAuthzStatementTurmaDelete = IBaseAuthzFilter<'turma:delete', { dto: Spec.ITurmaDeleteOneByIdInputDto }>;
export type IAuthzStatementTurmaFind = IBaseAuthzFilter<'turma:find'>;

// =====================

export type IAuthzStatementDiarioCreate = IBaseAuthzCheck<'diario:create', { dto: Spec.IDiarioInputDto }>;
export type IAuthzStatementDiarioUpdate = IBaseAuthzFilter<'diario:update', { dto: Spec.IDiarioUpdateDto }>;
export type IAuthzStatementDiarioDelete = IBaseAuthzFilter<'diario:delete', { dto: Spec.IDiarioDeleteOneByIdInputDto }>;
export type IAuthzStatementDiarioFind = IBaseAuthzFilter<'diario:find'>;

// =====================

export type IAuthzStatementReservaCreate = IBaseAuthzCheck<'reserva:create', { dto: LadesaTypings.ReservaCreateCombinedInput }>;
export type IAuthzStatementReservaUpdate = IBaseAuthzFilter<'reserva:update', { dto: LadesaTypings.ReservaUpdateByIDCombinedInput }>;
export type IAuthzStatementReservaDelete = IBaseAuthzFilter<
  'reserva:delete',
  {
    dto: LadesaTypings.ReservaFindOneInput;
  }
>;
export type IAuthzStatementReservaFind = IBaseAuthzFilter<'reserva:find'>;

// =====================

export type IAuthzStatementCalendarioLetivoCreate = IBaseAuthzCheck<
  'calendario_letivo:create',
  {
    dto: Spec.ICalendarioLetivoCreateDto;
  }
>;
export type IAuthzStatementCalendarioLetivoUpdate = IBaseAuthzFilter<
  'calendario_letivo:update',
  {
    dto: Spec.ICalendarioLetivoUpdateDto;
  }
>;
export type IAuthzStatementCalendarioLetivoDelete = IBaseAuthzFilter<
  'calendario_letivo:delete',
  {
    dto: Spec.ICalendarioLetivoDeleteOneByIdInputDto;
  }
>;
export type IAuthzStatementCalendarioLetivoFind = IBaseAuthzFilter<'calendario_letivo:find'>;

export type IAuthzStatementDiarioProfessorCreate = IBaseAuthzCheck<
  'diario_professor:create',
  {
    dto: Spec.IDiarioProfessorInputDto;
  }
>;

export type IAuthzStatementDiarioProfessorUpdate = IBaseAuthzFilter<
  'diario_professor:update',
  {
    dto: Spec.IDiarioProfessorUpdateDto;
  }
>;

export type IAuthzStatementDiarioProfessorDelete = IBaseAuthzFilter<
  'diario_professor:delete',
  {
    dto: Spec.IDiarioProfessorDeleteOneByIdInputDto;
  }
>;

export type IAuthzStatementDiarioProfessorFilter = IBaseAuthzFilter<'diario_professor:find'>;

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
  | IAuthzStatementDiarioProfessorCreate;

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
  | IAuthzStatementDiarioProfessorFilter;

// =====================

export type IAuthzStatement = IAuthzStatementFilter | IAuthzStatementCheck;

// ===================================================================================

export const createStatement = <Statement extends IAuthzStatement>(statement: Omit<Statement, 'payload'>) => statement as Statement;

// ===================================================================================
