import { ICalendarioLetivoModel, ICampusModel, IEntityDate, IModalidadeModel } from '@sisgea/spec';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CampusEntity } from '../ambientes/campus.entity';
import { ModalidadeEntity } from '../ensino/modalidade.entity';

@Entity('calendario_letivo')
export class CalendarioLetivoEntity implements ICalendarioLetivoModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  //

  @Column({ name: 'nome' })
  nome!: string;

  @Column({ name: 'ano_letivo' })
  ano!: number;

  //Chaves Estrangeiras

  @ManyToOne(() => CampusEntity)
  @JoinColumn({ name: 'id_campus_fk' })
  campus!: ICampusModel;

  @ManyToOne(() => ModalidadeEntity)
  @JoinColumn({ name: 'id_modalidade_fk' })
  modalidade!: IModalidadeModel;

  //

  @Column({ name: 'dateCreateOperator()d', type: 'timestamptz', nullable: false })
  dateCreated!: IEntityDate;

  @Column({ name: 'dateUpdateOperator()d', type: 'timestamptz', nullable: false })
  dateUpdated!: IEntityDate;

  @Column({ name: 'date_deleted', type: 'timestamptz', nullable: true })
  dateDeleted!: IEntityDate | null;
}
