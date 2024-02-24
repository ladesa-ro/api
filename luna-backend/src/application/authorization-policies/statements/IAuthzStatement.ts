import { IBaseAuthzCheck, IBaseAuthzFilter } from '../../../domain';
import { ICampusCreateDto, ICampusDeleteOneByIdInputDto, ICampusUpdateDto, IEnderecoFindOneByIdInputDto } from '../../core-business/(dtos)';

// ===================================================================================

export type IAuthzStatementEnderecoFind = IBaseAuthzFilter<'endereco:find', { from: 'find-by-id'; input: IEnderecoFindOneByIdInputDto }>;

// =====================

export type IAuthzStatementEstadoFind = IBaseAuthzFilter<'estado:find'>;
export type IAuthzStatementCidadeFind = IBaseAuthzFilter<'cidade:find'>;

// =====================

export type IAuthzStatementCampusCreate = IBaseAuthzCheck<'campus:create', { dto: ICampusCreateDto }>;
export type IAuthzStatementCampusFind = IBaseAuthzFilter<'campus:find'>;
export type IAuthzStatementCampusUpdate = IBaseAuthzFilter<'campus:update', { dto: ICampusUpdateDto }>;
export type IAuthzStatementCampusDelete = IBaseAuthzFilter<'campus:delete', { dto: ICampusDeleteOneByIdInputDto }>;

// ===================================================================================

export type IAuthzStatementCheck = IAuthzStatementCampusCreate;

// =====================

export type IAuthzStatementFind =
  | IAuthzStatementEnderecoFind
  | IAuthzStatementEstadoFind
  | IAuthzStatementCidadeFind
  | IAuthzStatementCampusFind
  | IAuthzStatementCampusUpdate
  | IAuthzStatementCampusDelete;

// =====================

export type IAuthzStatement = IAuthzStatementFind | IAuthzStatementCheck;

// ===================================================================================

export const createStatement = <Statement extends IAuthzStatement>(statement: Omit<Statement, 'payload'>) => statement as Statement;

// ===================================================================================
