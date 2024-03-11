import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableBloco1710183926133 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'bloco',

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
            name: 'codigo',
            type: 'text',
            isNullable: false,
          },

          //

          {
            name: 'id_campus_fk',
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
            name: 'fk__bloco__pertence_a__campus',
            columnNames: ['id_campus_fk'],
            referencedColumnNames: ['id'],
            referencedTableName: 'campus',
          },
        ],
      }),
    );

    await queryRunner.query(`
      CREATE TRIGGER change_date_updated_table_bloco
        BEFORE UPDATE ON bloco
        FOR EACH ROW
          EXECUTE FUNCTION change_date_updated();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('bloco', true, true, true);
  }
}
