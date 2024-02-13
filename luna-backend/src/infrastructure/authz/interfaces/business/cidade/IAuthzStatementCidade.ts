import { BaseCidadeEntity } from '../../../../integrate-database/typeorm/entities/base-cidade.entity';
import { IAuthzStatementBaseFind } from '../../base/IAuthzStatementBase';

// ===================================================================

export type IAuthzStatementCidadeFind = IAuthzStatementBaseFind<
  'cidade',
  BaseCidadeEntity
>;

// ===================================================================

export type IAuthzStatementCidade = IAuthzStatementCidadeFind;

// ===================================================================
