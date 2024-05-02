import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tableName = 'aula';

export class CreateTableAula1710185238044 implements MigrationInterface {
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
            name: 'formato',
            type: 'text',
            isNullable: true,
          },

          {
            name: 'data',
            type: 'date',
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
          {
            name: 'id_ambiente_fk',
            type: 'uuid',
            isNullable: true,
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
          {
            name: `fk__${tableName}__depende__ambiente`,
            columnNames: ['id_ambiente_fk'],
            referencedColumnNames: ['id'],
            referencedTableName: 'ambiente',
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
