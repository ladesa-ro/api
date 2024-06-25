import type * as LadesaTypings from '@ladesa-ro/especificacao';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CampusEntity } from '../ambientes/campus.entity';
import { ModalidadeEntity } from '../ensino/modalidade.entity';

@Entity('calendario_letivo')
export class CalendarioLetivoEntity implements LadesaTypings.CalendarioLetivo {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  //

  @Column({ name: 'nome', type: 'text' })
  nome!: string;

  @Column({ name: 'ano_letivo', type: 'integer' })
  ano!: number;

  //Chaves Estrangeiras

  @ManyToOne(() => CampusEntity)
  @JoinColumn({ name: 'id_campus_fk' })
  campus!: LadesaTypings.Campus;

  @ManyToOne(() => ModalidadeEntity)
  @JoinColumn({ name: 'id_modalidade_fk' })
  modalidade!: LadesaTypings.Modalidade | null;

  //

  @Column({ name: 'date_created', type: 'timestamptz', nullable: false })
  dateCreated!: Date;

  @Column({ name: 'date_updated', type: 'timestamptz', nullable: false })
  dateUpdated!: Date;

  @Column({ name: 'date_deleted', type: 'timestamptz', nullable: true })
  dateDeleted!: null | Date;
}
