import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { IBaseEstadoModel } from '../../../../domain';
import { BaseCidadeEntity } from './base-cidade.entity';

@Entity('base_estado')
export class BaseEstadoEntity implements IBaseEstadoModel {
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
