import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tableName = 'diario_professor';

export class CreateTableDiarioProfessor1709927549982 implements MigrationInterface {
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
            name: 'situacao',
            type: 'bool',
            isNullable: false,
          },

          {
            name: 'id_diario_fk',
            type: 'uuid',
            isNullable: false,
          },
          //
          {
            name: 'id_professor_fk',
            type: 'uuid',
            isNullable: false,
          },
          //
          {
            name: 'date_created',
            type: 'timestamptz',
            isNullable: false,
            default: 'NOW()',
          },
          {
            name: 'date_updated',
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
            name: `fk__${tableName}__depende__diario`,
            columnNames: ['id_diario_fk'],
            referencedColumnNames: ['id'],
            referencedTableName: 'diario',
          },
          {
            name: `fk__${tableName}__depende__professor`,
            columnNames: ['id_professor_fk'],
            referencedColumnNames: ['id'],
            referencedTableName: 'professor',
          },
        ],
      }),
    );

    await queryRunner.query(`
      CREATE TRIGGER change_date_updated_table_${tableName}
        BEFORE UPDATE ON ${tableName}
        FOR EACH ROW
          EXECUTE FUNCTION change_date_updated();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName, true, true, true);
  }
}
