import * as Dto from '@sisgea/spec';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CampusEntity } from '../ambientes/campus.entity';
import { ModalidadeEntity } from './modalidade.entity';

@Entity('campus_possui_modalidade')
export class CampusPossuiModalidadeEntity implements Dto.ICampusPossuiModalidadeModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  //

  @ManyToOne(() => CampusEntity, (campus) => campus.campusPossuiModalidade)
  @JoinColumn({ name: 'id_campus_fk' })
  campus!: CampusEntity;

  @ManyToOne(() => ModalidadeEntity, (modalidade) => modalidade.campusPossuiModalidade)
  @JoinColumn({ name: 'id_modalidade_fk' })
  modalidade!: ModalidadeEntity;

  //
}
