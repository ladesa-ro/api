import * as Dto from '@sisgea/spec';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UsuarioVinculoCampusEntity } from '../autenticacao/usuario-vinculo-campus.entity';
import { CampusPossuiModalidadeEntity } from '../ensino/campus_possui_modalidade.entity';
import { ModalidadeEntity } from '../ensino/modalidade.entity';
import { EnderecoEntity } from './endereco.entity';

@Entity('campus')
export class CampusEntity implements Dto.ICampusModel {
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
  endereco!: Dto.IEnderecoModel;

  //

  @OneToMany(() => UsuarioVinculoCampusEntity, (vinculo) => vinculo.campus)
  vinculos!: UsuarioVinculoCampusEntity[];

  @OneToMany(() => CampusPossuiModalidadeEntity, (campusPossuiModalidade) => campusPossuiModalidade.campus)
  campusPossuiModalidade!: CampusPossuiModalidadeEntity[];

  modalidades!: ModalidadeEntity[];

  //

  @Column({ name: 'date_created', type: 'timestamptz', nullable: false })
  dateCreated!: Dto.IEntityDate;

  @Column({ name: 'date_updated', type: 'timestamptz', nullable: false })
  dateUpdated!: Dto.IEntityDate;

  @Column({ name: 'date_deleted', type: 'timestamptz', nullable: true })
  dateDeleted!: null | Dto.IEntityDate;
}
