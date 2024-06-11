import type * as LadesaTypings from '@ladesa-ro/especificacao';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ImagemEntity } from '../base/imagem.entity';
import { VinculoEntity } from './vinculo.entity';

@Entity('usuario')
export class UsuarioEntity implements LadesaTypings.Usuario {
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

  @OneToMany(() => VinculoEntity, (vinculo) => vinculo.usuario)
  vinculos!: VinculoEntity[];

  //

  @Column({ name: 'date_created', type: 'timestamptz', nullable: false })
  dateCreated!: Date;

  @Column({ name: 'date_updated', type: 'timestamptz', nullable: false })
  dateUpdated!: Date;

  @Column({ name: 'date_deleted', type: 'timestamptz', nullable: true })
  dateDeleted!: null | Date;

  //

  vinculosAtivos!: VinculoEntity[];
}
