import {
  ICampusDeleteOneByIdInputDto,
  ICampusInputDto,
  ICampusUpdateDto,
} from '../../../../../domain';
import { CampusEntity } from '../../../../integrate-database/typeorm/entities/ambientes/campus.entity';
import {
  IAuthzStatementBaseCreate,
  IAuthzStatementBaseDelete,
  IAuthzStatementBaseFind,
  IAuthzStatementBaseUpdate,
} from '../../base/IAuthzStatementBase';

// ==================================================================

export type IAuthzStatementCampusFind = IAuthzStatementBaseFind<
  'campus',
  CampusEntity
>;

export type IAuthzStatementCampusCreate = IAuthzStatementBaseCreate<
  'campus',
  { dto: ICampusInputDto }
>;

export type IAuthzStatementCampusUpdate = IAuthzStatementBaseUpdate<
  'campus',
  { dto: ICampusUpdateDto }
>;

export type IAuthzStatementCampusDelete = IAuthzStatementBaseDelete<
  'campus',
  { dto: ICampusDeleteOneByIdInputDto }
>;

// ==================================================================

export type IAuthzStatementCampus =
  | IAuthzStatementCampusFind
  | IAuthzStatementCampusCreate
  | IAuthzStatementCampusUpdate
  | IAuthzStatementCampusDelete;
