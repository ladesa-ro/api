import { IEntityDate, IModalidadeModel } from '@sisgea/spec';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CampusPossuiModalidadeEntity } from './campus_possui_modalidade.entity';

@Entity('modalidade')
export class ModalidadeEntity implements IModalidadeModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  //

  @Column({ name: 'nome', type: 'text', nullable: false })
  nome!: string;

  @Column({ name: 'slug', type: 'text', nullable: false })
  slug!: string;

  //

  @OneToMany(() => CampusPossuiModalidadeEntity, (campusPossuiModalidade) => campusPossuiModalidade.modalidade)
  campusPossuiModalidade!: CampusPossuiModalidadeEntity[];

  //

  @Column({ name: 'date_created', type: 'timestamptz', nullable: false })
  dateCreated!: IEntityDate;

  @Column({ name: 'date_updated', type: 'timestamptz', nullable: false })
  dateUpdated!: IEntityDate;

  @Column({ name: 'date_deleted', type: 'timestamptz', nullable: true })
  dateDeleted!: null | IEntityDate;
}
