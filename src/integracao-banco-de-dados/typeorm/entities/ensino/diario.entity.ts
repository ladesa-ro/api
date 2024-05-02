import { IDiarioModel, IEntityDate } from '@sisgea/spec';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AmbienteEntity } from '../ambientes/ambiente.entity';
import { ImagemEntity } from '../base/imagem.entity';
import { DisciplinaEntity } from './disciplina.entity';
import { TurmaEntity } from './turma.entity';

@Entity('diario')
export class DiarioEntity implements IDiarioModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  //

  @Column({ name: 'situacao', type: 'text', nullable: false })
  situacao!: string;

  @Column({ name: 'ano', type: 'int', nullable: false })
  ano!: number;

  @Column({ name: 'etapa', type: 'text', nullable: true })
  etapa!: string | null;

  @ManyToOne(() => TurmaEntity)
  @JoinColumn({ name: 'id_turma_fk' })
  turma!: TurmaEntity;

  @ManyToOne(() => DisciplinaEntity)
  @JoinColumn({ name: 'id_disciplina_fk' })
  disciplina!: DisciplinaEntity;

  @ManyToOne(() => AmbienteEntity)
  @JoinColumn({ name: 'id_ambiente_padrao_fk' })
  ambientePadrao!: AmbienteEntity | null;

  @ManyToOne(() => ImagemEntity)
  @JoinColumn({ name: 'id_imagem_capa_fk' })
  imagemCapa!: ImagemEntity | null;

  //

  @Column({ name: 'dateCreateOperator()d', type: 'timestamptz', nullable: false })
  dateCreated!: IEntityDate;

  @Column({ name: 'dateUpdateOperator()d', type: 'timestamptz', nullable: false })
  dateUpdated!: IEntityDate;

  @Column({ name: 'date_deleted', type: 'timestamptz', nullable: true })
  dateDeleted!: null | IEntityDate;
}
