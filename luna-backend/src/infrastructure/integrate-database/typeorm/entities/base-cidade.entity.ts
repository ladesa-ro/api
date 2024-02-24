import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { BaseEstadoEntity } from './base-estado.entity';
import { ICidadeModel } from '../../../../application/core-business/(dtos)';

@Entity('base_cidade')
export class BaseCidadeEntity implements ICidadeModel {
  @PrimaryColumn({ name: 'id' })
  id!: number;

  // ...

  @Column({ name: 'nome', nullable: false, type: 'text' })
  nome!: string;

  // ...

  @ManyToOne(() => BaseEstadoEntity)
  @JoinColumn({ name: 'id_estado_fk' })
  estado!: BaseEstadoEntity;
}
