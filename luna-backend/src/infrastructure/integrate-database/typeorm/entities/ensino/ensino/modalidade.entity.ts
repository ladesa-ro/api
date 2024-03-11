import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ICampusModel, IEntityDate } from '../../../../../../application/business/(spec)';
import { IModalidadeModel } from '../../../../../../application/business/(spec)/ensino/modalidade/IModalidadeModel';
import { CampusEntity } from '../../ambientes/campus.entity';

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

  @ManyToOne(() => CampusEntity)
  @JoinColumn({ name: 'id_campus_fk' })
  campus!: ICampusModel;

  //

  @Column({ name: 'date_created', type: 'timestamptz', nullable: false })
  dateCreated!: IEntityDate;

  @Column({ name: 'date_updated', type: 'timestamptz', nullable: false })
  dateUpdated!: IEntityDate;

  @Column({ name: 'date_deleted', type: 'timestamptz', nullable: true })
  dateDeleted!: null | IEntityDate;
}
