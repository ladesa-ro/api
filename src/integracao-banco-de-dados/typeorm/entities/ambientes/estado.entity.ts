import type * as LadesaTypings from '@ladesa-ro/especificacao';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CidadeEntity } from './cidade.entity';

@Entity('base_estado')
export class EstadoEntity implements LadesaTypings.Estado {
  @PrimaryColumn({ name: 'id', type: 'integer' })
  id!: number;

  // ...

  @Column({ name: 'sigla', nullable: false, type: 'text' })
  sigla!: string;

  @Column({ name: 'nome', nullable: false, type: 'text' })
  nome!: string;

  // ...

  @OneToMany(() => CidadeEntity, (cidade) => cidade.estado)
  cidades!: CidadeEntity[];
}
