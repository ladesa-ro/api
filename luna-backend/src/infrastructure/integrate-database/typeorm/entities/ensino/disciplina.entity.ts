import { IEntityDate } from 'application/business/(spec)';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('disciplina')
export class DisciplinaEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  //

  @Column({ name: 'nome', type: 'text', nullable: false })
  nome!: string;

  @Column({ name: 'carga_horaria', type: 'int', nullable: false })
  cargaHoraria!: number;

  //

  @Column({ name: 'date_created', type: 'timestamptz', nullable: false })
  dateCreated!: IEntityDate;

  @Column({ name: 'date_updated', type: 'timestamptz', nullable: false })
  dateUpdated!: IEntityDate;

  @Column({ name: 'date_deleted', type: 'timestamptz', nullable: true })
  dateDeleted!: null | IEntityDate;
}
