import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableCampusBlocoAmbiente1708816227027 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'campus_bloco_ambiente',

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
            name: 'id_campus_bloco_fk',
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
            name: 'fk__campus_bloco_ambiente__pertence_a__campus_bloco',
            columnNames: ['id_campus_bloco_fk'],
            referencedColumnNames: ['id'],
            referencedTableName: 'campus_bloco',
          },
        ],
      }),
    );

    await queryRunner.query(`
      CREATE TRIGGER change_date_updated_table_campus_bloco_ambiente
        BEFORE UPDATE ON campus_bloco_ambiente
        FOR EACH ROW
          EXECUTE FUNCTION change_date_updated();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('campus_bloco_ambiente', true, true, true);
  }
}
