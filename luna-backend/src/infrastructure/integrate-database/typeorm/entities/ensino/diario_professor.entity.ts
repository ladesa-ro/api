import { Entity } from 'typeorm';
import { IEntityDate } from 'application/business/(spec)';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Column } from 'typeorm';

@Entity('diario_professor')
export class DiarioProfessorEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  //

  @Column({ name: 'situacao', type: 'bool', nullable: false })
  situacao!: boolean;

  @Column({ name: 'id_diario_fk', type: 'uuid', nullable: false })
  diario!: IDiarioModel;

  @Column({ name: 'id_vinculo_professor_fk', type: 'uuid', nullable: false })
  vinculoProfessor!: IUsuarioVinculoCampusModel;

  //

  @Column({ name: 'date_created', type: 'timestamptz', nullable: false })
  dateCreated!: IEntityDate;

  @Column({ name: 'date_updated', type: 'timestamptz', nullable: false })
  dateUpdated!: IEntityDate;

  @Column({ name: 'date_deleted', type: 'timestamptz', nullable: true })
  dateDeleted!: null | IEntityDate;
}
