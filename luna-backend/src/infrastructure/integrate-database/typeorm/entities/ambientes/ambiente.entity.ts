import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IAmbienteModel, IBlocoModel, IEntityDate } from '../../../../../application/core-business/(dtos)';
import { BlocoEntity } from './bloco.entity';

@Entity('campus_bloco_ambiente')
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
  @JoinColumn({ name: 'id_campus_bloco_fk' })
  bloco!: IBlocoModel;

  //

  @Column({ name: 'date_created', type: 'timestamptz', nullable: false })
  dateCreated!: IEntityDate;

  @Column({ name: 'date_updated', type: 'timestamptz', nullable: false })
  dateUpdated!: IEntityDate;

  @Column({ name: 'date_deleted', type: 'timestamptz', nullable: true })
  dateDeleted!: null | IEntityDate;
}
