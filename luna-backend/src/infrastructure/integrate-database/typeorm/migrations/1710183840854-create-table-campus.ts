import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableCampus1710183840854 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'campus',

        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'gen_random_uuid()',
          },

          //

          {
            name: 'nome_fantasia',
            type: 'text',
            isNullable: false,
          },

          {
            name: 'razao_social',
            type: 'text',
            isNullable: false,
          },

          {
            name: 'apelido',
            type: 'text',
            isNullable: false,
          },

          {
            name: 'cnpj',
            type: 'text',
            isNullable: false,
          },

          //

          {
            name: 'id_endereco_fk',
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
            name: 'fk_campus_tem_endereco',
            columnNames: ['id_endereco_fk'],
            referencedColumnNames: ['id'],
            referencedTableName: 'endereco',
          },
        ],
      }),
    );

    await queryRunner.query(`
      CREATE TRIGGER change_date_updated_table_campus
        BEFORE UPDATE ON campus
        FOR EACH ROW
          EXECUTE FUNCTION change_date_updated();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('campus', true, true, true);
  }
}
