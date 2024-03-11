import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ICampusModel, IEnderecoModel, IEntityDate } from '../../../../../application/business/(spec)';
import { UsuarioVinculoCampusEntity } from '../autenticacao/usuario-vinculo-campus.entity';
import { EnderecoEntity } from './endereco.entity';

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

  @OneToMany(() => UsuarioVinculoCampusEntity, (vinculo) => vinculo.campus)
  vinculos!: UsuarioVinculoCampusEntity[];

  //

  @Column({ name: 'date_created', type: 'timestamptz', nullable: false })
  dateCreated!: IEntityDate;

  @Column({ name: 'date_updated', type: 'timestamptz', nullable: false })
  dateUpdated!: IEntityDate;

  @Column({ name: 'date_deleted', type: 'timestamptz', nullable: true })
  dateDeleted!: null | IEntityDate;
}
