import type * as LadesaTypings from '@ladesa-ro/especificacao';
import { Column, DeepPartial, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TurmaDisponibilidadeEntity } from './turma_disponibilidade.entity';
import { IntervaloDeTempoEntity } from '../calendario';

@Entity('turma_disponibilidade_dia')
export class TurmaDisponibilidadeDiaEntity implements LadesaTypings.TurmaDisponibilidadeDia {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  //

  @Column({ name: 'dia_semana_iso', type: 'int', nullable: false })
  diaSemanaIso!: number;


  //Chaves Estrangeiras

  @ManyToOne(() => TurmaDisponibilidadeEntity)
  @JoinColumn({ name: 'id_turma_disponibilidade_fk' })
  turmaDisponibilidade!: LadesaTypings.TurmaDisponibilidade;

  @ManyToOne(() => IntervaloDeTempoEntity)
  @JoinColumn({ name: 'id_intervalo_de_tempo_fk' })
  intervaloDeTempo!: LadesaTypings.IntervaloDeTempo;

  //

  @Column({ name: 'date_created', type: 'timestamptz', nullable: false })
  dateCreated!: Date;

  @Column({ name: 'date_updated', type: 'timestamptz', nullable: false })
  dateUpdated!: Date;

  @Column({ name: 'date_deleted', type: 'timestamptz', nullable: true })
  dateDeleted!: null | Date;
}
