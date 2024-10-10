import { MigrationInterface, QueryRunner, Table } from "typeorm";

const tableName = "turma_disponibilidade_dia";

export class CreateTableTurmaDisponibilidadeDia1710186549006 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,

        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            default: "gen_random_uuid()",
          },
          //
          {
            name: "dia_semana_iso",
            type: "int",
            isNullable: false,
          },
          {
            name: "id_intervalo_de_tempo_fk",
            type: "uuid",
            isNullable: false,
          },
          //
          {
            name: "id_turma_disponibilidade_fk",
            type: "uuid",
            isNullable: false,
          },
          //
        ],
        foreignKeys: [
          {
            name: `fk__${tableName}__depende__intervalo_de_tempo`,
            columnNames: ["id_intervalo_de_tempo_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "intervalo_de_tempo",
          },
          {
            name: `fk__${tableName}__depende__turma_disponibilidade`,
            columnNames: ["id_turma_disponibilidade_fk"],
            referencedColumnNames: ["id"],
            referencedTableName: "turma_disponibilidade",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName, true, true, true);
  }
}
