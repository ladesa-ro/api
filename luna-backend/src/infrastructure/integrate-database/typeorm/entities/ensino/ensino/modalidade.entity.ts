import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IEntityDate } from '../../../../../../application/business/(spec)';
import { IModalidadeModel } from '../../../../../../application/business/(spec)/ensino/modalidade/IModalidadeModel';

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

  @Column({ name: 'date_created', type: 'timestamptz', nullable: false })
  dateCreated!: IEntityDate;

  @Column({ name: 'date_updated', type: 'timestamptz', nullable: false })
  dateUpdated!: IEntityDate;

  @Column({ name: 'date_deleted', type: 'timestamptz', nullable: true })
  dateDeleted!: null | IEntityDate;
}
