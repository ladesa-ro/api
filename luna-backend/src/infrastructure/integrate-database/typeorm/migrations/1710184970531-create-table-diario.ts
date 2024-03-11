import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tableName = 'diario';

export class CreateTableDiario1710184970531 implements MigrationInterface {
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
            type: 'text',
            isNullable: false,
          },

          {
            name: 'ano',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'etapa',
            type: 'text',
            isNullable: true,
          },
          //
          {
            name: 'id_turma_fk',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'id_ambiente_padrao_fk',
            type: 'uuid',
            isNullable: true,
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
            name: `fk__${tableName}__depende__turma`,
            columnNames: ['id_turma_fk'],
            referencedColumnNames: ['id'],
            referencedTableName: 'turma',
          },
          {
            name: `fk__${tableName}__depende__ambiente`,
            columnNames: ['id_ambiente_padrao_fk'],
            referencedColumnNames: ['id'],
            referencedTableName: 'ambiente',
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
