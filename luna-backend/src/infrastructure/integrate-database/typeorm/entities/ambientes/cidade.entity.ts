import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { EstadoEntity } from './estado.entity';
import { ICidadeModel } from '../../../../../application/business/(dtos)';

@Entity('base_cidade')
export class CidadeEntity implements ICidadeModel {
  @PrimaryColumn({ name: 'id' })
  id!: number;

  // ...

  @Column({ name: 'nome', nullable: false, type: 'text' })
  nome!: string;

  // ...

  @ManyToOne(() => EstadoEntity)
  @JoinColumn({ name: 'id_estado_fk' })
  estado!: EstadoEntity;
}
