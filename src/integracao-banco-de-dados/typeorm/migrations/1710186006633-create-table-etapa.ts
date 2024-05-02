import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tableName = 'etapa';

export class CreateTableEtapa1710186006633 implements MigrationInterface {
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
            name: 'numero',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'data_inicio',
            type: 'timestamptz',
            isNullable: false,
          },
          {
            name: 'data_termino',
            type: 'timestamptz',
            isNullable: false,
          },
          {
            name: 'cor',
            type: 'text',
            isNullable: false,
          },
          //
          {
            name: 'id_calendario_letivo_fk',
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
            name: `fk__${tableName}__depende__calendario_letivo`,
            columnNames: ['id_calendario_letivo_fk'],
            referencedColumnNames: ['id'],
            referencedTableName: 'calendario_letivo',
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
