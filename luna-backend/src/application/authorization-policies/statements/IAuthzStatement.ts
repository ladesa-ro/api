import { IBaseAuthzCheck, IBaseAuthzFilter } from '../../../domain';
import * as Dto from '../../core-business/(dtos)';

// ===================================================================================

export type IAuthzStatementEnderecoFind = IBaseAuthzFilter<'endereco:find', { from: 'find-by-id'; input: Dto.IEnderecoFindOneByIdInputDto }>;

// =====================

export type IAuthzStatementEstadoFind = IBaseAuthzFilter<'estado:find'>;
export type IAuthzStatementCidadeFind = IBaseAuthzFilter<'cidade:find'>;

// =====================

export type IAuthzStatementCampusCreate = IBaseAuthzCheck<'campus:create', { dto: Dto.ICampusCreateDto }>;
export type IAuthzStatementCampusFind = IBaseAuthzFilter<'campus:find'>;
export type IAuthzStatementCampusUpdate = IBaseAuthzFilter<'campus:update', { dto: Dto.ICampusUpdateDto }>;
export type IAuthzStatementCampusDelete = IBaseAuthzFilter<'campus:delete', { dto: Dto.ICampusDeleteOneByIdInputDto }>;

// =====================

export type IAuthzStatementBlocoCreate = IBaseAuthzCheck<'bloco:create', { dto: Dto.IBlocoCreateDto }>;
export type IAuthzStatementBlocoFind = IBaseAuthzFilter<'bloco:find'>;
export type IAuthzStatementBlocoUpdate = IBaseAuthzFilter<'bloco:update', { dto: Dto.IBlocoUpdateDto }>;
export type IAuthzStatementBlocoDelete = IBaseAuthzFilter<'bloco:delete', { dto: Dto.IBlocoDeleteOneByIdInputDto }>;

// =====================

export type IAuthzStatementAmbienteCreate = IBaseAuthzCheck<'ambiente:create', { dto: Dto.IAmbienteCreateDto }>;
export type IAuthzStatementAmbienteFind = IBaseAuthzFilter<'ambiente:find'>;
export type IAuthzStatementAmbienteUpdate = IBaseAuthzFilter<'ambiente:update', { dto: Dto.IAmbienteUpdateDto }>;
export type IAuthzStatementAmbienteDelete = IBaseAuthzFilter<'ambiente:delete', { dto: Dto.IAmbienteDeleteOneByIdInputDto }>;

// ===================================================================================

export type IAuthzStatementCheck = IAuthzStatementCampusCreate | IAuthzStatementBlocoCreate | IAuthzStatementAmbienteCreate;

// =====================

export type IAuthzStatementFind =
  | IAuthzStatementEnderecoFind
  //
  | IAuthzStatementEstadoFind
  //
  | IAuthzStatementCidadeFind
  //
  | IAuthzStatementCampusFind
  | IAuthzStatementCampusUpdate
  | IAuthzStatementCampusDelete
  //
  | IAuthzStatementBlocoFind
  | IAuthzStatementBlocoUpdate
  | IAuthzStatementBlocoDelete
  //
  | IAuthzStatementAmbienteFind
  | IAuthzStatementAmbienteUpdate
  | IAuthzStatementAmbienteDelete;

// =====================

export type IAuthzStatement = IAuthzStatementFind | IAuthzStatementCheck;

// ===================================================================================

export const createStatement = <Statement extends IAuthzStatement>(statement: Omit<Statement, 'payload'>) => statement as Statement;

// ===================================================================================
