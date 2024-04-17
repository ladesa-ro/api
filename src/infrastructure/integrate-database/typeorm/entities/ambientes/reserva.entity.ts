import { IEntityDate } from 'application/business/(spec)';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsuarioEntity } from '../autenticacao/usuario.entity';
import { AmbienteEntity } from './ambiente.entity';

@Entity('reserva')
export class ReservaEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  //

  @Column({ name: 'situacao', type: 'text', nullable: false })
  situacao!: string;

  @Column({ name: 'motivo', type: 'text', nullable: true })
  motivo!: string | null;

  @Column({ name: 'tipo', type: 'text', nullable: true })
  tipo!: string | null;

  @Column({ name: 'data_inicio', type: 'timestamptz', nullable: false })
  dataInicio!: IEntityDate;

  @Column({ name: 'data_termino', type: 'timestamptz', nullable: true })
  dataTermino!: IEntityDate | null | null;

  @ManyToOne(() => AmbienteEntity)
  @JoinColumn({ name: 'id_ambiente_fk' })
  ambiente!: AmbienteEntity;

  @ManyToOne(() => UsuarioEntity)
  @JoinColumn({ name: 'id_usuario_fk' })
  usuario!: UsuarioEntity;

  //

  @Column({ name: 'date_created', type: 'timestamptz', nullable: false })
  dateCreated!: IEntityDate;

  @Column({ name: 'date_updated', type: 'timestamptz', nullable: false })
  dateUpdated!: IEntityDate;

  @Column({ name: 'date_deleted', type: 'timestamptz', nullable: true })
  dateDeleted!: null | IEntityDate;
}
