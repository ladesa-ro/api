import { IEntityDate, IUsuarioVinculoCampusModel } from '@sisgea/spec';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CampusEntity } from '../ambientes/campus.entity';
import { UsuarioEntity } from '../autenticacao/usuario.entity';

@Entity('usuario_vinculo_campus')
export class UsuarioVinculoCampusEntity implements IUsuarioVinculoCampusModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  //

  @Column({ name: 'ativo', type: 'boolean' })
  ativo!: boolean;

  @Column({ name: 'cargo', type: 'text' })
  cargo!: string;

  //

  @ManyToOne(() => CampusEntity, (campus) => campus.vinculos)
  @JoinColumn({ name: 'id_campus_fk' })
  campus!: CampusEntity;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.vinculos)
  @JoinColumn({ name: 'id_usuario_fk' })
  usuario!: UsuarioEntity;

  //

  @Column({ name: 'date_created', type: 'timestamptz', nullable: false })
  dateCreated!: IEntityDate;

  @Column({ name: 'date_updated', type: 'timestamptz', nullable: false })
  dateUpdated!: IEntityDate;

  @Column({ name: 'date_deleted', type: 'timestamptz', nullable: true })
  dateDeleted!: null | IEntityDate;
}
