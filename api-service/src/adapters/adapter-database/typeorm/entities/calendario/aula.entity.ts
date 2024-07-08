import type * as LadesaTypings from '@ladesa-ro/especificacao';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AmbienteEntity } from '../ambientes/ambiente.entity';
import { IntervaloDeTempoEntity } from '../calendario';
import { DiarioEntity } from '../ensino';


@Entity('aula')
export class AulaEntity implements LadesaTypings.Aula {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  //

  @Column({ name: 'formato', type: 'text', nullable: true })
  formato!: string | null;
  //

  @Column({ name: 'data', type: 'date', nullable: false })
  data!: Date;

  // chaves estrangeiras


  @ManyToOne(() => IntervaloDeTempoEntity)
  @JoinColumn({ name: 'id_intervalo_de_tempo_fk' })
  intervaloDeTempo!: IntervaloDeTempoEntity;

  @ManyToOne(() => DiarioEntity)
  @JoinColumn({ name: 'id_diario_fk' })
  diario!: DiarioEntity;

  @ManyToOne(() => AmbienteEntity)
  @JoinColumn({ name: 'id_ambiente_fk' })
  ambiente!: AmbienteEntity | null;



  //

  @Column({ name: 'date_created', type: 'timestamptz', nullable: false })
  dateCreated!: Date;

  @Column({ name: 'date_updated', type: 'timestamptz', nullable: false })
  dateUpdated!: Date;

  @Column({ name: 'date_deleted', type: 'timestamptz', nullable: true })
  dateDeleted!: null | Date;
}
