import { IBlocoModel, IEntityDate } from '@sisgea/spec';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ImagemEntity } from '../base/imagem.entity';
import { AmbienteEntity } from './ambiente.entity';
import { CampusEntity } from './campus.entity';

@Entity('bloco')
export class BlocoEntity implements IBlocoModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  //

  @Column({ name: 'nome', type: 'text', nullable: false })
  nome!: string;

  @Column({ name: 'codigo', type: 'text', nullable: false })
  codigo!: string;

  //

  @ManyToOne(() => CampusEntity)
  @JoinColumn({ name: 'id_campus_fk' })
  campus!: CampusEntity;

  @ManyToOne(() => ImagemEntity)
  @JoinColumn({ name: 'id_imagem_capa_fk' })
  imagemCapa!: ImagemEntity | null;

  //

  @OneToMany(() => AmbienteEntity, (ambiente) => ambiente.bloco)
  ambientes!: AmbienteEntity[];

  //

  @Column({ name: 'date_created', type: 'timestamptz', nullable: false })
  dateCreated!: IEntityDate;

  @Column({ name: 'date_updated', type: 'timestamptz', nullable: false })
  dateUpdated!: IEntityDate;

  @Column({ name: 'date_deleted', type: 'timestamptz', nullable: true })
  dateDeleted!: null | IEntityDate;
}
