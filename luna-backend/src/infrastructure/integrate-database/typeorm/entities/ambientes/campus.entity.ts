import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  ICampusModel,
  IEnderecoModel,
  IEntityDate,
} from '../../../../../domain';
import { EnderecoEntity } from '../endereco.entity';

@Entity('campus')
export class CampusEntity implements ICampusModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  //

  @Column({ name: 'nome_fantasia', type: 'text', nullable: false })
  nomeFantasia!: string;

  @Column({ name: 'razao_social', type: 'text', nullable: false })
  razaoSocial!: string;

  @Column({ name: 'apelido', type: 'text', nullable: false })
  apelido!: string;

  @Column({ name: 'cnpj', type: 'text', nullable: false })
  cnpj!: string;

  //

  @ManyToOne(() => EnderecoEntity)
  @JoinColumn({ name: 'id_endereco_fk' })
  endereco!: IEnderecoModel;

  //

  @Column({ name: 'date_created', type: 'timestamptz', nullable: false })
  dateCreated!: IEntityDate;

  @Column({ name: 'date_updated', type: 'timestamptz', nullable: false })
  dateUpdated!: IEntityDate;

  @Column({ name: 'date_deleted', type: 'timestamptz', nullable: true })
  dateDeleted!: null | IEntityDate;
}
