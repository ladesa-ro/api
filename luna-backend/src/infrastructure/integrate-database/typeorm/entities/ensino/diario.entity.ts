import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IAmbienteModel, IDisciplinaModel, IEntityDate, ITurmaModel } from 'application/business/(spec)';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Column } from 'typeorm';
import { TurmaEntity } from './turma.entity';
import { DisciplinaEntity } from "./disciplina.entity"

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
  turma!: ITurmaModel;

  @ManyToOne(() => DisciplinaEntity)
  @JoinColumn({ name: 'id_disciplina_fk' })
  disciplina!: IDisciplinaModel;

  @JoinColumn({ name: 'id_ambiente_padrao_fk' })
  ambientePadrao!: IAmbienteModel | null;

  //

  @Column({ name: 'date_created', type: 'timestamptz', nullable: false })
  dateCreated!: IEntityDate;

  @Column({ name: 'date_updated', type: 'timestamptz', nullable: false })
  dateUpdated!: IEntityDate;

  @Column({ name: 'date_deleted', type: 'timestamptz', nullable: true })
  dateDeleted!: null | IEntityDate;
}
