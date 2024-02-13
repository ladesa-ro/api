import { BaseEstadoEntity } from '../../../../integrate-database/typeorm/entities/base-estado.entity';
import { IAuthzStatementBaseFind } from '../../base';

// ==============================================================

export type IAuthzStatementEstadoFind = IAuthzStatementBaseFind<
  'estado',
  BaseEstadoEntity
>;

// ==============================================================

export type IAuthzStatementEstado = IAuthzStatementEstadoFind;

// ==============================================================
