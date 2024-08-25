import type * as LadesaTypings from '@ladesa-ro/especificacao';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { VinculoEntity } from '../autenticacao';
import { DiarioProfessorEntity } from '../ensino';
import { HorarioGeradoEntity } from './horario-gerado.entity';
import { IntervaloDeTempoEntity } from '../calendario';

@Entity('horario_gerado_dia')
export class HorarioGeradoAulaEntity implements LadesaTypings.HorarioGeradoAula {
    
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    
    //

    @Column({ name: 'dia_semana_iso', type: 'int', nullable: true })
    diaSemanaIso!: number;

    //

    @ManyToOne(() => DiarioProfessorEntity)
    @JoinColumn({ name: 'id_diario_professor_fk' })
    diarioProfessor!: LadesaTypings.DiarioProfessorFindOneResult | null;

    @ManyToOne(() => HorarioGeradoEntity)
    @JoinColumn({ name: 'id_horario_gerado_fk' })
    horarioGerado!: LadesaTypings.HorarioGeradoFindOneResult;

    @ManyToOne(() => IntervaloDeTempoEntity)
    @JoinColumn({ name: 'id_intervalo_de_tempo_fk' })
    intervaloDeTempo!: LadesaTypings.IntervaloDeTempoFindOneResult;

    //

    @Column({ name: 'date_created', type: 'timestamptz', nullable: false })
    dateCreated!: Date;

    @Column({ name: 'date_updated', type: 'timestamptz', nullable: false })
    dateUpdated!: Date;

    @Column({ name: 'date_deleted', type: 'timestamptz', nullable: true })
    dateDeleted!: null | Date;
}
