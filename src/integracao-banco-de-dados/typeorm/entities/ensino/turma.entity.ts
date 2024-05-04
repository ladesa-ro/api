import * as Spec from '@sisgea/spec';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AmbienteEntity } from '../ambientes/ambiente.entity';
import { ImagemEntity } from '../base/imagem.entity';
import { CursoEntity } from './curso.entity';

@Entity('turma')
export class TurmaEntity implements Spec.ITurmaModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  //

  @Column({ name: 'periodo', type: 'text', nullable: false })
  periodo!: string;

  //

  @ManyToOne(() => AmbienteEntity)
  @JoinColumn({ name: 'id_ambiente_padrao_aula_fk' })
  ambientePadraoAula!: AmbienteEntity | null;

  @ManyToOne(() => CursoEntity)
  @JoinColumn({ name: 'id_curso_fk' })
  curso!: CursoEntity;

  @ManyToOne(() => ImagemEntity)
  @JoinColumn({ name: 'id_imagem_capa_fk' })
  imagemCapa!: ImagemEntity | null;

  //

  @Column({ name: 'date_created', type: 'timestamptz', nullable: false })
  dateCreated!: Spec.IEntityDate;

  @Column({ name: 'date_updated', type: 'timestamptz', nullable: false })
  dateUpdated!: Spec.IEntityDate;

  @Column({ name: 'date_deleted', type: 'timestamptz', nullable: true })
  dateDeleted!: null | Spec.IEntityDate;
}
