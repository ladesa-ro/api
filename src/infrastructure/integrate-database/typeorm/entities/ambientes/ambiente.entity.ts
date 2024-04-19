import { IAmbienteModel, IEntityDate } from '@sisgea/spec';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ImagemEntity } from '../base/imagem.entity';
import { BlocoEntity } from './bloco.entity';

@Entity('ambiente')
export class AmbienteEntity implements IAmbienteModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  //

  @Column({ name: 'nome', type: 'text', nullable: false })
  nome!: string;

  @Column({ name: 'descricao', type: 'text', nullable: false })
  descricao!: string;

  @Column({ name: 'codigo', type: 'text', nullable: false })
  codigo!: string;

  @Column({ name: 'capacidade', type: 'int', nullable: true })
  capacidade!: number | null;

  @Column({ name: 'tipo', type: 'text', nullable: true })
  tipo!: string | null;

  //

  @ManyToOne(() => BlocoEntity)
  @JoinColumn({ name: 'id_bloco_fk' })
  bloco!: BlocoEntity;

  @ManyToOne(() => ImagemEntity)
  @JoinColumn({ name: 'id_imagem_capa_fk' })
  imagemCapa!: ImagemEntity | null;

  //

  @Column({ name: 'date_created', type: 'timestamptz', nullable: false })
  dateCreated!: IEntityDate;

  @Column({ name: 'date_updated', type: 'timestamptz', nullable: false })
  dateUpdated!: IEntityDate;

  @Column({ name: 'date_deleted', type: 'timestamptz', nullable: true })
  dateDeleted!: null | IEntityDate;
}
