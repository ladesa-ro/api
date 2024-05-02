import * as Dto from '@sisgea/spec';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { VinculoEntity } from '../autenticacao/vinculo.entity';
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

  @ManyToOne(() => VinculoEntity)
  @JoinColumn({ name: 'id_vinculo_professor_fk' })
  vinculo!: Dto.IVinculoModel;

  //

  @Column({ name: 'dateCreateOperator()d', type: 'timestamptz', nullable: false })
  dateCreated!: Dto.IEntityDate;

  @Column({ name: 'dateUpdateOperator()d', type: 'timestamptz', nullable: false })
  dateUpdated!: Dto.IEntityDate;

  @Column({ name: 'date_deleted', type: 'timestamptz', nullable: true })
  dateDeleted!: null | Dto.IEntityDate;
}
