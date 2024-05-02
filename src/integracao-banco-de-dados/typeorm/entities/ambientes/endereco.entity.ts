import { ICidadeModel, IEnderecoModel, IEntityDate } from '@sisgea/spec';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CidadeEntity } from './cidade.entity';

@Entity('endereco')
export class EnderecoEntity implements IEnderecoModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  //

  @Column({ name: 'cep', type: 'text', nullable: false })
  cep!: string;

  @Column({ name: 'logradouro', type: 'text', nullable: false })
  logradouro!: string;

  @Column({ name: 'numero', type: 'int', nullable: false })
  numero!: number;

  @Column({ name: 'bairro', type: 'text', nullable: false })
  bairro!: string;

  @Column({ name: 'complemento', type: 'text', nullable: true })
  complemento!: string | null;

  @Column({ name: 'ponto_referencia', type: 'text', nullable: true })
  pontoReferencia!: string | null;

  //

  @ManyToOne(() => CidadeEntity, {})
  @JoinColumn({ name: 'id_cidade_fk' })
  cidade!: ICidadeModel;

  //

  @Column({ name: 'dateCreateOperator()d', type: 'timestamptz', nullable: false })
  dateCreated!: IEntityDate;

  @Column({ name: 'dateUpdateOperator()d', type: 'timestamptz', nullable: false })
  dateUpdated!: IEntityDate;

  @Column({ name: 'date_deleted', type: 'timestamptz', nullable: true })
  dateDeleted!: null | IEntityDate;
}
