import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tableName = 'ambiente';

export class CreateTableAmbiente1708816227027 implements MigrationInterface {
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
            name: 'nome',
            type: 'text',
            isNullable: false,
          },

          {
            name: 'descricao',
            type: 'text',
            isNullable: false,
          },

          {
            name: 'codigo',
            type: 'text',
            isNullable: false,
          },

          {
            name: 'capacidade',
            type: 'int',
            isNullable: true,
          },

          {
            name: 'tipo',
            type: 'text',
            isNullable: true,
          },

          //

          {
            name: 'id_bloco_fk',
            type: 'uuid',
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
            name: `fk__${tableName}__pertence_a__bloco`,
            columnNames: ['id_bloco_fk'],
            referencedColumnNames: ['id'],
            referencedTableName: 'bloco',
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
    await queryRunner.dropTable(`${tableName}`, true, true, true);
  }
}
