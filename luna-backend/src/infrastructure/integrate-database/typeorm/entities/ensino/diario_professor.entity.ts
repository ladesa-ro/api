import * as Dto from 'application/business/(spec)';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('diario_professor')
export class DiarioProfessorEntity implements Dto.IDiarioProfessorModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  //

  @Column({ name: 'situacao', type: 'bool', nullable: false })
  situacao!: boolean;

  @Column({ name: 'id_diario_fk', type: 'uuid', nullable: false })
  diario!: Dto.IDiarioModel;

  @Column({ name: 'id_vinculo_professor_fk', type: 'uuid', nullable: false })
  vinculoProfessor!: Dto.IUsuarioVinculoCampusModel;

  //

  @Column({ name: 'date_created', type: 'timestamptz', nullable: false })
  dateCreated!: Dto.IEntityDate;

  @Column({ name: 'date_updated', type: 'timestamptz', nullable: false })
  dateUpdated!: Dto.IEntityDate;

  @Column({ name: 'date_deleted', type: 'timestamptz', nullable: true })
  dateDeleted!: null | Dto.IEntityDate;
}
