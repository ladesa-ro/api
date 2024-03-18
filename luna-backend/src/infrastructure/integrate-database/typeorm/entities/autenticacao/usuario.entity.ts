import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IEntityDate, IUsuarioModel } from '../../../../../application/business/(spec)';
import { UsuarioVinculoCampusEntity } from './usuario-vinculo-campus.entity';

@Entity('usuario')
export class UsuarioEntity implements IUsuarioModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  //

  @Column({ name: 'nome', type: 'text', nullable: true })
  nome!: string;

  @Column({ name: 'matricula_siape', type: 'text', nullable: true })
  matriculaSiape!: string;

  @Column({ name: 'email', type: 'text', nullable: true })
  email!: string;

  @Column({ name: 'is_super_user', type: 'boolean', nullable: false })
  isSuperUser!: boolean;

  //

  @OneToMany(() => UsuarioVinculoCampusEntity, (vinculo) => vinculo.usuario)
  vinculos!: UsuarioVinculoCampusEntity[];

  //

  @Column({ name: 'date_created', type: 'timestamptz', nullable: false })
  dateCreated!: IEntityDate;

  @Column({ name: 'date_updated', type: 'timestamptz', nullable: false })
  dateUpdated!: IEntityDate;

  @Column({ name: 'date_deleted', type: 'timestamptz', nullable: true })
  dateDeleted!: null | IEntityDate;

  //

  vinculosAtivos!: UsuarioVinculoCampusEntity[];
}
