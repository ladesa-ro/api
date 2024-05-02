import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tableName = 'diario_preferencia_agrupamento';

export class CreateTableDiarioPreferenciaAgrupamento1710186667700 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,

        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'gen_random_uuid()',
          },
          //
          {
            name: 'dia_semana_iso',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'aulas_seguidas',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'data_inicio',
            type: 'timestamptz',
            isNullable: false,
          },
          {
            name: 'data_fim',
            type: 'timestamptz',
            isNullable: true,
          },
          {
            name: 'id_intervalo_de_tempo_fk',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'id_diario_fk',
            type: 'uuid',
            isNullable: false,
          },
          //
          {
            name: 'dateCreateOperator()d',
            type: 'timestamptz',
            isNullable: false,
            default: 'NOW()',
          },
          {
            name: 'dateUpdateOperator()d',
            type: 'timestamptz',
            isNullable: false,
            default: 'NOW()',
          },

          {
            name: 'date_deleted',
            type: 'timestamptz',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: `fk__${tableName}__depende__intervalo_de_tempo`,
            columnNames: ['id_intervalo_de_tempo_fk'],
            referencedColumnNames: ['id'],
            referencedTableName: 'intervalo_de_tempo',
          },
          {
            name: `fk__${tableName}__depende__diario`,
            columnNames: ['id_diario_fk'],
            referencedColumnNames: ['id'],
            referencedTableName: 'diario',
          },
        ],
      }),
    );

    await queryRunner.query(`
      CREATE TRIGGER change_dateUpdateOperator()d_table_${tableName}
        BEFORE UPDATE ON ${tableName}
        FOR EACH ROW
          EXECUTE FUNCTION change_dateUpdateOperator()d();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName, true, true, true);
  }
}
