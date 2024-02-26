import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IEntityDate, IUsuarioModel } from '../../../../../application/core-business/(dtos)';

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

  @Column({ name: 'date_created', type: 'timestamptz', nullable: false })
  dateCreated!: IEntityDate;

  @Column({ name: 'date_updated', type: 'timestamptz', nullable: false })
  dateUpdated!: IEntityDate;

  @Column({ name: 'date_deleted', type: 'timestamptz', nullable: true })
  dateDeleted!: null | IEntityDate;
}
