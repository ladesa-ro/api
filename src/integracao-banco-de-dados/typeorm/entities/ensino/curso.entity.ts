import * as Dto from '@sisgea/spec';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CampusEntity } from '../ambientes/campus.entity';
import { ImagemEntity } from '../base/imagem.entity';
import { ModalidadeEntity } from './modalidade.entity';

@Entity('curso')
export class CursoEntity implements Dto.ICursoModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  //

  @Column({ name: 'nome', type: 'text', nullable: false })
  nome!: string;

  @Column({ name: 'nome_abreviado', type: 'text', nullable: false })
  nomeAbreviado!: string;

  @ManyToOne(() => CampusEntity)
  @JoinColumn({ name: 'id_campus_fk' })
  campus!: CampusEntity;

  @ManyToOne(() => ModalidadeEntity)
  @JoinColumn({ name: 'id_modalidade_fk' })
  modalidade!: ModalidadeEntity;

  @ManyToOne(() => ImagemEntity)
  @JoinColumn({ name: 'id_imagem_capa_fk' })
  imagemCapa!: ImagemEntity | null;

  //

  @Column({ name: 'date_created', type: 'timestamptz', nullable: false })
  dateCreated!: Dto.IEntityDate;

  @Column({ name: 'date_updated', type: 'timestamptz', nullable: false })
  dateUpdated!: Dto.IEntityDate;

  @Column({ name: 'date_deleted', type: 'timestamptz', nullable: true })
  dateDeleted!: null | Dto.IEntityDate;
}
