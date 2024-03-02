import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { IEstadoModel } from '../../../../../application/business/(dtos)';
import { CidadeEntity } from './cidade.entity';

@Entity('base_estado')
export class EstadoEntity implements IEstadoModel {
  @PrimaryColumn({ name: 'id' })
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
