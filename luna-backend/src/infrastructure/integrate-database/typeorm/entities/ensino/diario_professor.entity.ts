import * as Dto from 'application/business/(spec)';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsuarioVinculoCampusEntity } from '../autenticacao/usuario-vinculo-campus.entity';
import { DiarioEntity } from './diario.entity';

@Entity('diario_professor')
export class DiarioProfessorEntity implements Dto.IDiarioProfessorModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  //

  @Column({ name: 'situacao', type: 'bool', nullable: false })
  situacao!: boolean;

  @ManyToOne(() => DiarioEntity)
  @JoinColumn({ name: 'id_diario_fk' })
  diario!: Dto.IDiarioModel;

  @ManyToOne(() => UsuarioVinculoCampusEntity)
  @JoinColumn({ name: 'id_vinculo_professor_fk' })
  vinculoProfessor!: Dto.IUsuarioVinculoCampusModel;

  //

  @Column({ name: 'date_created', type: 'timestamptz', nullable: false })
  dateCreated!: Dto.IEntityDate;

  @Column({ name: 'date_updated', type: 'timestamptz', nullable: false })
  dateUpdated!: Dto.IEntityDate;

  @Column({ name: 'date_deleted', type: 'timestamptz', nullable: true })
  dateDeleted!: null | Dto.IEntityDate;
}
