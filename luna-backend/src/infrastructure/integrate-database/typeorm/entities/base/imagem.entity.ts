import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IEntityDate } from '../../../../../application/business/(spec)';

@Entity('imagem')
export class ImagemEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  //

  @Column({ name: 'descricao', type: 'text', nullable: true })
  descricao!: string | null;

  //

  @Column({ name: 'date_created', type: 'timestamptz', nullable: false })
  dateCreated!: IEntityDate;

  @Column({ name: 'date_updated', type: 'timestamptz', nullable: false })
  dateUpdated!: IEntityDate;

  @Column({ name: 'date_deleted', type: 'timestamptz', nullable: true })
  dateDeleted!: null | IEntityDate;
}
