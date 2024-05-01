import { IEntityDate, IUsuarioModel } from '@sisgea/spec';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ImagemEntity } from '../base/imagem.entity';
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

  @ManyToOne(() => ImagemEntity)
  @JoinColumn({ name: 'id_imagem_capa_fk' })
  imagemCapa!: ImagemEntity | null;

  @ManyToOne(() => ImagemEntity)
  @JoinColumn({ name: 'id_imagem_perfil_fk' })
  imagemPerfil!: ImagemEntity | null;

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
