import { IEntityDate } from 'application/business/(spec)';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CampusEntity } from '../ambientes/campus.entity';
import { ModalidadeEntity } from './ensino/modalidade.entity';

@Entity('curso')
export class CursoEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  //

  @Column({ name: 'nome', type: 'text', nullable: false })
  nome!: string;

  @Column({ name: 'nome_abreviado', type: 'text', nullable: false })
  nomeAbreviado!: string;

  @ManyToOne(() => CampusEntity)
  @JoinColumn({ name: "id_campus_fk" })
  campus!: CampusEntity;

  @ManyToOne(() => ModalidadeEntity)
  @JoinColumn({ name: "id_modalidade_fk" })
  modalidade!: ModalidadeEntity;

  //

  @Column({ name: 'date_created', type: 'timestamptz', nullable: false })
  dateCreated!: IEntityDate;

  @Column({ name: 'date_updated', type: 'timestamptz', nullable: false })
  dateUpdated!: IEntityDate;

  @Column({ name: 'date_deleted', type: 'timestamptz', nullable: true })
  dateDeleted!: null | IEntityDate;
}
