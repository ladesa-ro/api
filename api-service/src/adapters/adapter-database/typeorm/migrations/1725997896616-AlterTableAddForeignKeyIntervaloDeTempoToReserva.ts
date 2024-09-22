import { ApiGatewayTimeoutResponse } from "@nestjs/swagger";
import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AlterTableAddForeignKeyIntervaloDeTempoToReserva1725997896616 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey("reserva", new TableForeignKey({
            name : `fk__reserva__depende__intervalo_de_tempo`,
            columnNames: ['id_intervalo_de_tempo_fk'],
            referencedColumnNames: ["id"],
            referencedTableName: "intervalo_de_tempo"
        }))
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("reserva", `fk__reserva__depende__intervalo_de_tempo`);
    }

}
