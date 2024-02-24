import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { BaseCidadeEntity } from './base-cidade.entity';
import { IEstadoModel } from '../../../../application/core-business/(dtos)';

@Entity('base_estado')
export class BaseEstadoEntity implements IEstadoModel {
  @PrimaryColumn({ name: 'id' })
  id!: number;

  // ...

  @Column({ name: 'sigla', nullable: false, type: 'text' })
  sigla!: string;

  @Column({ name: 'nome', nullable: false, type: 'text' })
  nome!: string;

  // ...

  @OneToMany(() => BaseCidadeEntity, (cidade) => cidade.estado)
  cidades!: BaseCidadeEntity[];
}
