import { IEntityDate } from 'application/business/(spec)';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AmbienteEntity } from '../ambientes/ambiente.entity';
import { DisciplinaEntity } from './disciplina.entity';
import { TurmaEntity } from './turma.entity';

@Entity('diario')
export class DiarioEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  //

  @Column({ name: 'situacao', type: 'text', nullable: false })
  situacao!: string;

  @Column({ name: 'ano', type: 'int', nullable: false })
  ano!: number;

  @Column({ name: 'etapa', type: 'text', nullable: true })
  etapa!: string | null;

  @ManyToOne(() => TurmaEntity)
  @JoinColumn({ name: 'id_turma_fk' })
  turma!: TurmaEntity;

  @ManyToOne(() => DisciplinaEntity)
  @JoinColumn({ name: 'id_disciplina_fk' })
  disciplina!: DisciplinaEntity;

  @ManyToOne(() => AmbienteEntity)
  @JoinColumn({ name: 'id_ambiente_padrao_fk' })
  ambientePadrao!: AmbienteEntity | null;

  //

  @Column({ name: 'date_created', type: 'timestamptz', nullable: false })
  dateCreated!: IEntityDate;

  @Column({ name: 'date_updated', type: 'timestamptz', nullable: false })
  dateUpdated!: IEntityDate;

  @Column({ name: 'date_deleted', type: 'timestamptz', nullable: true })
  dateDeleted!: null | IEntityDate;
}
